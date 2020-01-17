const AuthRouter = require("./auth/auth.router");
const BlogRouter = require("./blog/blog.router");

const AppRoutes = server => {
  server.use(AuthRouter.routePrefix, AuthRouter.route());
  server.use(BlogRouter.routePrefix, BlogRouter.route());
};
module.exports = AppRoutes;
