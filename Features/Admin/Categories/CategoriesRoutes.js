const appRouter = require('express').Router();
const { deleteCategory } = require('./Services/DeleteCategory');
const { getAllCategories } = require('./Services/GetAllCategories');
const { getCategory } = require('./Services/GetCategory');
const { addNewCategory } = require('./Services/AddNewCategory');
const { addCategoryValidator } = require('./Validators/CategoryValidator');
const { editCategory } = require('./Services/EditCategory');
const { adminRolesValidator } = require('../../../middlewares/RolesValidator');

appRouter.get("/", adminRolesValidator(['SeeAllCategories']), getAllCategories)
appRouter.post("/", adminRolesValidator(['AddCategory']), addCategoryValidator, addNewCategory);
appRouter.get("/:id", adminRolesValidator(['SeeCategory']), getCategory)
appRouter.put("/:id", adminRolesValidator(['EditCategory']), editCategory)
appRouter.delete("/:id", adminRolesValidator(['DeleteCategory']), deleteCategory)
module.exports = appRouter;