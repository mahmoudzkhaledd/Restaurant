const appRouter = require('express').Router();

const { getMeal } = require('./Service/GetMeal');
const { getMeals } = require('./Service/GetMeals');


appRouter.get('/:id', getMeal);
appRouter.get('/', getMeals);

module.exports = appRouter;  