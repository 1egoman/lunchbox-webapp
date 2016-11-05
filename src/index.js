import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import App from './App';

import 'whatwg-fetch';

// ----------------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------------
import fetchList from './actions/fetchList';
import fetchAllItems from './actions/fetchAllItems';

// ----------------------------------------------------------------------------
// Reducers
// ----------------------------------------------------------------------------
import items from './reducers/lists';
import autocompleteValue from './reducers/autocompleteValue';

let store = createStore(combineReducers({
  items,
  autocompleteValue,
  selectedItem: () => "5811edb3f36d286e6887b34d", // TODO: make me real!
}), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// ----------------------------------------------------------------------------
// Run some actions on start!
// ----------------------------------------------------------------------------
store.dispatch(fetchList("grocery")); // Fetch the grocery list and pantry
store.dispatch(fetchList("pantry"));
store.dispatch(fetchAllItems());

// ----------------------------------------------------------------------------
// Make the scriptacoulous magic happen!
// ----------------------------------------------------------------------------
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
