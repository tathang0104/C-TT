const express = require("express");
const router = express.Router();
const multer = require('multer');

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
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/product");

router.route("/").get(getAllProduct);

router.route("/create").post(upload.single('product_photo'), createProduct);

router.route("/update/:_id").put(upload.single('product_photo'), updateProduct);

router.route("/delete/:_id").delete(deleteProduct);

module.exports = router;
