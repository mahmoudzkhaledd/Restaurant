const asyncHandeler = require('express-async-handler');
const User = require('../../../../Models/User');
const ObjectId = require('mongoose').Types.ObjectId;
const configs = require('../../../../ServerConfigs/ServerConfigs.json');

exports.getAllUsers = asyncHandeler(
    async (req, res, next) => {
        let page = Number(req.query.page) || 0;
        if (page < 0) page = 0;
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
        if (active == 'banned') {
            query.banned = true;
        } else if (active == "unbanned") {
            query.banned = false;
        }

        const count = await User.count(query);
        const users = await User.find(query,
            {
                password: 0,
                address: 0,
                city: 0,
                phone: 0,
                street: 0,
                updatedAt: 0,
                cart: 0,
            }).skip(page * configs.maxItemsPerPage).limit(configs.maxItemsPerPage);

        res.status(200).json({ users, count });
    }
)