const asyncHandeler = require('express-async-handler');
const Meal = require('../../../../Models/Meal');
const Image = require('../../../../Models/Image');
const Category = require('../../../../Models/Category');
const { uploadFile } = require('../../../../services/Firebase/Storage/StorageUpload');
const crypto = require("crypto");

const ObjectId = require('mongoose').Types.ObjectId;

async function uploadImageMeal(req, res, next) {
    const thumbnail = req.query.thumbnail == 'thumbnail';
    const { mealId } = req.query;
    const meal = await Meal.findById(mealId);
    if (meal == null) {
        return res.status(404).json({ msg: "لم نتمكن من العثور على الوجبة" })
    }
    if (meal.thumbnailUrl != null && thumbnail) {
        return res.status(404).json({ msg: "الرجاء حذف الصورة المصغرة اولا" })
    }

    const fileData = {
        path: `/meals/${meal._id}${thumbnail ? "" : "/photos"}`,
        name: thumbnail ? 'thumbnail' : crypto.randomBytes(16).toString("hex"),
        url: null,
    };
    const url = await uploadFile(req.file, fileData.path, fileData.name);
    if (url == null) {
        return res.status(404).json({ msg: "حدث خطأ أثناء رفع الصورة الرجاء اعادة المحاولة" })
    }
    fileData.url = url;
    const image = await Image.create({
        ...fileData,
        type: thumbnail ? "thumbnail" : "image",
        adminId: res.locals.adminModel._id,
    });
    await meal.updateOne(thumbnail ? { thumbnailUrl: image._id } : { $push: { imagesUrl: image._id } });
    return res.sendStatus(200);
}
async function uploadImageCategory(req, res, next) {
    const { categoryId } = req.query;
    const category = await Category.findById(categoryId);
    if (category == null) {
        return res.status(404).json({ msg: "لم نتمكن من العثور على الوجبة" })
    }
    if (category.image != null) {
        return res.status(404).json({ msg: "الرجاء حذف الصورة المصغرة اولا" })
    }

    const fileData = {
        path: `/categories/${category._id}`,
        name: 'thumbnail',
        url: null,
    };
    const url = await uploadFile(req.file, fileData.path, fileData.name);
    if (url == null) {
        return res.status(404).json({ msg: "حدث خطأ أثناء رفع الصورة الرجاء اعادة المحاولة" })
    }
    fileData.url = url;
    const image = await Image.create({
        ...fileData,
        type: "thumbnail",
        adminId: res.locals.adminModel._id,
    });
    await category.updateOne({ image: image._id });
    return res.sendStatus(200);
}



exports.uploadImage = asyncHandeler(
    async (req, res, next) => {
        console.log('from upload');
        const { mealId, categoryId } = req.query;
        if (!ObjectId.isValid(mealId) && !ObjectId.isValid(categoryId)) {
            return res.status(404).json({ msg: "لم نتمكن من العثور على العنصر المطلوب" })
        }
        if (req.file == null) {
            return res.status(404).json({ msg: "من فضلك ارفق الملف المراد رفعه" })
        }
        if (ObjectId.isValid(mealId)) {
            return uploadImageMeal(req, res, next);
        }
        if (ObjectId.isValid(categoryId)) {
            return uploadImageCategory(req, res, next);
        }
        return res.sendStatus(400);
    }
)