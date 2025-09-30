const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");
//password manager
const pswManager = require("../config/password");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const hash = await pswManager.hashPassword(password);

    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (findUser) {
      return res.status(409).json({ msg: "Email is already in use" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        author: false,
      },
    });

    return res.status(201).json({ msg: "user created successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "A server error has occured. Please try again later." });
  }
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Incorrect Email or Password" }] });
    }

    const checkPassword = await pswManager.checkPassword(
      password,
      user.password,
    );

    if (!checkPassword) {
      return res
        .status(401)
        .json({ errors: [{ msg: "Incorrect Email or Password" }] });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );

    const milliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: milliseconds,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "none",
        domain: process.env.COOKIE_DOMAIN_NAME
      })
      .json({ msg: "Login successful" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "A server error has occured. Please try again later" });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ errors: [{ msg: "Incorrect Email or Password" }] });
    }

    const checkPassword = await pswManager.checkPassword(
      password,
      user.password,
    );

    if (!checkPassword) {
      return res
        .status(401)
        .json({ errors: [{ msg: "Incorrect Email or Password" }] });
    }

    //check if user is a admin

    if (!user.author) {
      return res
        .status(401)
        .json({ errors: [{ msg: "You are not a author." }] });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );

    const milliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: milliseconds,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "none",
      })
      .json({ msg: "Login successful" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ msg: "A server error has occured. Please try again later" });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "none",
    
  });

  res.status(200).json({ msg: "Logged out succesfully" });
};

const fetchUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(401).json({ msg: "User could not be found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ msg: "A server error has occured. Please try again later" });
  }
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  loginAdmin,
  fetchUser,
};
