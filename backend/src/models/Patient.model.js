const sequelize = require('../utils/sequelize');
const { DataTypes } = require('sequelize');

const Patient = sequelize.define('benh_nhan', {
  id_benh_nhan: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  ho_va_ten: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  can_cuoc: {
    type: DataTypes.STRING,
  },
  so_dien_thoai: {
    type: DataTypes.STRING,
  },
  ngay_sinh: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  gioi_tinh: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dia_chi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Patient;
