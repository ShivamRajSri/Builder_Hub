const express = require("express");
const router = express.Router();
const Product = require("../Models/SellerProduct");
const { body } = require("express-validator")
const sellerController=require("../Controlers/Sellercontrollers");
const multer = require("multer");
const storage = multer.memoryStorage(); 
const upload = multer({ storage });
const sellermiddleware=require("../Middlewares/Sellermiddleware")
router.post("/add", upload.array("images"), async (req, res) => {
  try {
    const { title, price, description } = req.body;
    const imageFiles = req.files;

    if (!title || !price || !description || imageFiles.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert image buffers to base64 (for storing in DB) OR save to cloud/local
    const imageUrls = imageFiles.map(file => {
      return `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    });

    const newProduct = new Product({
      title,
      price,
      description,
      images: imageUrls,
    });

    await newProduct.save();

    res.json({ success: true, message: "Product added", product: newProduct });
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});
router.get('/materials', async (req, res) => {
  const { page = 1, limit = 9, search = "" } = req.query;

  const query = search
    ? { title: { $regex: search, $options: "i" } }
    : {};

  const materials = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(materials);
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