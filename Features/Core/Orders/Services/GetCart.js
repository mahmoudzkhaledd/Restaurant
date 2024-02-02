const asyncHandeler = require('express-async-handler');
const User = require('../../../../Models/User');

exports.getCart = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;

    await userModel.populate([
        {
            path: 'cart.mealId',
            select: {
                adminId: 0,
                description: 0,
                categories: 0,
                ingredients: 0,
                imagesUrl: 0,
                smallSize: 0,
                mediumSize: 0,
                largeSize: 0,
            }
        },
    ]);
    await userModel.populate([
        {
            path: 'cart.mealId.thumbnailUrl',

        },
    ]);
    const newCart = [];
    let total = 0;
    for (const i of userModel.cart) {
        const obj = i.toJSON();
        if (obj.mealId) {

            if ((obj.price.afterDiscount || 0) != 0) {
                total += obj.price.afterDiscount * obj.mealNumber;
            } else {
                total += obj.price.price * obj.mealNumber;
            }
            newCart.push(obj);
        }
    }

    return res.status(200).json({
        cart: newCart,
        total,
    });
});