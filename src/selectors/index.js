import { createSelector } from 'reselect';

function portList(state) {
  return state.portStatus;
}

export const currentPortList = createSelector(
  [portList],
  (portStatus) => (portStatus.data.asMutable().sort((portA, portB) => {
    return portA.port > portB.port;
  }))
);
