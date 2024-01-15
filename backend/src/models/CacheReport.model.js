const sequelize = require('../utils/sequelize');
const { DataTypes } = require('sequelize');

const CacheReport = sequelize.define('cacheReport', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  expiredAt: {
    type: DataTypes.STRING,
  },
  cacheType: {
    type: DataTypes.STRING,
  },
  cacheData: {
    type: DataTypes.STRING,
  },
});

module.exports = CacheReport;
