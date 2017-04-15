// React library
import React from 'react';

// Material library
import { GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

// My library
import Data from '../data';

export default class ChartItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metricID: props.metricID,
    };

    this.setChartProperties = this.setChartProperties.bind(this);
    Data.readUser(`metric/${props.metricID}`, this.setChartProperties);
  }

  setChartProperties(metric) {
    this.setState({ name: metric.name });
    this.setState({ type: metric.type });
  }

  render() {
    return (
      <GridTile
        title={this.state.name}
        subtitle={this.state.type}
      >
        <Paper style={{ width: '100%', height: '100%' }} zDepth={1} />
      </GridTile>
    );
  }
}

ChartItem.propTypes = {
  metricID: React.PropTypes.string.isRequired,
};
