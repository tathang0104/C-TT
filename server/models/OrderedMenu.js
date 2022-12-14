const mongoose = require("mongoose");
const Schema = mongoose.Schema

const OrderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId, ref: 'User'
    },
    order_time: {
      type: String,
      match: [
        /(((0[1-9]|[12]\d|3[01])[\/\.-](0[13578]|1[02])[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((0[1-9]|[12]\d|30)[\/\.-](0[13456789]|1[012])[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((0[1-9]|1\d|2[0-8])[\/\.-](02)[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((29)[\/\.-](02)[\/\.-]((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm)))$/,
        "Please provide order time right format",
      ],
      // 26/08/2022 09:00:09 PM
    },
    special_request: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ["PREPARE", "COMPLETE", "PAID"],
      default: "PREPARE",
    },
  },
  { timestamps: true}
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;