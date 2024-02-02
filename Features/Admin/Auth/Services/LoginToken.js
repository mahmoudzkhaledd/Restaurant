const asyncHandeler = require('express-async-handler');


exports.loginTokenAdmin = asyncHandeler(async (req, res, next) => {
    const adminModel = res.locals.adminModel;
    adminModel.password = null;
    adminModel.pinNumber = null;
    return res.status(200).json({
        admin: adminModel,

    });
});

