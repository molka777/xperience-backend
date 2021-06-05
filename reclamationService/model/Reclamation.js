const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema.Types;
const reclamationSchema = mongoose.Schema({
  userEmail: {
    type: String,
  },
  userId: {
    type: ObjectId,
  },
  userNumber: {
    type: Number,
  },
  content: {
    type: String,
  },
  type: {
    type: String,
  },
});

module.exports = Reclamation = mongoose.model('reclamation', reclamationSchema);
