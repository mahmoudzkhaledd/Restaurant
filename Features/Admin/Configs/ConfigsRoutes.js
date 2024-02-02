const { deleteMealLandingPage } = require('./Services/DeleteMealLandingPage');
const { changeWebsiteAvailability } = require('./Services/ChangeWebsiteAvailability');
const { getConfigs } = require('./Services/GetConfigs');
const { adminRolesValidator } = require('../../../middlewares/RolesValidator');
const { addMealToLandingPageValidator, addCategoryToLandingPageValidator } = require('./Validator/ConfigsValidator');
const { addMealToLandingPage } = require('./Services/AddMealToLandingPage');
const { addCategoryToLandingPage } = require('./Services/AddCategoryToLandingPage');
const { deleteCategoryLandingPage } = require('./Services/DeleteCategoryLandingPage');

const appRouter = require('express').Router();
appRouter.post('/add-meal-landing-page', addMealToLandingPageValidator, addMealToLandingPage);
appRouter.post('/add-category-landing-page', addCategoryToLandingPageValidator, addCategoryToLandingPage);
appRouter.delete('/remove-meal-landing-page', deleteMealLandingPage);
appRouter.delete('/remove-category-landing-page', deleteCategoryLandingPage);

appRouter.post('/change-available', adminRolesValidator(['ChangeWebAvailability']), changeWebsiteAvailability);
appRouter.get('/', getConfigs);
module.exports = appRouter;  