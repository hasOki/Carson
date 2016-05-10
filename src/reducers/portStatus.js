import immutable from 'seamless-immutable';
import { RESET_PORT_STATUS, UPDATE_PORT_STATUS } from '../actions/portStatus';

const initialstate = immutable({
  data: [],
  loading: false
});

export default function portStatusReducer(state = initialstate, action) {
  switch (action.type) {
    case RESET_PORT_STATUS:
      return state.merge({
        data: [],
        loading: true
      });

    case UPDATE_PORT_STATUS:
      console.log(state.data[0]);
      return state.merge({
        data: state.data.concat(action.portData)
      });

    default:
      return state;
  }
}

export const portStatus = (state) => (state.portStatus);

