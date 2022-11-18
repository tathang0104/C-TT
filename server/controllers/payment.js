const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AXMeJ1HaMiTJqoZAXDezOC_NQtXZjYGH55WmJVTvqtrZgkva2xN1NkPQzR8eFyrUWR6TiK9y3YzWLpws",
  client_secret:
    "EDtLfGhK53kOEEbVhTb0kzwcLCwfmRBsgYzTvJ9q3HZ9SgWXL6fGlMWs33hCbKe7RQENxXkGpabYDmok",
});

exports.pay = async (req, res, next) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
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
