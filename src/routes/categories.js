const {
  createNewCategory,
  getCategoryByName,
  getCategories,
  deleteCategory,
  editCategory,
} = require("../controllers/categories");
const router = require("express").Router();
const bodyParser = require("body-parser");
const validate = require("express-validation");
const categoryValidation = require("../validations/categories");
const errorHandler = require("../utils/error-handler");
module.exports = (app) => {
  app.use("/categories", router);
  app.use(errorHandler);

  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));

  router.post("/", validate(categoryValidation["/"]), createNewCategory);

  router.get("/search", getCategoryByName);

  router.get("/", getCategories);

  router.delete("/", deleteCategory);

  router.put("/", editCategory);
};
