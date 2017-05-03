// React library
import React from 'react';

// Material library
import CircularProgress from 'material-ui/CircularProgress';

const Loading = () => (
  <div
    style={{
      flex: 1,
      overflow: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CircularProgress size={80} thickness={5} />
  </div>
);

export default Loading;
