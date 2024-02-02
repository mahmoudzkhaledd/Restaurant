const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');
const ObjectId = require('mongoose').Types.ObjectId;

exports.updateOrder = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const { notes } = req.body;
        
        const orderId = req.params.id;
        if (orderId == null || !ObjectId.isValid(orderId)) {
            return res.status(400).json({ msg: "لا يمكننا ايجاد الطلب المقصودة" });
        }
        const order = await Order.findOne({
            userId: userModel._id,
            _id: orderId,
        });
        if (order == null) {
            return res.status(400).json({ msg: "لا يمكننا ايجاد الطلب المقصودة" });
        }
        order.notes = notes;
        await order.save();
        res.status(200).json({ order });
    }
)