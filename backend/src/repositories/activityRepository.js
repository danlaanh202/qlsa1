const { Op } = require('sequelize');
const Activity = require('../models/Activity.model');

async function createActivity(event, id_bac_si) {
  return Activity.create({
    event,
    id_bac_si,
  });
}

async function getActivityCount({ event, id_bac_si = '', from = new Date(), to = new Date() }) {
  if (id_bac_si) {
    query['id_bac_si'] = id_bac_si;
  }
  console.log(from, to);
  const { count } = await Activity.findAndCountAll({
    where: {
      event,
      createdAt: {
        [Op.lt]: to,
        [Op.gt]: from,
      },
    },
  });
  return count;
}

async function getReport() {}

module.exports = { createActivity, getActivityCount };
