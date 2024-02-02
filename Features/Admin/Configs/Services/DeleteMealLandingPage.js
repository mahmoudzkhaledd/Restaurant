const Config = require('../../../../Models/Configs');

exports.deleteMealLandingPage = async (req, res, next) => {
    const configs = await Config.findOne({}, {
        landingPageMeals: 1,
    });
    if (configs == null) { 
        return res.status(404).json({
            msg: "لم يتم ايجاد الوجبة الرجاء المحاولة مرة اخرى"
        });
    }
    const idx = configs.landingPageMeals.indexOf(req.query.mealId || "asd");
    if (idx == -1) {
        return res.status(404).json({
            msg: "لم يتم ايجاد الوجبة الرجاء المحاولة مرة اخرى"
        });
    }
    configs.landingPageMeals.splice(idx, 1);
    await configs.save();
    return res.status(200).json({
        msg: "تم ازالة الوجبة بنجاح"
    });
}
