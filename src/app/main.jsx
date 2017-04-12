// React library
import React from 'react';


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
    <div style={{ flex: 1, overflow: 'auto' }}>
      <Charts />
    </div>
  </div>
);

export default Main;
