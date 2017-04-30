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
import BuildIcon from 'material-ui/svg-icons/action/build';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import CodeIcon from 'material-ui/svg-icons/action/code';
import CopyrightIcon from 'material-ui/svg-icons/action/copyright';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import ForwardIcon from 'material-ui/svg-icons/content/forward';
import LayersIcon from 'material-ui/svg-icons/maps/layers';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';
import StorageIcon from 'material-ui/svg-icons/device/storage';

/**
 * @param {string} url The url to open
 * @returns {void}
 */
function externalLink(url) {
  return function windowOpen() {
    window.open(url);
  };
}

export default class MetricsDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.close = props.close;
  }

  render = () => (
    <Drawer openSecondary open={this.props.open}>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Site info" />
        </ToolbarGroup>
        <ToolbarGroup>
          <IconButton touch onTouchTap={this.close}>
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
        <ListItem
          primaryText="React"
          leftIcon={<RefreshIcon />}
          onClick={
            externalLink('https://facebook.github.io/react/')
          }
        />
        <ListItem
          primaryText="Webpack"
          leftIcon={<ForwardIcon />}
          onClick={
            externalLink('https://webpack.github.io/')
          }
        />
        <ListItem
          primaryText="Firebase"
          leftIcon={<StorageIcon />}
          onClick={
            externalLink('https://firebase.google.com')
          }
        />
        <ListItem
          primaryText="Travis CI"
          leftIcon={<BuildIcon />}
          onClick={
            externalLink('https://travis-ci.org')
          }
        />
      </List>
    </Drawer>
  );
}

MetricsDrawer.propTypes = {
  close: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool.isRequired,
};
