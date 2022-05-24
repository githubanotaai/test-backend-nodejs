const Category = require("../collections/categories");
const { isEmpty, pick } = require("lodash");
const Error = require("../utils/error-class");

async function getCategoryByName(name) {
  try {
    const category = await Category.findOne({ name });
    return category;
  } catch (err) {
    throw err;
  }
}

async function getCategoryByNameAndUpdate(name, product) {
  try {
    const category = await Category.findOneAndUpdate(
      { name },
      { $push: { products: product } }
    );
    return category;
  } catch (err) {
    throw err;
  }
}

async function getCategoryAndRemove(id, product) {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: id },
      { $pull: { products: product } }
    );
    return category;
  } catch (err) {
    throw err;
  }
}

async function createNewCategory(data) {
  try {
    if (!data || isEmpty(data)) {
      throw new Error(
        "Nenhum parametro foi passado para a criação de uma nova categoria !",
        400
      );
    }
    const newCategoryData = pick(data, [
      "name",
      "drinkType",
      "foodType",
      "isVegan",
    ]);

    const newCategory = new Category(newCategoryData);
    await newCategory.save();
    return newCategory;
  } catch (err) {
    throw err;
  }
}

async function getCategories(data) {
  let { page, limit } = data;
  if (page <= 0) {
    page = 1;
  }
  limit = parseInt(limit) || 10;
  const skip = (parseInt(page) - 1) * limit || 0;

  const categories = await Category.find().skip(skip).limit(limit);

  return categories;
}

async function editCategory(id, data) {
  if (!data || isEmpty(data)) {
    throw new Error(
      "Nenhum parametro foi passado para a edição da categoria !",
      400
    );
  }
  const category = await Category.findOne({ _id: id });

  if (!category || isEmpty(category)) {
    throw new Error("Categoria não encontrada !", 404);
  }

  const updatecategoryData = pick(data, [
    "name",
    "drinkType",
    "isVegan",
    "foodType",
  ]);

  for (const key in updatecategoryData) {
    if (category[key]) {
      category[key] = updatecategoryData[key];
    }
  }

  await category.save();

  return category;
}

async function deleteCategory(name) {
  const category = await Category.findOne({ name });

  if (!category || isEmpty(category)) {
    throw new Error("categoria não encontrada", 404);
  }

  if (category?.products?.length) {
    throw new Error(
      "Não é possível excluir uma categoria que tenha produtos associados !",
      400
    );
  }

  return await category.delete();
}

module.exports = {
  getCategoryByName,
  createNewCategory,
  getCategories,
  getCategoryByNameAndUpdate,
  getCategoryAndRemove,
  deleteCategory,
  editCategory,
};
