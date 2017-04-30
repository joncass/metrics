// React library
import React from 'react';

// My library
import DateUtil from '../../util/date';
import EntryData from '../../data/entry';

export default class ChartItemNumber extends React.Component {
  constructor(props) {
    super(props);

    this.metricID = props.metricID;

    EntryData.getEntriesAndListen(this.metricID, this.setChartData);
  }

  componentDidMount = () => {
    apisReady.then(
      (apis) => {
        const gCharts = apis.gCharts;
        this.dataTable = new gCharts.visualization.DataTable();
        this.dataTable.addColumn({ type: 'date', id: 'Date' });
        this.dataTable.addColumn({ type: 'number', id: 'Number' });

        this.chart = new gCharts.visualization.ColumnChart(this.chartEl);
        gCharts.visualization.events.addListener(
          this.chart,
          'select',
          this.handleSelect,
        );

        this.chartOptions = {
          legend: 'none',
          height: 200,
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

    this.chartOptions.title = `Total: ${total}`;

    const numberOfRows = this.dataTable.getNumberOfRows();
    if (numberOfRows) {
      this.dataTable.removeRows(0, numberOfRows + 1);
    }

    this.dataTable.addRows(entriesArray);
    this.chart.draw(this.dataTable, this.chartOptions);
  }

  handleSelect = () => {
    const selectionArray = this.chart.getSelection();
    const selection = selectionArray[0];

    const date = this.dataTable.getValue(selection.row, selection.column - 1);
    EntryData.deleteEntry(this.metricID, DateUtil.toString(date));
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
};
