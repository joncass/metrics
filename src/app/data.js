export default {
  userID() {
    return firebase.auth().currentUser.uid;
  },
  read(node, callback) {
    firebase.database()
      .ref(node)
      .once('value')
      .then((snapshot) => {
        callback(snapshot.val());
      },
    );
  },
  write(node, data) {
    firebase.database().ref(node).set(data);
  },
  readUser(node, callback) {
    const userID = this.userID();
    this.read(`${userID}/${node}`, callback);
  },
  writeUser(node, data) {
    const userID = this.userID();
    this.write(`${userID}/${node}`, data);
  },
};
