const categories = require("../src/routes/categories");
const products = require("../src/routes/products");

module.exports = (app) => {
  products(app);
  categories(app);
};
