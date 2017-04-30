// React library
import React from 'react';

// Material library
import { Card, CardActions, CardTitle } from 'material-ui/Card';

// Material icons
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';

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
    <Card style={{ margin: '20px' }}>
      <CardTitle
        title={this.state.name}
      />
      {
        this.state.itemType
        ?
          <this.state.itemType
            metricID={this.metricID}
          />
        :
          null
      }
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
      <CardActions>
        <FlatButton
          label="delete"
          primary
          icon={<DeleteIcon />}
          onClick={() => this.setState({ deletingMetric: true })}
        />
      </CardActions>
    </Card>
  );
}

ChartItem.propTypes = {
  metricID: React.PropTypes.string.isRequired,
};
