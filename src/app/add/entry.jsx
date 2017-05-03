// React library
import React from 'react';

// Material library
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

// My library
import EntryData from '../data/entry';
import MetricData from '../data/metric';
import Util from '../util/metric/type';

export default class AddEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metrics: [],
      dateRange: false,
    };

    MetricData.getMetricsAndListen(this.setMetrics);
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
    this.setState({ entryDate: null });
    this.setState({ startDate: null });
    this.setState({ endDate: null });
    this.setState({ entryNumber: null });
    this.setState({ dateRange: false });
    this.setState({ entryNote: null });
  }

  saveEntry = () => {
    const entry = EntryData.createEntry(
      this.state.entryDate,
      this.state.entryNumber,
      this.state.entryNote,
    );

    EntryData.addEntry(this.state.selectedMetric, entry);
    this.resetState();
  }

  saveEntries = () => {
    const entries = [];
    const start = this.state.startDate;
    const end = this.state.endDate;
    while (start.getTime() <= end.getTime()) {
      entries.push(EntryData.createEntry(start, this.state.entryNumber));
      start.setDate(start.getDate() + 1);
    }

    EntryData.addEntries(this.state.selectedMetric, entries);
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

  handleDateChange = (event, date) => {
    this.setState({
      entryDate: date,
    });
  }

  handleStartDateChange = (event, date) => {
    this.setState({
      startDate: date,
    });
  }

  handleEndDateChange = (event, date) => {
    this.setState({
      endDate: date,
    });
  }

  handleNumberChange = (event) => {
    this.setState({
      entryNumber: event.target.value,
    });
  }

  handleNoteChange = (event) => {
    this.setState({
      entryNote: event.target.value,
    });
  }

  handleDateRangeToggle = () => {
    const currentState = this.state.dateRange;
    this.setState({
      dateRange: !currentState,
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
          ||
            !(
              this.state.dateRange
              ?
                this.state.startDate && this.state.endDate
              :
                this.state.entryDate
            )
        }
        onTouchTap={this.state.dateRange ? this.saveEntries : this.saveEntry}
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
        <Toggle
          label="Date range"
          labelPosition="right"
          toggled={this.state.dateRange}
          onToggle={this.handleDateRangeToggle}
        />
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
        {
          !this.state.dateRange
          ?
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
          :
            null
        }
        {
          this.state.dateRange
          ?
            <div>
              <DatePicker
                autoOk
                hintText="Start date"
                errorText={
                  this.state.startDate
                  ?
                    ''
                  :
                    'This field is required'
                }
                value={this.state.startDate}
                onChange={this.handleStartDateChange}
              />
              <DatePicker
                autoOk
                hintText="End date"
                errorText={
                  this.state.endDate
                  ?
                    ''
                  :
                    'This field is required'
                }
                value={this.state.endDate}
                onChange={this.handleEndDateChange}
              />
            </div>
          :
            null
        }
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
            <TextField
              floatingLabelText="Note"
              value={this.state.entryNote || ''}
              onChange={this.handleNoteChange}
            />
        }
      </Dialog>
    );
  }
}

AddEntry.propTypes = {
  open: React.PropTypes.bool.isRequired,
  close: React.PropTypes.func.isRequired,
};
