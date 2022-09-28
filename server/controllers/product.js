const Product = require("../models/Product");
const fs = require('fs')

exports.getOneProduct = async (req, res, next) => {
    try {
      const product = await Product.findOne({_id: req.params._id});
      res.status(200).json({ success: true, data: product });
    } catch (err) {
      next(err);
    }
};

exports.getAllProduct = async (req, res, next) => {
    let page = parseInt(req.query.page) || 1
    let size = parseInt(req.query.size) || 5
    const category = (req.query.category) 
    try {
      let product 
      if (category) {
        product = await Product.find({category}).skip((size * page) - size).limit(size);
      }
      else {
        product = await Product.find().skip((size * page) - size).limit(size);
      }
      res.status(200).json({ success: true, count:product.length, data: product , page , size});
    } catch (err) {
      next(err);
    }
};

exports.searchProduct = async (req, res, next) => {
    let page = parseInt(req.query.page) || 1
    let size = parseInt(req.query.size) || 5
    let search = req.query.search || ""
    let price = null

    if (!isNaN(search)) {
      price = { $lte: parseInt(search) }
    }
    try {
      const  product = await Product.find({
          "$or": [
            {name: { $regex: search }},
            {description: { $regex: search }},
            {price},
          ]
        }).skip((size * page) - size).limit(size);
      
      res.status(200).json({ success: true, count:product.length, data: product , page , size});
    } catch (err) {
      next(err);
    }
};

exports.createProduct = async (req, res, next) => {
    const { name, description, price, category } = req.body;
    try {
      const product = await Product.create({
        name,
        description,
        price,
        photo_url: process.env.LOCALHOST + req.file.path,
        photo_path: req.file.path,
        category,
      });
      
      res.status(200).json({ success: true, data: product });
    } catch (err) {
      next(err);
    }
};

exports.updateProduct = async (req, res, next) => {

    try {
        const product = await Product.findOne({_id: req.params._id});
        if (!product) {
          return next(new ErrorResponse("You have no permissions to update", 401));
        }
        if (product.photo_path) {
          fs.unlink(product.photo_path, (err) => {
            if (err) {
              console.log(err)
              return
            }
          })
        }

        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.photo_url = process.env.LOCALHOST + req.file.path;
        product.photo_path = req.file.path;
        product.category = req.body.category;
    
        await product.save();
    
        res.status(201).json({
          success: true,
          message: "Product Updated Success",
          data: product
        });
    
      } catch (err) {
        next(err);
      }
};

exports.deleteProduct = async (req, res, next) => {

    try {
        const product = await Product.findOne({ _id: req.params._id });
    
        if (!product) {
          return next(new ErrorResponse("You have no permissions to delete", 401));
        }

        if (product.photo_path) {
          fs.unlink(product.photo_path, (err) => {
            if (err) {
              console.log(err)
              return
            }
          })
        }
    
        await product.delete();
    
        res.status(201).json({
          success: true,
          data: product,
          message: "Product deleted",
        });
    
      } catch (err) {
        next(err);
      }
};
