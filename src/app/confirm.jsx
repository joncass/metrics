// React library
import React from 'react';

// Material library
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class AddMetric extends React.Component {
  constructor(props) {
    super(props);

    this.message = props.message;
  }

  render = () => {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary
        onTouchTap={this.props.cancel}
      />,
      <FlatButton
        label="Confirm"
        primary
        onTouchTap={this.props.confirm}
      />,
    ];

    return (
      <Dialog
        title="Delete Metric"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.cancel}
      >
        {this.message}
      </Dialog>
    );
  }
}

AddMetric.propTypes = {
  open: React.PropTypes.bool.isRequired,
  cancel: React.PropTypes.func.isRequired,
  confirm: React.PropTypes.func.isRequired,
  message: React.PropTypes.string,
};

AddMetric.defaultProps = {
  message: 'Are you sure?',
};
