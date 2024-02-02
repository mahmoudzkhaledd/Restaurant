const validator = require('../../../../middlewares/validatorMiddleware');
const { check } = require('express-validator');
const configs = require('../../../../ServerConfigs/ServerConfigs.json');
module.exports.addAdminValidator = [
    check("name").isLength({ min: 3, max: 100 }).trim().withMessage("يجب أن يكون الاسم بين 3 و 100 احرف"),
    check("email").isLength({ min: 3, max: 100 }).trim().withMessage("يجب أن يكون الايميل بين 3 و 100 احرف"),
    check("username").isLength({ min: 3, max: 100 }).trim().withMessage("يجب أن يكون اسم المستخدم بين 3 و 100 احرف"),
    check("password").isLength({ min: 8, max: 100 }).trim().withMessage("يجب أن يكون اسم المستخدم بين 8 و 100 احرف"),
    check("pinNumber").isLength(6).isNumeric().trim().withMessage("يجب أن يكون رمز الحماية 6 ارقام فقط!"),
    check("phone").isLength({ min: 11, max: 15 }).trim().withMessage("يجب أن يكون رمز الحماية 6 ارقام فقط!"),

    validator,
];