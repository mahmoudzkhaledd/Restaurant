const asyncHandeler = require('express-async-handler');
const ObjectId = require('mongoose').Types.ObjectId;
const Order = require('../../../../Models/Order');


exports.makeCartOrder = asyncHandeler(
    async (req, res, next) => {
        const user = res.locals.userModel;
        const { address } = req.body;
        if (user.cart.length == 0) {
            return res.status(400).json({ msg: "يجب وضع وجبات في العربة أولا" });
        }
        if (user.addresses.length == 0 || !ObjectId.isValid(address)) {
            return res.status(400).json({ msg: "يجب تحديث بيانات عنوانك أولا" });
        }
        let userAddress = null;
        for (const x of user.addresses) {
            if (x._id == address) {
                userAddress = x;
                break;
            }
        }
        if (userAddress == null) {
            return res.status(400).json({ msg: "يجب ادخال عنوان صحيح والمحاولة مرة اخرى" });
        }
        const order = await Order.create({
            userId: user._id,
            orders: user.cart,
            address: userAddress,
        });
        user.cart = [];
        await user.save();
        res.status(200).json({ msg: "تم عمل الطلب بنجاح", order });
    }
)