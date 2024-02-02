const asyncHandeler = require('express-async-handler');
const Admin = require('../../../../Models/Admin');
const { adminRoles } = require('../../../../ServerConfigs/AdminRoles');
const ObjectId = require('mongoose').Types.ObjectId;

exports.updateMasterRoles = asyncHandeler(
    async (req, res, next) => {
        const roles = {};
        for (const r of adminRoles) roles[r.ref] = true;
        const ans = await Admin.updateOne({ master: true }, { roles });
        if (ans.modifiedCount != 0) {
            res.status(200).json({ msg: "تم التعديل بنجاح" })
        } else { 
            res.status(400).json({ msg: "لم يتم التعديل" })
        }
    }
) 