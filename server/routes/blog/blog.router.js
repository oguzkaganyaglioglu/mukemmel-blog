const express = require("express");
const Post = require("../../models/Post");
require("dotenv").config();

const route = () => {
  const router = new express.Router();

  router.route(`/posts`).get((req, res) => {
    if (req.query.post != undefined) {
      Post.find({ slug: req.query.post }, (err, post) => {
        if (err) {
          res.redirect("/?unknown_error=true");
        }
        res.send({ post: post[0] });
      });
    } else {
      Post.find({}, (err, posts) => {
        if (err) throw err;
        res.send({ posts: posts });
      });
    }
  });

  router.route(`/addPost`).post((req, res) => {
    const { details, tag, title, slug, img } = req.body;
    const newPost = new Post({
      title: title,
      slug: slug,
      details: details,
      tag: tag,
      img: img,
      date: new Date().toISOString().split("T")[0]
    });
    newPost.save().then(
      data => {
        res.send({ status: true, user: data });
      },
      err => {
        res.send({ status: false, error: err });
      }
    );
  });

  return router;
};

module.exports = {
  route,
  routePrefix: `/${process.env.API_VERSION}/blog`
};
