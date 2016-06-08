import { checkStatus } from '../actions/portStatus';
export const DELETE_PR_BUILD = 'DELETE_PR_BUILD';

export function deleteByPRID(prID) {
  return (dispatch) => {
    // fetch port status list from API
    fetch(`/deleteContainer/${prID}`, { method: 'GET' })
    .then((result) => (result.json()))
    .then((json) => {
      // parse the result
      console.log(json);

      // check the stage server port status
      dispatch(checkStatus());
    });
  };
}
