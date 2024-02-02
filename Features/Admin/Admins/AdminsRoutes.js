const appRouter = require('express').Router();
const { addAdmin } = require('./Services/AddAdmin');
const { editAdmin } = require('./Services/EditAmin');
const { getAdmin } = require('./Services/GetAdmin');
const { getAllAdmins } = require('./Services/GetAllAdmins');
const { suspendAdmin } = require('./Services/SuspendAdmin');
const { addAdminValidator } = require('./Validator/AdminsValidator');
const { adminRolesValidator } = require('../../../middlewares/RolesValidator');
const { changeAdminPassword } = require('./Services/ChangeAdminPassword');
const { updateMasterRoles } = require('./Services/UpdateRoles');
const { deleteAdmin } = require('./Services/DeleteAdmin');
const { getAdminOrders } = require('./Services/GetAdminOrders');
const { getLastVisitedAdmins } = require('./Services/GetLastVisitedAdmins');
appRouter.get('/last-active', getLastVisitedAdmins);

appRouter.put('/update-master-roles', updateMasterRoles);
appRouter.get('/', adminRolesValidator(['SeeAllAdmins']), getAllAdmins)
appRouter.post('/', adminRolesValidator(['AddAdmin']), addAdminValidator, addAdmin)
appRouter.get('/:id', adminRolesValidator(['SeeAdminDetails']), getAdmin)
appRouter.get('/:id/orders', adminRolesValidator(['SeeAdminOrders']), getAdminOrders)
appRouter.put('/:id', adminRolesValidator(['EditAdmin']), editAdmin);
appRouter.put('/:id/change-password', adminRolesValidator(['EditAdmin']), changeAdminPassword);
appRouter.post('/:id/suspend', adminRolesValidator(['SuspendUnSuspendAdmin']), suspendAdmin);
appRouter.delete('/:id/delete', adminRolesValidator(['DeleteAdmin']), deleteAdmin);
module.exports = appRouter;