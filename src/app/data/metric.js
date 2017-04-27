import Data from '../data';

export default {
  getMetricAndListen(metricID, callback) {
    const node = `metric/${metricID}`;
    Data.readUserAndListen(node, callback);
  },
  getMetricsAndListen(callback) {
    const node = 'metric';
    Data.readUserAndListen(node, callback);
  },
  deleteMetric(metricID) {
    Data.deleteUser(`metric/${metricID}`);
  },
};
