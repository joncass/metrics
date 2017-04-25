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
};
