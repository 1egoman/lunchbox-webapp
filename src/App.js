import React from 'react';

import AddNewSearchBox from './components/AddNewSearchBox';
import ListContainer from './components/ListContainer';
import ItemList from './components/ItemList';

export default function App() {
  return <div className="app-container">
    <div className="app-sidebar">
      <ItemList />
    </div>
    <div className="app-body">
      <AddNewSearchBox />
      <div className="app-detail">
        <ListContainer />
      </div>
    </div>
  </div>;
}
