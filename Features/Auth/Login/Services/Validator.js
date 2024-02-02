const validator = require('../../../../middlewares/validatorMiddleware');
const { check } = require('express-validator');

module.exports.loginValidator = [
    check('email').isEmail().trim().withMessage("من فضلك أدخل ايميل صالح"),
    check('password').isLength({ min: 8, max: 32 }).trim().withMessage('يجب أن تكون كلمة المرور من 8 الى 32 حرف'),
    validator,
];