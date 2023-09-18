const mongoose = require("mongoose");

const CoffeeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "id is required"],
  },
  title: {
    type: String,
    required: [true, "product name is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  ingredients: {
    type: Array,
    required: [true, "ingredients is required"],
  },
  image: {
    type: String,
  },
});

const Coffee = mongoose.model("Coffee", CoffeeSchema);
module.exports = Coffee;
