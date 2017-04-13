// React library
import React from 'react';

// Material library
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

// Material icons
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import CodeIcon from 'material-ui/svg-icons/action/code';
import CopyrightIcon from 'material-ui/svg-icons/action/copyright';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import InfoIcon from 'material-ui/svg-icons/action/info';
import LayersIcon from 'material-ui/svg-icons/maps/layers';

// My library
import AddMenu from './add';
import Login from './login';

function externalLink(url) {
  return function windowOpen() {
    window.open(url);
  };
}

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { drawerOpen: false };
    this.openDrawer = this.openDrawer.bind(this);
  }

  openDrawer() {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  }

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild>
            <AddMenu />
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text="Dashboard" />
          </ToolbarGroup>
          <ToolbarGroup>
            <Login />
            <IconButton touch onTouchTap={this.openDrawer}>
              <InfoIcon />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
        <Drawer openSecondary open={this.state.drawerOpen}>
          <Toolbar>
            <ToolbarGroup>
              <ToolbarTitle text="Site info" />
            </ToolbarGroup>
            <ToolbarGroup>
              <IconButton touch onTouchTap={this.openDrawer}>
                <CloseIcon />
              </IconButton>
            </ToolbarGroup>
          </Toolbar>
          <List>
            <ListItem
              primaryText="Source"
              leftIcon={<CodeIcon />}
              onClick={
                externalLink('https://github.com/joncass/metrics')
              }
            />
            <ListItem
              primaryText="Contact"
              leftIcon={<EmailIcon />}
              onClick={
                externalLink('mailto:joncass@gmail.com')
              }
            />
            <ListItem
              primaryText="2017"
              leftIcon={<CopyrightIcon />}
              disabled
            />
          </List>
          <Divider />
          <List>
            <Subheader>Powered by</Subheader>
            <ListItem
              primaryText="Material UI"
              leftIcon={<LayersIcon />}
              onClick={
                externalLink('http://material-ui.com/')
              }
            />
          </List>
        </Drawer>
      </div>
    );
  }
}
