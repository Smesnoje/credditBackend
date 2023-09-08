const mongoose = require("mongoose");
const comment = require("../models/commentModel");
const user = require("../models/userModel")
const post = require("../models/postModel")

const createNewComment = async (req, res, next) => {
  const data = req.body;

  const newComment = new comment({
    content: data.content,
    post: data.postId,
    author: data.authorId,
  });

  let savedComment;
  let savedCommentAuthor;
  let savedCommentPost;
  try {
    savedComment = await newComment.save();
    console.log(newComment);
    res.status(201).send("Comment created!");
  } catch (err) {
    console.log("something went wrong while creating the comment");
    console.log(err);
  }
  try{
    savedCommentAuthor = await user.findById(data.authorId)
    console.log(savedCommentAuthor)
    savedCommentAuthor.comments.push(savedComment._id)
    await savedCommentAuthor.save();
    

  }catch(err){
    console.log(err)
    console.log('Something went wrong with fetching related user')
  }
// ##############
  try{
    savedCommentPost = await post.findById(data.postId)
    console.log(savedCommentPost)
    savedCommentPost.comments.push(savedComment._id)
    await savedCommentPost.save();

    

  }catch(err){
    console.log(err)
    console.log('Something went wrong with fetching related post')
  }
};

const getAllPostComments = async (req, res, next) => {
  const data = req.body

  const postId = data.postId

  let allPostComments

  try {
    allPostComments = await comment.find({post: postId}).exec()
  } catch (err) {
    console.log(err)
  }

  res.status(200).send(allPostComments)
}

const getAllUserComments = async (req, res, next) => {
  const data = req.body

  const authorId = data.authorId

  let allUserComments

  try {
    allUserComments = await comment.find({author: authorId}).exec()
  } catch (err) {
    console.log(err)
  }

  res.status(200).send(allUserComments)
}

exports.createNewComment = createNewComment;
exports.getAllPostComments = getAllPostComments
exports.getAllUserComments = getAllUserComments
