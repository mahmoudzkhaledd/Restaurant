const Category = require('../../../../Models/Category');
const Config = require('../../../../Models/Configs');

exports.addCategoryToLandingPage = async (req, res, next) => {
    const { categoryId } = req.body;

    const configs = await Config.findOne({}, {
        landingPageCategories: 1,
    });
    if (configs == null) { 
        return res.status(404).json({
            msg:"عذرا حدث خطا الرجاء المحاولة مرة اخرى"
        })
    }
    if (configs.landingPageCategories.includes(categoryId)) {
        return res.status(400).json({
            msg: "تم اضافة هذه الوجبة بالفعل"
        })
    }
    if (await Category.findById(categoryId) == null) {
        return res.status(404).json({
            msg: "التصنيف غير موجود"
        })
    }
    configs.landingPageCategories.push(categoryId);
    await configs.save();
    return res.status(200).json({
        msg: 'تم اضافة الوجبة بنجاح'
    });
}
