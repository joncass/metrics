// React library
import React from 'react';

// Material library
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

// My library
import Data from './data';
import DateUtil from './util/date';

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default class Today extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metrics: [],
      tasks: [],
      snackbarOpen: false,
    };

    Data.readUserAndListen('habit', this.setTasks);
    Data.readUserAndListen('metric', this.setMetrics);
  }

  setMetrics = (metrics) => {
    const metricsArray = Object.keys(metrics || {}).map((key) => {
      const val = metrics[key];
      val.key = key;
      return val;
    });

    this.setState({ metrics: metricsArray });
  }

  setTasks = (tasks) => {
    const taskArray = Object.keys(tasks || {}).map((key) => {
      const val = tasks[key];
      val.key = key;
      return val;
    });

    this.setState({ tasks: taskArray });
    this.setPercentCompleted(taskArray);
  }

  setPercentCompleted = (tasks) => {
    // Update the completed percentage
    const numCompleted = tasks.filter(task => (
      task.lastCompleted === DateUtil.localToday()
    )).length;
    const percentCompleted = (numCompleted * 100) / tasks.length;
    this.setState({ percentCompleted });

    // If all the tasks for the day are done, send a nice message!
    if (percentCompleted === 100) {
      this.setState({ snackbarOpen: true });
    }
  }

  metricForTask = task => (
    this.state.metrics.find(metric => (
      task.metric === metric.key
    ))
  )

  completeTask = (taskToComplete) => {
    const tasks = this.state.tasks;

    // Mark the current task as completed today, and save
    const currentTask = taskToComplete;
    currentTask.lastCompleted = DateUtil.localToday();
    this.setState({ tasks });

    // Update the task with today as last completed
    const taskUpdate = {
      metric: currentTask.metric,
    };
    if (currentTask.number) {
      taskUpdate.number = Number(currentTask.number);
    }
    Data.writeUser(`habit/${currentTask.key}`, currentTask);

    // Add an entry for today, with the number associated with the habit
    const entryToSave = {
      date: currentTask.lastCompleted,
    };
    if (currentTask.number) {
      entryToSave.number = Number(currentTask.number);
    }
    Data.addToUserArray(`entry/${currentTask.metric}`, entryToSave);

    this.setPercentCompleted(tasks);
  }

  renderTask = (task) => {
    if (DateUtil.localToday() === task.lastCompleted) {
      return null;
    }

    return (
      <Chip
        key={this.metricForTask(task).key}
        onRequestDelete={() => this.completeTask(task)}
        style={styles.chip}
      >
        {this.metricForTask(task).name}
        {
          task.number
          ?
            ': '
          :
            ''
        }
        {task.number}
      </Chip>
    );
  }

  render = () => (
    <div>
      <Card>
        <CardHeader
          title="Today"
          actAsExpander
          showExpandableButton
        />
        <CardMedia>
          {/* Wrap in div to prevent "cannot call prepareStyles()" error */}
          <div>
            <LinearProgress
              style={{ height: 10 }}
              mode="determinate"
              value={this.state.percentCompleted}
            />
          </div>
        </CardMedia>
        <CardText expandable style={styles.wrapper}>
          {
            this.state.metrics.length
            && this.state.tasks.length
            ?
              this.state.tasks.map(this.renderTask, this)
            :
              null
          }
        </CardText>
      </Card>
      <Snackbar
        open={this.state.snackbarOpen}
        message="Nice! You finished all your tasks for today!"
        autoHideDuration={3000}
      />
    </div>
  );
}
