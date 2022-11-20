const mongoose = require("mongoose");
const Schema = mongoose.Schema

const DetailOrderSchema = new Schema(
  {
    order_id: {
      type: Schema.Types.ObjectId, ref: 'Order'
    },
    product_id: {
        type: Schema.Types.ObjectId, ref: 'Product'
    },
    quantity_order: {
        type: Number,
        min: 0,
    },
  },
  { timestamps: true}
);

const DetailOrder = mongoose.model("Detail_order", DetailOrderSchema);

module.exports = DetailOrder;