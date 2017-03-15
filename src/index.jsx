import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR
import App from './containers/App';
import auth from './auth';
import config from './config';

const redirect = () => {
  window.location.href = `${config.videojjDomain}`;
};

const init = () => {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.querySelector('#app'),
  );

  if (module.hot) {
    module.hot.accept('./containers/App', () => {
      // eslint-disable-next-line
      const App = require('./containers/App').default;
      render(
        <AppContainer>
          <App />
        </AppContainer>,
        document.querySelector('#app'),
    );
    });
  }
};

const app = async () => {
  try {
    await auth();
  } catch (e) {
    // redirect();
  }
  init();
};

app();


