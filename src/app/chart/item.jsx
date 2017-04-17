// React library
import React from 'react';

// Material library
import { GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

// My library
import Data from '../data';
import MetricTypeUtil from '../util/metric/type';

export default class ChartItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metricID: props.metricID,
    };

    Data.readUser(`metric/${props.metricID}`, this.setChartProperties);
  }

  setChartProperties = (metric) => {
    this.setState({ name: metric.name });
    this.setState({ type: metric.type });

    const ItemType = MetricTypeUtil.chartItemForType(this.state.type);
    this.setState({ itemType: ItemType });
  }

  render = () => (
    <GridTile>
      <Paper style={{ width: '100%', height: '100%' }}>
        {
          this.state.itemType
          ?
            <this.state.itemType
              metricID={this.state.metricID}
              metricName={this.state.name}
            />
          :
            null
        }
      </Paper>
    </GridTile>
  );
}

ChartItem.propTypes = {
  metricID: React.PropTypes.string.isRequired,
};
