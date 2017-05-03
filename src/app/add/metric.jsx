// React library
import React from 'react';

// Material library
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

// My library
import MetricData from '../data/metric';
import MetricTypeUtil from '../util/metric/type';

export default class AddMetric extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metricName: '',
      metricType: 1,
    };
  }

  resetState = () => {
    this.setState({ metricName: '' });
    this.setState({ metricType: 1 });
  }

  handleNameChange = (event) => {
    this.setState({
      metricName: event.target.value,
    });
  }

  handleTypeChange = (event, index, value) => {
    this.setState({
      metricType: value,
    });
  }

  saveMetric = () => {
    MetricData.addMetric({
      name: this.state.metricName,
      type: this.state.metricType,
    });
    this.props.close();
    this.resetState();
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
          !this.state.metricName
          || !this.state.metricType
        }
        onTouchTap={this.saveMetric}
      />,
    ];

    return (
      <Dialog
        title="Add Metric"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.close}
      >
        <TextField
          floatingLabelText="Name"
          errorText={
            this.state.metricName
            ?
              ''
            :
              'This field is required'
          }
          value={this.state.metricName}
          onChange={this.handleNameChange}
        />
        <br />
        <SelectField
          floatingLabelText="Type"
          value={this.state.metricType}
          onChange={this.handleTypeChange}
        >
          {
            MetricTypeUtil.metricTypes().map(type => (
              <MenuItem
                key={type.id}
                value={type.id}
                primaryText={type.description}
              />
            ))
          }
        </SelectField>
      </Dialog>
    );
  }
}

AddMetric.propTypes = {
  open: React.PropTypes.bool.isRequired,
  close: React.PropTypes.func.isRequired,
};
