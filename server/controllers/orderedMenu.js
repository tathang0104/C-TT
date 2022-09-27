const OrderedMenu = require("../models/OrderedMenu");

exports.getOneOrder = async (req, res, next) => {
  try {
    const order = await OrderedMenu.findOne({_id: req.params._id})
    .populate('user_id')
    .populate({
      path: 'detail_order.product_id',
      select:
        'name price photo_url category',
    });
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

exports.searchOrder = async (req, res, next) => {
  let page = parseInt(req.query.page) || 1
  let size = parseInt(req.query.size) || 5
  let search = req.query.search || ""
  // const user_id = 63228f8dfb22f650b2f731e4;
  console.log(req.query)
  console.log("hihihi")
  try {
    const  order = await OrderedMenu
    .find()
    .populate({
      path: 'user_id',
      match: { username: { $regex: search, $options: "i" }},
      // // username: 'thangahihi',
      select:
        'username',
    })
    .populate({
      path: 'detail_order.product_id',
      select:
        'name price photo_url category',
    })
    .skip((size * page) - size).limit(size)
    
    const newOrder = order.filter(order => order.user_id !== null);

    
    
    res.status(200).json({ success: true, count:newOrder.length, data: newOrder , page , size});
  } catch (err) {
    next(err);
  }
};


exports.getSelfOrder = async (req, res, next) => {
  let page = parseInt(req.query.page) || 1
  let size = parseInt(req.query.size) || 5
  try {
    // const order = await OrderedMenu.find();
    const order = await OrderedMenu.find({user_id: req.user._id})
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
    .limit(size)

    res.status(200).json({ success: true, count: order.length, data: order ,page ,size});
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
      special_request,
      detail_order,
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
    
        order.order_time = req.body.order_time;
        order.special_request = req.body.special_request;
        order.detail_order = req.body.detail_order;
    
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
