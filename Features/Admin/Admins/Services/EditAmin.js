const asyncHandeler = require('express-async-handler');
const Admin = require('../../../../Models/Admin');
const ObjectId = require('mongoose').Types.ObjectId;

const { adminRoles } = require('../../../../ServerConfigs/AdminRoles');
exports.editAdmin = asyncHandeler(
    async (req, res, next) => {
        const adminModel = res.locals.adminModel;
        const adminId = req.params.id;
        if (!ObjectId.isValid(adminId)) {
            return res.status(404).json({ msg: "لم نتمكن من العثور على المدير المطلوب" });
        }
        const { name, email, username, phone, roles } = req.body;
        if (Object.keys(roles).length != adminRoles.length) {
            return res.status(400).json({ msg: "من فضلك أدخل كل الصلاحيات المطلوبة" })
        }
        for (const role of adminRoles) {
            if (roles[role.ref] == null) {
                return res.status(400).json({ msg: "من فضلك أدخل كل الصلاحيات المطلوبة" })
            }
        }
        const count = await Admin.findOne({
            $or: [
                {
                    username: username,
                },
                {
                    email: email,
                },
            ],
            _id: { $ne: adminId }
        });
        if (count != null) {
            return res.status(404).json({ msg: "هناك مدير اخر بنفس اسم المستخدم !" });
        }
        try {
            const admin = adminId != adminModel._id ? await Admin.findById(adminId) : adminModel;
            if (!adminModel.master && admin.master) {
                return res.status(403).json({ msg: "لا يمكنك تعديل الحساب الرئيسي" });
            }
            if (admin.master) {
                await admin.updateOne({ name, email, username, phone });
            } else {
                await admin.updateOne({ name, email, username, phone, roles });
            }
            if (admin != null) {
                return res.status(200).json({ admin });
            } else {
                return res.status(404).json({ msg: "لم نتمكن من العثور على المدير" });
            }
        } catch (ex) {

            return res.status(404).json({ msg: ex.message });
        }
    }
)