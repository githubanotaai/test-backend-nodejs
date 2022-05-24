const Category = require("../repositories/categories");
const Error = require("../utils/error-class");

async function getCategoryByName(name) {
  try {
    const category = await Category.getCategoryByName(name);
    return category;
  } catch (err) {
    throw err;
  }
}

async function createNewCategory(data) {
  if (!data.foodType && !data.drinkType) {
    throw new Error(
      "É nescessário inserir algum tipo de bebida ou comida",
      400
    );
  }
  if (data.foodType && data.drinkType) {
    throw new Error("A categoria deve ter apenas um tipo ! ", 400);
  }
  const newCategory = await Category.createNewCategory(data);
  return newCategory;
}

async function getCategories(data) {
  try {
    const categories = await Category.getCategories(data);
    return categories;
  } catch (err) {
    throw err;
  }
}

async function deleteCategory(name) {
  try {
    const category = await Category.deleteCategory(name);
    return category;
  } catch (err) {
    throw err;
  }
}

async function editCategory(id, data) {
  try {
    const category = await Category.editCategory(id, data);
    return category;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  deleteCategory,
  getCategories,
  createNewCategory,
  getCategoryByName,
  editCategory,
};
