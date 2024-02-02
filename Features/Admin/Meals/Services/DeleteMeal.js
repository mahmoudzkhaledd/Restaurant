const asyncHandeler = require('express-async-handler');

const Meal = require('../../../../Models/Meal');
const Order = require('../../../../Models/Order');
const Image = require('../../../../Models/Image');
const Category = require('../../../../Models/Category');
const User = require('../../../../Models/User');
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


exports.deleteMeal = asyncHandeler(
    async (req, res, next) => {

        const mealId = req.params.id;
        if (!ObjectId.isValid(mealId)) {
            return res.status(404).json({ msg: "لم نتمكن من ايجاد الوجبة" });
        }

        const cart = await User.findOne({
            "cart.mealId": mealId,
        });
        if (cart != null) {
            return res.status(400).json({ msg: "هناك مستخدمين لديهم هذه الوجبة في عربة التسوق" });
        }
        const order = await Order.findOne({
            "orders.mealId": mealId,
        });
        if (order != null) {
            return res.status(400).json({ msg: "هناك طلبات قائمة تعتمد على هذه الوجبة" });
        }
        const meal = await Meal.findById(mealId);
        if (meal == null) {
            return res.status(404).json({ msg: "لم نتمكن من ايجاد الوجبة" });
        }

        const deleteThumb = await deletImage(meal.thumbnailUrl);
        if (!deleteThumb) return res.status(400).json({ msg: "حدث خطأ اثناء حذف الصورة المصغرة الخاصة بالوجبة" });
        for (const x of meal.imagesUrl) {
            const del = await deletImage(x);
            if (!del) {
                return res.status(400).json({ msg: "حدث خطأ اثناء حذف الصور الخاصة بالوجبة" });
            }
        }
        for (const x of meal.categories) {
            await Category.updateOne({ _id: x }, {
                $pull: {
                    meals: meal._id,
                }
            });
        }
        const ans = await meal.deleteOne();
        return res.status(200).json({ msg: "تم حذف الوجبة بنجاح" })

    }
)  