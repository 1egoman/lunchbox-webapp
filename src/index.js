import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

import GroceryList from './components/GroceryList';

import 'whatwg-fetch';

// ----------------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------------
import fetchList from './actions/fetchList';

// ----------------------------------------------------------------------------
// Reducers
// ----------------------------------------------------------------------------
import createListReducer from './reducers/lists';

let store = createStore(combineReducers({
  // a reference to the pantry and grocery lists
  grocery: createListReducer('grocery'),
  pantry: createListReducer('pantry'),

}), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

// ----------------------------------------------------------------------------
// Run some actions on start!
// ----------------------------------------------------------------------------
store.dispatch(fetchList("grocery")); // Fetch the grocery list and pantry
store.dispatch(fetchList("pantry"));

// ----------------------------------------------------------------------------
// Make the scriptacoulous magic happen!
// ----------------------------------------------------------------------------
ReactDOM.render(
  <Provider store={store}>
    <GroceryList />
  </Provider>,
  document.getElementById('root')
);
