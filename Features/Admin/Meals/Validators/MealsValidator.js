const validator = require('../../../../middlewares/validatorMiddleware');
const { check } = require('express-validator');

module.exports.addMealValidator = [
    check('name').isString()
        .isLength({ min: 3, max: 50 }).trim()
        .withMessage("يجب أن يكون اسم الوجبة من 3 ل 50 حرف"),

    check('subDescription').isString()
        .isLength({ min: 0, max: 100 }).trim()
        .withMessage("يجب أن يكون الوصف المختصر للوجبة من 0 ل 100 حرف"),

    check('description').isString()
        .isLength({ min: 0, max: 3000 }).trim()
        .withMessage("يجب أن يكون وصف الوجبة من 0 ل 3000 حرف"),
    check('showFront').isString().trim().isIn(['smallSize', 'mediumSize', 'largeSize'])
        
        .withMessage("من فضلك وضح الحجم الذي سيظهر للمستخدم"),

    check('categories.*').isMongoId()
        .withMessage("يجب ادخال التصنيفات بشكل صحيح"),

    check('smallSize.price').isString().trim().toFloat()
        .withMessage("يجب ادخال رقم صحيح في سعر الحجم الصغير"),

    check('smallSize.afterDiscount').isString().trim().toFloat()
        .withMessage("يجب ادخال رقم صحيح في خصم الحجم الصغير"),

    check('mediumSize.price').isString().trim().toFloat()
        .withMessage("يجب ادخال رقم صحيح في سعر الحجم المتوسط"),

    check('mediumSize.afterDiscount').trim().isString().toFloat()
        .withMessage("يجب ادخال رقم صحيح في خصم الحجم المتوسط"),

    check('largeSize.price').isString().trim().toFloat()
        .withMessage("يجب ادخال رقم صحيح في سعر الحجم المتوسط"),

    check('largeSize.afterDiscount').isString().trim().toFloat()
        .withMessage("يجب ادخال رقم صحيح في خصم الحجم المتوسط"),
    
    check('smallSize.available').isBoolean().optional(),
    check('mediumSize.available').isBoolean().optional(),
    check('largeSize.available').isBoolean().optional(),
    validator,
];