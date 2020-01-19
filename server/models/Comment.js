const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  userId: {
    type: String,
    required: [true, "Bir sorun oluştu :("]
  },
  like: {
    type: Number,
    default: 0,
    required: [true, "Bir sorun oluştu :("]
  },
  dislike: {
    type: Number,
    default: 0,
    required: [true, "Bir sorun oluştu :("]
  },
  postSlug: {
    type: String,
    required: [true, "Bir sorun oluştu :("]
  },
  userName: {
    type: String,
    required: [true, "Bir sorun oluştu :("]
  },
  comment: {
    type: String,
    required: [true, "Lütfen blog yazısını boş bırakmayınız."]
  },
  dateCreated: {
    type: Date,
    required: [true, "Bir sorun oluştu :("]
  },
  dateModified: {
    type: Date,
    required: [true, "Bir sorun oluştu :("]
  },
  isBanned: {
    type: Boolean,
    default: false,
    required: [true, "Bir sorun oluştu :("]
  },
  isDeleted: {
    type: Boolean,
    default: false,
    required: [true, "Bir sorun oluştu :("]
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
