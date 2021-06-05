const { default: axios } = require('axios');
const mongoose = require('mongoose');
const Reservation = require('../model/Reservation');
mongoose.set('useFindAndModify', false);

const reservationController = {
  // reservation/reservation
 addReservation: async (req, res) => {
    try {
      const {
        userID,
        userEmail,
        userName,
        experienceID,
        sessionID,
        status,
      } = req.body;

      const newReservation = new Reservation({
        userID,
        userEmail,
        userName,
        experienceID,
        sessionID,
        status,
      });
      await newReservation.save();
      const {data} = await axios.get("http://localhost:5002/experience/experience/"+newReservation.experienceID)
      const experience = data.experience
      const arr=experience.sessions.filter(e => e._id === sessionID)
      const session =arr[0]
      session.reservationDemand.push(newReservation)
      const response = await axios.put(`http://localhost:5002/experience/experience/${newReservation.experienceID}`,{...experience})
      
      return res.json({status : "success", experience:response.data});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  //reservation/reservation/:id
 updateReservation: async (req, res) => {
    try {
      const {
        userID,
        userEmail,
        userName,
        experienceID,
        sessionID,
        status,
      } = req.body;
      await Reservation.findByIdAndUpdate(
        {_id: req.params.id},
        {
        userID,
        userEmail,
        userName,
        experienceID,
        sessionID,
        status,
      },
        {new: true}
      );
      const {data} = await axios.get("http://localhost:5002/experience/experience/"+experienceID)
      const experience = data.experience
      const arr=experience.sessions.filter(e => e._id === sessionID)
      var session=arr[0]  
      reservations =session.reservationDemand
      const newReservations = reservations.filter(res=>res._id !==req.params.id)
      newReservations.push({_id:req.params.id,userID,
        userEmail,
        userName,
        experienceID,
        sessionID,
        status})
      session.reservationDemand=newReservations
     await axios.put(`http://localhost:5002/experience/experience/${experienceID}`,{...experience})
      res.json({msg: "La réservation et l'expérience ont été modifié avec succès"});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  //reservation/reservation/:id
 getSingleReservation: async (req, res) => {
    try {
      const reservation = await Reservation.findById(req.params.id);
      res.json({status: 'success', reservation});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  }, 
 //reservation/reservations
 AllReservations : async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json({
      succes: true,
      reservations,
    });
  } catch (err) {
    return res.status(500).json({msg: err.message});
  }
}
}

module.exports = reservationController;

