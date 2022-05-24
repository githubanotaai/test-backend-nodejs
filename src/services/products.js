const Product = require("../repositories/products");

async function createNewProduct(data) {
  try {
    const newProduct = await Product.createNewProduct(data);
    return newProduct;
  } catch (err) {
    throw err;
  }
}

async function getProducts(data) {
  try {
    const products = await Product.getProducts(data);
    return products;
  } catch (err) {
    throw err;
  }
}

async function getProductByNameOrCategory(data) {
  try {
    const products = await Product.getProductByNameOrCategory(data);
    return products;
  } catch (err) {
    throw err;
  }
}

async function editProduct(data) {
  try {
    const product = await Product.editProduct(data);
    return product;
  } catch (err) {
    throw err;
  }
}

async function deleteProduct(data) {
  try {
    const product = await Product.deleteProduct(data);
    return product;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createNewProduct,
  getProductByNameOrCategory,
  getProducts,
  editProduct,
  deleteProduct,
};
