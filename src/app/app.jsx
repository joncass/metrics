// Reach library
import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Material library
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// My library
import Main from './main.jsx';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <Main />
  </MuiThemeProvider>
);

render(<App />, document.getElementById('app'));