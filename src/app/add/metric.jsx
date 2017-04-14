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

export default class AddMetric extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      metricName: '',
      metricType: 1,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);

    this.saveMetric = this.saveMetric.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleNameChange(event) {
    this.setState({
      metricName: event.target.value,
    });
  }

  handleTypeChange(event, index, value) {
    this.setState({
      metricType: value,
    });
  }

  saveMetric() {
    Data.writeUser('metric', {
      name: this.state.metricName,
      type: this.state.metricType,
    });
    this.props.close();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary
        onTouchTap={this.props.close}
      />,
      <FlatButton
        label="Submit"
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
          <MenuItem value={1} primaryText="Number" />
          <MenuItem value={2} primaryText="Yes/No" />
        </SelectField>
      </Dialog>
    );
  }
}

AddMetric.propTypes = {
  open: React.PropTypes.bool.isRequired,
  close: React.PropTypes.func.isRequired,
};
