const AuthRouter = require("./auth/auth.router");
const BlogRouter = require("./blog/blog.router");
const CommentRouter = require("./comment/comment.router");
const CommentsRouter = require("./comment/comments.router");
const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const token = req.header('userToken');
  jwt.verify(
    token,
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


const AppRoutes = server => {
  server.use(AuthRouter.routePrefix, AuthRouter.route());
  server.use(BlogRouter.routePrefix, BlogRouter.route());
  server.use(CommentRouter.routePrefix, isAuth, CommentRouter.route());
  server.use(CommentsRouter.routePrefix, CommentsRouter.route());
};
module.exports = AppRoutes;
