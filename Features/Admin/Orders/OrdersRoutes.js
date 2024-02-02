const appRouter = require('express').Router();
const { getOrder } = require('./Services/GetOrder');
const { getOrders } = require('./Services/GetOrders');
const { changeOrderState } = require('./Services/ChangeOrderState');
const { changeOrderStateValidator } = require('./Validator/ChangeOrderStateValidator');
const { adminRolesValidator } = require('../../../middlewares/RolesValidator');
const { deleteOrder } = require('./Services/DeleteOrder');
const { getAdminsResponsable } = require('./Services/GetAdminsResponsable');
const { addResponsableAdmin } = require('./Services/AddResponsableAdmin');
const { deleteResponsableAdmin } = require('./Services/DeleteResponsableAdmin');
const { editOrder } = require('./Services/EditOrder');
const { removeOrderItem } = require('./Services/RemoveOrderItem');

appRouter.route('/orders/:id')
    .get(adminRolesValidator(["SeeOrder"]), getOrder);


appRouter.route('/orders/:id/change-state')
    .post(adminRolesValidator(["ChangeOrderState"]), changeOrderStateValidator, changeOrderState);


appRouter.route('/orders')
    .get(adminRolesValidator(["SeeAllOrders"]), getOrders);

appRouter.route('/orders/:id/delete')
    .delete(adminRolesValidator(["DeleteOrder"]), deleteOrder);


// appRouter.get('/orders/:id/admins', adminRolesValidator(["AddResponsableAdmin", 'DeleteResponsableAdmin']), getAdminsResponsable);


// appRouter.post('/orders/:id/admins', adminRolesValidator(["AddResponsableAdmin"]), addResponsableAdmin);

appRouter.put('/orders/:id', adminRolesValidator(["EditOrder"]), editOrder);
appRouter.delete('/orders/:id', adminRolesValidator(["RemoveOrderItem"]), removeOrderItem);


// appRouter.delete('/orders/:id/admins/:adminId', adminRolesValidator(["DeleteResponsableAdmin"]), deleteResponsableAdmin);


module.exports = appRouter;  