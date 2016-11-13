import {HOSTNAME, TOKEN} from '../constants';

export default function uploadImage(file, item) {
  return dispatch => {
    // pull in data from blob url
    fetch(file.preview).then(response => {
      let formdata = new FormData();
      formdata.append('image', file);

      // post the image data to the server
      return fetch(`${HOSTNAME}/items/${item._id}/image?token=${TOKEN}`, {
        method: 'POST',
        body: formdata,
      });
    }).then(data => {
      // FIXME: a hack. We need to wait for the file upload to complet on the
      // server.
      setTimeout(() => {
        dispatch({type: 'IMAGE_UPLOAD_COMPLETE', itemId: item._id});
      }, 1000);
    });
  }
}
