const Joi = require("joi");

module.exports = {
  "/": {
    body: {
      name: Joi.string().required(),

      drinkType: Joi.string().valid("soft_drink", "alcoholic_drink"),

      foodType: Joi.string().valid("dessert_food", "savory_food"),

      isVegan: Joi.boolean().optional(),
    },
  },
};
