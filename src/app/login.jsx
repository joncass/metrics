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

function onSignIn(googleUser) {
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

function handleSignOut() {
  const googleAuth = gapi.auth2.getAuthInstance();
  googleAuth.signOut().then(() => {
    firebase.auth().signOut();
  });
}

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    // hack in the onsuccess handler for the google sign in div
    gapi.signin2.render('google-sign-in', {
      onsuccess: onSignIn,
    });

    this.initApp = this.initApp.bind(this);
    this.initApp();
  }

  initApp() {
    const app = this;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        app.setState({ signedIn: true });
      } else {
        app.setState({ signedIn: false });
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <div
              id="google-sign-in"
              className={this.state.signedIn ? 'display-none' : ''}
            />
            {
              this.state.signedIn
              ?
                <IconButton
                  touch
                  onTouchTap={handleSignOut}
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
