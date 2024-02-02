const asyncHandeler = require('express-async-handler');
const User = require('../../../Models/User');
const bcrypt = require('bcrypt');
exports.resetPassword = asyncHandeler(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    const userModel = res.locals.userModel;
    const user = userModel;
    if (user == null) {
        return res.status(404).json({ msg: "لا يمكن ايجاد المستخدم" });
    }
    const match = await bcrypt.compare(oldPassword || "", user.password);
    if (!match) {
        return res.status(404).json({ msg: "كلمة المرور القديمة غير صحيحة" });
    }
    const salt = await bcrypt.genSalt();
    const newHashed = await bcrypt.hash(newPassword, salt);
    await user.updateOne({ password: newHashed });
    res.sendStatus(200);

});