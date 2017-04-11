// Reach library
import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Material library
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Material colors
import {indigo50, indigo700} from 'material-ui/styles/colors';

// My library
import Main from './main.jsx';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const myTheme = getMuiTheme(
    darkBaseTheme, {
    palette: {
        primary1Color: indigo50,
        accent2Color: indigo700,
    },
});

const App = () => (
    <MuiThemeProvider muiTheme={getMuiTheme(myTheme)}>
        <Main />
    </MuiThemeProvider>
);

render(<App />, document.getElementById('app'));