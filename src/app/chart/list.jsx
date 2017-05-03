// React library
import React from 'react';

// Material library
import { Tab, Tabs } from 'material-ui/Tabs';

// My library
import ChartItem from '../chart/item';
import Data from '../data';
import Loading from '../components/loading';
import UserWelcome from '../welcome/user';

export default class Charts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

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
    <div>
      {
        this.state.metrics
        ?
          <div>
            {
              this.state.metrics.length
              ?
                <Tabs>
                  {
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
                  }
                </Tabs>
              :
                <UserWelcome />
            }
          </div>
        :
          null
      }
      {
        !this.state.metrics
        ?
          <Loading />
        :
          null
      }
    </div>
  );
}
