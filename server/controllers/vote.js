const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Vote = require("../models/Vote");

exports.getAllAvgVote = async (req, res, next) => {
    // const product_id = (req.params._id) 
    try {

        const vote = await Vote.aggregate([{
            $group: {
                _id: "$product_id",
                avgStar: { $avg: "$star" }
            }
        }])
      
      res.status(200).json({ success: true, vote });
    } catch (err) {
      next(err);
    }
};

exports.getAllAvgVoteById = async (req, res, next) => {
    const product_id = (req.params._id)
    try {
      if (product_id !== undefined) {
        const vote = await Vote.aggregate([
            { $match: { product_id: ObjectId(product_id) } },
            {
                $group: {
                    _id: "$product_id",
                    avgStar: { $avg: "$star" },
                    count: { $sum: 1 }
                }
            }
        ])
      
        res.status(200).json({ success: true, vote });
      }
    } catch (err) {
      next(err);
    }
};

exports.getVoteById = async (req, res, next) => {
  const product_id = (req.params._id)
  try {
    if (product_id !== undefined) {
      const vote = await Vote.findOne({product_id: ObjectId(product_id), user_id: ObjectId(req.user._id) })
      res.status(200).json({ success: true, vote });
    }
  } catch (err) {
    next(err);
  }
};

exports.createOrUpdateVote = async (req, res, next) => {
    const { star } = req.body; 
    const product_id = (req.params._id) 
    try {
      const vote = await Vote.findOne({product_id, user_id : req.user._id})
      if (!vote) {
        const voteCreate = await Vote.create({
            user_id : req.user._id,
            product_id,
            star,
        });
      res.status(200).json({ success: true, data: voteCreate });
      } else {
        vote.star = star;
        await vote.save();
        res.status(200).json({ success: true, data: vote });
      }
      
    } catch (err) {
      next(err);
    }
};


