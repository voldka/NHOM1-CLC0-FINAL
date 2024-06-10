const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Products' },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        description: { type: String, default: 'chưa có mô tả' },
        discount: { type: Number, default: 0 },
        selled: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    },
);
const Product = mongoose.model('Products', productSchema);

module.exports = Product;
