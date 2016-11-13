import React from 'react';
import {HOSTNAME, TOKEN} from '../constants';

export default React.createClass({
  render() {
    let cachebuster = new Date().getTime();
    return <img
      role="presentation"
      src={`${HOSTNAME}/items/${this.props.item._id || this.props.item}/image?t=${cachebuster}&token=${TOKEN}`}
    />;
  }
});
