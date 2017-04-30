// React library
import React from 'react';

// My library
import ChartList from './chart/list';
import Navigation from './navigation';
import Today from './today';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  logOut = () => {
    this.setState({ loggedIn: false });
  }

  logIn = () => {
    this.setState({ loggedIn: true });
  }

  render = () => (
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
      <div style={{ flex: 1, overflow: 'auto' }}>
        { this.state.loggedIn ? <ChartList /> : null }
      </div>
    </div>
  );
}
