// React library
import React from 'react';

// My library
import Data from '../../data';

export default class ChartItemBinary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metricID: props.metricID,
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
            {entry.date}
          </div>
        </div>
      ))}
    </div>
  );
}

ChartItemBinary.propTypes = {
  metricID: React.PropTypes.string.isRequired,
};
