const appRouter = require('express').Router();
const { loginAdmin } = require('./Services/Login');
const { loginTokenAdmin } = require('./Services/LoginToken');
appRouter.post('/login', loginAdmin);
appRouter.post('/login/token', loginTokenAdmin);
module.exports = appRouter;