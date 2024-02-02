const appRouter = require('express').Router();
const { getCounters } = require("./Services/GetCounters");

appRouter.get('/counters',  getCounters);
module.exports = appRouter;  