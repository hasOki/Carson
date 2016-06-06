import { combineReducers } from 'redux';
import navigation from './navigation';
import portsStatus from './portsStatus';

export default combineReducers({
  navigation,
  portsStatus,
});
