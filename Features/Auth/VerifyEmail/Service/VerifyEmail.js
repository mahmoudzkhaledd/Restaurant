const ApiError = require('../../../../Error_Handeler/ApiError');
const EmailVerification = require('../../../../Models/VerificationEmail');
const bcrypt = require('bcrypt');
const User = require('../../../../Models/User');
const jwt = require('jsonwebtoken');
const asyncHandeler = require('express-async-handler');

exports.verifyEmail = asyncHandeler(async (req, res, next) => {
    const { code } = req.body;
    const userModel = res.locals.userModel;
    const userTo = userModel;
    if (userTo == null) {
        await EmailVerification.deleteOne({ userTo: userModel._id, });
        return next(new ApiError('المستخدم غير مسجل', 404));
    }
    if (userTo.verifiedEmail == true) {
        await EmailVerification.deleteOne({ userTo: userTo._id, });
        userTo.verifiedEmail = true;

        const token = jwt.sign({
            "id": userTo._id,
            "verifiedEmail": userTo.verifiedEmail,
        }, process.env.ACCESS_TOKEN_KEY);
        return res.status(200).json({
            user: userTo,
            token,
        });
    }
    const email = await EmailVerification.findOne({ userTo: userTo._id, });
    if (email == null) {
        return next(new ApiError('الرجاء ارسال رسالة التفعيل مرة اخرى', 406));
    }
    const match = await bcrypt.compare(`${code}`, email.code);
    if (!match) {
        email.mistakeTrails--;
        if (email.mistakeTrails == 0) {
            await userTo.deleteOne();
            await email.deleteOne();
            return next(new ApiError(`لقد قمت باستخدام جميع المحاولات المتاحة، وتم حذف البريد الإلكتروني.`, 420));
        } else {
            await email.save();
            return res.status(409).json({
                msg: `لديك ${email.mistakeTrails} محاولات اضافية وسيتم حذف حسابك!`,
                trails: email.mistakeTrails,
            });
        }
    }
    await email.deleteOne({});

    userTo.verifiedEmail = true;
    await userTo.save();
    const token = jwt.sign({
        "id": userTo._id,
        "verifiedEmail": userTo.verifiedEmail
    }, process.env.ACCESS_TOKEN_KEY);
    return res.status(200).json({
        user: userTo,
        token,
    });
})