const asyncHandeler = require('express-async-handler');

const Meal = require('../../../../Models/Meal');
const ObjectId = require('mongoose').Types.ObjectId;

exports.togglePublishMeal = asyncHandeler(
    async (req, res, next) => {

        const mealId = req.params.id;
        if (!ObjectId.isValid(mealId)) {
            return res.status(404).json({ msg: "لم نتمكن من ايجاد الوجبة" });
        }

        const meal = await Meal.findById(mealId);
        if (meal == null) {
            return res.status(404).json({ msg: "لم يتم ايجاد الوجبة" });
        }
        meal.available = !meal.available;
        await meal.save();

        res.status(200).json({ msg: meal.available ? "تم النشر بنجاح" : "تم الغاء النشر" });
    }
)  