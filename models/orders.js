var mongoose = require('mongoose');
var globalOrderId = 1000;

var OrderSchema = mongoose.Schema({
    orderId: {
        type: Number,
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    email: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
});

OrderSchema.pre('save', function (next) {
    const order = this;
    if (!order.orderId) {
        order.orderId = globalOrderId;
        globalOrderId++;
    }
    next();
});

const OrdersModel = mongoose.model('orders', OrderSchema, 'orders');
module.exports = OrdersModel;