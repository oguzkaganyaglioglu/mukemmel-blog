const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const AuthRouter = require("./routes");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();


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