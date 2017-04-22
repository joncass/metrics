// React library
import React from 'react';

// My library
import Data from '../../data';
import DateUtil from '../../util/date';

export default class ChartItemNumber extends React.Component {
  constructor(props) {
    super(props);

    this.metricName = props.metricName;

    Data.readUserAndListen(`entry/${props.metricID}`, this.setChartData);
  }

  componentDidMount = () => {
    apisReady.then(
      (apis) => {
        const gCharts = apis.gCharts;
        this.dataTable = new gCharts.visualization.DataTable();
        this.dataTable.addColumn({ type: 'date', id: 'Date' });
        this.dataTable.addColumn({ type: 'number', id: 'Number' });

        this.chart = new gCharts.visualization.ColumnChart(this.chartEl);

        this.chartOptions = {
          legend: 'none',
          height: 140,
          fontSize: 8,
        };
      },
      (error) => {
        throw error;
      },
    );
  }

  setChartData = (entries) => {
    const entriesArray = [];
    let total = 0;
    Object.keys(entries || {}).forEach((key) => {
      const entry = entries[key];
      entriesArray.push([DateUtil.stringToDate(entry.date), entry.number]);
      total += entry.number;
    });

    this.chartOptions.title = `${this.metricName}\nTotal: ${total}`;
    this.dataTable.addRows(entriesArray);
    this.chart.draw(this.dataTable, this.chartOptions);
  }

  render = () => (
    <div
      ref={(el) => {
        this.chartEl = el;
      }}
      style={{
        padding: '20px',
      }}
    />
  );
}

ChartItemNumber.propTypes = {
  metricID: React.PropTypes.string.isRequired,
  metricName: React.PropTypes.string.isRequired,
};
