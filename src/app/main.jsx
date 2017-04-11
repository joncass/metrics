// React library
import React from 'react';


// My library
import Body from './body.jsx';
import Navigation from './navigation.jsx';

export default class Main extends React.Component {
    render() {
        return (
            <div>
                <Navigation />
                <Body />
            </div>
        );
    }
}