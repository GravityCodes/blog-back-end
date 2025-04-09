const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const {validationResult} = require('express-validator');

const fetchPosts = async (req, res) => {
  try {
    const postList = await prisma.post.findMany();
    
    res.json(postList);

  }catch(err){
    console.error(err);
    res.sendStatus(500).json({message: "Server error occured."});
  }
}

const fetchPost = async (req, res) => {
  try {
    const {id} = req.params;

    if(!id) {
      return res.status(400).json({msg:"No id found"});
    }

    const post = await prisma.post.findUnique(
      {
        where: {
          id: Number(id),
        },
      }
    );

    if (!post){
      return res.status(404).json({msg:"No post found"})
    }

    return res.status(200).json(post);
  }catch(err){
    console.error(err);
    return res.status(500).json({msg: "An unknown error occured"});
  }
}

const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      content,
      authorId,
      publish,
    } = req.body;
    const post = await prisma.post.create({
      data:
      {
        title,
        content: JSON.parse(content),
        authorId: Number(authorId),
        publish: Boolean(publish)
      }
    });

    return res.status(201).json({msg:"Post has been created"});


  }catch(err){
    console.error(err);
    return res.status(500).json({msg:"A server error has occured."});
  }
}

const editPost = async(req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      content,
      publish,
    } = req.body;

    const {id} = req.params;

    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data:
      {
        title,
        content: JSON.parse(content),
        publish: Boolean(publish)
      }
    });

    return res.status(201).json({msg:"Post has been updated"});


  }catch(err){
    console.error(err);
    return res.status(500).json({msg:"A server error has occured."});
  }
}


module.exports = {
  fetchPosts,
  fetchPost,
  createPost,
  editPost
}