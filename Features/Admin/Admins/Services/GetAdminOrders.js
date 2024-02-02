const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');
const ObjectId = require('mongoose').Types.ObjectId;
const configs = require('../../../../ServerConfigs/ServerConfigs.json');
exports.getAdminOrders = asyncHandeler(
    async (req, res, next) => {
        const adminId = req.params.id;
        let page = Number(req.query.page) || 0;
        if (page < 1) page = 1;
        if (adminId == null || !ObjectId.isValid(adminId)) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد المدير." });
        }
        const count = await Order.count({
            responsableAdmins: {
                $in: [adminId],
            }
        });
        const orders = await Order.find({
            responsableAdmins: {
                $in: [adminId],
            }
        }).skip((page - 1) * configs.maxItemsPerPage)
            .limit(configs.maxItemsPerPage).populate([
                {
                    path: 'serviceId',
                    select: { name: 1 },
                },
            ]);;


        res.status(200).json({ orders, count });
    }
)