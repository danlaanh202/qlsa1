const Doctor = require('../models/Doctor.model');
const { Op } = require('sequelize');

class DoctorController {
  constructor() {}
  async create(req, res) {
    try {
      const doctor = await Doctor.create(req.body);
      return res.status(200).json(doctor);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async getAll(req, res) {
    try {
      const doctors = await Doctor.findAll();
      return res.status(200).json(doctors);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async search(req, res) {
    try {
      const { searchText } = req.query;
      const doctors = await Doctor.findAll({
        where: {
          ho_va_ten: {
            [Op.like]: `%${searchText}%`,
          },
        },
      });
      return res.status(200).json(doctors);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { id_bac_si, ...data } = req.body;
      const doctor = await Doctor.update(data, {
        where: {
          id_bac_si: id,
        },
      });
      return res.status(200).json(doctor);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedDoctor = await Doctor.destroy({
        where: {
          id_bac_si: id,
        },
      });
      return res.status(200).json(deletedDoctor);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}

module.exports = new DoctorController();
