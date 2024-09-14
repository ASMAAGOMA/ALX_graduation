const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'  // Reference to the Product model
    }],
    roles: [{
        type: String,
        default: "Customer"
    }],
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', userSchema)