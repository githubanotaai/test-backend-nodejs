const {
  getProductByNameOrCategory,
  getProducts,
  createNewProduct,
  editProduct,
  deleteProduct,
} = require("../controllers/products");
const router = require("express").Router();
const bodyParser = require("body-parser");
const validate = require("express-validation");
const productValidation = require("../validations/products");
const errorHandler = require("../utils/error-handler");
module.exports = (app) => {
  app.use("/products", router);
  app.use(errorHandler);

  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));

  router.post("/", validate(productValidation["/"]), createNewProduct);

  router.get("/search", getProductByNameOrCategory);

  router.get("/", getProducts);

  router.put("/", validate(productValidation["/"]), editProduct);

  router.delete("/", deleteProduct);
};
