const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');
const Meal = require('../../../../Models/Meal');
const ObjectId = require('mongoose').Types.ObjectId;

exports.editOrder = asyncHandeler(
    async (req, res, next) => {
        const orderId = req.params.id;
        const { item } = req.body;

        if (!ObjectId.isValid(orderId)) {
            return res.status(400).json({
                msg: "لم نتمكن من العثور على الطلب المقصود",
            });
        }

        const order = await Order.findById(orderId);
        if (order == null) {
            return res.status(400).json({
                msg: "لم نتمكن من العثور على الطلب المقصود",
            });
        }

        let toEditItemIndex = null;
        for (let i = 0; i < order.orders.length; i++) {
            const or = order.orders[i];
            if (or._id == item._id) {
                toEditItemIndex = i;
                break;
            }
        }
        const meal = await Meal.findById(item.mealId);
        if (meal == null) {
            return res.status(404).json({
                msg: "لم يتم العثور على الوجبة"
            });
        }
        if (!meal[item.size]?.active) {
            return res.status(404).json({
                msg: "سعر الوجبة غير متاح الان"
            });
        }
        item.price = meal[item.size];
        if (item._id) {
            order.orders[toEditItemIndex] = item;
        } else { 
            order.orders.push(item);
        }
        await order.save();
        return res.status(200).json({
            msg: "تم التعديل بنجاح"
        });
       
    }
)