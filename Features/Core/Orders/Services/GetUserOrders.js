const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');
const configs = require('../../../../ServerConfigs/ServerConfigs.json');

exports.getUserOrders = asyncHandeler(
    async (req, res, next) => {
        let page = req.query.page || 0;
        if (page < 0) page = 0;
        const userModel = res.locals.userModel;
        const count = await Order.count({ userId: userModel._id, });
        const orders = await Order.find({
            userId: userModel._id,
        }).skip(page * configs.maxItemsPerPage).limit(configs.maxItemsPerPage);
        res.status(200).json({ orders, count });
    }
)