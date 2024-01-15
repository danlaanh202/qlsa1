const moment = require('moment/moment');

const THIS_MONTH = 'this_month';
const THIS_WEEK = 'this_week';
const LAST_MONTH = 'last_month';
const LAST_WEEK = 'last_week';
const WEEK = 'week';
const MONTH = 'month';

const dateRangeList = [THIS_WEEK, THIS_MONTH, LAST_WEEK, LAST_MONTH];

/**
 *
 * @param {number} previousNumber
 * @param dateType
 * @returns {{previousRange: {fromDate: Date, toDate: Date}, currentRange: {fromDate: Date, toDate: Date}}}
 */
function getPreviousDateRange(previousNumber = 0, dateType = WEEK) {
  moment.updateLocale('en', {
    week: {
      dow: 1, // Monday is the first day of the week.
    },
  });
  const thisStart = moment().startOf(dateType).subtract(previousNumber, dateType);

  // console.log({ thisStart });
  // console.log({ subtract: thisStart.clone().add(1, 'week') });
  return {
    currentRange: {
      fromDate: thisStart.toDate(),
      toDate: thisStart.clone().add(1, dateType).toDate(),
    },
    previousRange: {
      fromDate: thisStart.clone().subtract(1, dateType).toDate(),
      toDate: thisStart.toDate(),
    },
  };
}

/**
 *
 * @param {string} dateRangeType
 * @returns {{previousRange: {fromDate: Date, toDate: Date}, currentRange: {fromDate: Date, toDate: Date}}}
 */
function mappingDateRange(dateRangeType = THIS_WEEK) {
  switch (dateRangeType) {
    case THIS_WEEK:
      return getPreviousDateRange(0, WEEK);
    case LAST_WEEK:
      return getPreviousDateRange(1, WEEK);
    case THIS_MONTH:
      return getPreviousDateRange(0, MONTH);
    case LAST_MONTH:
      return getPreviousDateRange(1, MONTH);
    default:
      break;
  }
}

module.exports = {
  THIS_MONTH,
  THIS_WEEK,
  LAST_MONTH,
  LAST_WEEK,
  WEEK,
  MONTH,
  dateRangeList,
  mappingDateRange,
};
