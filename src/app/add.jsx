// React library
import React from 'react';

// Material library
import Divider from 'material-ui/Divider';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';

// Material icons
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';

// My library
import AddEntry from './add/entry';
import AddHabit from './add/habit';
import AddMetric from './add/metric';

export default class AddMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addingEntry: false,
      addingHabit: false,
      addingMetric: false,
    };
  }

  handleSelect = () => {
    this.setState({});
  }

  render = () => (
    <div>
      <IconMenu
        iconButtonElement={
          <IconButton touch>
            <AddCircleIcon />
          </IconButton>
        }
      >
        <MenuItem
          primaryText="Add entry"
          onClick={() => this.setState({ addingEntry: true })}
        />
        <MenuItem
          primaryText="Add habit"
          onClick={() => this.setState({ addingHabit: true })}
        />
        <Divider />
        <MenuItem
          primaryText="Add metric"
          onClick={() => this.setState({ addingMetric: true })}
        />
      </IconMenu>
      <AddEntry
        open={this.state.addingEntry}
        close={() => this.setState({ addingEntry: false })}
      />
      <AddHabit
        open={this.state.addingHabit}
        close={() => this.setState({ addingHabit: false })}
      />
      <AddMetric
        open={this.state.addingMetric}
        close={() => this.setState({ addingMetric: false })}
      />
    </div>
  );
}
