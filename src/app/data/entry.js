import Data from '../data';
import DateUtil from '../util/date';

export default {
  createEntry(date, number) {
    const entry = {
      date: DateUtil.toString(date),
    };
    if (number) {
      entry.number = Number(number);
    }

    return entry;
  },
  addEntry(metric, entry) {
    Data.addToUserArray(`entry/${metric}`, entry);
  },
  addEntries(metric, entries) {
    Data.addMultipleToUserArray(`entry/${metric}`, entries);
  },
  getEntries(metric, callback) {
    const node = `entry/${metric}`;
    Data.readUser(node, callback);
  },
  getEntriesAndListen(metric, callback) {
    const node = `entry/${metric}`;
    Data.readUserAndListen(node, callback);
  },
  deleteEntry(metric, date) {
    this.getEntries(metric, (entries) => {
      const deletePair = Object.entries(entries || {}).find(entry => (
        entry[1].date === date
      ));
      const entryID = deletePair[0];
      Data.deleteUser(`entry/${metric}/${entryID}`);
    });
  },
};
