const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    orderId: {
        type: String
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        default: 0,
        required: true 
    },
    totalDiscountAmount: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        required: true
    },
    expectedDelivery: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        required: true
    },
    paymentId: {
        type: String
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        discountPerItem: {
            type: Number,
            default: 0
        },
        orderStatus: {
            type: String,
            default: "placed"
        },
        cancellationReason: {
            type: String
        },
    }]
}, { timestamps: true })

    module.exports = mongoose.model('order', orderSchema);
