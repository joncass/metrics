// React library
import React from 'react';

// Material library
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

// My library
import Data from '../data';
import Util from '../util/metric/type';

export default class AddHabit extends React.Component {
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

  resetState = () => {
    this.props.close();
    this.setState({ selectedMetric: null });
    this.setState({ entryNumber: null });
  }

  saveHabit = () => {
    const habitToSave = {};

    if (this.state.entryNumber) {
      habitToSave.number = Number(this.state.entryNumber);
    }

    Data.writeUser(`habit/${this.state.selectedMetric}`, habitToSave);
    this.resetState();
  }

  handleMetricChange = (event, index, value) => {
    const selectedMetric = this.state.metrics.find(metric => (
      metric.key === value
    ));

    const requiresNumber = selectedMetric.type === Util.numberMetricType();

    this.setState({
      requiresNumber,
    });

    this.setState({
      selectedMetric: value,
    });

    if (!requiresNumber) {
      this.setState({
        entryNumber: null,
      });
    }
  }

  handleNumberChange = (event) => {
    this.setState({
      entryNumber: event.target.value,
    });
  }

  render = () => {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary
        onTouchTap={this.props.close}
      />,
      <FlatButton
        label="Add"
        primary
        disabled={
          !this.state.selectedMetric
          ||
            !(
              this.state.requiresNumber
              ?
                this.state.entryNumber
              :
                true
            )
        }
        onTouchTap={this.saveHabit}
      />,
    ];

    return (
      <Dialog
        title="Add Habit"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.close}
      >
        <SelectField
          floatingLabelText="Metric"
          value={this.state.selectedMetric}
          onChange={this.handleMetricChange}
        >
          {
            this.state.metrics.length
            ?
              /* Note: have to pass key to make material UI happy, but have to
                pass metricID since key is reserved by React. */
              this.state.metrics.map(metric => (
                <MenuItem
                  key={metric.key}
                  value={metric.key}
                  primaryText={metric.name}
                />
              ))
            :
              null
          }
        </SelectField>
        <div>
          {
            this.state.requiresNumber
            ?
              <TextField
                type="number"
                floatingLabelText="Number"
                errorText={
                  this.state.entryNumber
                  ?
                    ''
                  :
                    'This field is required'
                }
                value={this.state.entryNumber || ''}
                onChange={this.handleNumberChange}
              />
            :
              null
          }
        </div>
      </Dialog>
    );
  }
}

AddHabit.propTypes = {
  open: React.PropTypes.bool.isRequired,
  close: React.PropTypes.func.isRequired,
};
