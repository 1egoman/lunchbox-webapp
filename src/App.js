import React from 'react';

import AddNewSearchBox from './components/AddNewSearchBox';
import ListContainer from './components/ListContainer';
import ItemList from './components/ItemList';
import './App.css';

export default function App() {
  return <div className="app-container">
    <div className="app-sidebar">
      <ItemList />
    </div>
    <div className="app-body">
      <div className="app-searchbox">
        <AddNewSearchBox />
      </div>
      <div className="app-detail">
        <ListContainer />
      </div>
    </div>
  </div>;
}
