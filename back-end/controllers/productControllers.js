const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const asyncHandler = require('express-async-handler');

// @desc Get all products
// @route GET /products
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().lean();
    if (!products?.length) {
        return res.status(400).json({ message: 'No products found' });
    }
    res.json(products);
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

const createNewProduct = [
    upload.single('image'),
    asyncHandler(async (req, res) => {
      console.log('File Uploaded:', req.file); // Debugging line
  
      const { name, price, category, description } = req.body;
      const image = req.file ? req.file.filename : null;
  
      // Confirm data
      if (!name || !price || !category || !image) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Check for duplicate product
      const duplicate = await Product.findOne({ name }).lean().exec();
      if (duplicate) {
        return res.status(409).json({ message: 'Duplicate product name' });
      }
  
      const productObject = { name, price, category, description, image };
  
      // Create and store new product
      const product = await Product.create(productObject);
      if (product) {
        console.log('Product Created:', product); // Debugging line
        res.status(201).json({ message: `New product ${name} created`, imageUrl: `/uploads/${product.image}` });
      } else {
        res.status(400).json({ message: 'Invalid product data received' });
      }
    }),
  ];
  

// @desc Update a product
// @route PATCH /products
// @access Private
const updateProduct = [
    upload.single('image'),
    asyncHandler(async (req, res) => {
        const { id, name, price, category, description } = req.body;
        const image = req.file ? req.file.filename : null;

        // Confirm data
        if (!id || !name || !price || !category) {
            return res.status(400).json({ message: 'All fields except description are required' });
        }

        // Does the product exist to update?
        const product = await Product.findById(id).exec();
        if (!product) {
            return res.status(400).json({ message: 'Product not found' });
        }

        // Check for duplicate
        const duplicate = await Product.findOne({ name }).lean().exec();
        // Allow renaming of the original product
        if (duplicate && duplicate?._id.toString() !== id) {
            return res.status(409).json({ message: 'Duplicate product name' });
        }

        product.name = name;
        product.price = price;
        product.category = category;
        if (description) product.description = description;
        if (image) product.image = image; // Update image if a new one is uploaded

        const updatedProduct = await product.save();
        res.json({ message: `${updatedProduct.name} updated`, imageUrl: `/uploads/${updatedProduct.image}` });
    }),
];

// @desc Delete a product
// @route DELETE /products
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Product ID Required' });
    }

    const product = await Product.findById(id).exec();
    if (!product) {
        return res.status(400).json({ message: 'Product not found' });
    }

    // Delete image file if it exists
    const imagePath = path.join(__dirname, '..', 'uploads', product.image);
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }

    const result = await product.deleteOne();
    const reply = `Product ${result.name} with ID ${result._id} deleted`;

    res.json(reply);
});

// @desc Get product image
// @route GET /products/:id/image
// @access Public
const getProductImage = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product || !product.image) {
            return res.status(404).json({ message: 'Product image not found' });
        }

        const imagePath = path.join(__dirname, '..', 'uploads', product.image);

        if (!fs.existsSync(imagePath)) {
            return res.status(404).json({ message: 'Product image not found' });
        }

        res.sendFile(imagePath);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching product image' });
    }
};

module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProductImage,
};