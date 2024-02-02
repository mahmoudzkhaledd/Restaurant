const validator = require('../../../../middlewares/validatorMiddleware');
const { check } = require('express-validator');

exports.addCategoryValidator = [
    check('name').isString().trim().withMessage("من فضلك أدخل ايميل صالح"),
    check('description').isLength({ min: 0, max: 500 }).trim()
        .withMessage("الحد الاقى للوصف هو 500 حرف"),
    validator,
];