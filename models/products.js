var mongoose = require('mongoose');
var ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        default: "https://via.placeholder.com/150",
    }
});

const ProductsModel = mongoose.model('products', ProductSchema, 'products');
module.exports = ProductsModel;