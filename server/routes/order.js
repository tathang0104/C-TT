const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

// Controllers
const {
    getAllOrders,
    createOrder,
    updateOrder, 
    deleteOrder,
} = require("../controllers/orderedMenu");

router.route("/").get(protect, getAllOrders);

router.route("/create").post(protect, createOrder);

router.route("/update/:_id").put(protect, updateOrder);

router.route("/delete/:_id").delete(protect, deleteOrder);

module.exports = router;
