const asyncHandeler = require('express-async-handler');
const Meal = require('../../../../Models/Meal');
const Image = require('../../../../Models/Image');
const { uploadFile } = require('../../../../services/Firebase/Storage/StorageUpload');
const crypto = require("crypto");

const ObjectId = require('mongoose').Types.ObjectId;

exports.uploadMealImage = asyncHandeler(
    async (req, res, next) => {
        const thumbnail = req.query.thumbnail == 'thumbnail';
        const mealId = req.params.id;
        if (!ObjectId.isValid(mealId)) {
            return res.status(404).json({ msg: "لم نتمكن من العثور على الوجبة" })
        }
        if (req.file == null) { 
            return res.status(404).json({ msg: "من فضلك ارفق الملف المراد رفعه" })
        }
       
        const meal = await Meal.findById(mealId);
        if(meal.thumbnailUrl != null && thumbnail){
            return res.status(404).json({ msg: "الرجاء حذف الصورة المصغرة اولا" })
        }
        if (meal == null) {
            return res.status(404).json({ msg: "لم نتمكن من العثور على الوجبة" })
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
)