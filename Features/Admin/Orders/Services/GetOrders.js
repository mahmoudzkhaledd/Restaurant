const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');
const configs = require('../../../../ServerConfigs/ServerConfigs.json');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getOrders = asyncHandeler(
    async (req, res, next) => {
        const adminModel = res.locals.adminModel;

        let page = Number(req.query.page) || 0;
        if (page < 0) page = 0;
        const userId = req.query.userId;
        const mealId = req.query.mealId;
        const search = req.query.search;
        const status = req.query.state || "";
        const responsable = req.query.responsable || "";
        const query = {};
        if (ObjectId.isValid(userId)) {
            query.userId = userId;
        }
        if (ObjectId.isValid(mealId)) {
            query["orders.mealId"] = mealId;
        }
        if (Number(search) != null && search != "") {
            query['$or'] = [
                {
                    number: Number(search) || -1,
                },
            ];
        }
        if (configs.orderStatus.includes(status)) {
            query.status = status;
        }
        if (ObjectId.isValid(search)) {
            const p = [
                {
                    _id: search,
                },
                {
                    userId: search,
                },
            ]
            if (query['$or']) {
                query['$or'].push(...p)
            } else {
                query['$or'] = p;
            }

        }
        if (responsable == 'true') {
            query.responsableAdmins = {
                $in: [adminModel._id]
            }
        }
        console.log(query);
        const count = await Order.count(query);
        const orders = await Order.find(query)
            .skip(page * configs.maxItemsPerPage).limit(configs.maxItemsPerPage)
            .populate('userId', {
                name: 1,
            });
        res.status(200).json({ orders, count });
    }
)