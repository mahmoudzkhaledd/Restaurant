const asyncHandeler = require('express-async-handler');
const User = require('../../../../Models/User');
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken');

exports.enterUserAccount = asyncHandeler(
    async (req, res, next) => {
        const userId = req.params.id;
        if (userId == null || !ObjectId.isValid(userId)) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد المستخدم." });
        }
        const user = await User.findById(userId);
        if (user == null) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد المستخدم." });
        }
        const tokenModel = {
            "id": user._id,
            "verifiedEmail": user.verifiedEmail,
            "admin": true,
        };
        const token = await jwt.sign(tokenModel, process.env.ACCESS_TOKEN_KEY);
        res.status(200).json({ token });
    }
)