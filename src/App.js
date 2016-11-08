import React from 'react';

import SearchForItem from './components/SearchForItem';
import ListContainer from './components/ListContainer';
import ItemList from './components/ItemList';
import AddNewItem from './components/AddNewItem';
import {Router, Route} from 'react-router';

export default function App({history}) {
  return <Router history={history}>
    <Route path="/" component={ItemList} >
      <Route path="/items/new" component={AddNewItem} />
      <Route path="/items/:id" component={(props) => {
        return <div className="app-body">
          <SearchForItem {...props} />
          <ListContainer {...props} />
        </div>;
      }} />
    </Route>
  </Router>

  // return <div className="app-container">
  //   <div className="app-sidebar">
  //     <ItemList />
  //   </div>
  //   <div className="app-body">
  //     <AddNewSearchBox />
  //     <div className="app-detail">
  //       <ListContainer />
  //     </div>
  //   </div>
  // </div>;
}
