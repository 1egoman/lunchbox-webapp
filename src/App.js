import React from 'react';

import AddNewSearchBox from './components/AddNewSearchBox';
import GroceryList from './components/GroceryList';
import ItemList from './components/ItemList';

export default function App() {
  return <span>
    <ItemList />
    <br />
    <AddNewSearchBox />
    <GroceryList />
  </span>;
}
