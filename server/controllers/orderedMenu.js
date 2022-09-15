const OrderedMenu = require("../models/OrderedMenu");

exports.getAllOrders = async (req, res, next) => {

  try {
    const order = await OrderedMenu.find({});
    res.status(200).json({ success: true, count: order.length, data: order });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  const { user_id, ordered_time, special_request, detail_ordered_menu } = req.body; 

  try {
    const order = await OrderedMenu.create({
      user_id,
      ordered_time,
      special_request,
      detail_ordered_menu,
    });
    
    res.status(200).json({ success: true, data: order });
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
    
        order.ordered_time = req.body.ordered_time;
        order.special_request = req.body.special_request;
        order.detail_ordered_menu = req.body.detail_ordered_menu;
    
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
