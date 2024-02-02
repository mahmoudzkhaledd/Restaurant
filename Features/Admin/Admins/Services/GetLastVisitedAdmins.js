const asyncHandeler = require('express-async-handler');
const Admin = require('../../../../Models/Admin');
const ObjectId = require('mongoose').Types.ObjectId;

exports.getLastVisitedAdmins = asyncHandeler(
    async (req, res, next) => {
        const admins = await Admin.find({}, {
            lastActive: 1,
            name: 1,
        });
        res.status(200).json({ admins });
    }
)