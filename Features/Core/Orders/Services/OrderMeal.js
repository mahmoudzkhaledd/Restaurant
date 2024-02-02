const asyncHandeler = require('express-async-handler');
const Meal = require('../../../../Models/Meal');


exports.orderMeal = asyncHandeler(
    async (req, res, next) => {
        const mealId = req.params.id;
        const userModel = res.locals.userModel;
        const user = userModel;
        const meal = await Meal.findById(mealId);
        if (meal == null) {
            return res.status(400).json({ msg: "لم نتمكن من العثور على الوجبة المقصودة" });
        }
        user.cart.push({
            mealId,
            mealNumber: req.body.number,
            size: req.body.size,
            price: meal[req.body.size],
        });
        await user.save();
        res.status(200).json({ msg: "تم عمل الطلب بنجاح" });
    }
)