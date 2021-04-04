import { combineReducers } from 'redux';

import project from './project';
import requirement from './requirement';
import risk from './risk';
import team from './team';
import loading from './loading';
import chart from './chart';

const rootReducers = combineReducers({
  project,
  requirement,
  risk,
  team,
  chart,
  loading,
})

export default rootReducers;