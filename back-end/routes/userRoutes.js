const express = require('express')
const router = express.Router()
const usersControllers = require('../controllers/userControllers')
const favoritesControllers = require('../controllers/favoritesControllers')
const auth = require('../middleware/verifyJWT')

// User routes
router.route('/')
    .get(usersControllers.getAllUsers)
    .post(usersControllers.createNewUser)
    .patch(usersControllers.updateUser)
    .delete(usersControllers.deleteUser)

// Favorites routes
router.route('/favorites')
    .get(auth, favoritesControllers.getFavorites)
    .post(auth, favoritesControllers.addFavorite);

router.route('/favorites/:productId')
    .delete(auth, favoritesControllers.removeFavorite)

module.exports = router