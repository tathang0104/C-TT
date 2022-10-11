const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

// Controllers
const {
    getAllOrders,
    createOrder,
    updateOrder, 
    deleteOrder,
    getOneOrder,
    getSelfOrder,
    searchOrder,
} = require("../controllers/orderedMenu");

router.route("/").get(protect, getAllOrders);

router.route("/search").get(protect, searchOrder);

router.route("/viewoder/:_id").get(protect, getOneOrder);

router.route("/getselforder").get(protect, getSelfOrder);

router.route("/create").post(protect, createOrder);

router.route("/update/:_id").put(protect, updateOrder);

router.route("/delete/:_id").delete(protect, deleteOrder);

module.exports = router;
