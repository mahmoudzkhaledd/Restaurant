const asyncHandeler = require('express-async-handler');
const User = require('../../../Models/User');

exports.changeAccountSettings = asyncHandeler(async (req, res, next) => {
    const { phone } = req.body;
    const userModel = res.locals.userModel;

    const ans = await userModel.updateOne({ phone });
    res.status(ans.modifiedCount != 0 ? 200 : 400).json({ msg: ans.modifiedCount != 0 ? "تم التعديل بنجاح" : "حدث خطأ اثناء التعديل الرجاء المحاولة مرة اخرى" });
});