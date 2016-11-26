import React from 'react';
import {connect} from 'react-redux';
import dismissError from '../actions/dismissError';

export function ErrorHandler({error, onDismissError}) {
  if (error) {
    return <div className="error-container">
      <div className="error-modal">
        <div className="modal-header">
          <h1>Here be dragons!</h1>
          <button className="modal-button" onClick={onDismissError}>&times;</button>
        </div>
        <p className="modal-body">{error}</p>
      </div>
    </div>;
  } else {
    return null;
  }
}

export default connect(state => ({error: state.error}), dispatch => ({
  onDismissError(index) {
    dispatch(dismissError(index));
  },
}))(ErrorHandler);
