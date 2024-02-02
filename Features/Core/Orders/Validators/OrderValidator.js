const validator = require('../../../../middlewares/validatorMiddleware');
const { check,param } = require('express-validator');

module.exports.validatorOrderService = [
    param('id').isMongoId().withMessage('من فضلك ادخل كود الوجبة بشكل صحيح'),
    check('number').isString().trim().toInt().withMessage("يجب ادخال عدد الوجبات بشكل صحيح"),
    check('size').isIn([
        'smallSize',
        'mediumSize',
        'largeSize',
    ]).trim().withMessage("يجب اختيار حجم الوجبة"),
    
    validator,
];