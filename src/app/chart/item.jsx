// React library
import React from 'react';

// Material library
import { GridTile } from 'material-ui/GridList';
import Paper from 'material-ui/Paper';

// Material icons
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';

// My library
import Confirm from '../confirm';
import MetricData from '../data/metric';
import MetricTypeUtil from '../util/metric/type';

export default class ChartItem extends React.Component {
  constructor(props) {
    super(props);

    this.metricID = props.metricID;
    this.state = {
      deletingMetric: false,
    };

    MetricData.getMetricAndListen(this.metricID, this.setChartProperties);
  }

  setChartProperties = (metric) => {
    if (metric) {
      this.setState({ name: metric.name });
      this.setState({ type: metric.type });

      const ItemType = MetricTypeUtil.chartItemForType(this.state.type);
      this.setState({ itemType: ItemType });
    }
    else {
      this.setState({ name: undefined });
      this.setState({ type: undefined });
      this.setState({ itemType: undefined });
    }
  }

  deleteMetric = () => {
    MetricData.deleteMetric(this.metricID);

    this.setState({ deletingMetric: false });
  }

  render = () => (
    <GridTile
      title={this.state.name}
      actionIcon={
        <IconButton>
          <DeleteIcon
            onClick={() => this.setState({ deletingMetric: true })}
          />
        </IconButton>
      }
    >
      <Paper style={{ width: '100%', height: '100%' }}>
        {
          this.state.itemType
          ?
            <this.state.itemType
              metricID={this.metricID}
            />
          :
            null
        }
      </Paper>
      {
        this.state.name
        ?
          <Confirm
            title={`Delete ${this.state.name}`}
            message={
              `Are you sure you want to delete the metric "${this.state.name}"?
              This action cannot be undone!`
            }
            metricName={this.state.name}
            open={this.state.deletingMetric}
            cancel={() => this.setState({ deletingMetric: false })}
            confirm={this.deleteMetric}
          />
        :
          null
      }
    </GridTile>
  );
}

ChartItem.propTypes = {
  metricID: React.PropTypes.string.isRequired,
};
