// React library
import React from 'react';

// Material library
import { GridList } from 'material-ui/GridList';

// My library
import ChartItem from './item';
import Data from '../data';

export default class Charts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metrics: [],
    };

    this.setMetrics = this.setMetrics.bind(this);
    Data.readUserAndListen('metric', this.setMetrics);
  }

  setMetrics(metrics) {
    const metricsArray = Object.keys(metrics || {}).map((key) => {
      const val = metrics[key];
      val.key = key;
      return val;
    });

    this.setState({ metrics: metricsArray });
  }

  render() {
    return (
      <GridList
        cellHeight={180}
        style={{ width: '98%', padding: '1%' }}
      >
        {
          this.state.metrics.length
          ?
            this.state.metrics.map(metric => (
              <ChartItem
                key={metric.key}
                metricID={metric.key}
              />
            ))
          :
            null
        }
      </GridList>
    );
  }
}
