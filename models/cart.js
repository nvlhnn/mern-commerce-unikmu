const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      code: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        default: 0,
      },
    },
  ],
  totalQty: {
    type: Number,
    default: 0,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  //   isActive: {
  //     type: Boolean,
  //     default: true,
  //     required: true,
  //   },
});

module.exports = mongoose.model("Cart", cartSchema);
