const express = require("express");
const router = express.Router();

// Controllers
const {
    getAllOrders,
    createOrder,
    updateOrder, 
    deleteOrder,
} = require("../controllers/orderedMenu");

router.route("/").get(getAllOrders);

router.route("/create").post(createOrder);

router.route("/update/:_id").put(updateOrder);

router.route("/delete/:_id").delete(deleteOrder);

module.exports = router;
