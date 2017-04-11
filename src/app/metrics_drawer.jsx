import React from 'react';

import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

export default class MetricsDrawer extends Drawer {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
        };
        this.closeDrawer = this.closeDrawer.bind(this);
    }

    closeDrawer() {
        this.setState({open: !this.state.open});
    }

    render() {
        return (
            <MuiThemeProvider>
                <Drawer open={this.state.open} docked={false}>
                    <AppBar
                        title="Options"
                        iconElementLeft={<div></div>}
                        iconElementRight={
                            <IconButton
                                onTouchTap={this.closeDrawer}
                            >
                                <NavigationClose />
                            </IconButton>
                        }
                    />
                    <MenuItem
                    >
                        Menu Item
                    </MenuItem>
                    <MenuItem>Menu Item 2</MenuItem>
                </Drawer>
            </MuiThemeProvider>
        );
    }
};