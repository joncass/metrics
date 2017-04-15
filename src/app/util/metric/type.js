export default {
  metricTypes() {
    return [
      {
        id: this.numberMetricType(),
        name: 'NUMBER',
        description: 'Number',
      },
      {
        id: this.binaryMetricType(),
        name: 'BINARY',
        description: 'Yes/No',
      },
    ];
  },
  numberMetricType() {
    return 1;
  },
  binaryMetricType() {
    return 2;
  },
};
