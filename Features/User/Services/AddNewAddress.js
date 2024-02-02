const asyncHandeler = require('express-async-handler');
const User = require('../../../Models/User');

exports.addNewAddress = asyncHandeler(async (req, res, next) => {
    const { address, street, city, } = req.body;
    const userModel = res.locals.userModel;
    if (userModel.addresses?.length > 4) {
        return res.status(400).json({ msg: "تعديت الحد الأقصى لعدد العناوين المسموح به" });
    }
    const ans = await userModel.updateOne({
        $push: {
            addresses: { address, street, city, },
        },
    });
    res.status(ans.modifiedCount != 0 ? 200 : 400).json({ msg: ans.modifiedCount != 0 ? "تم التعديل بنجاح" : "حدث خطأ اثناء التعديل الرجاء المحاولة مرة اخرى" });
});