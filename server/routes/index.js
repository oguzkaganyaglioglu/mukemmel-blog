const AuthRouter = require("./auth/auth.router");

const AppRoutes = (app) => {
    app.use(AuthRouter.routePrefix, AuthRouter.route());

}
module.exports = AppRoutes;