const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const AuthRouter = require("./routes");
const session = require("express-session");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(session({
      secret: "my-key",
      resave: false,
      saveUninitialized: true
    }));


    mongoose.Promise = global.Promise;
    mongoose.connect(
      "mongodb+srv://dbUser:opIwDkg6fjyWY9e4@mukemmelblog-cewxh.gcp.mongodb.net/users?retryWrites=true&w=majority",
      { useNewUrlParser: true }
    );

    server.use(bodyParser.json());

    AuthRouter(server);

    server.post("/", (req, res) => {
      res.send(req.body);
    });

    server.get("/api/test/write", (req, res) => {
      req.session.userToken = "testtoken";
      res.send("session created");
    });

    // server.get("/account", (req, res) => {
    //   req.session.userToken = "testtoken";
    //   res.send("session created");
    // });

    server.get("/api/test/read", (req, res) => {
      if (req.session.userToken) {
        return res.send('readed: '+ req.session.useremail);
      }else{
        res.send("session not found");
      }
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on ${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });