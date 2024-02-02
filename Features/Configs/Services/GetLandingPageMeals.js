const Config = require('../../../Models/Configs');
const serverConfigs = require('../../../ServerConfigs/ServerConfigs.json');
const { getMealPrice } = require('../../../Utils/Helper');

exports.getLandingPageMeals = async (req, res, next) => {
    const configs = await Config.findOne({}, {
        landingPageMeals: 1,
        landingPageCategories: 1,
    }).populate([
        {
            path: 'landingPageMeals',
            select: serverConfigs.meals.users.seletAllMeals,
        },
        {
            path: 'landingPageCategories',
            select: serverConfigs.categories.users.getAllCategories,
        },
    ]);
    await configs.populate([
        {
            path: "landingPageMeals.thumbnailUrl",
        },
        {
            path: "landingPageCategories.image",
        },
    ])
    const meals = JSON.parse(JSON.stringify(configs.landingPageMeals));
    for (const meal of meals) {
        getMealPrice(meal)
    }
    return res.status(200).json({ meals: meals, categories: configs.landingPageCategories });
}
