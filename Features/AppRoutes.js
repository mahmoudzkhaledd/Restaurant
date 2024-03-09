const appRoute = require('express').Router();
const authRoutes = require('./Auth/AuthRoutes');
const coreRoutes = require('./Core/CoreRoutes');
const adminRoutes = require('./Admin/AdminRoutes');
const userRoutes = require('./User/UserRoutes');
const { userValidatorMiddleware } = require('../middlewares/UserValidatorMiddleware');
const { adminValidatorMiddleware } = require('../middlewares/AdminValidator');
const { configsValidator } = require('../middlewares/ConfigsMiddleware');
const configsRouter = require('./Configs/ConfigsRouter')

appRoute.post('/payment', (req, res) => {
    const params = req.params;
    const query = req.query;
    const body = req.body;
    console.log(params);
    console.log(query);
    console.log(body);
    res.sendStatus(200);
})
appRoute.use("/admin", adminValidatorMiddleware, adminRoutes);

appRoute.use('/configs', configsRouter);
appRoute.use(configsValidator);
appRoute.use(userValidatorMiddleware);
appRoute.use(userRoutes);
appRoute.use(coreRoutes);
appRoute.use(authRoutes);
appRoute.all('*', (req, res) => {
    res.status(404).json({ msg: "Can't find this route" });
});

module.exports = appRoute;