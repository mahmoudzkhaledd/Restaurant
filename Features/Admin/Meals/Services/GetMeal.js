const asyncHandeler = require('express-async-handler');

const configs = require('../../../../ServerConfigs/ServerConfigs.json');
const Meal = require('../../../../Models/Meal');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getMeal = asyncHandeler(
    async (req, res, next) => {
        let {
            sizes,
            categories,
            images,
            thumbnailUrl,
            onlyActive,
        } = req.query;
        sizes = sizes != 'false';
        categories = categories != 'false';
        images = images != 'false';
        thumbnailUrl = thumbnailUrl != 'false';
        const mealId = req.params.id;
        if (!ObjectId.isValid(mealId)) {
            return res.status(404).json({ msg: "لم نتمكن من ايجاد الوجبة" });
        }
        const populate = [];
        if (categories) {
            populate.push({
                path: 'categories',
                select: { name: 1 }
            });
        }
        if (thumbnailUrl) {
            populate.push({
                path: 'thumbnailUrl',
                select: { url: 1 }
            });
        }
        if (images) {
            populate.push({
                path: 'imagesUrl',
                select: { url: 1 }
            });
        }
        const meal = await Meal.findById(mealId, configs.meals.admins.selectMeal).populate(populate);
        if (meal == null) {
            return res.status(404).json({ msg: "لم نتمكن من ايجاد الوجبة" });
        }
        const mJson = meal.toJSON();
        if (onlyActive == 'true') {
            
            for (const s of configs.meals.sizes) {
                if (!mJson[s].active) {
                    delete mJson[s];
                }
                if (mJson[s]) {
                    delete mJson[s].active;
                }
            }
        }
        res.status(200).json({ meal: mJson });
    }
)  