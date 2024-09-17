const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productControllers')

router.route('/')
    .get(productsController.getAllProducts)
    .post(productsController.createNewProduct)
    .patch(productsController.updateProduct)
    .delete(productsController.deleteProduct)
// New route to serve product images
router.get('/:id/image', productsController.getProductImage);

module.exports = router