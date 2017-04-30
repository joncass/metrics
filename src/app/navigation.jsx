// React library
import React from 'react';

// Material library
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

// Material icons
import InfoIcon from 'material-ui/svg-icons/action/info';

// My library
import AddMenu from './add';
import Login from './login';
import MetricsDrawer from './drawer';

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: false,
    };

    this.logOut = props.logOut;
    this.logIn = props.logIn;
  }

  toggleDrawer = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  render = () => (
    <div>
      <Toolbar>
        <ToolbarGroup firstChild>
          {
            this.props.loggedIn ? <AddMenu /> : null
          }
        </ToolbarGroup>
        <ToolbarGroup>
          {
            this.props.loggedIn
            ? <ToolbarTitle text="Dashboard" />
            : <ToolbarTitle text="Welcome" />
          }
        </ToolbarGroup>
        <ToolbarGroup>
          <Login
            logOut={this.logOut}
            logIn={this.logIn}
            loggedIn={this.props.loggedIn}
          />
          <IconButton
            touch
            onTouchTap={this.toggleDrawer}
            tooltip="Site info"
          >
            <InfoIcon />
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
      <MetricsDrawer
        open={this.state.drawerOpen}
        close={this.toggleDrawer}
      />
    </div>
  );
}

Navigation.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  logIn: React.PropTypes.func.isRequired,
  logOut: React.PropTypes.func.isRequired,
};
