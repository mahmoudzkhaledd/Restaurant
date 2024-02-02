const asyncHandeler = require('express-async-handler');
const Category = require('../../../../Models/Category');
const Image = require('../../../../Models/Image');
const { deleteFile } = require('../../../../services/Firebase/Storage/StorageUpload');
const ObjectId = require('mongoose').Types.ObjectId;
const deletImage = async (imageId) => {
    if (!imageId) return true;
    const image = await Image.findOne({
        _id: imageId,
    });
    if (image == null) return false;
    try {
        const del = await deleteFile(image.url);
        if (!del) return false;
        await image.deleteOne();
    } catch (ex) {
        return false;
    }
    return true;
} 
exports.deleteCategory = asyncHandeler(
    async (req, res, next) => {

        const catId = req.params.id;
        if (!ObjectId.isValid(catId)) {
            return res.status(404).json({ msg: "لم نتمكن من العثور على هذا التصنيف" });
        }

        const category = await Category.findById(catId);

        if (category == null) {
            return res.status(404).json({ msg: "لم نتمكن من العثور على هذا التصنيف" });
        }
        if (category.meals.length != 0) {
            return res.status(500).json({ msg: "يحتوي هذا التصنيف على وجبات" })
        }
        const deleteThumb = await deletImage(category.image);
        if (!deleteThumb) { 
            return res.status(400).json({
                msg:'حدثت مشكلة اثناء حذف الصروة الرجاء اعادة المحاولة'
            });
        }
        const deleted = await category.deleteOne();
        res.sendStatus(200);
    }
)  