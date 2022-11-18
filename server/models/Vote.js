const mongoose = require("mongoose");
const Schema = mongoose.Schema

const VoteSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId, ref: 'User'
    },
    product_id: {
      type: Schema.Types.ObjectId, ref: 'Product'
    },
    star: {
      type: Number,
    },
  },    
  { timestamps: true}
);

const Vote = mongoose.model("Vote", VoteSchema);

module.exports = Vote;