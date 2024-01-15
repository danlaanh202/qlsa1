const sequelize = require('../utils/sequelize');
const { DataTypes } = require('sequelize');
const Patient = require('./Patient.model');
const Doctor = require('./Doctor.model');

const HealthRecord = sequelize.define('phieu_kham', {
  id_phieu_kham: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  id_benh_nhan: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Patient,
      key: 'id_benh_nhan',
    },
  },
  id_bac_si: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Doctor,
      key: 'id_bac_si',
    },
  },
  ket_qua: {
    type: DataTypes.TEXT,
  },
  ket_luan: {
    type: DataTypes.TEXT,
  },
  hinh_sieu_am: {
    type: DataTypes.TEXT,
  },
  chi_phi: {
    type: DataTypes.DOUBLE,
  },
});

HealthRecord.belongsTo(Patient, {
  foreignKey: 'id_benh_nhan',
});

HealthRecord.belongsTo(Doctor, {
  foreignKey: 'id_bac_si',
});

module.exports = HealthRecord;
