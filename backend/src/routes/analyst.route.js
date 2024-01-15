const express = require('express');
const router = express.Router();
const AnalystController = require('../controllers/Analyst.controller');

router.get('/:dateRangeType', AnalystController.get);

module.exports = router;
