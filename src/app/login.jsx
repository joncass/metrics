// React library
import React from 'react';

// Material library
import IconButton from 'material-ui/IconButton';

// Material icons
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';

/**
 * @onLogIn - Handles a successful Google login.
 *
 * @param {object} googleUser An object containing a google user.
 * @returns {void}
 */
function onLogIn(googleUser) {
  apisReady.then(
    (apis) => {
      const firebase = apis.firebase;

      // Make sure the google auth stays in sync when the firebase auth changes
      const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
        unsubscribe();

        // Whether or not the firebase and google users are the same
        let isUserEqual = false;
        if (firebaseUser) {
          const providerData = firebaseUser.providerData;
          const fbGoogleAuthProvider = firebase.auth.GoogleAuthProvider;
          for (let i = 0; i < providerData.length; i += 1) {
            if (
              providerData[i].providerId === fbGoogleAuthProvider.PROVIDER_ID
              && providerData[i].uid === googleUser.getBasicProfile().getId()
            ) {
              isUserEqual = true;
            }
          }
        }

        // If they don't match then synchronize them
        if (!isUserEqual) {
          const credential = firebase.auth.GoogleAuthProvider.credential(
              googleUser.getAuthResponse().id_token,
          );

          firebase.auth().signInWithCredential(credential).catch((error) => {
            throw error;
          });
        }
      });
    },
    (error) => {
      throw error;
    },
  );
}

/**
 * @onLogIn - Logs out of Google and Firebase.
 *
 * @returns {void}
 */
function handleLogOut() {
  apisReady.then(
    (apis) => {
      const googleAuth = apis.google.auth2.getAuthInstance();
      googleAuth.signOut().then(() => {
        apis.firebase.auth().signOut();
      });
    },
    (error) => {
      throw error;
    },
  );
}

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.logOut = props.logOut;
    this.logIn = props.logIn;
  }

  componentDidMount() {
    apisReady.then(
      (apis) => {
        apis.google.signin2.render('google-log-in', {
          onsuccess: onLogIn,
          width: 36,
        });

        this.initApp = this.initApp.bind(this);
        this.initApp();
      },
      (error) => {
        throw error;
      },
    );
  }

  initApp() {
    apisReady.then(
      (apis) => {
        const app = this;
        apis.firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            app.logIn();
          }
          else {
            app.logOut();
          }
        });
      },
      (error) => {
        throw error;
      },
    );
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
