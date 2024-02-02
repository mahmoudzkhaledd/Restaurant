const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getOrder = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const orderId = req.params.id;
        if (orderId == null || !ObjectId.isValid(orderId)) {
            return res.sendStatus(400);
        }
        const order = await Order.findOne({
            userId: userModel._id,
            _id: orderId,
        }).populate([
            {
                path: "orders.mealId",
                select: {
                    thumbnailUrl: 1,
                    name: 1,
                },
            }
        ]);
        if (order == null) {
            return res.sendStatus(400);
        }

        await order.populate('orders.mealId.thumbnailUrl');

        const oJson = JSON.parse(JSON.stringify(order.toJSON()));
        let total = 0;
        for (const x of oJson.orders) {
         
            if ((x.price.afterDiscount || 0) != 0) {
                total += x.price.afterDiscount * x.mealNumber;
            } else {
                total += x.price.price * x.mealNumber;
            }
        }


        res.status(200).json({ order: oJson, total });
    }
)