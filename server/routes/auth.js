const express = require("express");
const router = express.Router();
const multer = require('multer');
const { protect } = require("../middleware/auth");

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
  searchUser,
  createUser,
  deleteUser,
} = require("../controllers/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/getprofile").get(protect, (req, res)=> {
    res.send({user: req.user});
} )

router.route("/forgotpassword").post(forgotPassword);

router.route("/passwordreset/:resetToken").put(resetPassword);

router.route("/").get(protect, getAllUsers);

router.route("/search").get(protect, searchUser);

router.route("/:_id").get(protect, getOneUser);

router.route("/create").post(protect, createUser);

router.route("/updateprofile/:_id").put(protect, upload.single('user_avatar'), updateUser);

router.route("/delete/:_id").delete(protect, deleteUser);

module.exports = router;
