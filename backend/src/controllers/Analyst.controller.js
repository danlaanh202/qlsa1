const { mappingDateRange } = require('../helpers/dateHelpers');
const { getActivityCount } = require('../repositories/activityRepository');
const getHealthRecordSummary = require('../repositories/healthRecordRepository');
class AnalystController {
  constructor() {}
  async get(req, res) {
    try {
      const { dateRangeType } = req.params;
      const { currentRange, previousRange } = mappingDateRange(dateRangeType);

      const [
        currentHealthInfoCount,
        previousHealthInfoCount,
        currentPatientCount,
        previousPatientCount,
        currentSummary,
        previousSummary,
      ] = await Promise.all([
        getActivityCount({ event: 'tao_phieu_sieu_am', ...currentRange }),
        getActivityCount({ event: 'tao_phieu_sieu_am', ...previousRange }),
        getActivityCount({ event: 'tao_benh_nhan', ...currentRange }),
        getActivityCount({ event: 'tao_benh_nhan', ...previousRange }),
        getHealthRecordSummary({ ...currentRange }),
        getHealthRecordSummary({ ...previousRange }),
      ]);
      return res.status(200).json({
        currentHealthInfoCount,
        currentPatientCount,
        previousHealthInfoCount,
        previousPatientCount,
        currentSummary,
        previousSummary,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json(e);
    }
  }
}

module.exports = new AnalystController();
