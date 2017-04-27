import Data from '../data';
import DateUtil from '../util/date';

export default {
  createEntry(date, number, note) {
    let entryDate = date;
    if (typeof entryDate !== 'string') {
      entryDate = DateUtil.toString(entryDate);
    }

    const entry = {
      date: entryDate,
    };
    if (number) {
      entry.number = Number(number);
    }
    if (note) {
      entry.note = note;
    }

    return entry;
  },
  addEntry(metricID, entry) {
    Data.addToUserArray(`entry/${metricID}`, entry);
  },
  addEntries(metricID, entries) {
    Data.addMultipleToUserArray(`entry/${metricID}`, entries);
  },
  getEntries(metricID, callback) {
    const node = `entry/${metricID}`;
    Data.readUser(node, callback);
  },
  getEntriesAndListen(metricID, callback) {
    const node = `entry/${metricID}`;
    Data.readUserAndListen(node, callback);
  },
  deleteEntry(metricID, date) {
    this.getEntries(metricID, (entries) => {
      const deletePair = Object.entries(entries || {}).find(entry => (
        entry[1].date === date
      ));
      const entryID = deletePair[0];
      Data.deleteUser(`entry/${metricID}/${entryID}`);
    });
  },
};
