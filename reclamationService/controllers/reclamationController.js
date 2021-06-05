const Reclamation = require('../model/Reclamation');

const reclamationController = {
  addReclamation: async (req, res) => {
    try {
      const {userId, userEmail, userNumber, content, type} = req.body;
      const newReclamation = new Reclamation({
        userId,
        userEmail,
        userNumber,
        content,
        type,
      });
      await newReclamation.save();
      res.json({
        msg: 'La réclamation a été envoyé avec succès',
        newReclamation,
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  getSingleReclamation: async (req, res) => {
    try {
      const reclamation = await Reclamation.findById(req.params.id);
      res.json({status: 'success', reclamation});
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
  getReclamations: async (req, res) => {
    try {
      const reclamations = await Reclamation.find();
      res.status(200).json({
        status: 'success',
        reclamations,
      });
    } catch (err) {
      return res.status(500).json({msg: err.message});
    }
  },
};
module.exports = reclamationController;
