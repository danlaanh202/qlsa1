const express = require('express');
const router = express.Router();
const PatientController = require('../controllers/Patient.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, PatientController.getAll);
router.post('/', verifyToken, PatientController.create);
router.get('/search', verifyToken, PatientController.search);
router.get('/:id', verifyToken, PatientController.get);
router.put('/:id', verifyToken, PatientController.update);
router.delete('/:id', verifyToken, PatientController.delete);

module.exports = router;
