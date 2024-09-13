const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productControllers')

router.route('/')
    .get(productsController.getAllProducts)
    .post(productsController.createNewProduct)
    .patch(productsController.updateProduct)
    .delete(productsController.deleteProduct)

module.exports = router