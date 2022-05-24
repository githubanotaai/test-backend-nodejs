const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    drinkType: {
      type: String,
      enum: ["soft_drink", "alcoholic_drink"],
    },
    foodType: {
      type: String,
      enum: ["spicy_food", "dessert_food", "savory_food"],
    },
    products: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
    },
    isVegan: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema, "categories");
