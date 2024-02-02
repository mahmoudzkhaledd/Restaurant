const asyncHandeler = require('express-async-handler');
const Admin = require('../../../../Models/Admin');
const ObjectId = require('mongoose').Types.ObjectId;

exports.changeAdminPassword = asyncHandeler(
    async (req, res, next) => {
        const adminModel = res.locals.adminModel;

        const adminId = req.params.id;
        if (!ObjectId.isValid(adminId)) {
            return res.status(404).json({ msg: "لم نتمكن من العثور على المدير المطلوب" });
        }
        const { password, pinNumber } = req.body;

        const admin = adminId != adminModel._id ? await Admin.findById(adminId) : adminModel;
        if (admin == null) {
            return res.status(404).json({ msg: "لم نتمكن من العثور على المدير" });
        }
        if (!adminModel.master && admin.master) {
            return res.status(403).json({ msg: "لا يمكنك تغيير كلمة مرور الحساب الرئيسي" });
        }
        if (password != null) {
            admin.password = password;
        }
        if (pinNumber != null) {
            admin.pinNumber = pinNumber;
        }
        await admin.save();
        return res.status(200).json({ msg: "تم التغيير بنجاح" });
    }
)