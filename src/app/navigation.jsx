// Reach library
import React from 'react';

// Material library
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import {List, ListItem} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

// Material icons
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import CodeIcon from 'material-ui/svg-icons/action/code';
import CopyrightIcon from 'material-ui/svg-icons/action/copyright';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import InfoIcon from 'material-ui/svg-icons/action/info';
import LayersIcon from 'material-ui/svg-icons/maps/layers';


export default class ToolbarExamplesSimple extends React.Component {
    constructor(props) {
        super(props);
        this.state = {drawerOpen: false};
        this.openDrawer = this.openDrawer.bind(this);
    }

    openDrawer() {
        this.setState({drawerOpen: !this.state.drawerOpen});
    }

    render() {
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <IconMenu
                            iconButtonElement={
                                <IconButton touch={true}>
                                    <AddCircleIcon />
                                </IconButton>
                            }
                            >
                            <MenuItem primaryText="Add entry" />
                            <MenuItem primaryText="Add metric" />
                        </IconMenu>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <ToolbarTitle text="Dashboard" />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <IconButton touch={true} onTouchTap={this.openDrawer}>
                            <InfoIcon />
                        </IconButton>
                    </ToolbarGroup>
                </Toolbar>
                <Drawer openSecondary={true} open={this.state.drawerOpen}>
                    <Toolbar>
                        <ToolbarGroup>
                            <ToolbarTitle text="Site info" />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <IconButton touch={true} onTouchTap={this.openDrawer}>
                                <CloseIcon />
                            </IconButton>
                        </ToolbarGroup>
                    </Toolbar>
                    <List>
                        <ListItem
                            primaryText="Source"
                            leftIcon={<CodeIcon />}
                        />
                        <ListItem
                            primaryText="Contact"
                            leftIcon={<EmailIcon />}
                        />
                        <ListItem
                            primaryText="2017"
                            leftIcon={<CopyrightIcon />}
                            disabled={true}
                        />
                    </List>
                    <Divider />
                    <List>
                        <Subheader>Powered by</Subheader>
                        <ListItem
                            primaryText="Material UI"
                            leftIcon={<LayersIcon />}
                        />
                    </List>
                </Drawer>
            </div>
        );
    }
}