export default {
  toString(date) {
    return date.toISOString().split(/T/)[0];
  },
  stringToDate(dateString) {
    const dateData = dateString.split(/-/);
    const year = Number(dateData[0]);
    const month = Number(dateData[1]) - 1;
    const day = Number(dateData[2]);
    return new Date(year, month, day);
  },
};
