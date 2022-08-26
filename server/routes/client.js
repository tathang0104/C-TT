const express = require("express");
const router = express.Router();

// Controllers
const {
  bookingtable,
} = require("../controllers/client");

router.route("/bookingTable").post(bookingtable);

module.exports = router;