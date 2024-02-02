const validator = require('../../../../middlewares/validatorMiddleware');
const { check } = require('express-validator');

module.exports.addMealToLandingPageValidator = [
    check('mealId').isMongoId().withMessage("من فضلك ادخل كود الوجبة بشكل صحيح"),
    validator,
];
module.exports.addCategoryToLandingPageValidator = [
    check('categoryId').isMongoId().withMessage("من فضلك ادخل كود التصنيف بشكل صحيح"),
    validator,
];