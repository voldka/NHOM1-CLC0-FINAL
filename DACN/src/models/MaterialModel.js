const mongoose = require('mongoose');

const materialsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  },
);

const Materials = mongoose.model('Materials', materialsSchema);
module.exports = Materials;
