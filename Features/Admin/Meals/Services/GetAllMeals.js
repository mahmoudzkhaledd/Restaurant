const asyncHandeler = require('express-async-handler');
const Meal = require('../../../../Models/Meal');
const configs = require('../../../../ServerConfigs/ServerConfigs.json');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getAllMeals = asyncHandeler(
    async (req, res, next) => {
        const adminModel = res.locals.adminModel;

        let page = Number(req.query.page) || 0;
        if (page < 0) page = 0;
        const search = req.query.search;
        const status = req.query.state;
        const regex = new RegExp(`^${search}`, 'i');
        const query = {
            $or: [
                {
                    name: {
                        $regex: regex,
                    },
                },
                {
                    number: Number(search) || -1,
                }
            ],
        };
        if (status != null && status == "available" || status == "unavailable") {
            query.available = (status == 'available');
        }
        if (ObjectId.isValid(search)) {
            if (query['$or']) {
                query['$or'].push({
                    _id: search,
                },)
            } else {
                query['$or'] = {
                    _id: search,
                };
            }
        }

        const count = await Meal.count(query);
        const meals = await Meal.find(query, configs.meals.admins.seletAllMeals)
            .skip(page * configs.maxItemsPerPage).limit(configs.maxItemsPerPage);
        res.status(200).json({ meals, count });
    }
)