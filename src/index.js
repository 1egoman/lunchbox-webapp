import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux';

// Some sass!
import 'normalize.css';
import './styles/App.scss';

import App from './App';

import 'whatwg-fetch';

// ----------------------------------------------------------------------------
// Actions
// ----------------------------------------------------------------------------
import fetchList from './actions/fetchList';
import fetchAllItems from './actions/fetchAllItems';
import calculateList from './actions/calculateList';
import fetchPicks from './actions/fetchPicks';

// ----------------------------------------------------------------------------
// Reducers
// ----------------------------------------------------------------------------
import items from './reducers/lists';
import autocompleteValue from './reducers/autocompleteValue';
import newItemStaging from './reducers/newItemStaging';
import calculatedList from './reducers/calculatedList';
import error from './reducers/error';
import remoteRecipes from './reducers/remoteRecipes';
import picks from './reducers/picks';

let store = createStore(combineReducers({
  items,
  autocompleteValue,
  newItemStaging,
  calculatedList,
  error,
  remoteRecipes,
  picks,

  routing: routerReducer,
}), compose(
  applyMiddleware(thunk, routerMiddleware(hashHistory)),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

const history = syncHistoryWithStore(hashHistory, store);

// ----------------------------------------------------------------------------
// Run some actions on start!
// ----------------------------------------------------------------------------
store.dispatch(fetchList("grocery")); // Fetch the grocery list and pantry
store.dispatch(fetchList("pantry"));
store.dispatch(fetchAllItems());
store.dispatch(calculateList());
store.dispatch(fetchPicks()); // fetch all picks for what to eat

// ----------------------------------------------------------------------------
// Make the scriptacoulous magic happen!
// ----------------------------------------------------------------------------
ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);
