// React library
import React from 'react';

// My library
import Data from '../../data';

export default class ChartItemNumber extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metricID: props.metricID,
      metricName: props.metricName,
      entries: [],
    };

    Data.readUserAndListen(`entry/${props.metricID}`, this.setChartData);
  }

  setChartData = (entries) => {
    const entriesArray = Object.keys(entries || {}).map((key) => {
      const entry = entries[key];
      entry.key = key;
      return entry;
    });

    this.setState({ entries: entriesArray });
  }

  render = () => (
    <div>
      {this.state.entries.map(entry => (
        <div key={entry.key}>
          <div>
            {entry.number} on {entry.date}
          </div>
        </div>
      ))}
    </div>
  );
}

ChartItemNumber.propTypes = {
  metricID: React.PropTypes.string.isRequired,
  metricName: React.PropTypes.string.isRequired,
};
