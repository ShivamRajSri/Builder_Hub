const express = require("express");
const router = express.Router();
const Product = require("../Models/SellerProduct");
const { body } = require("express-validator")
const sellerController=require("../Controlers/Sellercontrollers");
const sellermiddleware=require("../Middlewares/Sellermiddleware")
router.post("/add", async (req, res) => {
  try {
    const { title, price, image } = req.body;
    const newProduct = new Product({ title, price, image });
    await newProduct.save();
    res.status(201).json({ message: "Product added", product: newProduct});
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});
router.get("/materials", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const skip = (page - 1) * limit;
  try {
    const products = await Product.find().skip(skip).limit(limit);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});
router.post('/register-seller', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    sellerController.registerSeller
)

router.post('/login-seller', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    sellerController.loginSeller
)
router.get('/profile', sellermiddleware.authseller, sellerController.getSellerProfile);

router.get('/logout', sellermiddleware.authseller, sellerController.logoutSeller);
module.exports = router;