const asyncHandeler = require('express-async-handler');
const Admin = require('../../../../Models/Admin');
const { adminRoles } = require('../../../../ServerConfigs/AdminRoles');
exports.addAdmin = asyncHandeler(
    async (req, res, next) => {
        const { name, email, username, password, pinNumber, phone, roles } = req.body;

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
        });
        if (count != null) {
            return res.status(404).json({ msg: "هناك مدير اخر بنفس اسم المستخدم أو بنفس الايميل !" });
        }
        try {
            const admin = await Admin.create({ name, email, username, password, pinNumber, phone, roles });

            return res.status(200).json({ admin });
        } catch (ex) {

            return res.status(404).json({ msg: ex.message });
        }

    }
)