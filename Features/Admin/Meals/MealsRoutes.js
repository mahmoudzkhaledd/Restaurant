const { addNewMeal } = require('./Services/AddNewMeal');
const { deleteMeal } = require('./Services/DeleteMeal');
const { editMeal } = require('./Services/EditMeal');
const { getAllMeals } = require('./Services/GetAllMeals');
const { getMeal } = require('./Services/GetMeal');
const { togglePublishMeal } = require('./Services/TogglePublish');
const { addMealValidator } = require('./Validators/MealsValidator');
const { adminRolesValidator } = require('../../../middlewares/RolesValidator')
const hpp = require('hpp');


const appRouter = require('express').Router();

appRouter.get('/', adminRolesValidator(['SeeAllMeals']), getAllMeals)
appRouter.get('/:id', adminRolesValidator(['SeeMeal']), getMeal)
appRouter.put('/:id', adminRolesValidator(['EditMeal']), hpp({ whitelist: ['description'] }), editMeal)
appRouter.put('/:id/publish-toggle', adminRolesValidator(['PublishMeal']), togglePublishMeal)
appRouter.delete('/:id', adminRolesValidator(['DeleteMeal']), deleteMeal)
appRouter.post('/', adminRolesValidator(['AddNewMeal']), addMealValidator, hpp({ whitelist: ['description'] }), addNewMeal)
appRouter.post('/json', addNewMeal);

module.exports = appRouter;  