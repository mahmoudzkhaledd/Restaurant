
const ObjectId = require('mongoose').Types.ObjectId;
const asyncHandeler = require('express-async-handler');
exports.removeCartItem = asyncHandeler(
    async (req, res, next) => {
        const itemId = req.params.id;
        if (!ObjectId.isValid(itemId)) {
            return res.status(404).json({ msg: "لم نتمكن من ايجاد العنصر" });
        }
        const userModel = res.locals.userModel;
        let found = false;
        for (let i = 0; i < userModel.cart.length; i++) {
            if (userModel.cart[i]._id == itemId) {
                userModel.cart.splice(i, 1);
                found = true;
                break
            }
        }
        if (found) {
            await userModel.save();
        }
        res.status(found ? 200 : 404).json({ msg: found ? "تم الحذف بنجاح" : "لم نتمكن من ايجاد العنصر" });
    }
)