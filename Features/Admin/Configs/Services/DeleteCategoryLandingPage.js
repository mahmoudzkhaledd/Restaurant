const Config = require('../../../../Models/Configs');

exports.deleteCategoryLandingPage = async (req, res, next) => {
    const configs = await Config.findOne({}, {
        landingPageCategories: 1,
    });
    if (configs == null) { 
        return res.status(404).json({
            msg: "لم يتم ايجاد الوجبة الرجاء المحاولة مرة اخرى"
        });
    }
    const idx = configs.landingPageCategories.indexOf(req.query.categoryId || "asd");
    if (idx == -1) {
        return res.status(404).json({
            msg: "لم يتم ايجاد التصنيف الرجاء المحاولة مرة اخرى"
        });
    }
    configs.landingPageCategories.splice(idx, 1);
    await configs.save();
    return res.status(200).json({
        msg: "تم ازالة التصنيف بنجاح"
    });
}
