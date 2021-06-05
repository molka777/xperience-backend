const config = require('config');
const secretOrkey = config.get('secretOrkey');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const Preferences = require('../model/Preferences');

// test
exports.testUser = async (req, res) => {
  try {
      return res.send("user service works");
  } catch (error) {
    res.status(500).json({errors: error});
  }
};
//user/register
exports.register = async (req, res) => {
  const {name, email, password, phoneNumber,myPreferences} = req.body;

  try {
    const searchRes = await User.findOne({email});
    if (searchRes)
      return res.status(401).json({msg: `Utilisateur éxistant, utilisez un autre email.`});
    const newUser = new User({
      name,
      email,
      password,
      phoneNumber,
      myPreferences
    });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    newUser.password = hash;

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({errors: error});
  }
};
//user/login
exports.login = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.findOne({email});
    if (!user) return res.status(404).json({msg: `Email ou mot de passe incorrect`});
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({msg: `Email ou mot de passe incorrect`});

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };

    const token = await jwt.sign(payload, secretOrkey);
    return res.status(200).json({token: `Bearer ${token}`, user});
  } catch (error) {
    res.status(500).json({errors: error});
  }
};
//user/update/:id
exports.updateUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      birthday,
      adress,
      city,
      aboutMe,
      postalCode,
      myPreferences,
      photo,
      verif,
      falseIdentity,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      name,
      email,
      phoneNumber,
      birthday,
      adress,
      city,
      aboutMe,
      postalCode,
      myPreferences,
      photo,
      verif,
      falseIdentity,
    });

    return res.status(201).json({
      msg: "L'utilisateur a été modifié avec succès",
      user: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({msg: err.message});
  }
};
//user/users
exports.allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      succes: true,
      users,
    });
  } catch (err) {
    return res.status(500).json({msg: err.message});
  }
};
//user/user/:id
exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({status: 'success', user});
  } catch (err) {
    return res.status(500).json({msg: err.message});
  }
};
//user/delete/:id
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({msg: 'utilisateur supprimé avec succès'});
  } catch (err) {
    return res.status(500).json({msg: err.message});
  }
};
//user/preferences
exports.seePreferences = async (req, res) => {
  try {
    const allPreferences = await Preferences.find();
    res.send(allPreferences);
  } catch (error) {
    res.status(500).json({errors: error.message});
  }
};