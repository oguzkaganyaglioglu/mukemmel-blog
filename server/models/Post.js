const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: [true, "Lütfen başlık giriniz."]
  },
  draft:{
    type:Boolean,
    default:false
  },
  slug: {
    type: String,
    unique: true,
    required: [true, "Lütfen slug giriniz."]
  },
  details: {
    type: String,
    required: [true, "Lütfen blog yazısını boş bırakmayınız."]
  },
  date: {
    type: String,
    required: [true, "Bir sorun oluştu :("]
  },
  tag: {
    type: String,
    required: [true, "Lütfen en az bir tag giriniz."]
  },
  img: {
    type: String,
    required: [true, "Lütfen kapak resmi ekleyiniz."]
  }
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
