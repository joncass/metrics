// React library
import React from 'react';


// My library
import Charts from './charts.jsx'
import Navigation from './navigation.jsx';
import Today from './today.jsx'

const Main = () => (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
        <div>
            <Navigation />
        </div>
        <div>
            <Today />
        </div>
        <div style={{flex: 1, overflow: 'auto'}}>
            <Charts />
        </div>
    </div>
)

export default Main;