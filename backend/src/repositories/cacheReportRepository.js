const CacheReport = require('../models/CacheReport.model');

const prepareCacheDoc = (cacheReport) => {
  return { ...cacheReport, cacheData: JSON.parse(cacheReport.cacheData) };
};
const prepareSaveDoc = (data) => {
  return { ...data, cacheData: JSON.stringify(data.cacheData) };
};

export async function createCacheReport(data) {
  return CacheReport.create(prepareSaveDoc(data));
}

export async function getCacheReportByType(cacheType = '') {
  const cacheReport = await CacheReport.findOne({
    where: {
      cacheType,
    },
  });
  return prepareCacheDoc(cacheReport);
}
