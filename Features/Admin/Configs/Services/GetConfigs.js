const asyncHandeler = require('express-async-handler');
const Configs = require('../../../../Models/Configs');

exports.getConfigs = asyncHandeler(async (req, res, next) => {
    const config = await Configs.findOne().populate([
        {
            path: 'landingPageMeals',
            select: {
                name: 1,
                _id: 1,
            },
        },
        {
            path: 'landingPageCategories',
            select: {
                name: 1,
                _id: 1,
            },
        },
    ]);
    res.json({ configs: config });
});