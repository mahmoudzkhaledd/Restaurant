const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');
const ObjectId = require('mongoose').Types.ObjectId;

exports.addResponsableAdmin = asyncHandeler(
    async (req, res, next) => {
        const { adminId } = req.body;
        if (adminId == null || !ObjectId.isValid(adminId)) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد المدير." });
        }
        const orderId = req.params.id;
        if (orderId == null || !ObjectId.isValid(orderId)) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد الطلب." });
        }
        const order = await Order.findById(orderId);
        if (order == null) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد الطلب." });
        }
        if (order.responsableAdmins.includes(adminId)) { 
            return res.status(400).json({ msg: "هذا المدير مسؤول عن الطلب بالفعل" });
        }
        order.responsableAdmins.push(adminId);
        await order.save();
        res.status(200).json({ msg: "تم اضافة المدير بنجاح" });
    }
)