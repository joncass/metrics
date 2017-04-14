export default {
  userID() {
    return new Promise((resolve, reject) => {
      apisReady.then(
        (apis) => {
          resolve(apis.firebase.auth().currentUser.uid);
        },
        (error) => {
          reject(error);
        },
      );
    });
  },
  read(node, callback) {
    apisReady.then(
      (apis) => {
        apis.firebase.database()
          .ref(node)
          .once('value')
          .then(
            (snapshot) => {
              callback(snapshot.val());
            },
          );
      },
      (error) => {
        throw error;
      },
    );
  },
  write(node, data) {
    apisReady.then(
      (apis) => {
        apis.firebase.database().ref(node).set(data);
      },
      (error) => {
        throw error;
      },
    );
  },
  readUser(node, callback) {
    this.userID().then(
      (userID) => {
        this.read(`${userID}/${node}`, callback);
      },
      (error) => {
        throw error;
      },
    );
  },
  writeUser(node, data) {
    this.userID().then(
      (userID) => {
        this.write(`${userID}/${node}`, data);
      },
      (error) => {
        throw error;
      },
    );
  },
};
