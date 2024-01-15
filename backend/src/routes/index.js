const express = require('express');
const authRouter = require('./auth.route');
const patientRouter = require('./patient.route');
const doctorRouter = require('./doctor.route');
const healthRecordRouter = require('./healthRecord.route');
const analystRouter = require('./analyst.route');
const CloudinaryController = require('../controllers/Cloudinary.controller');

const router = express.Router();

function route(app) {
  app.use('/api', router);
  router.use('/auth', authRouter);
  router.use('/patient', patientRouter);
  router.use('/doctor', doctorRouter);
  router.use('/health_record', healthRecordRouter);
  router.use('/analyst', analystRouter);
  router.post('/upload', CloudinaryController.uploadImage);
}
module.exports = route;
