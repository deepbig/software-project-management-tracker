import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import auth, { authSaga } from './auth';
import nodes from './nodes';
import job from './job';
import metrics from './metrics';
import mapping from './mapping';
import tasks, { taskSaga } from './tasks';
import charts from './charts';
import search from './search';
import addForm from './addForm';
import loading from './loading';

const rootReducers = combineReducers({
    metrics,
    auth,
    nodes,
    mapping,
    tasks,
    job,
    charts,
    search,
    addForm,
    loading,
})

export function* rootSaga() {
    yield all([authSaga(), taskSaga()]);
}

export default rootReducers;