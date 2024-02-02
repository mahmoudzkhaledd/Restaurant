const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');
const ObjectId = require('mongoose').Types.ObjectId;

exports.removeOrderItem = asyncHandeler(
    async (req, res, next) => {
        const orderId = req.params.id;
        const { removeMeal } = req.query;

        if (!ObjectId.isValid(orderId)) {
            return res.status(400).json({
                msg: "لم نتمكن من العثور على الطلب المقصود",
            });
        }
        if (!ObjectId.isValid(removeMeal)) {
            return res.status(400).json({
                msg: "لم نتمكن من العثور على العنصر المقصود",
            });
        }
        const order = await Order.findById(orderId);
        if (order == null) {
            return res.status(400).json({
                msg: "لم نتمكن من العثور على الطلب المقصود",
            });
        }
        console.log(order.orders.length);
        if (order.orders.length == 1) {
            return res.status(400).json({
                msg: "يرجى تعديل الطلب الحالي بدلا من حذفه",
            });
        }
        let found = false;
        for (let i = 0; i < order.orders.length; i++) {
            const or = order.orders[i];
            if (or._id == removeMeal) {
                order.orders.splice(i, 1);
                found = true;
                await order.save();
                break;
            }
        }
        return res.status(found ? 200 : 404).json({
            msg: found ? "تمت الازالة بنجاح" : "لم نتمكن من العثور على العنصر المطلوب"
        });
    }
)