
const { getWebConfigs } = require('./Services/GetConfigs');
const { getLandingPageMeals } = require('./Services/GetLandingPageMeals');

const appRouter = require('express').Router();
appRouter.get('/website-configs', getWebConfigs);
appRouter.get('/landing-page-items', getLandingPageMeals);

module.exports = appRouter;