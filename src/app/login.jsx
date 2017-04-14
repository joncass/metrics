// React library
import React from 'react';

// Material library
import IconButton from 'material-ui/IconButton';

// Material icons
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';

function onLogIn(googleUser) {
  apisReady.then(
    (apis) => {
      const firebase = apis.firebase;
      const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
        unsubscribe();

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
          theme: 'dark',
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
