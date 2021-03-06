const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const AuthRouter = require("./routes");
const session = require("express-session");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  //TODO: env url kontrol et
  server.use(cors({ origin: process.env.DOMAIN, credentials: true }));

  // function isEmpty(obj) {
  //   return Object.keys(obj).length === 0;
  // }

  const isAuth = (req, res, next) => {
    jwt.verify(
      req.session.userToken,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          //res.status(403).json(isEmpty(err) ? { message: 'Wrong token!' } : err);
          res.redirect("/log-reg");
        } else {
          req.tokenData = decoded;
          next();
        }
      }
    );
  };

  const resetPass = (req, res, next) => {
    jwt.verify(req.query.token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        //res.status(403).json(isEmpty(err) ? { message: 'Wrong token!' } : err);
        res.redirect("/?unknown_error=true");
      } else {
        req.tokenData = decoded;
        User.findById(decoded.userId).then(user => {
          if (!user) {
            res.redirect("/?unknown_error=true");
          } else {
            if (decoded.hashed === user.password) {
              next();
            } else {
              res.redirect("/?invalid_reset_link=true");
            }
          }
        });
      }
    });
  };

  const isAdmin = (req, res, next) => {
    jwt.verify(
      req.session.userToken,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          //res.status(403).json(isEmpty(err) ? { message: 'Wrong token!' } : err);
          res.redirect("/?unauthorized=true");
        } else {
          req.tokenData = decoded;

          if (req.tokenData.admin) {
            next();
          } else {
            res.redirect("/?unauthorized=true");
          }
        }
      }
    );
  };

  server.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true
    })
  );

  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

  server.use(bodyParser.json());

  AuthRouter(server);

  server.get("/api/test", (req, res) => {
    res.send(process.env.DOMAIN);
  });

  server.get("/api/test/read", isAdmin, (req, res) => {
    if (req.tokenData.admin) {
      return res.send("readed: You're admin " + req.tokenData.admin);
    } else {
      res.send("session not found" + req.tokenData.admin);
    }
  });

  server.get("/admin", isAdmin, (req, res) => {
    return handle(req, res);
  });

  server.get("/admin/*", isAdmin, (req, res) => {
    return handle(req, res);
  });

  server.get("/logout", isAuth, (req, res) => {
    req.session.destroy(function(err) {
      if (err) {
        return res.redirect("/?unknown_error=true");
      }
    });
    res.redirect("/");
  });

  server.post("/v1/gettoken", (req, res) => {
    res.send(req.session.userToken);
  });

  server.get("/log-reg", (req, res) => {
    if (req.session.userToken != undefined) {
      jwt.verify(
        req.session.userToken,
        process.env.JWT_SECRET,
        (err, decoded) => {
          if (err) {
            //res.status(403).json(isEmpty(err) ? { message: 'Wrong token!' } : err);
            return handle(req, res);
          } else {
            return res.redirect("/");
          }
        }
      );
    } else {
      return handle(req, res);
    }
  });

  server.get("/reset-password", resetPass, (req, res) => {
    return handle(req, res);
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on ${PORT}`);
  });
});
