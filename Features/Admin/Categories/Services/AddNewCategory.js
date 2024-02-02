const asyncHandeler = require('express-async-handler');
const Category = require('../../../../Models/Category');

exports.addNewCategory = asyncHandeler(
    async (req, res, next) => {
        const adminModel = res.locals.adminModel;
        const category = await Category.create({
            ...req.body,
            adminId: adminModel._id,
        });


        res.status(200).json({ category });
    }
)  