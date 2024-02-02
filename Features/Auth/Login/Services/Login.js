const asyncHandeler = require('express-async-handler');
const User = require('../../../../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Configs = require('../../../../Models/Configs');

exports.loginUser = asyncHandeler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });


    if (user == null) return res.status(401).json({ msg: 'يرجى التحقق من الايميل او الباسورد الخاص بك' });
    if (user.banned) return res.status(403).json({ msg: "تم حظر الحساب الخاص بك" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401)
        .json({ msg: 'يرجى التحقق من الايميل او الباسورد الخاص بك' });
    user.password = null;
    const tokenModel = {
        "id": user._id,
        "verifiedEmail": user.verifiedEmail,
    };
    const token = await jwt.sign(tokenModel, process.env.ACCESS_TOKEN_KEY);

    return res.status(200).json({
        user,
        token,
    });
});

