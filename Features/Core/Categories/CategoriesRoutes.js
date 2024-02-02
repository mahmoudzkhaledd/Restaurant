const { getAllCategories } = require('./Services/GetAllCategories');

const appRouter = require('express').Router();
appRouter.get('/', getAllCategories)

module.exports = appRouter;