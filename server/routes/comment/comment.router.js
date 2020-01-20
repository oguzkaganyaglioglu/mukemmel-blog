const express = require("express");
const Comment = require("../../models/Comment");
const User = require("../../models/User");
const session = require("express-session");
require("dotenv").config();

const route = () => {
  const router = new express.Router();

  router.route("/isWork").post((req, res) => {
    const { userId } = req.tokenData;
    User.findById(userId).then(user => {
      if (!user) {
      } else {
      }
    });
  });

  router.route(`/setComments`).post((req, res) => {
    const { operation, commentId, newComment } = req.body;
    Comment.findById(commentId).then(veri => {
      if (operation != undefined) {
        switch (operation) {
          case "delete":
            if (
              req.tokenData.admin == "true" ||
              (req.tokenData.userId === veri.userId)
            ) {
              Comment.findByIdAndUpdate(
                commentId,
                { isDeleted: true },
                (err, comment) => {
                  if (err) {
                    res.send({ status: false });
                  } else {
                    res.send({ status: true });
                  }
                }
              );
            } else {
              res.send({ status: false });
            }
            break;

          case "ban":
            if (req.tokenData.admin === true) {
              Comment.findByIdAndUpdate(
                commentId,
                { isBanned: true },
                (err, comment) => {
                  if (err) {
                    res.send({ status: false });
                  } else {
                    res.send({ status: true });
                  }
                }
              );
            } else {
              res.send({ status: false });
            }

            break;

          case "edit":
            if (
              req.tokenData.admin ||
              (req.tokenData.userId === veri.userId)
            ) {
              Comment.findByIdAndUpdate(
                commentId,
                { comment: newComment,
                  dateModified: new Date()
                },
                (err, comment) => {
                  if (err) {
                    res.send({ status: false });
                  } else {
                    res.send({ status: true });
                  }
                }
              );
            } else {
              res.send({ status: false });
            }
            break;

          default:
            break;
        }
      } else {
        res.send({ status: false });
      }
    });
  });

  router.route(`/addComment`).post((req, res) => {
    const { comment, isBanned, isDeleted, postSlug } = req.body;
    const { userId } = req.tokenData;
    User.findById(userId).then(user => {
      if (!user) {
      } else {
        const newComment = new Comment({
          postSlug: postSlug,
          userId: userId,
          userName: user.firstName,
          comment: comment,
          dateCreated: new Date(),
          dateModified: new Date(),
          isBanned: isBanned,
          isDeleted: isDeleted
        });
        newComment.save().then(
          data => {
            res.send({ status: true, comment: data });
          },
          err => {
            res.send({ status: false, error: err });
          }
        );
      }
    });
  });

  return router;
};

module.exports = {
  route,
  routePrefix: `/${process.env.API_VERSION}/comment`
};
