
const Comment = require("../models/Comment");

exports.getCommentByIdProduct = async (req, res, next) => {
    let page = parseInt(req.query.page) || 1
    let size = parseInt(req.query.size) || 5
    const product_id = req.params._id; 
    let totalPage 
    try {
        const comment = await Comment.find({product_id})
        .populate({
          path: 'user_id',
          select:
            'username avatar_url',
        }).skip((size * page) - size).limit(size);
        const count = await Comment.find().count();
        totalPage = Math.ceil(count / size) 
      
      res.status(200).json({ success: true, count:comment.length, data: comment , page , size, totalPage});
    } catch (err) {
      next(err);
    }
};

exports.createComment = async (req, res, next) => {
    const { content, product_id } = req.body; 
  
    try {
      const comment = await Comment.create({
        user_id : req.user._id,
        product_id,
        content,
      });
      
      res.status(200).json({ success: true, data: comment });
    } catch (err) {
      next(err);
    }
};

exports.updateComment = async (req, res, next) => {

    try {
        const comment = await Comment.findOne({_id: req.params._id});
        if (!comment) {
          return next(new ErrorResponse("You have no permissions to update", 401));
        }
    
        comment.content = req.body.content;
    
        await comment.save();
    
        res.status(201).json({
          success: true,
          message: "Comment Updated Success",
          data: comment
        });
    
      } catch (err) {
        next(err);
      }
};

exports.deleteComment = async (req, res, next) => {

    try {
        const comment = await Comment.findOne({ _id: req.params._id });
    
        if (!comment) {
          return next(new ErrorResponse("You have no permissions to delete", 401));
        }
    
        await comment.delete();
    
        res.status(201).json({
          success: true,
          data: comment,
          message: "Comment deleted",
        });
    
      } catch (err) {
        next(err);
      }
};
