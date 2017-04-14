/* eslint-disable no-undef, no-unused-vars */
const apisReady = new Promise((resolve, reject) => {
  window.onload = () => {
    if (firebase && gapi) {
      const config = {
        apiKey: 'AIzaSyDVUPVPKc3n8Tg5lSsQk0JRrTOcYsuVfu0',
        authDomain: 'metrics-164419.firebaseapp.com',
        databaseURL: 'https://metrics-164419.firebaseio.com',
        projectId: 'metrics-164419',
        storageBucket: 'metrics-164419.appspot.com',
        messagingSenderId: '182037813684',
      };
      firebase.initializeApp(config);

      resolve({
        firebase,
        google: gapi,
      });
    }
    else {
      reject(Error('Did not correctly load firebase and/or gapi'));
    }
  };
});