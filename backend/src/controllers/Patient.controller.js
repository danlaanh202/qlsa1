const Patient = require('../models/Patient.model');
const { createActivity } = require('../repositories/activityRepository');
const { Op } = require('sequelize');

class PatientController {
  constructor() {}

  async get(req, res) {
    try {
      const { id } = req.params;
      const patient = await Patient.findByPk(id);
      return res.status(200).json(patient);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async getAll(req, res) {
    try {
      const patients = await Patient.findAll();
      return res.status(200).json(patients);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  async create(req, res) {
    try {
      const [newPatient] = await Promise.all([
        Patient.create(req.body),
        createActivity('tao_benh_nhan'),
      ]);
      return res.status(200).json(newPatient);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedPatient = await Patient.update(updatedData, {
        where: {
          id_benh_nhan: id,
        },
      });
      return res.status(200).json(updatedPatient);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async search(req, res) {
    try {
      const { searchText } = req.query;
      const patients = await Patient.findAll({
        where: {
          ho_va_ten: {
            [Op.like]: `%${searchText}%`,
          },
        },
      });
      return res.status(200).json(patients);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const toDeletePatient = await Patient.findByPk(id);
      const deletedPatient = await toDeletePatient.destroy();
      return res.status(200).json(deletedPatient);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
}

module.exports = new PatientController();
