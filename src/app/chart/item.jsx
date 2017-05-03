// React library
import React from 'react';

// Material library
import { Card, CardActions, CardTitle } from 'material-ui/Card';

// Material icons
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';

// My library
import Confirm from '../components/confirm';
import DateUtil from '../util/date';
import EntryData from '../data/entry';
import MetricData from '../data/metric';
import MetricTypeUtil from '../util/metric/type';

export default class ChartItem extends React.Component {
  constructor(props) {
    super(props);

    this.metricID = props.metricID;
    this.state = {
      deletingMetric: false,
    };

    EntryData.getEntriesAndListen(this.metricID, this.setEntryProps);
    MetricData.getMetricAndListen(this.metricID, this.setMetricProps);
  }

  setEntryProps = (entries) => {
    let total = 0;
    Object.keys(entries || {}).forEach((key) => {
      const entry = entries[key];
      total += entry.number || 0;
    });

    let subtitle;
    if (total) {
      subtitle = `Total ${total}`;
    }
    else {
      const recentSortedEntries = Object.values(entries || {}).filter(entry => (
        entry.date > DateUtil.startOfLastYear()
      )).sort((a, b) => (
        a.date < b.date ? -1 : 1
      ));

      if (recentSortedEntries.length) {
        const numEntries = recentSortedEntries.length;
        const firstDate = DateUtil.stringToDate(recentSortedEntries[0].date);
        const daysSinceFirstEntry = DateUtil.daysSince(firstDate);
        const percent = Math.round((numEntries / daysSinceFirstEntry) * 100);
        subtitle = `Consistency ${percent}%`;
      }
    }

    this.setState({ subtitle });
  }

  setMetricProps = (metric) => {
    if (metric) {
      this.setState({ name: metric.name });
      this.setState({ type: metric.type });

      const ItemType = MetricTypeUtil.chartItemForType(metric.type);
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
        subtitle={this.state.subtitle}
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
