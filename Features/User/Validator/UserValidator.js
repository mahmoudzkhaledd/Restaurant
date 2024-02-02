const validator = require('../../../middlewares/validatorMiddleware');
const { check } = require('express-validator');

module.exports.accountSettingsValidator = [
    check('phone').isString().trim().isLength({ min: 11, max: 15 })
        .withMessage("يجب أن يكون رقم الهاتف بين 11 احرف و 15 حرف").optional(),
    validator,
];
module.exports.addAddressValidator = [
    check('address').isString().trim().isLength({ min: 3, max: 300 })
        .withMessage("يجب أن يكون العنوان بين 3 احرف و 300 حرف").optional(),
    check('city').isString().trim().isLength({ min: 3, max: 300 })
        .withMessage("يجب أن تكون المدينة بين 3 احرف و 300 حرف").optional(),
    check('street').isString().trim().isLength({ min: 3, max: 300 })
        .withMessage("يجب أن يكون الشارع بين 3 احرف و 300 حرف").optional(),
    validator,
];
module.exports.resetPasswordValidator = [
    check('oldPassword').isString().trim().isLength({ min: 8, max: 200 })
        .withMessage("يجب أن يكون الباسورد بين 8 احرف و 200 حرف").optional(),
    check('newPassword').isString().trim().isLength({ min: 8, max: 200 })
        .withMessage("يجب أن يكون الباسورد بين 8 احرف و 200 حرف").optional(),
    validator,
];