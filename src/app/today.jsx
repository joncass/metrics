// React library
import React from 'react';

// Material library
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import LinearProgress from 'material-ui/LinearProgress';
import Snackbar from 'material-ui/Snackbar';

export default class Today extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percentCompleted: 0,
      tasksCompleted: 0,
      todaysTasks: [
                { id: 0, name: 'Get up' },
                { id: 1, name: 'AM exercise' },
                { id: 2, name: 'Read' },
                { id: 3, name: 'PM exercise' },
                { id: 4, name: 'Meditate' },
                { id: 5, name: 'Floss' },
      ],
      snackbarOpen: false,
    };

    this.styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
  }

  completeTask(id) {
    const todaysTasks = this.state.todaysTasks.filter(task => task.id !== id);
    this.setState({ todaysTasks });

    const tasksCompleted = this.state.tasksCompleted + 1;
    this.setState({ tasksCompleted });

    const tasksRemaining = todaysTasks.length;
    const totalTasks = tasksRemaining + tasksCompleted;
    const percentCompleted = (tasksCompleted * 100) / totalTasks;
    this.setState({ percentCompleted });

    if (tasksCompleted === totalTasks) {
      this.setState({ snackbarOpen: true });
    }
  }

  renderTask(taskData) {
    return (
      <Chip
        key={taskData.id}
        onRequestDelete={() => this.completeTask(taskData.id)}
        style={this.styles.chip}
      >
        {taskData.name}
      </Chip>
    );
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader
            title="Today"
            actAsExpander
            showExpandableButton
          />
          <CardMedia>
            {/* wrap in div to prevent "cannot call prepareStyles()" error */}
            <div>
              <LinearProgress
                style={{ height: 10 }}
                mode="determinate"
                value={this.state.percentCompleted}
              />
            </div>
          </CardMedia>
          <CardText expandable style={this.styles.wrapper}>
            {this.state.todaysTasks.map(this.renderTask, this)}
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
}
