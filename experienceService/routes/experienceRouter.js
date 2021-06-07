const express = require('express');
const experienceController = require('../controllers/experienceController');
const Router = express.Router();

Router.get('/', experienceController.testExperience);
Router.get('/experience',experienceController.getExperiences);
Router.post('/experience',experienceController.createExperience);
Router.put('/experience/:id',experienceController.updateExperience)
Router.get('/experience/:id',experienceController.getSingleExperience);
Router.delete('/experience/:id',experienceController.deleteExperience);
Router.post('/session', experienceController.addSession);

module.exports = Router;

