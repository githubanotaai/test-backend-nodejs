const { isEmpty } = require("lodash");
const Product = require("../services/products");

async function createNewProduct(req, res, next) {
  try {
    const newProduct = await Product.createNewProduct(req.body);
    if (newProduct) {
      res.status(200).json(newProduct);
    } else {
      res
        .status(400)
        .json("Erro ao criar novo produto, verifique seus parametros !");
    }
  } catch (err) {
    if (err.status) {
      res.status(err.status).json(err.message);
    } else next(err);
  }
}

async function getProducts(req, res, next) {
  try {
    const products = await Product.getProducts(req.query);
    if (products?.length) {
      res.status(200).json(products);
    } else {
      res.status(404).json("Nenhum produto foi encontrado !");
    }
  } catch (err) {
    if (err.status) res.status(err.status).json(err.message);
    else next(err);
  }
}

async function getProductByNameOrCategory(req, res, next) {
  try {
    const products = await Product.getProductByNameOrCategory(req.query);
    if (products?.length) {
      res.status(200).json(products);
    } else {
      res.status(404).json("Nenhum Produto foi encontrado !");
    }
  } catch (err) {
    if (err.status) res.status(err.status).json(err.message);
    else next(err);
  }
}

async function editProduct(req, res, next) {
  try {
    const product = await Product.editProduct(req.body);
    if (product && !isEmpty(product)) {
      res.status(200).json(product);
    } else {
      res.status(404).json("Produto não encontrado !");
    }
  } catch (err) {
    if (err.status) res.status(err.status).json(err.message);
    else next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const product = await Product.deleteProduct(req.query);
    if (product && !isEmpty(product)) {
      res.status(200).json("Produto Deletado com sucesso !");
    } else {
      res.status(404).json("Produto não encontrado !");
    }
  } catch (err) {
    if (err.status) res.status(err.status).json(err.message);
    else next(err);
  }
}

module.exports = {
  getProductByNameOrCategory,
  getProducts,
  createNewProduct,
  editProduct,
  deleteProduct,
};
