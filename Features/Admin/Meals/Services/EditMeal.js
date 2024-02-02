const asyncHandeler = require('express-async-handler');
const Meal = require('../../../../Models/Meal');
const Category = require('../../../../Models/Category');


const ObjectId = require('mongoose').Types.ObjectId;

exports.editMeal = asyncHandeler(
    async (req, res, next) => {
        const mealId = req.params.id;
        const { categories } = req.body;

        req.body.smallSize.active = req.body.smallSize.active || false;
        req.body.mediumSize.active = req.body.mediumSize.active || false;
        req.body.largeSize.active = req.body.largeSize.active || false;
        const meal = await Meal.findById(mealId);

        if (meal == null) {
            return res.status(404).json({ msg: "لم نتمكن من ايجاد الوجبة" })
        }
        for (const cat of meal.categories) {
            if (ObjectId.isValid(cat)) {
                await Category.updateOne({ _id: cat }, {
                    $pull: {
                        meals: meal._id,
                    },
                });
            }
        }

        for (const cat of categories) {
            if (ObjectId.isValid(cat)) {
                await Category.updateOne({ _id: cat }, {
                    $push: {
                        meals: meal._id,
                    },
                });
            }
        }
        await meal.updateOne(req.body);
        res.status(200).json({ meal, msg: "تم التعديل بنجاح" });
    }
)