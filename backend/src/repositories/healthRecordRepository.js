const { Op } = require('sequelize');
const HealthRecord = require('../models/HealthRecord.model');

async function getHealthRecordSummary({ fromDate, toDate }) {
  const resp = await HealthRecord.sum('chi_phi', {
    where: {
      createdAt: {
        [Op.lt]: toDate,
        [Op.gt]: fromDate,
      },
    },
  });
  return resp || 0;
}

module.exports = getHealthRecordSummary;
