const express = require("express");
const User = require("../../models/User");
require("dotenv").config();

const route = () => {
  const router = new express.Router();

  router.route(`/members`).post((req, res) => {
    if (req.query.member != undefined) {
      User.find({ member: req.query.member }, (err, member) => {
        if (err) {
          res.redirect("/?unknown_error=true");
        }
        res.send({ member: member[0] });
      });
    } else {
      User.find({}, (err, members) => {
        if (err) throw err;
        res.send({ members: members });
      });
    }
  });

  router.route(`/delete-user`).post((req, res) => {
    const { id } = req.body;
    User.findByIdAndDelete({ id }, err => {
      if (err) {
        res.send({ status: false, error: err });
      } else {
        res.send({ status: true });
      }
    });
  });

  router.route(`/modify-user`).post((req, res) => {
    const { id, admin, banned, deleted } = req.body;
    User.findByIdAndUpdate(
      { id },
      {
        admin:admin,
        banned:banned,
        deleted:deleted,
        dateModified: new Date()
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
  routePrefix: `/${process.env.API_VERSION}/admin-user-operations`
};
