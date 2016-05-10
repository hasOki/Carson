import immutable from 'seamless-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = immutable({
  locationBeforeTransitions: null
});

export default function navigation(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload
      });

    default:
      return state;
  }
}
