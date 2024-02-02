const mongoose = require('mongoose');
const { schemaPrice } = require('./PriceSchema');
exports.cartItem = new mongoose.Schema({
    mealId: {
        type: mongoose.Types.ObjectId,
        ref: "Meal",
        required: [true, "Meal id is required"]
    },
    mealNumber: {
        type: Number,
        default: 0,
    },
    size: {
        type: String,
        enum: ['smallSize', "mediumSize", "largeSize"],
        default: 'small',
    },
    price: {
        type: schemaPrice,
        required: [true, 'please enter price'],
    },
})