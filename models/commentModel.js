const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  content: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "post", required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  reply: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comment",
    default: null,
  },
  level: { type: Number, default: 0 },
});

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
