// React library
import React from 'react';

// My library
import ChartList from './chart/list';
import GuestWelcome from './welcome/guest';
import Loading from './components/loading';
import Navigation from './navigation';
import Today from './today';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      logInStateChecked: false,
    };
  }

  logOut = () => {
    this.setState({ loggedIn: false });
    this.setState({ logInStateChecked: true });
  }

  logIn = () => {
    this.setState({ loggedIn: true });
    this.setState({ logInStateChecked: true });
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
      {
        this.state.logInStateChecked
        ?
          <div style={{ flex: 1, overflow: 'auto' }}>
            {
              this.state.loggedIn
              ?
                <ChartList />
              :
                <GuestWelcome />
            }
          </div>
        :
          <Loading />
      }
    </div>
  );
}
