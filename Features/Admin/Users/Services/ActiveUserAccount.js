const asyncHandeler = require('express-async-handler');
const User = require('../../../../Models/User');
const VerificationEmail = require('../../../../Models/VerificationEmail');

const ObjectId = require('mongoose').Types.ObjectId;

exports.activeUserAccount = asyncHandeler(
    async (req, res, next) => {
        const userId = req.params.id;
        if (userId == null || !ObjectId.isValid(userId)) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد المستخدم." });
        }
        const user = await User.findById(userId);
        if (user == null) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد المستخدم." });
        }
        user.verifiedEmail = !user.verifiedEmail;
        if (user.verifiedEmail) {
            await VerificationEmail.deleteOne({ userTo: user._id });
        }
        await user.save();
        res.status(200).json({ user });
    }
)