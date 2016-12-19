import React from 'react';
import {connect} from 'react-redux';

import ItemImage from './ItemImage';

// is the given item in the specified pantry?
function isInPantry(pantry, id) {
  if (pantry) {
    return Boolean(pantry.contents.some(({_id}) => _id === id));
  } else {
    return false;
  }
}

export function PickAMeal({picks, pantry}) {
  return <div className="picks-list">
    <h1>With the items in your pantry, you can make...</h1>
    {picks.map(pick => {
      return <a href={`#/items/${pick._id}`} key={pick._id}>
        <li>

          {/* A picture of the recipe */}
          <ItemImage item={pick} />

          <div className="text-container">
            <h4>{pick.name}</h4>
            <span className="pick-score">
              {pick.score * pick.contents.length}/{pick.contents.length} match:
            </span>
              
            {/* go through contents and indicate whether items are in the pantry or not */}
            {pick.contents.map(({_id, name}) => {
              return <span key={_id} className={
                isInPantry(pantry, _id) ? 'pantry-contains' : 'pantry-excludes'
              }>{name}</span>
            })}
          </div>
        </li>
      </a>;
      })}
    {picks.length ? null : <span>Hmm, you have no picks. Add some items to your pantry first.</span>}
  </div>;
}

export default connect((state, props) => {
  return {
    picks: state.picks,
    pantry: state.items.find(i => i.listType === 'pantry'),
  };
}, dispatch => {
  return {};
})(PickAMeal);
