const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema.Types;
const {Schema} = mongoose;

const reservationSchema = new Schema(
  {
    userID: ObjectId,
    sessionID: ObjectId,
    experienceID:ObjectId,
    userName: {
      type: String,
    },
    userEmail: {
      type: String,
    },
     status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Reservation', reservationSchema);
