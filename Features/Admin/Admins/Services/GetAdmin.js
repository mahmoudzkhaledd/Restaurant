const asyncHandeler = require('express-async-handler');
const Admin = require('../../../../Models/Admin');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getAdmin = asyncHandeler(
    async (req, res, next) => {
        const adminId = req.params.id;
        if (adminId == null || !ObjectId.isValid(adminId)) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد المستخدم." });
        }
        const admin = await Admin.findById(adminId, {
            password: 0,
            pinNumber: 0,
        });
        if (admin == null) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد المدير." });
        }


        res.status(200).json({ admin });
    }
)