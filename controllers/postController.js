const mongoose = require("mongoose");
const post = require("../models/postModel");
const user = require("../models/userModel.js")
const thread = require("../models/threadModel")

const createNewPost = async (req, res, next) => {
  const data = req.body;

  const newPost = new post({
    title: data.title,
    content: data.content,
    thread: data.threadId,
    author: data.authorId,
  });
  //   try{
  //       postAuthor await mongoose.findById(data.authorId);
  //   } catch(err){
  //       console.log(err)
  //   }

  let savedPost;
  let savedPostAuthor;
  let savedPostThread;
  try {
    savedPost = await newPost.save();
    console.log(newPost);
    res.status(201).send("Post created!");
  } catch (err) {
    console.log("something went wrong while creating the Post");
    console.log(err);
  }

  try{
    savedPostAuthor = await user.findById(data.authorId);
    savedPostAuthor.posts.push(savedPost._id);
    await savedPostAuthor.save();

  } catch(err){
    console.log(err);
  }

  try{
    savedPostThread = await thread.findById(data.threadId);
    savedPostThread.posts.push(savedPost._id);
    await savedPostThread.save();

  } catch(err){
    console.log(err);
  }

};

exports.createNewPost = createNewPost;
