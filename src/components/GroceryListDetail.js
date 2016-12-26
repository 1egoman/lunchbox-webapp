import {connect} from 'react-redux';
import {ItemDetail, mapDispatchToProps} from './ItemDetail';

// Make a new type of ItemDetail that displays the grocery list.
export default connect((state, props) => {
  return {
    item: state.items.find(i => i.listType === 'grocery'),
    items: state.items,
  };
}, mapDispatchToProps)(ItemDetail);
