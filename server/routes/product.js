const express = require("express");
const router = express.Router();
const multer = require('multer');
const { protect } = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/products');
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
    getAllProduct,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
} = require("../controllers/product");

router.route("/").get(getAllProduct);

router.route("/search").get(searchProduct);

router.route("/:_id").get(protect, getOneProduct);

router.route("/create").post(protect, upload.single('productPhoto'), createProduct);

router.route("/update/:_id").put(protect, upload.single('productPhoto'), updateProduct);

router.route("/delete/:_id").delete(protect, deleteProduct);

module.exports = router;
