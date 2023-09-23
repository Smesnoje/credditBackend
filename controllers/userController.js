const mongoose = require("mongoose");
const user = require("../models/userModel");

const createNewUser = async (req, res, next) => {
  const data = req.body;

  try {
    const fetchedUserByUsername = await user
      .findOne({ username: data.username })
      .exec();
    const fetchedUserByEmail = await user.findOne({ email: data.email }).exec();
    if (fetchedUserByUsername || fetchedUserByEmail) {
      res.status(409).send("Credentials are not unique!");
      return next();
    }
  } catch (err) {
    console.log(err);
  }

  const newUser = new user({
    username: data.username,
    password: data.password,
    email: data.email,
    profilePicture: data.profilePicture,
  });

  try {
    await newUser.save();
    console.log(newUser);
  } catch (err) {
    console.log("something went wrong while creating the user");
  }
  res.status(201).send("User created!");
};

const getUser = async (req, res, next) => {
  const data = req.body;

  const username = data.username;

  let fetchedUser;
  try {
    fetchedUser = await user.findOne({ username: username }).exec();

    if (fetchedUser) {
      res.status(200).send(fetchedUser);
    } else {
      res.status(404).send("User not found!");
    }
  } catch (err) {
    console.log(err);
  }
};

const loginUser = async (req, res, next) => {
  const data = req.body;
  const username = data.username;
  const password = data.password;
  let fetchedUser;
  try {
    fetchedUser = await user.findOne({ username: username }).exec();
    if (fetchedUser) {
      if (fetchedUser.password === password) {
        req.session.userId = fetchedUser._id
        console.log("successfull login");
        console.log(fetchedUser);
        res.status(200).send(fetchedUser);
      }
    } else {
      console.log("Login failed");
      res.status(404).send("User not found");
      
    }
    return next()
  } catch (err) {
    console.log(err);
    console.log("there was issues logging in");
  }
};

const logoutUser = (req, res, next) => {
  req.session.destroy()
  res.clearCookie('creddit-user-token', { path: '/' });  
  res.send('Logout successful')
  console.log('Logout successful')
}

const getLoggedInUser = (req, res, next)=>{
  if (req.session.userId){
    const currentUserId = req.session.userId;
    res.send(currentUserId)
    res.status(200)
  }
  else{
    res.send('Login again')
    res.status(404)
  }
}

exports.createNewUser = createNewUser;
exports.getUser = getUser;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser
exports.getLoggedInUser = getLoggedInUser;
