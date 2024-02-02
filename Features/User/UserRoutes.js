const appRoute = require('express').Router();
const { addNewAddress } = require('./Services/AddNewAddress');
const { changeAccountSettings } = require('./Services/ChangeAccountSettings');
const { deleteAddress } = require('./Services/DeleteUserAddress');
const { resetPassword } = require('./Services/ResetPassword');
const { accountSettingsValidator, resetPasswordValidator, addAddressValidator } = require('./Validator/UserValidator')
appRoute.post('/update-account', accountSettingsValidator, changeAccountSettings);
appRoute.post('/add-new-address', addAddressValidator, addNewAddress);
appRoute.post('/reset-password', resetPasswordValidator, resetPassword);
appRoute.delete('/delete-address/:id', deleteAddress);

module.exports = appRoute;