import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes
} from '../lib/createRequestSaga';
import * as taskAPI from '../lib/api/tasks';

const CHANGE_FIELD = 'tasks/CHANGE_FIELD';
const CHANGE_FIELD_WO_FORM = 'tasks/CHANGE_FIELD_WO_FORM';
const INITIALIZE_STATE = 'tasks/INITIALIZE_STATE';
const INITIALIZE_STATE_TASKS = 'tasks/INITIALIZE_STATE_TASKS';
const OPEN_VC_FORM = 'tasks/OPEN_VC_FORM';
const SET_IS_PAUSED = 'tasks/SET_IS_PAUSED';
const SET_SELECTED_OBJECT = 'tasks/SET_SELECTED_OBJECT';
const [RUN_TASK, RUN_TASK_SUCCESS, RUN_TASK_FAILURE] = createRequestActionTypes(
  'tasks/RUN_TASK'
);
const [STOP_TASK, STOP_TASK_SUCCESS, STOP_TASK_FAILURE] = createRequestActionTypes(
  'tasks/STOP_TASK'
);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value
  })
);
export const changeFieldWoForm = createAction(
  CHANGE_FIELD_WO_FORM,
  ({ key, value }) => ({
    key,
    value
  })
);
export const initializeState = createAction(INITIALIZE_STATE, form => form);
export const initializeStateTasks = createAction(INITIALIZE_STATE_TASKS);
export const openVcForm = createAction(OPEN_VC_FORM, open_vc_form => open_vc_form);
export const setIsPaused = createAction(SET_IS_PAUSED, isPaused => isPaused);
export const setSelectedObject = createAction(SET_SELECTED_OBJECT, selectedObject => selectedObject);
export const runTask = createAction(RUN_TASK, ({ task_id, form }) => ({
  task_id,
  form
}));
export const stopTask = createAction(STOP_TASK, task_id => task_id);

const runTaskSaga = createRequestSaga(RUN_TASK, taskAPI.runTask);
const stopTaskSaga = createRequestSaga(STOP_TASK, taskAPI.stopTask);
export function* taskSaga() {
  yield takeLatest(RUN_TASK, runTaskSaga);
  yield takeLatest(STOP_TASK, stopTaskSaga);
}

const initialState = {
  task_list: {},
  
  task_detail: {},

  taskAction: {
    type: null,
    taskResult: null,
    taskError: null,
  },
  run_vc_form: {
    compare_mode: "HASH",
    parallel: 0,
    run_order: "NONE",
    // scan_mode: "ASYNC",
    task_type: "SYNC_VERIFY",
    update_uv: true
  },
  open_vc_form: false,
  isPaused: false,
  selectedObject: null,
};

const tasks = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value;
      }),
    [CHANGE_FIELD_WO_FORM]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        draft[key] = value;
      }),
    [INITIALIZE_STATE]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [INITIALIZE_STATE_TASKS]: () => ({
      ...initialState,
    }),
    [OPEN_VC_FORM]: (state, { payload: open_vc_form }) => ({
      ...state,
      open_vc_form: open_vc_form
    }),
    [SET_IS_PAUSED]: (state, { payload: isPaused }) => ({
      ...state,
      isPaused: isPaused
    }),
    [SET_SELECTED_OBJECT]: (state, { payload: selectedObject }) => ({
      ...state,
      selectedObject: selectedObject
    }),
    [RUN_TASK_SUCCESS]: (state, { payload: taskResult }) => ({
      ...state,
      taskAction: {
        actionType: "run",
        taskResult,
        taskError: null,
      }
    }),
    [RUN_TASK_FAILURE]: (state, { payload: taskError }) => ({
      ...state,
      taskAction: {
        actionType: "run",
        taskError,
        taskResult: null,
      }
    }),
    [STOP_TASK_SUCCESS]: (state, { payload: taskResult }) => ({
      ...state,
      taskAction: {
        actionType: "stop",
        taskResult,
        taskError: null,
      }
    }),
    [STOP_TASK_FAILURE]: (state, { payload: taskError }) => ({
      ...state,
      taskAction: {
        actionType: "stop",
        taskError,
        taskResult: null,
      }
    }),
  },
  initialState
);

export default tasks;