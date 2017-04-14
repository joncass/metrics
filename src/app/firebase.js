export default {
  userID() {
    return firebase.auth().currentUser.uid;
  },
  read(node, callback) {
    const userID = this.userID();
    firebase.database()
      .ref(`${userID}/${node}`)
      .once('value')
      .then((snapshot) => {
        callback(snapshot.val());
      },
    );
  },
  write(node, data) {
    const userID = this.userID();
    firebase.database().ref(`${userID}/${node}`).set(data);
  },
};
