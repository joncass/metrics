// React library
import React from 'react';

// My library
import Charts from './charts.jsx'
import Today from './today.jsx'

export default class Body extends React.Component {
    render() {
        return (
            <div>
                <Today />
                <Charts />
            </div>
        );
    }
}