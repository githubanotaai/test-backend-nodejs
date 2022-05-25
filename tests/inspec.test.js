const axios = require("axios");
const { it, expect, test } = require("@jest/globals");
jest.setTimeout(40000);
require("dotenv").config();
const { PORT } = process.env;

describe("Categories routes", () => {
  test("test status code from  post a new category", async () => {
    try {
      let statusCode;
      const newCategory = {
        name: "Ice-Cream",
        foodType: "dessert_food",
        isVegan: false,
      };
      const res = await axios.post(
        `http://localhost:${PORT}/categories`,
        newCategory
      );
      expect(res.status).toEqual(200);
    } catch (err) {
      // test error handler in case of duplicate name(error 500 ) or bad resquest(erro 400)
      statusCode = err?.response?.status || 500;
      expect(statusCode).toEqual(200);
    }
  });

  test("test status code from /categories", async () => {
    const res = await axios.get(`http://localhost:${PORT}/categories`);
    expect(res.status).toEqual(200);
  });

  test("test cotent type returned from /categories", async () => {
    const res = await axios.get(`http://localhost:${PORT}/categories`);
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  test("test status code from search for an existing category", async () => {
    const categoryName = "Ice-Cream"; // make shure the category name exists in the data base
    const res = await axios.get(
      `http://localhost:${PORT}/categories/search?name=${categoryName}`
    );
    expect(res.status).toEqual(200);
  });

  test("test cotent type returned search for an existing category", async () => {
    const categoryName = "Ice-Cream"; // make shure the category name exists in the data base
    const res = await axios.get(
      `http://localhost:${PORT}/categories/search?name=${categoryName}`
    );
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  test("test status code from search for a nonexistent category", async () => {
    try {
      let errorStatuscode;
      const noneExistCategoryName = "dfsdfsdfasdf";
      const res = await axios.get(
        `http://localhost:${PORT}/categories/search?name=${noneExistCategoryName}`
      );
    } catch (err) {
      errorStatuscode = err.response.status;
      expect(errorStatuscode).toEqual(404);
    }
  });

  it("test status code from edit category route ", async () => {
    try {
      let statusCode;
      const updatedCategory = {
        name: "MilkShake",
        foodType: "dessert_food",
        isVegan: true,
      };

      const CategoryName = "Ice-Cream";

      const findCategoryByName = await axios.get(
        `http://localhost:${PORT}/categories/search?name=${CategoryName}` //make shure to put a valid category name
      );

      const id = findCategoryByName.data._id;
      const res = await axios.put(
        `http://localhost:${PORT}/categories?id=${id}`,
        updatedCategory
      );
      expect(res.status).toEqual(200);
      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    } catch (err) {
      statusCode = err?.response?.status || 500;
      expect(statusCode).toEqual(200);
    }
  });

  test("test error handler status code from  post a new category", async () => {
    try {
      let errorStatuscode;
      //to force error 400 create a new category body with missing riquired values (name,drinkType or foodType)
      const newCategory = {
        name: "Sorvete", // put a duplicate value here to force error 500
        foodType: "alcoholic_drink",
        isVegan: false,
      };
      const res = await axios.post(
        `http://localhost${PORT}/categories`,
        newCategory
      );
    } catch (err) {
      // test error handler in case of duplicate name(error 500 ) or bad resquest(erro 400)
      errorStatuscode = err.response.status;
      expect(errorStatuscode).toBeGreaterThanOrEqual(400);
    }
  });

  it("test status of error handler from edit category route ", async () => {
    try {
      let errorStatuscode;
      //make sure you create a body with a duplicate key (name) or missing a required value (name,foodType,drinkType)
      const updatedCategory = {
        name: "Sorvete", //duplicate key to force error 500
        drinkType: "alcoholic_drink",
        isVegan: true,
      };
      const id = "628c0cfda1d6324bbeed27ed"; // if you want to force error 404, change the id value to " " or a none exist category id
      // if you want to force error 400 , the id value must exist in the data base

      const res = await axios.put(
        `http://localhost:${PORT}/categories?id=${id}`,
        updatedCategory
      );
    } catch (err) {
      // in case of error test error response to bad request(error 400),category not found(error 404) or duplicate key(error 500)
      errorStatuscode = err?.response?.status || 500;
      expect(errorStatuscode).toBeGreaterThanOrEqual(400);
    }
  });

  it("test status code from delete category ", async () => {
    try {
      const categoryName = "Sorvete";
      let statusCode;
      const res = await axios.delete(
        `http://localhost:${PORT}/categories?name=${categoryName}`
      );

      expect(res.status).toEqual(200);
    } catch (err) {
      statusCode = err?.response?.status || 500;
      expect(statusCode).toEqual(200);
    }
  });

  it("test error handler code from delete category ", async () => {
    try {
      const categoryName = "Sorvete"; // category name must be a none exist category or a category with associate products to force error 404 or 400
      let errorStatuscode;
      const res = await axios.delete(
        `http://localhost:${PORT}/categories?name=${categoryName}`
      );
    } catch (err) {
      // in case of error test error response to bad request(error 400),category not found(error 404) or duplicate key(error 500)
      errorStatuscode = err?.response?.status || 500;
      expect(errorStatuscode).toBeGreaterThanOrEqual(400);
    }
  });
});

describe("Products routes", () => {
  test("test status code from  post a new product", async () => {
    try {
      let statusCode;
      const newProduct = {
        title: "Pote sorvete de chocolate",
        description: "pote sorvete de chocolate 500gm",
        price: "14,99",
        category: "MilkShake",
      };
      const res = await axios.post(
        `http://localhost:${PORT}/products`,
        newProduct
      );

      expect(res.status).toEqual(200);
    } catch (err) {
      // test error handler in case of duplicate name(error 500 ) or bad resquest(erro 400)
      statusCode = err?.response?.status || 500;
      expect(statusCode).toEqual(200);
    }
  });

  test("test status code from get products", async () => {
    const res = await axios.get(`http://localhost:${PORT}/products`);
    expect(res.status).toEqual(200);
  });

  test("test cotent type returned from get products", async () => {
    const res = await axios.get(`http://localhost:${PORT}/products`);
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  test("test status code from search for an existing product", async () => {
    const productName = "Pote sorvete de chocolate"; // make shure the product name exists in the data base
    const res = await axios.get(
      `http://localhost:${PORT}/products/search?name=${productName}`
    );
    expect(res.status).toEqual(200);
  });

  test("test cotent type returned search for an existing product", async () => {
    const productName = "Pote sorvete de chocolate"; // make shure the product name exists in the data base
    const res = await axios.get(
      `http://localhost:${PORT}/products/search?name=${productName}`
    );
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  test("test status code from search for a nonexistent product", async () => {
    try {
      let errorStatuscode;
      const noneExistProductName = "dfsdfsdfasdf";
      const res = await axios.get(
        `http://localhost:${PORT}/categories/search?name=${noneExistProductName}`
      );
    } catch (err) {
      errorStatuscode = err.response.status;
      expect(errorStatuscode).toEqual(404);
    }
  });

  it("test status code from edit product route ", async () => {
    try {
      let statusCode;
      const updatedProduct = {
        name: "Pote sorvete de chocolate",
        title: "Pote sorvete de morango",
        description: "pote sorvete de morango 500gm",
        price: "12,99",
        category: "MilkShake",
      };

      const res = await axios.put(
        `http://localhost${PORT}/products`,
        updatedProduct
      );
      expect(res.status).toEqual(200);
      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    } catch (err) {
      statusCode = err?.response?.status || 500;
      expect(statusCode).toEqual(200);
    }
  });

  test("test error handler status code from  post a new Product", async () => {
    try {
      let errorStatuscode;
      //to force error 400 create a new product body with missing riquired values (name,drinkType or foodType)
      const newProduct = {
        //title: "Pote sorvete de morango",    missing required value to force error 400
        description: "pote sorvete de morango 500gm",
        price: "12,99",
        category: "Ice-Cream", // invalid category to force error 400
      };
      const res = await axios.post(
        `http://localhost:${PORT}/products`,
        newProduct
      );
    } catch (err) {
      // test error handler in case of duplicate name(error 500 ) or bad resquest(erro 400)
      errorStatuscode = err.response.status;
      expect(errorStatuscode).toBeGreaterThanOrEqual(400);
    }
  });

  it("test status of error handler from edit product route ", async () => {
    try {
      let errorStatuscode;
      //make sure you create a body with a duplicate key (name) or missing a required value (name,foodType,drinkType)
      const updatedProduct = {
        name: "Pote sorvete de morango",
        title: "Pote sorvete de morango",
        description: "pote sorvete de morango 500gm",
        price: "12,99",
        category: "none exist category", // adding a none exist category to force error 400
      };

      const res = await axios.put(
        `http://localhost:${PORT}/products`,
        updatedProduct
      );
    } catch (err) {
      // in case of error test error response to bad request(error 400),category not found(error 404) or duplicate key(error 500)
      errorStatuscode = err?.response?.status || 500;
      expect(errorStatuscode).toBeGreaterThanOrEqual(400);
    }
  });

  it("test status code from delete product", async () => {
    try {
      const productTitleorId = "Pote sorvete de morango";
      let statusCode;
      const res = await axios.delete(
        `http://localhost:${PORT}/products?id=${productTitleorId}`
      );

      expect(res.status).toEqual(200);
    } catch (err) {
      statusCode = err?.response?.status || 500;
      expect(statusCode).toEqual(200);
    }
  });

  it("test error handler code from delete product", async () => {
    try {
      const productTitleorId = "Pote sorvete de morango"; //  must be a none exist product  to force error 404
      let errorStatuscode;
      const res = await axios.delete(
        `http://localhost:${PORT}/products?id=${categoryName}`
      );
    } catch (err) {
      errorStatuscode = err?.response?.status || 500;
      expect(errorStatuscode).toBeGreaterThanOrEqual(400);
    }
  });
});
