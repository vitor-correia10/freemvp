import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

//Redux
import { Provider } from 'react-redux';
import configureStore from './Store';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);