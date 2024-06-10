const mongoose = require('mongoose');

const materialProductSchema = new mongoose.Schema(
    {
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Products' },
        material: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Materials' },
    },
    {
        timestamps: true,
    },
);
const MaterialProduct = mongoose.model('MaterialProduct', materialProductSchema);

module.exports = MaterialProduct;
