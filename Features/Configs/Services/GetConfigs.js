const Config = require('../../../Models/Configs');

exports.getWebConfigs = async (req, res, next) => {
    const configs = await Config.findOne({}, {
        landingPageMeals: 0,
    });
    if (configs == null) return res.sendStatus(200);
    if (!configs.available) return res.status(400).json({ message: configs.closedMessage });
    return res.sendStatus(200);
}
