const asyncHandeler = require('express-async-handler');
const Meal = require('../../../../Models/Meal');
const Image = require('../../../../Models/Image');
const { deleteFile } = require('../../../../services/Firebase/Storage/StorageUpload');
const ObjectId = require('mongoose').Types.ObjectId;



exports.deleteImage = asyncHandeler(
    async (req, res, next) => {
        const mealId = req.params.id;
        const imageId = req.params.imageId;
        if (!ObjectId.isValid(mealId) || !ObjectId.isValid(imageId)) {
            return res.status(404).json({ msg: "لم نتمكن من العثور على الصورة المراد حذفها" });
        }
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
)