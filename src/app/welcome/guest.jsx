// React library
import React from 'react';

// Material library
import { Card, CardText, CardTitle } from 'material-ui/Card';

const GuestWelcome = () => (
  <Card style={{ margin: '20px' }}>
    <CardTitle
      title="Get started"
      subtitle="with Life Metrics"
    />
    <CardText>
      <p>
        Log in with Google using the button in the top-right corner.
      </p>
      <p>
        Then you can add metrics and entries to keep track of things over time!
      </p>
    </CardText>
  </Card>
);

export default GuestWelcome;
