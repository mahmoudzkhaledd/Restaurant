const asyncHandeler = require('express-async-handler');
const Category = require('../../../../Models/Category');
const ObjectId = require('mongoose').Types.ObjectId;

const configs = require('../../../../ServerConfigs/ServerConfigs.json');
exports.getAllCategories = asyncHandeler(
    async (req, res, next) => {
        const get = req.query.get;
        let page = Number(req.query.page) || 0;
        if (page < 0) page = 0;
        const search = req.query.search || "";

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

        if (ObjectId.isValid(search)) {
            if (query['$or']) {
                query['$or'].push({
                    _id: search,
                })
            } else {
                query['$or'] = [{
                    _id: search,
                }]
            }

        }
        const count = await await Category.count(query);
        const categories = get != 'all' ? await Category.find(query)
            .skip((page < 0 ? 0 : page) * configs.maxItemsPerPage)
            .limit(configs.maxItemsPerPage)
            .sort('number') : await Category.find(query);
        res.status(200).json({ categories, count });
    }
)