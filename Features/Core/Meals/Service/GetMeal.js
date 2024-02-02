const asyncHandeler = require('express-async-handler');
const Meal = require('../../../../Models/Meal');
const ObjectId = require('mongoose').Types.ObjectId;

const configs = require('../../../../ServerConfigs/ServerConfigs.json');
exports.getMeal = asyncHandeler(
    async (req, res, next) => {
        const mealId = req.params.id;
        if (mealId == null || !ObjectId.isValid(mealId)) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد الوجبة" });
        }
        const meal = await Meal.findOne(
            { _id: mealId, available: true, },
            configs.meals.users.selectMeal,
        ).populate([
            {
                path: "thumbnailUrl",
                select: { url: 1 },
            },
            {
                path: "categories",
            },
            {
                path: "imagesUrl",
            },
        ]);
        if (meal == null) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد الوجبة" });
        }
        const mJson = meal.toJSON();
        for (const s of configs.meals.sizes) {
            if (!mJson[s].active) {
                delete mJson[s];
            }
            if (mJson[s]) {
                delete mJson[s].active;
            }
        }
        res.status(200).json({ meal: mJson });
    }
)