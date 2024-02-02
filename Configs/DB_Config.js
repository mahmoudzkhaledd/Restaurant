const mongoose = require('mongoose');
const Admin = require("../Models/Admin");
const Config = require("../Models/Configs");
const { adminRoles } = require('../ServerConfigs/AdminRoles');
module.exports = async function configDbConnection() {
    const url = process.env.MONGO_URL;
    mongoose.set("strictQuery", false);

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(async () => {
        console.log("Connected To Database");
        if (await Admin.findOne({ username: "admin" }) == null) {
            const roles = {};
            for (const r of adminRoles) roles[r.ref] = true;
            await Admin.create({
                name: "Mahmoud",
                username: "admin",
                password: "admin",
                master: true,
                email: "mahmoudnaggar2002@gmail.com",
                roles: roles,
                pinNumber: "123321",
                phone: "01145243378",
            });
        }
        if (await Config.findOne() == null) { 
            await Config.create({});
        }

    });

}