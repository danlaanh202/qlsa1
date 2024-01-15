const sequelize = require('../utils/sequelize');
const { DataTypes } = require('sequelize');

const Doctor = sequelize.define('bac_si', {
  id_bac_si: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  ho_va_ten: {
    type: DataTypes.STRING,
  },
  ngay_sinh: {
    type: DataTypes.DATE,
  },
  dia_chi: {
    type: DataTypes.STRING,
  },
  chuc_danh: {
    type: DataTypes.STRING,
  },
  so_dien_thoai: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  gioi_tinh: {
    type: DataTypes.STRING,
  },
});

module.exports = Doctor;
