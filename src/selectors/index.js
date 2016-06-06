import { createSelector } from 'reselect';

function portList(state) {
  return state.portsStatus;
}

export const currentPortList = createSelector(
  [portList],
  (portsStatus) => (
    portsStatus.data.asMutable()
      .sort((portA, portB) => (portA.port > portB.port))
  )
);
