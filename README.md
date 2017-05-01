# Life metrics
## Introduction
Life metrics is an app I built to help me keep track of daily habits. And to learn React.

There are three concepts:
- Metrics
- Entries
- Habits

A metric is something that you want to track. There are two types of metrics: **number** and **yes/no**. When you add a metric, you will see a graph for it. Number metrics will show up as bar graphs, while yes/no metrics appear as calendar charts.

When adding an entry for a number metric, you log the amount and the date. When adding an entry for a yes/no metric, just the date. Each entry will be added to the graph for the corresponding metric so you can see trends over time.

A habit is something you want to do every day. When adding a habit for a number metric, you choose an amount. Habits for yes/no metrics require no additional metadata. The habits will appear in your **today** widget, and when you check one off, it automatically adds the appropriate entry.

## Usage
To run a local version of the app, you can fork the repo and then run `npm run start`.

Or, feel free to visit the production version at http://www.joncass.com/apps/metrics.

## Powered by
I used a lot of great open source libraries to build this app:
- [Material UI](http://www.material-ui.com/)
- [React](https://facebook.github.io/react/)
- [Webpack](https://webpack.github.io/)
- [Firebase](https://firebase.google.com/)
- [Travis CI](https://travis-ci.org/)

## Questions/Comments/Concerns?
Feel free to contact me at joncass@gmail.com with any questions or comments. This is my first time using React, and one of my first projects published on GitHub, so (friendly) questions or comments are always welcome.

Thanks for reading!
