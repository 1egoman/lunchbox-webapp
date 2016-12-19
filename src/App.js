import React from 'react';
import {Router, Route, IndexRoute} from 'react-router';

import SearchForItem from './components/SearchForItem';
import ListContainer from './components/ListContainer';
import ItemList from './components/ItemList';
import AddNewItem from './components/AddNewItem';
import CalculatedList from './components/CalculatedList';
import Navbar from './components/Navbar';
import SammyTheSammich from './components/SammyTheSammich';
import PickAMeal from './components/PickAMeal';

export default function App({history}) {
  return <Router history={history}>
    <Route path="/" component={Navbar}>
      <IndexRoute component={SammyTheSammich} />
      <Route path="/new" component={AddNewItem} />
      <Route path="/calc" component={CalculatedList} />
      <Route path="/grocery" component={ListContainer} />
      <Route path="/pantry" component={ListContainer} />

      <Route path="/pick" component={PickAMeal} />

      <Route path="/items" component={ItemList} >
        <Route path="/items/:id" component={props => {
          return <div className="app-body">
            <SearchForItem {...props} />
            <ListContainer {...props} />
          </div>;
        }} />
      </Route>
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
