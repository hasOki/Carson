export const CHECK_PORT_STATUS = 'CHECK_PORT_STATUS';
export const RESET_PORT_STATUS = 'RESET_PORT_STATUS';
export const UPDATE_PORTS_STATUS = 'UPDATE_PORTS_STATUS';

export function updatePortsStatus(portsData) {
  return {
    type: UPDATE_PORTS_STATUS,
    portsData,
  };
}

export function resetPortList() {
  return {
    type: RESET_PORT_STATUS,
  };
}

export function checkStatus() {
  return (dispatch) => {
    // clean up previous port status
    dispatch(resetPortList());

    // fetch port status list from API
    fetch('/status', { method: 'GET' })
    .then((result) => (result.json()))
    .then((json) => {
      console.log('JSON', json);
      const ports = json
        .filter((item) => (item.state === 'fulfilled'))
        .map((item) => (item.value));
      console.log('PORTS', ports);
      dispatch(updatePortsStatus(ports));
    });
  };
}
