const express = require("express");
const Post = require("../../models/Post");
require("dotenv").config();

const route = () => {
  const router = new express.Router();

  router.route(`/posts`).get((req, res) => {
    if (req.query.post != undefined) {
      Post.find({ slug: req.query.post, draft: false }, (err, post) => {
        if (err) {
          res.redirect("/?unknown_error=true");
        }
        res.send({ post: post[0] });
      });
    } else {
      Post.find({draft: false}, (err, posts) => {
        if (err) throw err;
        res.send({ posts: posts });
      });
    }
  });

  return router;
};

module.exports = {
  route,
  routePrefix: `/${process.env.API_VERSION}/blog`
};
