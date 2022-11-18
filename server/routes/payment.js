const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

const {
    cancel,
    pay,
    success
} = require("../controllers/payment");

router.route("/pay").post(protect, pay);

router.route("/cancel").get(protect, cancel);

router.route("/success").get(protect, success);

module.exports = router;