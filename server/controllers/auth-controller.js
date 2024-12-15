const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("welcome to home page");
  } catch (error) {
    console.log(error);
  }
};

//registration user

const register = async (req, res) => {
  try {
    // const data = req.body;
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      
      return res.status(400).json({ message: "email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    // res.status(201).json({ message: "User registered successfully" });
    res.status(201).json({
      msg: "User registered successfully",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};





//Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credientials" });
    }

    // const user = await bcrypt.compare(password, userExist.password)

    const user = await userExist.comparePassword(password);

    if(user) {
      res.status(200).json({
        msg: "Login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    }else{
      return res.status(400).json({ msg: "Invalid Credientials" });
    }
  } catch (error) {
    // res.status(500).json({ message: "Internal server errors" });
    next(error);
  }
}


// to send user data - user logic

const user = async (req, res)=>{
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({userData});
  } catch (error) {
    console.log(error);
  }
}

module.exports = { home, register, login, user };
