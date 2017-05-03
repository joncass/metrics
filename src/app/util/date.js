export default {
  toString(date) {
    return date.toISOString().split(/T/)[0];
  },
  toLocalString(date) {
    const localDateComps = date.toLocaleDateString().split('/');
    const year = localDateComps[2];
    let month = localDateComps[0];
    let day = localDateComps[1];

    if (month.length === 1) {
      month = `0${month}`;
    }
    if (day.length === 1) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  },
  localToday() {
    return this.toLocalString(new Date());
  },
  stringToDate(dateString) {
    const dateData = dateString.split(/-/);
    const year = Number(dateData[0]);
    const month = Number(dateData[1]) - 1;
    const day = Number(dateData[2]);
    return new Date(year, month, day);
  },
  daysSince(date) {
    const now = new Date();
    return (now.getTime() - date.getTime()) / (24 * 60 * 60 * 1000);
  },
};
