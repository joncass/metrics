import React from 'react';

import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Navigation from './navigation.jsx';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(<Navigation />, document.getElementById('app'));