// My library
import ChartItemBinary from '../../chart/item/binary';
import ChartItemNumber from '../../chart/item/number';

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
  numberMetricChartItem() {
    return ChartItemNumber;
  },
  binaryMetricChartItem() {
    return ChartItemBinary;
  },
  chartItemForType(type) {
    if (type === this.numberMetricType()) {
      return this.numberMetricChartItem();
    }
    else if (type === this.binaryMetricType()) {
      return this.binaryMetricChartItem();
    }

    throw new Error('Invalid metric type.');
  },
};
