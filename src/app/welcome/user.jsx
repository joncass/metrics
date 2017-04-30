// React library
import React from 'react';

// Material library
import { Card, CardText, CardTitle } from 'material-ui/Card';

const UserWelcome = () => (
  <Card style={{ margin: '20px' }}>
    <CardTitle
      title="Introduction"
      subtitle="to Life Metrics"
    />
    <CardText>
      <p>
        This app helps you keep track of life.
        There are three concepts to learn: <b>
          metrics
        </b>, <b>
          entries
        </b>, and <b>
          habits
        </b>.
      </p>
      <p>
        A metric is something that you want to track.
        There are two types of metrics: <b>number</b> and <b>yes/no</b>.
        When you add a metric, you will see a graph for it.
        Number metrics will show up as bar graphs, while yes/no metrics appear
        as calendar charts.
      </p>
      <p>
        When adding an entry for a number metric,
        you log the amount and the date.
        When adding an entry for a yes/no metric, just the date.
        Each entry will be added to the graph for the corresponding metric so
        you can see trends over time.
      </p>
      <p>
        A habit is something you want to do every day.
        When adding a habit for a number metric, you choose an amount.
        Habits for yes/no metrics require no additional metadata.
        The habits will appear in your <b>today</b> widget, and when you check
        one off, it automatically adds the appropriate entry.
      </p>
    </CardText>
  </Card>
);

export default UserWelcome;
