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
  firebaseDBRef(node) {
    return new Promise((resolve, reject) => {
      apisReady.then(
        (apis) => {
          resolve(apis.firebase.database().ref(node));
        },
        (error) => {
          reject(error);
        },
      );
    });
  },
  read(node, callback) {
    this.firebaseDBRef(node).then(
      (ref) => {
        ref.once('value').then((snapshot) => {
          callback(snapshot.val());
        });
      },
      (error) => {
        throw error;
      },
    );
  },
  readAndListen(node, callback) {
    this.firebaseDBRef(node).then(
      (ref) => {
        ref.on('value', (snapshot) => {
          callback(snapshot.val());
        });
      },
      (error) => {
        throw error;
      },
    );
  },
  write(node, data) {
    this.firebaseDBRef(node).then(
      (ref) => {
        ref.set(data);
      },
      (error) => {
        throw error;
      },
    );
  },
  delete(node) {
    this.firebaseDBRef(node).then(
      (ref) => {
        ref.remove();
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
  readUserAndListen(node, callback) {
    this.userID().then(
      (userID) => {
        this.readAndListen(`${userID}/${node}`, callback);
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
  deleteUser(node) {
    this.userID().then(
      (userID) => {
        this.delete(`${userID}/${node}`);
      },
      (error) => {
        throw error;
      },
    );
  },
  addToUserArray(node, data) {
    this.userID().then(
      (userID) => {
        this.firebaseDBRef(`${userID}/${node}`).then(
          (nodeRef) => {
            const newChildRef = nodeRef.push();
            newChildRef.set(data);
          },
          (error) => {
            throw error;
          },
        );
      },
      (error) => {
        throw error;
      },
    );
  },
  addMultipleToUserArray(node, dataArray) {
    this.userID().then(
      (userID) => {
        this.firebaseDBRef(`${userID}/${node}`).then(
          (nodeRef) => {
            dataArray.forEach((data) => {
              const newChildRef = nodeRef.push();
              newChildRef.set(data);
            });
          },
          (error) => {
            throw error;
          },
        );
      },
      (error) => {
        throw error;
      },
    );
  },
};
