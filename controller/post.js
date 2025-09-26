const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");
const pswManager = require("../config/password");
const jwt = require("jsonwebtoken");

//Post
const fetchPosts = async (req, res) => {
  try {
    const postList = await prisma.post.findMany({
      where: {
        publish: true,
      },
      include: {
        comments: true,
      },
    });
    res.json(postList);
  } catch (err) {
    console.error(err);
    res
      .sendStatus(500)
      .json({ message: "A server error occured. Please try again later." });
  }
};

const fetchPost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ msg: "No id found" });
    }

    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
        publish: true,
      },
      include: {
        comments: true,
      },
    });

    if (!post) {
      return res.status(404).json({ msg: "No post found" });
    }

    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "A server error has occured. Please try again later." });
  }
};

const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, publish } = req.body;

    const authorId = req.user.id;

    const post = await prisma.post.create({
      data: {
        title,
        content: content,
        author: {
          connect: {
            id: Number(authorId),
          },
        },
        publish: Boolean(publish),
      },
    });

    return res.status(201).json({ msg: "Post has been created" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "A server error has occured. Please try again later." });
  }
};

const editPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, publish } = req.body;

    const { id } = req.params;
    const authorId = req.user.id;

    const post = await prisma.post.update({
      where: {
        id: Number(id),
        author: {
          id: authorId,
        },
      },
      data: {
        title,
        content: content,
        publish: Boolean(publish),
      },
    });

    return res.status(201).json({ msg: "Post has been updated" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "A server error has occured. Please try again later." });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const user = req.user;

    const authorId = user.id;

    const userPassword = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
      select: {
        password: true,
      },
    });

    if (!userPassword) {
      return res.status(404).json("No user Found");
    }

    const checkPassword = await pswManager.checkPassword(
      password,
      userPassword.password,
    );

    if (!checkPassword) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    const post = await prisma.post.delete({
      where: {
        id: Number(id),
        author: {
          id: authorId,
        },
      },
    });

    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "A server error has occured. Please try again later." });
  }
};

const fetchAdminPosts = async (req, res) => {
  try {
    const user = req.user;

    const request = await prisma.post.findMany({
      where: {
        authorId: user.id,
      },
      include: {
        comments: true,
      },
    });

    if (!request) {
      return res.status(404).json({ msg: "No post found" });
    }

    return res.status(200).json(request);
  } catch (error) {
    return res.status(500).json({
      msg: "A internal server error occured. Please try again later.",
    });
  }
};

const fetchAdminPost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await prisma.post.findFirst({
      where: {
        id: Number(id),
        authorId: userId,
      },
      include: {
        comments: true,
      },
    });

    if (!post) {
      return res.status(404).json({ msg: "No post found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "A internal server error occured. Please try again later.".at,
    });
  }
};

//Comments
const fetchComments = async (req, res) => {
  try {
    const { postid } = req.params;

    const comments = await prisma.post.findFirst({
      where: {
        id: Number(postid),
      },
      select: {
        comments: {
          select: {
            id: true,
            content: true,
            userId: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "A server error has occured. Please try again later." });
  }
};

const fetchComment = async (req, res) => {
  try {
    const { postid, id } = req.params;

    const comment = await prisma.comment.findUnique({
      where: {
        id: Number(id),
        postid: Number(postid),
      },
    });

    return res.status(200).json(comment);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "A server error has occured. Please try again later." });
  }
};

const createComment = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    const { postid } = req.params;
    const { content } = req.body;
    const userid = req.user.id;

    const comment = await prisma.comment.create({
      data: {
        content,
        post: {
          connect: {
            id: Number(postid),
          },
        },
        user: {
          connect: {
            id: Number(userid),
          },
        },
      },
    });

    return res.status(201).json({ msg: "Comment was successfully created." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "A server error has occured." });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const comment = await prisma.comment.delete({
      where: {
        id: Number(id),
        user: {
          id: userId,
        },
      },
    });

    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "A server error has occured." });
  }
};

module.exports = {
  fetchPosts,
  fetchPost,
  createPost,
  editPost,
  deletePost,
  fetchComments,
  fetchComment,
  createComment,
  deleteComment,
  fetchAdminPosts,
  fetchAdminPost,
};
