const express = require("express");
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/users');
    },
    filename: function(req, file, cb) {
        console.log(file)
        cb(null, new Date().getTime() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage, 
    limits: {
        fileSize: 1024 * 1024 * 10  
    },
    fileFilter,
});


// Controllers
const {
  login,
  register,
  forgotPassword,
  resetPassword,
  updateUser,
  getAllUsers,
  getOneUser,
} = require("../controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotPassword);

router.route("/passwordreset/:resetToken").put(resetPassword);

router.route("/").get(getAllUsers);

router.route("/:_id").get(getOneUser);

router.route("/updateprofile/:_id").put(upload.single('user_avatar'), updateUser);

module.exports = router;
