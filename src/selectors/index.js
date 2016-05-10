import { createSelector } from 'reselect';

function counter(state) {
  return state.counter;
}

export const currentCount = createSelector(
  [counter],
  (counter) => (counter.count)
);

function portList(state) {
  return state.portStatus;
}

export const currentPortList = createSelector(
  [portList],
  (portStatus) => (portStatus.data.asMutable().sort((portA, portB) => {
    return portA.port > portB.port;
  }))
);
