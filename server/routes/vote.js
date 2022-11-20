const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

// Controllers
const {
    createOrUpdateVote,
    getAllAvgVote,
    getAllAvgVoteById,
    getVoteById
} = require("../controllers/vote");

// router.route("/:id").get(protect, getTotalVote);

router.route("/").get(protect, getAllAvgVote);

router.route("/:_id").get(getAllAvgVoteById);

router.route("/selfVote/:_id").get(protect, getVoteById);

router.route("/createOrUpdate/:_id").post(protect, createOrUpdateVote);

module.exports = router;
