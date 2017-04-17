// React library
import React from 'react';

// Material library
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

// My library
import Data from '../data';
import DateUtil from '../util/date';
import Util from '../util/metric/type';

export default class AddMetric extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metrics: [],
      selectedMetric: null,
      entryDate: null,
      entryNumber: null,
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
    this.setState({ selectedMetric: null });
    this.setState({ entryDate: null });
    this.setState({ entryNumber: null });
  }

  saveEntry = () => {
    Data.addToUserArray(`entry/${this.state.selectedMetric}`, {
      date: DateUtil.toString(this.state.entryDate),
      number: Number(this.state.entryNumber),
    });
    this.props.close();
    this.resetState();
  }

  handleMetricChange = (event, index, value) => {
    const selectedMetric = this.state.metrics.find(metric => (
      metric.key === value
    ));

    this.setState({
      requiresNumber: selectedMetric.type === Util.numberMetricType(),
    });

    this.setState({
      selectedMetric: value,
    });
  }

  handleDateChange = (event, date) => {
    this.setState({
      entryDate: date,
    });
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
          || !this.state.entryDate
        }
        onTouchTap={this.saveEntry}
      />,
    ];

    return (
      <Dialog
        title="Add Entry"
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
        <DatePicker
          autoOk
          hintText="Date"
          errorText={
            this.state.entryDate
            ?
              ''
            :
              'This field is required'
          }
          value={this.state.entryDate}
          onChange={this.handleDateChange}
        />
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
      </Dialog>
    );
  }
}

AddMetric.propTypes = {
  open: React.PropTypes.bool.isRequired,
  close: React.PropTypes.func.isRequired,
};
