const asyncHandeler = require('express-async-handler');
const Category = require('../../../../Models/Category');
const Meal = require('../../../../Models/Meal');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getCategory = asyncHandeler(
    async (req, res, next) => {

        const catId = req.params.id;
        if (!ObjectId.isValid(catId)) {
            return res.status(404).json({
                msg:"لم نتمكن من العثور على هذا التصنيف"
            });
        }
        const category = await Category.findById(catId).populate([
            {
                path: 'meals', select: { name: 1, }
            },
            {
                path: 'image'
            },
        ]);
        if (category == null) {
            return res.status(404).json({
                msg:"لم نتمكن من العثور على هذا التصنيف"
            });
        }

        res.status(200).json({ category });
    }
)  