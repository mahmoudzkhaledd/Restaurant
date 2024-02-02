const appRouter = require('express').Router();
const mealsRoutes = require('./Meals/MealsRoutes');
const orderRoutes = require('./Orders/OrdersRoutes');
const categoriesRoutes = require('./Categories/CategoriesRoutes');
appRouter.use('/meals', mealsRoutes);
appRouter.use('/orders', orderRoutes);
appRouter.use('/categories', categoriesRoutes);

module.exports = appRouter;  