// React library
import React from 'react';

// Material library
import { Tab, Tabs } from 'material-ui/Tabs';

// My library
import ChartItem from '../chart/item';
import Data from '../data';

export default class Charts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metrics: [],
    };

    Data.readUserAndListen('metric', this.setMetrics);
  }

  setMetrics = (metrics) => {
    const metricsArray = Object.keys(metrics || {}).map((key) => {
      const val = metrics[key];
      val.key = key;
      return val;
    });

    this.setState({ metrics: metricsArray });
  }

  render = () => (
    <Tabs>
      {
        this.state.metrics.length
        ?
          this.state.metrics.map(metric => (
            <Tab
              label={metric.name}
              key={metric.key}
            >
              <ChartItem
                metricID={metric.key}
              />
            </Tab>
          ))
        :
          null
      }
    </Tabs>
  );
}
