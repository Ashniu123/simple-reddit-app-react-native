import * as React from 'react';
import { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import AppCore from './components/appcore.component';

const store = applyMiddleware(thunk)(createStore)(reducers);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppCore />
      </Provider>
    );
  }
}