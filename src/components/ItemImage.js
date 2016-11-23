import React from 'react';
import {HOSTNAME, TOKEN} from '../constants';

export default React.createClass({
  render() {
    return <img
      role="presentation"
      src={`${HOSTNAME}/items/${this.props.item._id || this.props.item}/image?token=${TOKEN}`}
    />;
  }
});
