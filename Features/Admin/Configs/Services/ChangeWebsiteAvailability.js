const asyncHandeler = require('express-async-handler');
const Config = require('../../../../Models/Configs');

exports.changeWebsiteAvailability = asyncHandeler(
    async (req, res, next) => {
        const { message, available } = req.body;
        const configs = await Config.findOne();
        if (configs == null) return res.status(400).json({ msg: "لا يمكن ايجاد سجل الاعدادات" });
        if (available != null) { 
            configs.available = (available == true);
        }
        if (message != null) {
            configs.closedMessage = message;
        }

        await configs.save();
        return res.status(200).json({ msg: "تم بنجاح" });
    }
)