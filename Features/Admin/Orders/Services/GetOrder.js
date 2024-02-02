const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getOrder = asyncHandeler(
    async (req, res, next) => {

        const orderId = req.params.id;
        if (orderId == null || !ObjectId.isValid(orderId)) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد الطلب." });
        }
        const order = await Order.findOne({
            _id: orderId,
        }).populate([
            {
                path: 'userId',
                select: { name: 1, address: 1, city: 1, street: 1, number: 1, },
            },
            {
                path: "orders.mealId",
                select: {
                    thumbnailUrl: 1,
                    name: 1,
                    smallSize: 1,
                    mediumSize: 1,
                    largeSize: 1,
                },
            },
            {
                path: 'responsableAdmins',
                select: { name: 1, },
            },
        ]);
        if (order == null) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد الطلب." });
        }
        await order.populate('orders.mealId.thumbnailUrl')
        const oJson = JSON.parse(JSON.stringify(order.toJSON()));

        let total = 0;
        for (const x of oJson.orders) {
            if ((x.price.afterDiscount || 0) != 0) {
                total += x.price.afterDiscount * x.mealNumber;
            } else {
                total += x.price.price * x.mealNumber;
            }
            
        }

        res.status(200).json({ order, total });
    }
)