const Order = require('../../../../Models/Order');
const { decrement, increment } = require('../../../../Models/Counter');
const ObjectId = require('mongoose').Types.ObjectId;
const asyncHandeler = require('express-async-handler');
exports.cancelOrder = asyncHandeler(
    async (req, res, next) => {
        const orderId = req.params.id;
        const userModel = res.locals.userModel;



        if (orderId == null || !ObjectId.isValid(orderId)) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد الطلب." });
        }
        const order = await Order.findOne({
            _id: orderId,
            userId: userModel._id,
        },);
        if (order == null) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد الطلب." });
        }
        
        await order.save();
        res.status(200).json({msg:"تمت العملية بنجاح"});
    }
)