const asyncHandeler = require('express-async-handler');
const Meal = require('../../../../Models/Meal');
const Category = require('../../../../Models/Category');
const Image = require('../../../../Models/Image');
const { deleteFile } = require('../../../../services/Firebase/Storage/StorageUpload');
const ObjectId = require('mongoose').Types.ObjectId;

async function deletForMeal(req, res, next) {
    const { mealId } = req.query;
    const imageId = req.params.id;
    const meal = await Meal.findById(mealId);
    if (meal == null || (meal.thumbnailUrl != imageId && !meal.imagesUrl.includes(imageId))) {
        return res.status(404).json({ msg: "هذه الوجبة لا تحتوي على الصورة المراد حذفها" });
    }

    const image = await Image.findOne({
        _id: imageId,
    });

    if (image == null) return res.status(404).json({ msg: "لم نتمكن من العثور على الصورة المراد حذفها" });

    try {
        const del = await deleteFile(image.url);
        if (!del) return res.status(404).json({ msg: "حدث مشكلة اثناء حذف الصورة الرجاء اعادة المحاولة" });
        await image.deleteOne();
        const idx = meal.imagesUrl.indexOf(imageId);
        if (image.type == 'thumbnail') {
            meal.thumbnailUrl = null;
        } else if (idx != -1) {
            meal.imagesUrl.splice(idx, 1);
        }
        await meal.save();
    } catch (ex) {
        return res.status(404).json({ msg: ex.message });
    }
    return res.status(200).json({ msg: "تم حذف الصورة بنجاح" });
}
async function deletForCategory(req, res, next) {
    const { categoryId } = req.query;
    const imageId = req.params.id;
    const category = await Category.findById(categoryId);
    if (category == null) {
        return res.status(404).json({ msg: "لم نتمكن من العثور على التصنيف المراد حذفه" });
    }
    if (category.image != imageId) {
        return res.status(404).json({ msg: "هذه الوجبة لا تحتوي على الصورة المراد حذفها" });
    }

    const image = await Image.findOne({
        _id: imageId,
    });

    if (image == null) return res.status(404).json({ msg: "لم نتمكن من العثور على الصورة المراد حذفها" });

    try {
        const del = await deleteFile(image.url);
        if (!del) return res.status(404).json({ msg: "حدث مشكلة اثناء حذف الصورة الرجاء اعادة المحاولة" });
        await image.deleteOne();
        category.image = null;
        await category.save();
    } catch (ex) {
        return res.status(404).json({ msg: ex.message });
    }
    return res.status(200).json({ msg: "تم حذف الصورة بنجاح" });
}

exports.deleteImage = asyncHandeler(
    async (req, res, next) => {
        const { mealId, categoryId } = req.query;
        const imageId = req.params.id;
        if (!ObjectId.isValid(imageId)) {
            return res.status(404).json({ msg: "لم نتمكن من العثور على الصورة المراد حذفها" });
        }
        if (ObjectId.isValid(mealId)) {
            return deletForMeal(req, res, next);
        }
        if (ObjectId.isValid(categoryId)) {
            return deletForCategory(req, res, next);
        }
        return res.sendStatus(400);
    }
)