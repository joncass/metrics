import Data from '../data';
import DateUtil from '../util/date';

export default {
  getHabitsAndListen(callback) {
    Data.readUserAndListen('habit', callback);
  },
  deleteHabit(habitID) {
    Data.deleteUser(`habit/${habitID}`);
  },
  completeTask(task) {
    const currentTask = task;
    currentTask.lastCompleted = DateUtil.localToday();

    Data.writeUser(`habit/${currentTask.key}`, currentTask);
  },
  addHabit(habitToSave) {
    Data.addToUserArray('habit', habitToSave);
  },
};
