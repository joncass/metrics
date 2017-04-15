export default {
  toString(date) {
    return date.toISOString().split(/T/)[0];
  },
};
