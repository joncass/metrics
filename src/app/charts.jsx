// React library
import React from 'react';

// Material library
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

// Material icons
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';

// My library
import Data from './data';

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
          this.state.metrics.map(metric => (
            <GridTile
              title={metric.name}
              actionIcon={<IconButton><AddCircleIcon /></IconButton>}
              key={metric.key}
            >
              <Paper style={{ width: '100%', height: '100%' }} zDepth={1} />
            </GridTile>
          ))
        }
      </GridList>
    );
  }
}
