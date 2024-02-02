const validator = require('../../../../middlewares/validatorMiddleware');
const { check } = require('express-validator');

module.exports.loginValidator = [
    check('email').isEmail().trim().withMessage("من فضلك أدخل ايميل صالح"),
    check('password').isLength({ min: 8, max: 32 }).trim().withMessage('password must be between 8 and 32 characters'),
    validator,
];