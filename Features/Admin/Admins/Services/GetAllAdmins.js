const asyncHandeler = require('express-async-handler');
const Admin = require('../../../../Models/Admin');
const ObjectId = require('mongoose').Types.ObjectId;

const configs = require('../../../../ServerConfigs/ServerConfigs.json');
exports.getAllAdmins = asyncHandeler(
    async (req, res, next) => {
        let page = Number(req.query.page) || 0;
        if(page < 0) page = 0;
        const search = req.query.search;
        const active = req.query.state || "";
        const regex = new RegExp(`^${search}`, 'i');
        const query = {};

        if (Number(search) != null && search != "") {
            query['$or'] = [
                {
                    name: {
                        $regex: regex,
                    },
                },
                {
                    number: Number(search) || -1,
                },
            ];
        }
        if (ObjectId.isValid(search)) {
            if (query['$or']) {
                query['$or'].push({
                    _id: search,
                })
            } else {
                query['$or'] = [{
                    _id: search,
                }]
            }

        }
        if (active == 'suspended') {
            query.suspended = true;
        } else if (active == "unsuspended") {
            query.suspended = false;
        }


        const count = await Admin.count(query);
        const admins = await Admin.find(query,
            {
                password: 0,
                pinNumber: 0,
                master: 0,
                phone: 0,
                roles: 0,
            }).skip(page * configs.maxItemsPerPage).limit(configs.maxItemsPerPage);

        res.status(200).json({ admins, count });
    }
)