const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
    cancel,
    pay,
    success,
    paymentSuccess
} = require("../controllers/payment");

router.route("/pay").post(protect, pay);

router.route("/cancel").get(protect, cancel);

router.route("/success").get(protect, success);

router.route("/paymentSuccess/:_id").put(paymentSuccess);

module.exports = router;