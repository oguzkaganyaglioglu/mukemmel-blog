const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const AuthRouter = require("./routes");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const config = require("./config");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    //TODO: env url kontrol et
    server.use(cors());

    function isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }

    const isAuth = (req, res, next) => {
      jwt.verify(req.session.userToken, config.jwtSecret, (err, decoded) => {
        if (err) {
          //res.status(403).json(isEmpty(err) ? { message: 'Wrong token!' } : err);
          res.redirect("/log-reg");
        } else {
          req.tokenData = decoded;
          next();
        }
      });
    };

    const isAdmin = (req, res, next) => {
      jwt.verify(req.session.userToken, config.jwtSecret, (err, decoded) => {
        if (err) {
          //res.status(403).json(isEmpty(err) ? { message: 'Wrong token!' } : err);
          res.redirect("/?unauthorized=true");
        } else {
          req.tokenData = decoded;

          if (req.tokenData.admin) {
          next();
            
          }else{
            res.redirect("/?unauthorized=true");
          }
        }
      });
    };

    server.use(
      session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true
      })
    );

    mongoose.Promise = global.Promise;
    mongoose.connect(
      config.dbURL,
      { useNewUrlParser: true }
    );

    server.use(bodyParser.json());

    AuthRouter(server);

    server.post("/", (req, res) => {
      res.send(req.body);
    });

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

    server.get("/logout", isAuth, (req, res) => {
        req.session.destroy;
        res.redirect("/");
    });

    server.get("/", (req, res) =>{
      if (req.query.refresh) {
        return handle(req, res);
      }else{
        res.redirect("/?refresh=true");
      }
    })

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  });
