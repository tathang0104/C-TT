const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");

// Controllers
const {
    getCommentByIdProduct,
    createComment,
    updateComment,
    deleteComment
} = require("../controllers/comment");

router.route("/:_id").get(protect, getCommentByIdProduct);

router.route("/create").post(protect, createComment);

router.route("/update/:_id").put(protect, updateComment);

router.route("/delete/:_id").delete(protect, deleteComment);

module.exports = router;
