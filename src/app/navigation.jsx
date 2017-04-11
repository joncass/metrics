import React from 'react';

import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MetricsDrawer from './metrics_drawer.jsx';

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
        };
        this.openDrawer = this.openDrawer.bind(this);
    }

    openDrawer() {
        this.setState({drawerOpen: true});
    }

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <MetricsDrawer open={this.state.drawerOpen} />
                    <AppBar
                        title="Metrics"
                        onLeftIconButtonTouchTap={this.openDrawer}
                    />
                </div>
            </MuiThemeProvider>
        )
    }
};