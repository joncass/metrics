// React library
import React from 'react';

// Material library
import IconButton from 'material-ui/IconButton';

// Material icons
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';

function isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    const providerData = firebaseUser.providerData;
    const fbGoogleAuthProvider = firebase.auth.GoogleAuthProvider;
    for (let i = 0; i < providerData.length; i += 1) {
      if (
        providerData[i].providerId === fbGoogleAuthProvider.PROVIDER_ID
        && providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        return true;
      }
    }
  }
  return false;
}

function onLogIn(googleUser) {
  const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    unsubscribe();
    if (!isUserEqual(googleUser, firebaseUser)) {
      const credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token,
      );

      // eslint-disable-next-line no-console
      firebase.auth().signInWithCredential(credential).catch(console.error);
    }
  });
}

function handleLogOut() {
  const googleAuth = gapi.auth2.getAuthInstance();
  googleAuth.signOut().then(() => {
    firebase.auth().signOut();
  });
}

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.logOut = props.logOut;
    this.logIn = props.logIn;
  }

  componentDidMount() {
    gapi.signin2.render('google-log-in', {
      onsuccess: onLogIn,
      width: 36,
      theme: 'dark',
    });

    this.initApp = this.initApp.bind(this);
    this.initApp();
  }

  initApp() {
    const app = this;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        app.logIn();
      } else {
        app.logOut();
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <div
              id="google-log-in"
              className={this.props.loggedIn ? 'display-none' : ''}
            />
            {
              this.props.loggedIn
              ?
                <IconButton
                  touch
                  onTouchTap={handleLogOut}
                  tooltip="Log out"
                >
                  <ExitIcon />
                </IconButton>
              : null
            }
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  logIn: React.PropTypes.func.isRequired,
  logOut: React.PropTypes.func.isRequired,
};
