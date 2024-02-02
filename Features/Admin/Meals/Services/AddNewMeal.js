const asyncHandeler = require('express-async-handler');
const Meal = require('../../../../Models/Meal');
const Category = require('../../../../Models/Category');


const ObjectId = require('mongoose').Types.ObjectId;

exports.addNewMeal = asyncHandeler(
    async (req, res, next) => {
        delete req.body.active;
        if (req.body.json != null) {
            console.log('object');
            for (const x of req.body.json) {
                const adminModel = res.locals.adminModel;
                const { categories } = x;
                const ids = [];
                for (const catStr of categories) {
                    let cat = await Category.findOne({ name: catStr });
                    if (cat == null) {
                        cat = await Category.create({
                            name: catStr,
                            description: catStr,
                            adminId: adminModel._id,
                        })
                    }
                    ids.push(cat._id);
                }
                x.categories = ids;
                const meal = await Meal.create({
                    ...x,
                    adminId: adminModel._id,
                    available: true,
                });
                for (const cat of ids) {
                    if (ObjectId.isValid(cat)) {
                        await Category.updateOne({ _id: cat }, {
                            $push: {
                                meals: meal._id,
                            },
                        });
                    }
                }
            }
            return res.status(200).json({ msg: "تم اضافة الوجبة بنجاح" });
        }
        const adminModel = res.locals.adminModel;
        const { categories } = req.body;
        const meal = await Meal.create({
            ...req.body,
            adminId: adminModel._id,
        });
        for (const cat of categories) {
            if (ObjectId.isValid(cat)) {
                await Category.updateOne({ _id: cat }, {
                    $push: {
                        meals: meal._id,
                    },
                });
            }
        }
        res.status(200).json({ meal, msg: "تم اضافة الوجبة بنجاح" });
    }
)