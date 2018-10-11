const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: 1,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        maxlength: 100000
    },
    price: {
        type: Number,
        required: true,
        maxlength: 255
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    wood: {
        type: Schema.Types.ObjectId,
        ref: 'Wood',
        required: true
    },
    shipping: {
        required: true,
        type: Boolean
    },
    available:{
        required: true,
        type: Boolean
    },
    publish: {
        required: true,
        type: Boolean
    },
    frets: {
        required: true,
        type: Number
    },
    sold: {
        type: Number,
        maxlength: 1000,
        default: 0
    },
    images: {
        type: Array,
        default: []
    }
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema)
module.exports = { Product }