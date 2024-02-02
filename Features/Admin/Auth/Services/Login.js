const asyncHandeler = require('express-async-handler');
const Admin = require('../../../../Models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginAdmin = asyncHandeler(async (req, res, next) => {
    const { username, password, pinNumber } = req.body;
    const admin = await Admin.findOne({ username: username || "" });


    if (admin == null)
        return res.status(401).json({ msg: "الرجاء التحقق من الايميل او الباسورد" });

    const match = (await bcrypt.compare(password || "", admin.password) && await bcrypt.compare(pinNumber || "", admin.pinNumber));
    if (!match) return res.status(401).json({ msg: "الرجاء التحقق من الايميل او الباسورد" });
    if (admin.suspended) return res.sendStatus(402);
    admin.password = null;
    admin.pinNumber = null;

    const tokenModel = {
        "id": admin._id,
        "admin": true,
        "key": process.env.ADMINKEY,
    };
    const a_token = await jwt.sign(tokenModel, process.env.ADMIN_ACCESS_TOKEN_KEY);
    
    return res.status(200).json({
        admin: admin,
        a_token: a_token,
    });
});

