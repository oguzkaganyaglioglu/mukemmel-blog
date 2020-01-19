const express = require("express");
const Comment = require("../../models/Comment");
const User = require("../../models/User");
const session = require("express-session");
require("dotenv").config();

const route = () => {
  const router = new express.Router();

  

  router.route(`/comments`).get((req, res) => {
      if (req.query.post != undefined) {
        Comment.find({ postSlug: req.query.post, isDeleted: false, isBanned: false }, (err, comments) => {
            if (err) {
              res.redirect("/?unknown_error=true");
            }
            res.send({ comments: comments });
          });
      } else {
        Comment.find({}, (err, comments) => {
            if (err) throw err;
            res.send({ comments: comments });
          });
      }
    
  });

  return router;
};

module.exports = {
  route,
  routePrefix: `/${process.env.API_VERSION}/comments`
};
