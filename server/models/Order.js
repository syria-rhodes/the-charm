const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        email: {type: String, required: true},
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        phone: {type: String, required: true},
        items: [
            {
                description: {type: String, required: true},
                quantity: {type: Number, required: true, default: 1},
                amount: {type: Number, required: true}
            },
        ],
        orderId: {type: String, required: true, unique: true},
        pickupDate: {type: String, required: true}
    }
)

module.exports = mongoose.model('Order', orderSchema);