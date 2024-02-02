const appRouter = require('express').Router();
const authRoutes = require('./Auth/AuthRoutes');
const statRouters = require('./Statistics/StatisticsRoutes');
const orderRouters = require('./Orders/OrdersRoutes');
const usersRouters = require('./Users/UsersRoute');
const adminsRoutes = require('./Admins/AdminsRoutes');
const configsRoutes = require('./Configs/ConfigsRoutes');
const categoriesRoutes = require('./Categories/CategoriesRoutes');
const mealsRoutes = require('./Meals/MealsRoutes');
const imagesRoutes = require('./Images/ImagesRoutes');


appRouter.use("/meals", mealsRoutes);
appRouter.use("/categories", categoriesRoutes);
appRouter.use("/configs", configsRoutes);
appRouter.use(authRoutes);
appRouter.use("/admins", adminsRoutes);
appRouter.use(orderRouters);
appRouter.use("/users", usersRouters);
appRouter.use("/images", imagesRoutes);
appRouter.use(statRouters);
module.exports = appRouter;   