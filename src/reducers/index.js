import { combineReducers } from 'redux';
import navigation from './navigation';
import portStatus from './portStatus';

export default combineReducers({
  navigation,
  portStatus
});
