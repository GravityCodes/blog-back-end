const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");
//password manager
const pswManager = require('../config/password');
const jwt = require('jsonwebtoken');



const createUser = async (req, res) => {
  try{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body;

    const hash = await pswManager.hashPassword(password);

    // Future updates
    // Check if user is already in database
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
        author: false,
      }
    });

    return res.status(201).json({msg: 'user created successfully'});

  }catch(err){
    console.error(err);
    return res.status(500).json({msg: "A server error has occured. Please try again later."});
  }

}

const loginUser = async (req, res) => {
  try{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if(!pswManager.checkPassword(password, user.password)){
      return res.status(401).json({msg: "Incorect password"});
    }

    const token = jwt.sign(user, process.env.SECRET_KEY, {
      expiresIn:"7d"
    });
    
    res.status(200).json({token})

  }catch(err){
    console.error(err);
    return res.status(500).json({msg: "A server error has occured. Please try again later"});
  }
}

module.exports={
  createUser,
  loginUser
}