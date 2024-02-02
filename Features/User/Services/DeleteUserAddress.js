const asyncHandeler = require('express-async-handler');
const User = require('../../../Models/User');
const ObjectId = require('mongoose').Types.ObjectId;
exports.deleteAddress = asyncHandeler(async (req, res, next) => {
    const addressId = req.params.id;
    const userModel = res.locals.userModel;
    if (!ObjectId.isValid(addressId)) {
        return res.status(400).json({
            msg: 'لم نتمكن من العثور على العنوان'
        });
    }
    let found = false;
    for (const a of userModel.addresses) {
        if (a._id == addressId) {
            userModel.addresses.splice(userModel.addresses.indexOf(a), 1);
            found = true;
            break;
        }
    }
    await userModel.save();
    res.status(found  ? 200 : 400).json({ msg: found  ? "تم التعديل بنجاح" : "حدث خطأ اثناء التعديل الرجاء المحاولة مرة اخرى" });
});