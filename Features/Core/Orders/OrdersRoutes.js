const appRouter = require('express').Router();
const { orderMeal } = require('./Services/OrderMeal');
const { validatorOrderService } = require('./Validators/OrderValidator');
const { getOrder } = require('./Services/GetOrder');
const { getUserOrders } = require('./Services/GetUserOrders');
const { cancelOrder } = require('./Services/CancelOrder');
const { updateOrder } = require('./Services/UpdateOrder');
const { getCart } = require('./Services/GetCart');
const { removeCartItem } = require('./Services/RemoveCartItem');
const { makeCartOrder } = require('./Services/MakeCartOrder');

appRouter.post('/order-meal/:id', validatorOrderService, orderMeal);
appRouter.get('/get-cart', getCart);
appRouter.delete('/cart/remove/:id', removeCartItem);

appRouter.route('/:id').get(getOrder);
appRouter.post('/:id/cancel', cancelOrder);
appRouter.post('/make-order', makeCartOrder);
appRouter.put('/:id', validatorOrderService, updateOrder);
appRouter.route('/').get(getUserOrders);

module.exports = appRouter;  