import immutable from 'seamless-immutable';
import { RESET_PORT_STATUS, UPDATE_PORTS_STATUS } from '../actions/portStatus';

const initialstate = immutable({
  data: [],
  isLoading: false,
});

export default function portStatusReducer(state = initialstate, action) {
  switch (action.type) {
    case RESET_PORT_STATUS:
      return state.merge({
        data: [],
        isLoading: true,
      });

    case UPDATE_PORTS_STATUS:
      console.log('ports data:', action.portsData);
      return state.merge({
        data: action.portsData,
        isLoading: false,
      });

    default:
      return state;
  }
}

export const portsStatus = (state) => (state.portsStatus);
