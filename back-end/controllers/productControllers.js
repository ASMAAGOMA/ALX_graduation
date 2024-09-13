const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')

// @desc Get all products
// @route GET /products
// @access Public
const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().lean()
    if (!products?.length) {
        return res.status(400).json({ message: 'No products found' })
    }
    res.json(products)
})

// @desc Create new product
// @route POST /products
// @access Private
const createNewProduct = asyncHandler(async (req, res) => {
    const { name, price, category, description } = req.body

    // Confirm data
    if (!name || !price || !category) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate product
    const duplicate = await Product.findOne({ name }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate product name' })
    }

    const productObject = { name, price, category, description }

    // Create and store new product
    const product = await Product.create(productObject)
    if (product) { // Created 
        res.status(201).json({ message: `New product ${name} created` })
    } else {
        res.status(400).json({ message: 'Invalid product data received' })
    }
})

// @desc Update a product
// @route PATCH /products
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
    const { id, name, price, category, description } = req.body

    // Confirm data
    if (!id || !name || !price || !category) {
        return res.status(400).json({ message: 'All fields except description are required' })
    }

    // Does the product exist to update?
    const product = await Product.findById(id).exec()
    if (!product) {
        return res.status(400).json({ message: 'Product not found' })
    }

    // Check for duplicate
    const duplicate = await Product.findOne({ name }).lean().exec()
    // Allow renaming of the original product 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate product name' })
    }

    product.name = name
    product.price = price
    product.category = category
    if (description) product.description = description

    const updatedProduct = await product.save()
    res.json({ message: `${updatedProduct.name} updated` })
})

// @desc Delete a product
// @route DELETE /products
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'Product ID Required' })
    }

    const product = await Product.findById(id).exec()
    if (!product) {
        return res.status(400).json({ message: 'Product not found' })
    }

    const result = await product.deleteOne()
    const reply = `Product ${result.name} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllProducts,
    createNewProduct,
    updateProduct,
    deleteProduct
}