// React library
import React from 'react';

// Material library
import { blueGrey300 } from 'material-ui/styles/colors';

// My library
import Charts from './charts';
import Navigation from './navigation';
import Today from './today';

const Main = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div>
      <Navigation />
    </div>
    <div>
      <Today />
    </div>
    <div style={{ flex: 1, overflow: 'auto', background: blueGrey300 }}>
      <Charts />
    </div>
  </div>
);

export default Main;
