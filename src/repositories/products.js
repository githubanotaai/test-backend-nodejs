const Product = require("../collections/products");
const { isEmpty, pick } = require("lodash");
const {
  getCategoryByNameAndUpdate,
  getCategoryByName,
  getCategoryAndRemove,
} = require("./categories");
const searchTitleOrId = require("../utils/search-title-or-id");
const Error = require("../utils/error-class");

async function getProducts(data) {
  let { page, limit } = data;
  if (page <= 0) {
    page = 1;
  }
  limit = parseInt(limit) || 10;
  const skip = parseInt(page - 1) * limit || 0;
  const products = await Product.find()
    .populate("category")
    .skip(skip)
    .limit(limit);
  return products;
}

async function getProductByNameOrCategory(data) {
  let { page, limit, category, name } = data;

  limit = parseInt(limit) || 10;
  page = parseInt(page) || 1;

  if (page <= 0) {
    page = 1;
  }

  const skip = (page - 1) * limit || 0;

  const products = await Product.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $match: {
        $or: [
          { title: { $regex: String(name) } },
          { "category.name": category },
        ],
      },
    },
    {
      $project: {
        category: { $first: "$category" },
        name: 1,
        title: 1,
        description: 1,
        price: 1,
      },
    },
  ])
    .skip(skip)
    .limit(limit);

  return products;
}

async function createNewProduct(data) {
  try {
    if (!data || isEmpty(data)) {
      throw new Error(
        "Nenhum parametro foi passado para a criação de um novo produto !",
        400
      );
    }

    const newProductData = pick(data, [
      "title",
      "description",
      "price",
      "category",
    ]);

    const category = await getCategoryByName(newProductData.category);

    if (!category || isEmpty(category)) {
      throw new Error("Categoria não encontrada !", 404);
    }

    newProductData.category = category._id;

    const newProduct = new Product(newProductData);

    await newProduct.save();

    await getCategoryByNameAndUpdate(category.name, newProduct._id);

    return newProduct;
  } catch (err) {
    throw err;
  }
}

async function getProductByTitle(title) {
  try {
    const product = await Product.findOne({ title });
    return product;
  } catch (err) {
    throw err;
  }
}

async function editProduct(data) {
  try {
    if (!data || isEmpty(data)) {
      throw new Error(
        "Nenhum parâmetro foi passado para a edição do produto !",
        400
      );
    }

    const { name } = data;

    const product = await getProductByTitle(name);

    if (!product) {
      return;
    }
    const newProductData = pick(data, [
      "title",
      "price",
      "description",
      "category",
    ]);

    if (newProductData.category) {
      const category = await getCategoryByName(newProductData.category);

      if (!category || isEmpty(category)) {
        throw new Error("Categoria não encontrada !", 404);
      }

      if (product.category != category._id) {
        await getCategoryAndRemove(product.category, product._id);
        await getCategoryByNameAndUpdate(newProductData.category, product._id);
        newProductData.category = category._id;
      }
    }

    for (const key in newProductData) {
      product[key] = newProductData[key];
    }

    await product.save();

    return product;
  } catch (err) {
    throw err;
  }
}

async function deleteProduct(data) {
  try {
    if (!data || isEmpty(data)) {
      throw new Error("Nenhum parâmetro foi passado !", 400);
    }

    const product = await Product.findOneAndDelete(
      searchTitleOrId({}, data.id)
    );
    if (product) {
      await getCategoryAndRemove(product.category, product._id);
      return product;
    }
    return;
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
