const mongoose = require('mongoose');

const AdventureSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  title: { type: String, required: true },
  details: { type: String, required: false },
});

module.exports = mongoose.model('Adventure', AdventureSchema);
