const express = require('express')
const router = express.Router()
const productsController = require('../controllers/productControllers')
const cors = require('cors');
const { corsOptions } = require('../config/corsOptions')

router.use(cors(corsOptions));
router.options('*', cors(corsOptions));

router.route('/')
    .get(productsController.getAllProducts)
    .post(productsController.createNewProduct)
    .patch(productsController.updateProduct)
    .delete(productsController.deleteProduct)
// New route to serve product images
router.get('/:id/image', productsController.getProductImage);

module.exports = router