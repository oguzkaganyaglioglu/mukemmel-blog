const express = require("express");
const config = require("../../config");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../../models/User");

const route = () => {
  const router = new express.Router();

  router.route("/login").post((req, res) => {
    const { email, password } = req.body;
    const passwordHashed = crypto
      .createHmac("sha512", config.passSecret)
      .update(password)
      .digest("hex");

    User.findOne({ email: email }).then(user => {
      if (!user) {
        res.send({
          status: false,
          message: "kullanıcı bulunamadı"
        });
      } else {
        if (user.password === passwordHashed) {
          const token = jwt.sign({ userId: user._id }, config.jwtSecret);
          req.session.userToken = token;
          req.session.useremail = email;
          // req.session.user.lastName = user.lastName;
          // req.session.user.firstName = user.firstName;
          res.send({
            status: true,
            token: token
          });
        } else {
          res.send({
            status: false,
            message: "kullanıcı bulunamadı"
          });
        }
      }
    });
  });

  router.route("/register").post((req, res) => {
    const { email, password, firstName, lastName, repassword } = req.body;
    const passwordHashed = crypto
      .createHmac("sha512", config.passSecret)
      .update(password)
      .digest("hex");
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: passwordHashed,
      dateCreated: new Date(),
      dateModified: new Date()
    });
    newUser.save().then(
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
  routePrefix: `/${config.version}/auth`
};
