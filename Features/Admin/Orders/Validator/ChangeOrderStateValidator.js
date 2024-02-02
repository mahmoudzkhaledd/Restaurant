const validator = require('../../../../middlewares/validatorMiddleware');
const { check } = require('express-validator');
const configs = require('../../../../ServerConfigs/ServerConfigs.json');
module.exports.changeOrderStateValidator = [
    check('status').isString().trim().isIn(configs.orderStatus).withMessage("يجب اختيار مرحلة للطلب"),
    check('dateSelected').optional({nullable: true}).isISO8601().toDate().withMessage("يجب وضع تاريخ محدد"),
    check('refuseReason').isString().trim().isLength({ min: 0, max: 1000 }).withMessage("الحد الاقصى للرسالة هو 1000 حرف").optional(),

    validator,
];