const asyncHandeler = require('express-async-handler');
const Admin = require('../../../../Models/Admin');
const ObjectId = require('mongoose').Types.ObjectId;

exports.suspendAdmin = asyncHandeler(
    async (req, res, next) => {
        const adminId = req.params.id;
        if (adminId == null || !ObjectId.isValid(adminId)) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد المدير." });
        }
        const admin = await Admin.findById(adminId);
        if (admin == null) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد المدير." });
        }
        if(admin.master){
            return res.status(400).json({ msg: "لا يمكن ايقاف الحساب الاساسي" });
        }
        admin.suspended = !admin.suspended;
        await admin.save();
        res.status(200).json({ admin });
    }
)