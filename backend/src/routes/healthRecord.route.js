const express = require('express');
const router = express.Router();
const HealthRecordController = require('../controllers/HealthRecord.controller');

router.post('/', HealthRecordController.create);
router.get('/', HealthRecordController.get);
router.get('/:id', HealthRecordController.getByPK);

module.exports = router;
