const express = require("express");
const Post = require("../../models/Post");
require("dotenv").config();

const route = () => {
  const router = new express.Router();

  router.route(`/draftposts`).post((req, res) => {
    if (req.query.post != undefined) {
      Post.find({ slug: req.query.post, draft: true }, (err, post) => {
        if (err) {
          res.redirect("/?unknown_error=true");
        }
        res.send({ post: post[0] });
      });
    } else {
      Post.find({draft: true}, null, {sort: {'_id': -1}}, (err, posts) => {
        if (err) throw err;
        res.send({ posts: posts });
      });
    }
  });

  router.route(`/posts`).post((req, res) => {
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
    const { details, tag, title, slug, img, draft } = req.body;
    const newPost = new Post({
      title: title,
      slug: slug,
      details: details,
      tag: tag,
      img: img,
      draft: draft,
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

  router.route(`/delete-post`).post((req, res) => {
    const { slug } = req.body;
    Post.deleteOne({ slug: slug }, err => {
      if (err) {
        res.send({ status: false, error: err });
      } else {
        res.send({ status: true });
      }
    });
  });

  router.route(`/modify-post`).post((req, res) => {
    const { details, tag, title, slug, img, draft, old_slug } = req.body;
    Post.update(
      { slug: old_slug },
      {
        title: title,
        slug: slug,
        details: details,
        tag: tag,
        img: img,
        draft: draft,
        date: new Date().toISOString().split("T")[0]
      },
      (err, post) => {
        if (err) {
          res.send({ status: false, error: err });
        } else {
          res.send({ status: true });
        }
      }
    );
  });

  return router;
};

module.exports = {
  route,
  routePrefix: `/${process.env.API_VERSION}/blog-operations`
};
