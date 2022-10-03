const sendEmail = require("../utils/sendEmail");

exports.bookingtable = async (req, res, next) => {
  
  const { email, orders, name, dateTime, peopleEat, specialRequest } = req.body;

  try {

    if (!orders) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    const details = orders.map(item => {
        return (
            `<div>  
                <div>Name: ${item.name}</div>
                <div>Price: ${item.price}</div>
                <div>Quantity ordered: ${item.quantity_order}</div>
            </div>`
        )
    })

    const request = specialRequest !== "" ? `Special request: ${specialRequest}` : "No special request"

    let sum = 0

    orders.forEach(item => {
        sum += item.price * item.quantity_order
    })

    // HTML Message
    const message = `
      <h1>Hello ${name}, you have booked your table </h1>
      <h3>Here is your detail menu: </h3>
      <p>Time: ${dateTime}, number of people: ${peopleEat}</p>
      <p>${request}</p>
      ${details}
      <div>Total: ${sum}</div>
    `;

    try {
      await sendEmail({
        to: email,
        subject: "Booking table request",
        text: message,
      });

      res.status(200).json({ success: true, orders: orders,  });
    } catch (err) {
      console.log(err);

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};
