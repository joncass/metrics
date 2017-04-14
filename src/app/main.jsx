// React library
import React from 'react';

// Material colors
import { blueGrey300 } from 'material-ui/styles/colors';

// My library
import Charts from './charts';
import Firebase from './firebase';
import Navigation from './navigation';
import Today from './today';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };

    this.logOut = this.logOut.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  logOut() {
    this.setState({ loggedIn: false });
  }

  logIn() {
    this.setState({ loggedIn: true });

    // eslint-disable-next-line
    Firebase.read('metric', (value) => { console.log(value) });
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div>
          <Navigation
            logOut={this.logOut}
            logIn={this.logIn}
            loggedIn={this.state.loggedIn}
          />
        </div>
        <div>
          {
            this.state.loggedIn
            ?
              <Today />
            :
              null
          }
        </div>
        <div style={{ flex: 1, overflow: 'auto', background: blueGrey300 }}>
          { this.state.loggedIn ? <Charts /> : null }
        </div>
      </div>
    );
  }
}
