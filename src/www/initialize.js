// Allow no-undef to access the third party packages loaded in script tags
// Allow no-unused-vars since apisReady is accessed as a global elsewhere
/* eslint-disable no-undef, no-unused-vars */
const apisReady = new Promise((resolve, reject) => {
  window.onload = () => {
    if (
      typeof firebase !== 'undefined'
      && typeof gapi !== 'undefined'
      && typeof google.charts !== 'undefined'
    ) {
      google.charts.load('current', { packages: ['calendar', 'corechart'] });
      google.charts.setOnLoadCallback(() => {
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
          gAuth: gapi,
          gCharts: google,
        });
      });
    }
    else {
      reject(Error('App did not correctly initialize.'));
    }
  };
});
