const sequelize = require('../utils/sequelize');
const { DataTypes } = require('sequelize');
const Doctor = require('./Doctor.model');

const Activity = sequelize.define('activity', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  event: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_bac_si: {
    type: DataTypes.UUID,
    references: {
      model: Doctor,
      key: 'id_bac_si',
    },
  },
});

Activity.belongsTo(Doctor, {
  foreignKey: 'id_bac_si',
});

module.exports = Activity;
