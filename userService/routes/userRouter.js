const express = require('express');
const { testUser, register, login, updateUser,allUsers, getSingleUser,deleteUser,seePreferences } = require('../controllers/userController');
const Router = express.Router();
const {registerRules, validator} = require('../middlewares/validator');
const isAuth = require('../middlewares/passport-setup');

Router.get('/', testUser);
Router.post('/register', registerRules(), validator, register);
Router.post('/login', login);
Router.put('/profile/:id', updateUser);
Router.get('/users', allUsers);
Router.get('/user/:id', getSingleUser);
Router.delete('/delete/:id', deleteUser);
Router.get('/preferences', seePreferences);

Router.get('/current', isAuth(), (req, res) => {
  res.json(req.user);
});
module.exports = Router;

