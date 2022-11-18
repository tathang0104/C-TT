const mongoose = require("mongoose");
const Schema = mongoose.Schema

const CommentSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId, ref: 'User'
    },
    product_id: {
      type: Schema.Types.ObjectId, ref: 'Product'
    },
    content: {
      type: String,
    },
  },    
  { timestamps: true}
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;