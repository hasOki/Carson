import metadata from 'web-metadata';

export const CHECK_PORT_STATUS = 'CHECK_PORT_STATUS';
export const RESET_PORT_STATUS = 'RESET_PORT_STATUS';
export const UPDATE_PORT_STATUS = 'UPDATE_PORT_STATUS';
export const DELETE_PR_BUILD = 'DELETE_PR_BUILD';

const SERVER_URL = 'http://h-p9hofn01-sta-1b.use01.ho.priv';
const PORT_START = 4000;
const PORT_LENGTH = 20;

export function updatePortStatus(portData) {
  return {
    type: UPDATE_PORT_STATUS,
    portData
  };
}

const checkingPortList = (portList, dispatch) => {
  portList.forEach((port) => {
    try {
      const opts = {
        url: `${SERVER_URL}:${port}`
      };
      metadata(opts, (err, data) => {
        if (err) {
          // console.error('Error', err);
        } else {
          const metaResult = {
            id: data.meta['app-pr-id'],
            title: data.meta['app-pr-title'],
            port,
            prBuildLink: `${SERVER_URL}:${port}`,
            link: data.meta['app-pr-link'],
            author: data.meta['app-pr-author']
          };
          console.log(metaResult);

          // dispatch the list update
          dispatch(updatePortStatus(metaResult));
        }
      });
    } catch (err) {
      // console.error(err));
    }
  });
};

export function resetPortList() {
  return {
    type: RESET_PORT_STATUS
  };
}

const ports = Array.from(new Array(PORT_LENGTH), (x, i) => PORT_START + i);
export function checkStatus() {
  return (dispatch) => {
    dispatch(resetPortList());
    checkingPortList(ports, dispatch);
  };
}

export function deletePRBuild(prID) {
  return {
    type: DELETE_PR_BUILD,
    prID
  };
}
