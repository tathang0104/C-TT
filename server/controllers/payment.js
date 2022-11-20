const paypal = require("paypal-rest-sdk");
const OrderedMenu = require("../models/OrderedMenu");
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "ATIfXKaRcICmD6EF-S18-BTFbZs-NHusyQ9r_YN6IeqVM4fA6nKwFj8xQOD4ZF4y4s76_pqUZbyI83Q9",
  client_secret:
    "EOkjVJgapLcbv46MAa56GFoDgj5bHfM-pb7mWMj2ogkucpZG8AvIEEWUwHUkmydJtLtcisnPf2NllGvR",
}); 

exports.pay = async (req, res, next) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:5000/success",
      cancel_url: "http://localhost:5000/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Red Sox Hat",
              sku: "001",
              price: "1.0",
              currency: "USD",
              quantity: 15,
            },
            {
              name: "Blue Sox Hat",
              sku: "002",
              price: "1.5",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "10.00",
        },
        description: "Hat for the best team ever",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      res.render("cancle");
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
};

exports.cancel = (req, res, next) => {
  res.send("Cancelled");
};

exports.success = async (req, res, next) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "10.00",
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        res.render("cancle");
      } else {
        console.log(JSON.stringify(payment));
        res.render("success");
      }
    }
  );
};

exports.paymentSuccess = async (req, res, next) => {
  try {
    console.log(req.user)
    const order = await OrderedMenu.findOne({_id: req.params._id});
    console.log(order)
    if (!order) {
      return next(new ErrorResponse("You have no permissions to update", 401));
    }

    order.status = "PAID";

    await order.save();

    res.status(201).json({
      success: true,
      message: "Paid Success",
      data: order
    });

  } catch (err) {
    next(err);
  }
}
