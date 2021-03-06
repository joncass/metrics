// React library
import React from 'react';

// My library
import DateUtil from '../../util/date';
import EntryData from '../../data/entry';

export default class ChartItemBinary extends React.Component {
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
        this.dataTable.addColumn({ type: 'number', id: 'Yes/No' });
        this.dataTable.addColumn({ type: 'string', role: 'tooltip' });

        this.chart = new gCharts.visualization.Calendar(this.chartEl);
        gCharts.visualization.events.addListener(
          this.chart,
          'select',
          this.handleSelect,
        );

        this.chartOptions = {
          height: 200,
          calendar: {
            cellSize: 10,
          },
        };
      },
      (error) => {
        throw error;
      },
    );
  }

  setChartData = (entries) => {
    const entriesArray = Object.keys(entries || {}).filter(key => (
      entries[key].date > DateUtil.startOfLastYear()
    )).map((key) => {
      const entry = entries[key];
      return [
        DateUtil.stringToDate(entry.date),
        1,
        entry.note || 'completed',
      ];
    });

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

    const date = new Date(selection.date);

    if ('row' in selection) {
      EntryData.deleteEntry(this.metricID, DateUtil.toString(date));
    }
    else {
      EntryData.addEntry(this.metricID, EntryData.createEntry(date));
    }
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
};
