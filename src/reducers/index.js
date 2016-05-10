import { combineReducers } from 'redux';
import counter from './counter';
import navigation from './navigation';
import portStatus from './portStatus';

export default combineReducers({
  counter,
  navigation,
  portStatus
});
