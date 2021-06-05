const express = require('express');
const reservationController = require('../controllers/reservationController');
const Router = express.Router();

Router.post('/reservation', reservationController.addReservation);
Router.put('/reservation/:id', reservationController.updateReservation);
Router.get('/reservation/:id', reservationController.getSingleReservation);
Router.get('/reservations', reservationController.AllReservations);


module.exports = Router;

