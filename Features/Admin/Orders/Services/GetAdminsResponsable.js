const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');
const Admin = require('../../../../Models/Admin');

const ObjectId = require('mongoose').Types.ObjectId;

exports.getAdminsResponsable = asyncHandeler(
    async (req, res, next) => {

        const orderId = req.params.id;
        if (orderId == null || !ObjectId.isValid(orderId)) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد الطلب." });
        }
        const order = await Order.findOne({
            _id: orderId,
        })
        if (order == null) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد الطلب." });
        }
        const admins = await Admin.find({
            _id: {
                $nin: order.responsableAdmins,
            }
        }, { name: 1, });

        res.status(200).json({ admins });
    }
)