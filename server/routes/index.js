const AuthRouter = require("./auth/auth.router");

const AppRoutes = server => {
  server.use(AuthRouter.routePrefix, AuthRouter.route());
};
module.exports = AppRoutes;
