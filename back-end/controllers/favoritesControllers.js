const User = require('../models/User')

const getFavorites = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const user = await User.findById(req.user).populate('favorites')
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user.favorites)
    } catch (err) {
        console.error('Error in getFavorites:', err);
        res.status(500).json({ message: 'Server Error', error: err.message })
    }
}

const addFavorite = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { productId } = req.body
        const user = await User.findById(req.user)
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.favorites.includes(productId)) {
            return res.status(400).json({ message: 'Product already in favorites' })
        }
        
        user.favorites.push(productId)
        await user.save()
        
        res.json(user.favorites)
    } catch (err) {
        console.error('Error in addFavorite:', err);
        res.status(500).json({ message: 'Server Error', error: err.message })
    }
}

const removeFavorite = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const user = await User.findById(req.user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const productIndex = user.favorites.indexOf(req.params.productId)
        
        if (productIndex === -1) {
            return res.status(400).json({ message: 'Product not in favorites' })
        }
        
        user.favorites.splice(productIndex, 1)
        await user.save()
        
        res.json(user.favorites)
    } catch (err) {
        console.error('Error in removeFavorite:', err);
        res.status(500).json({ message: 'Server Error', error: err.message })
    }
}

module.exports = {
    getFavorites,
    addFavorite,
    removeFavorite
}