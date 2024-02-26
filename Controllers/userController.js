const users = require("../Models/userSchema");
//import jwt token
const jwt=require('jsonwebtoken')
//register logic
exports.register = async (req, res) => {
  console.log("Inside register function");
  const { username, email, password } = req.body;

  //if cgheck the email is already in db -> user already registered
  try {
    const existingUser = await users.findOne({email});
    if (existingUser) {
      res.status(401).json("User already registered");
    }
    //if email not prsent save  to database
    else {
      const newUser = await users({
        username,
        email,
        password,
      });
      await newUser.save(); //save new user to database
      res.status(200).json("User successfully registered");
    }
  } catch (err) {
    res.status(500).json("sever error  : " + err.message);
  }
  console.log(`${username} ${email} ${password}`);
};

//login logic
exports.login = async (req, res) => {
  const {  email, password } = req.body;
  try {
    const user = await users.findOne({email,password});
    if (user) {
      //token generation
      const token=jwt.sign({userId:user._id},"superkey2024")
      res.status(200).json({user,token});
    }
    //if email not prsent save  to database
    else {
      res.status(404).json("Invalid login");
    }
  } catch (err) {
    res.status(500).json("sever error  : " + err.message);
  }
};
