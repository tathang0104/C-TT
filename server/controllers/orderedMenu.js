const OrderedMenu = require("../models/OrderedMenu");
const DetailOrder = require("../models/DetailOrder");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.getOneOrder = async (req, res, next) => {
  try {
    const _id = (req.params._id)
    const order = await OrderedMenu.aggregate([
      { $match: { _id: ObjectId(_id) } },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user_id"
        }
      },
      {
        $lookup: {
          from: "detail_orders",
          localField: "_id",
          foreignField: "order_id",
          as: "detail_order"
        }
      },
      {
        $unwind: {
          path: "$detail_order",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$user_id",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "detail_order.product_id",
          foreignField: "_id",
          as: "detail_order.product_id"
        }
      },
      {
        $unwind: {
          path: "$detail_order.product_id",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id : "$_id",
          user_id: { $first: "$user_id" },
          order_time: { $first: "$order_time" },
          special_request: { $first: "$special_request" },
          status: { $first: "$status" },
          detail_order: { $push: "$detail_order" }
        }
      },
    ])
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

exports.searchOrder = async (req, res, next) => {
  let page = parseInt(req.query.page) || 1
  let size = parseInt(req.query.size) || 5
  let search = req.query.search || ""
  
  try {
    let totalPage
    const order = await OrderedMenu.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user_id",
          pipeline: [
            {
              $match: {
                username: { $regex: search, $options: "i" }
              },
            }
          ]
        }
      },
      {
        $lookup: {
          from: "detail_orders",
          localField: "_id",
          foreignField: "order_id",
          as: "detail_order"
        }
      },
      {
        $unwind: {
          path: "$detail_order",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$user_id",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "detail_order.product_id",
          foreignField: "_id",
          as: "detail_order.product_id"
        }
      },
      {
        $unwind: {
          path: "$detail_order.product_id",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id : "$_id",
          user_id: { $first: "$user_id" },
          order_time: { $first: "$order_time" },
          updatedAt: { $first: "$updatedAt" },
          createdAt: { $first: "$createdAt" },
          special_request: { $first: "$special_request" },
          status: { $first: "$status" },
          detail_order: { $push: "$detail_order" }
        }
      },
      {$sort: {"updatedAt": -1}},
    ])
    const count = order.filter(order => order.user_id !== null).length
    totalPage = Math.ceil(count / size)
    const newOrder = order.filter(order => order.user_id !== null).slice((page-1)*size, page*size)
    
    res.status(200).json({ success: true, count:newOrder.length, data: newOrder , page , size, totalPage});
  } catch (err) {
    next(err);
  }
};

exports.getSelfOrder = async (req, res, next) => {
  let page = parseInt(req.query.page) || 1
  let size = parseInt(req.query.size) || 5
  // let search = req.query.search || ""
  try {
    let totalPage
    const order = await OrderedMenu.aggregate([
      { $match: { user_id: ObjectId(req.user._id)} },
      {
        $lookup: {
          from: "detail_orders",
          localField: "_id",
          foreignField: "order_id",
          as: "detail_order"
        }
      },
      {
        $unwind: {
          path: "$detail_order",
          preserveNullAndEmptyArrays: true
        }
      },
     
      {
        $lookup: {
          from: "products",
          localField: "detail_order.product_id",
          foreignField: "_id",
          as: "detail_order.product_id"
        }
      }, 
      {
        $unwind: {
          path: "$detail_order.product_id",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id : "$_id",
          user_id: { $first: "$user_id" },
          order_time: { $first: "$order_time" },
          updatedAt: { $first: "$updatedAt" },
          createdAt: { $first: "$createdAt" },
          special_request: { $first: "$special_request" },
          status: { $first: "$status" },
          detail_order: { $push: "$detail_order" }
        }
      },
      {$sort: {"updatedAt": -1}},
      { $skip: page * size - size},
      { $limit: size},
    ])
    const count = await OrderedMenu.find({user_id: req.user._id}).count()
    totalPage = Math.ceil(count / size)
    res.status(200).json({ success: true, count: order.length, data: order, page, totalPage});
  } catch (err) {
    next(err);
  }
};

exports.getAllOrders = async (req, res, next) => {
  let page = parseInt(req.query.page) || 1
  let size = parseInt(req.query.size) || 5
  try {
    const order = await OrderedMenu.find()
    .populate({
      path: 'user_id',
      select:
        'username',
    })
    .populate({
      path: 'detail_order.product_id',
      select:
        'name price photo_url category',
    })
    .skip((size * page) - size)
    .limit(size);
    res.status(200).json({ success: true, count: order.length, data: order, page, size });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  const {  order_time, special_request, detail_order } = req.body; 

  try {
    const order = await OrderedMenu.create({
      user_id : req.user._id,
      order_time,
      special_request
    })

    const newDetail = detail_order.map((item)=> {
      return {
        ...item,
        order_id: order._id,
      }
    })
    
    const detail = await DetailOrder.create(newDetail);
    res.status(200).json({ success: true, data: order, data_detail: detail });
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {

    try {
        const order = await OrderedMenu.findOne({_id: req.params._id});
        console.log(order)
        if (!order) {
          return next(new ErrorResponse("You have no permissions to update", 401));
        }
    
        order.order_time = req.body.order_time;
        order.special_request = req.body.special_request;
        order.status = req.body.status;
    
        await order.save();
    
        res.status(201).json({
          success: true,
          message: "Order Updated Success",
          data: order
        });
    
      } catch (err) {
        next(err);
      }
};

exports.deleteOrder = async (req, res, next) => {

    try {
        const order = await OrderedMenu.findOne({ _id: req.params._id });
    
        if (!order) {
          return next(new ErrorResponse("You have no permissions to delete", 401));
        }
    
        await order.delete();
    
        res.status(201).json({
          success: true,
          message: "Order deleted",
        });
    
      } catch (err) {
        next(err);
      }
};
