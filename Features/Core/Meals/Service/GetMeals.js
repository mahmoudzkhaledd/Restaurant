const asyncHandeler = require('express-async-handler');
const Meal = require('../../../../Models/Meal');
const ObjectId = require('mongoose').Types.ObjectId;
const configs = require('../../../../ServerConfigs/ServerConfigs.json');
const { getMealPrice } = require('../../../../Utils/Helper');
exports.getMeals = asyncHandeler(
    async (req, res, next) => {
        let page = req.query.page || 0;
        if (page < 0) page = 0;
        const search = req.query.search || "";
        const categories = (req.query.categories == "" ? null : req.query.categories)?.split(',') || [];

        const regex = new RegExp(`^${search}`, 'i');

        const query = {
            name: {
                $regex: regex,
            },
            available: true,

        };
        const cats = [];
            for (const c of categories) {
                if (ObjectId.isValid(c)) { 
                    cats.push(c);
                }
            }
        if (cats.length > 0) {
            query.categories = {
                $in: cats,
            };
        }
        const count = await Meal.count(query);
        const meals = await Meal.find(query, configs.meals.users.seletAllMeals)
            .skip(page * configs.maxItemsPerPage).limit(configs.maxItemsPerPage)
            .populate([
                {
                    path: 'thumbnailUrl',
                    select: { _id: 1, url: 1 },
                },

            ]);
        const arr = JSON.parse(JSON.stringify(meals));
        for (const meal of arr) {
            getMealPrice(meal)
        }

        res.status(200).json({ meals: arr, count });
    }
)