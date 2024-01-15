const { Op } = require('sequelize');
const Activity = require('../models/Activity.model');

async function createActivity(event, id_bac_si) {
  return Activity.create({
    event,
    id_bac_si,
  });
}

async function getActivityCount({
  event,
  id_bac_si = '',
  fromDate = new Date(),
  toDate = new Date(),
}) {
  if (id_bac_si) {
    query['id_bac_si'] = id_bac_si;
  }
  const { count } = await Activity.findAndCountAll({
    where: {
      event,
      createdAt: {
        [Op.lt]: toDate,
        [Op.gt]: fromDate,
      },
    },
  });
  return count;
}

async function getReport() {}

module.exports = { createActivity, getActivityCount };
