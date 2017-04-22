// React library
import React from 'react';

// Material colors
import { grey900 } from 'material-ui/styles/colors';

// My library
import Data from '../../data';
import DateUtil from '../../util/date';

export default class ChartItemBinary extends React.Component {
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
        this.dataTable.addColumn({ type: 'number', id: 'Yes/No' });

        this.chart = new gCharts.visualization.Calendar(this.chartEl);

        this.chartOptions = {
          height: 180,
          calendar: {
            cellSize: 10,
          },
          noDataPattern: {
            backgroundColor: grey900,
            color: grey900,
          },
        };
      },
      (error) => {
        throw error;
      },
    );
  }

  setChartData = (entries) => {
    const entriesArray = Object.keys(entries || {}).map((key) => {
      const entry = entries[key];
      return [DateUtil.stringToDate(entry.date), 1];
    }).sort((a, b) => {
      if (a[0].getTime() < b[0].getTime()) {
        return 1;
      }
      return -1;
    });

    let index = 0;
    let mostRecent = entriesArray[index];
    let inARow = mostRecent;
    while (inARow) {
      index += 1;
      const nextRecent = entriesArray[index];
      inARow = nextRecent && (mostRecent[0] - nextRecent[0] <= 86400000);
      mostRecent = nextRecent;
    }

    this.chartOptions.title = `${this.metricName} ... streak: ${index}`;

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

ChartItemBinary.propTypes = {
  metricID: React.PropTypes.string.isRequired,
  metricName: React.PropTypes.string.isRequired,
};
