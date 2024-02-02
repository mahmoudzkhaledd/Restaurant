const asyncHandeler = require('express-async-handler');
const { Counter } = require('../../../../Models/Counter');

exports.getCounters = asyncHandeler(async (req, res, next) => {
    const counters = await Counter.find({});
    return res.status(200).json({ counters });
});

