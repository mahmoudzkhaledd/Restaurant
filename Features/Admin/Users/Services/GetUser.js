const asyncHandeler = require('express-async-handler');
const User = require('../../../../Models/User');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getUser = asyncHandeler(
    async (req, res, next) => {
        const userId = req.params.id;
        if (userId == null || !ObjectId.isValid(userId)) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد المستخدم." });
        }
        const user = await User.findById(userId, {
            password: 0,
        }).populate('cart.mealId');
        if (user == null) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد المستخدم." });
        }


        res.status(200).json({ user });
    }
)