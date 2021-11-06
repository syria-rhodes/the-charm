const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        desc: {type: String},
        img: {type: String, required: true},
        title: {type: String, required: true, unique: true},
        price: {type: Number, required: true},
        flavors: {type: Array},
        icing: {type: Array},
        category: {type: String, required: true}
    }
)

module.exports = mongoose.model('Product', productSchema);