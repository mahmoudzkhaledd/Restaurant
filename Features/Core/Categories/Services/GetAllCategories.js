const Category = require('../../../../Models/Category');

exports.getAllCategories = async (req, res, next) => {

    const categories = await Category.find().populate('image', {
        url: 1,
    });
    return res.status(200).json({ categories });
}
