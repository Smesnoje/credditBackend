const mongoose = require("mongoose");
const post = require("../models/postModel");
const user = require("../models/userModel.js")
const thread = require("../models/threadModel")


const createNewPost = async (req, res, next) => {
  const data = req.body;

  if (req.session.userId) {
    const newPost = new post({
      title: data.title,
      content: data.content,
      thread: data.threadId,
      author: data.authorId,
    });
  
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
  } else {
    res.status(401).send("Unauthorized access")
  }
};


const getAllThreadPosts = async (req, res, next) => {
  const data = req.body

  const threadId = data.threadId

  let allThreadPosts

  try {
    allThreadPosts = await post.find({thread: threadId}).exec()
  } catch (err) {
    console.log(err)
  }

  res.status(200).send(allThreadPosts)
}


const getAllUserPosts = async (req, res, next) => {
  const data = req.body

  const authorId = data.authorId

  let allUserPosts

  try {
    allUserPosts = await post.find({author: authorId}).exec()
  } catch (err) {
    console.log(err)
  }

  res.status(200).send(allUserPosts)
}

exports.createNewPost = createNewPost;
exports.getAllThreadPosts = getAllThreadPosts
exports.getAllUserPosts = getAllUserPosts