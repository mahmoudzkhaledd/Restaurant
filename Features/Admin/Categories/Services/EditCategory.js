const asyncHandeler = require('express-async-handler');
const Category = require('../../../../Models/Category');
const ObjectId = require('mongoose').Types.ObjectId;

exports.editCategory = asyncHandeler(
    async (req, res, next) => {

        const catId = req.params.id;

        if (!ObjectId.isValid(catId)) {
            return res.status(404).json({ msg: "لم نتمكن من ايجاد الوجبة" });
        }
        const ans = await Category.updateOne({ _id: catId }, req.body);
        res.status(ans.modifiedCount == 0 ? 404 : 200)
            .json({ msg: ans.modifiedCount == 0 ? "لم نتمكن من ايجاد الوجبة" : "تم التعديل" });
    }
)  