const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');
const { decrement } = require('../../../../Models/Counter');
const ObjectId = require('mongoose').Types.ObjectId;

exports.deleteOrder = asyncHandeler( 
    async (req, res, next) => {

        const orderId = req.params.id;
        if (orderId == null || !ObjectId.isValid(orderId)) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد الطلب." });
        }
        const order = await Order.findByIdAndDelete(orderId);
        if (order == null) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد الطلب." });
        }
       

        await decrement('orders')
        res.status(200).json({ msg: "تم حذف الطلب بنجاح" });
    }
)