const Meal = require('../../../../Models/Meal');
const Config = require('../../../../Models/Configs');

exports.addMealToLandingPage = async (req, res, next) => {
    const { mealId } = req.body;

    const configs = await Config.findOne({}, {
        landingPageMeals: 1,
    });
    if (configs == null) { 
        return res.status(404).json({
            msg:"عذرا حدث خطا الرجاء المحاولة مرة اخرى"
        })
    }
    if (configs.landingPageMeals.includes(mealId)) {
        return res.status(400).json({
            msg: "تم اضافة هذه الوجبة بالفعل"
        })
    }
    if (await Meal.findById(mealId) == null) {
        return res.status(404).json({
            msg: "الوجبة غير موجودة"
        })
    }
    configs.landingPageMeals.push(mealId);
    await configs.save();
    return res.status(200).json({
        msg: 'تم اضافة الوجبة بنجاح'
    });
}
