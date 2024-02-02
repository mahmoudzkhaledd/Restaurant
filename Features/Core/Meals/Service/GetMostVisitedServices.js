const asyncHandeler = require('express-async-handler');
const Configs = require('../../../../Models/Configs');

exports.getMostVisitedServices = asyncHandeler(
    async (req, res, next) => {
        const visited = await Configs.findOne({}, { adminId: 0 }).populate("mostVisitedServices");

        res.status(200).json({ visited: visited || [] });
    }
)