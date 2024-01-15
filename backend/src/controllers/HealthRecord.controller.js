const { Op } = require('sequelize');
const HealthRecord = require('../models/HealthRecord.model');
const Patient = require('../models/Patient.model');
const { createActivity } = require('../repositories/activityRepository');
const Doctor = require('../models/Doctor.model');

class HealthRecordController {
  constructor() {}
  async create(req, res) {
    try {
      console.log(req.body);
      const [newHealthRecord] = await Promise.all([
        HealthRecord.create(req.body),
        createActivity('tao_phieu_sieu_am'),
      ]);
      return res.status(200).json(newHealthRecord);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
  async get(req, res) {
    try {
      const { searchText, type } = req.query;
      const isPatient = type === 'patient';
      const includeQueries = [
        {
          model: isPatient ? Patient : Doctor,
          as: isPatient ? 'benh_nhan' : 'bac_si',
          where: {
            ho_va_ten: {
              [Op.like]: `%${searchText}%`,
            },
          },
        },
        {
          model: isPatient ? Doctor : Patient,
          as: isPatient ? 'bac_si' : 'benh_nhan',
        },
      ];
      const healthRecords = await HealthRecord.findAll({
        include: includeQueries,
      });
      return res.status(200).json(healthRecords);
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
  async getByPK(req, res) {
    try {
      const { id } = req.params;
      const healthRecord = await HealthRecord.findByPk(id, {
        include: [
          {
            model: Patient,
            as: 'benh_nhan',
          },
          {
            model: Doctor,
            as: 'bac_si',
          },
        ],
      });
      return res.status(200).json(healthRecord);
    } catch (e) {
      return res.status(500).json(e);
    }
  }
  async search() {}
  async print() {}
}

module.exports = new HealthRecordController();
