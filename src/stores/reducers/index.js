import { combineReducers } from 'redux';
import branchReducer from './branch';
import headerReducer from './header';
import locationReducer from './location';
import settingReducer from './setting';
import shiftReducer from './shift';
import styleReducer from './style';
import userReducer from './user';
import positionReducer from './position';
import departmentReducer from './department';
import holidayReducer from './holiday';
import accountReducer from './account';
import roleReducer from './role';
import profileReducer from './profile';

export default combineReducers({
  style: styleReducer,
  user: userReducer,
  header: headerReducer,
  location: locationReducer,
  branch: branchReducer,
  setting: settingReducer,
  shift: shiftReducer,
  position: positionReducer,
  department: departmentReducer,
  holiday: holidayReducer,
  account: accountReducer,
  role: roleReducer,
  profile: profileReducer,
});
