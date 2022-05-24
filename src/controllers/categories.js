const Category = require("../services/categories");

async function getCategories(req, res, next) {
  try {
    const categories = await Category.getCategories(req.query);
    if (categories?.length) {
      res.status(200).json(categories);
    } else {
      res.status(404).json("Nenhuma categoria foi encontrada !");
    }
  } catch (err) {
    if (err.status) res.status(err.status).json(err.message);
    else next(err);
  }
}

async function getCategoryByName(req, res, next) {
  try {
    const category = await Category.getCategoryByName(req.query.name);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json("Categoria não encontrada !");
    }
  } catch (err) {
    if (err.status) res.status(err.status).json(err.message);
    else next(err);
  }
}

async function createNewCategory(req, res, next) {
  try {
    const newCategory = await Category.createNewCategory(req.body);
    if (newCategory) {
      res.status(200).json(newCategory);
    } else {
      res
        .status(400)
        .json("Erro ao criar nova categoria,verifique seus parâmetros !");
    }
  } catch (err) {
    if (err.status) res.status(err.status).json(err.message);
    else next(err);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const category = await Category.deleteCategory(req.query.name);
    if (category) {
      res.status(200).json("Categoria deletada com sucesso !");
    } else {
      res.status(500).json("Não foi possível excluir a categoria");
    }
  } catch (err) {
    if (err.status) res.status(err.status).json(err.message);
    else next(err);
  }
}

async function editCategory(req, res, next) {
  try {
    const category = await Category.editCategory(req.query.id, req.body);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(500);
    }
  } catch (err) {
    if (err.status) res.status(err.status).json(err.message);
    else next(err);
  }
}
module.exports = {
  createNewCategory,
  getCategoryByName,
  getCategories,
  deleteCategory,
  editCategory,
};
