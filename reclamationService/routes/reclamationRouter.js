const router = require('express').Router();
const reclamationController = require('../controllers/reclamationController');

router.route('/reclamation').post(reclamationController.addReclamation);
router.route('/reclamation/:id').get(reclamationController.getSingleReclamation);
router.route('/reclamations').get(reclamationController.getReclamations);

module.exports = router;
