const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/Doctor.controller');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', verifyToken, DoctorController.getAll);
router.post('/', verifyToken, DoctorController.create);
router.get('/search', verifyToken, DoctorController.search);
router.put('/:id', verifyToken, DoctorController.update);
router.delete('/:id', verifyToken, DoctorController.delete);
// router.get('/:id', verifyToken, DoctorController.get);

module.exports = router;
