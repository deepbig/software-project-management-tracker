import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
// import { takeLatest } from 'redux-saga/effects';
// import createRequestSaga, {
//   createRequestActionTypes
// } from '../lib/createRequestSaga';
// import * as taskAPI from '../lib/api/mapping';

const CHANGE_FIELD = 'mapping/CHANGE_FIELD';
const CHANGE_FIELD_WO_FORM = 'mapping/CHANGE_FIELD_WO_FORM';
const INITIALIZE_STATE = 'mapping/INITIALIZE_STATE';
const INITIALIZE_STATE_MAPPING = 'mapping/INITIALIZE_STATE_MAPPING';
const OPEN_PROGRESS_STAGE = 'mapping/OPEN_PROGRESS_STAGE';

// const [STOP_TASK, STOP_TASK_SUCCESS, STOP_TASK_FAILURE] = createRequestActionTypes(
//   'mapping/STOP_TASK'
// );

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
export const initializeStateMapping = createAction(INITIALIZE_STATE_MAPPING);
export const openProgressStage = createAction(OPEN_PROGRESS_STAGE, open_progress_stage => open_progress_stage);

// const runTaskSaga = createRequestSaga(RUN_TASK, taskAPI.runTask);
// const stopTaskSaga = createRequestSaga(STOP_TASK, taskAPI.stopTask);
// export function* taskSaga() {
//   yield takeLatest(RUN_TASK, runTaskSaga);
//   yield takeLatest(STOP_TASK, stopTaskSaga);
// }

const initialState = {
  mappingList: [],

  objectMapping: {
    src_schema: [],
    trg_schema: [],
    server_schema: [],
    src_objects: [],
    trg_objects: [],
  
    object_mapping_copy: {},
    src_object_selected: "",
    trg_object_selected: "",
    src_schema_selected: "",
    trg_schema_selected: "",
    mapping_list_selected: {},
  
    mapping_list: [],
  },
  columnMapping: {},
  columnMappingSelected: {
    src_column_selected: "",
    trg_column_selected: "",
  },
  mappingAction: {
    type: null,
    mappingResult: null,
    mappingError: null,
  },

  open_progress_stage: false,
};

const mapping = handleActions(
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
    [INITIALIZE_STATE_MAPPING]: () => ({
      ...initialState
    }),
    [OPEN_PROGRESS_STAGE]: (state, { payload: open_progress_stage }) => ({
      ...state,
      open_progress_stage: open_progress_stage
    }),
    // [RUN_TASK_SUCCESS]: (state, { payload: taskResult }) => ({
    //   ...state,
    //   taskAction: {
    //     actionType: "run",
    //     taskResult,
    //     taskError: null,
    //   }
    // }),
    // [RUN_TASK_FAILURE]: (state, { payload: taskError }) => ({
    //   ...state,
    //   taskAction: {
    //     actionType: "run",
    //     taskError,
    //     taskResult: null,
    //   }
    // }),
    // [STOP_TASK_SUCCESS]: (state, { payload: taskResult }) => ({
    //   ...state,
    //   taskAction: {
    //     actionType: "stop",
    //     taskResult,
    //     taskError: null,
    //   }
    // }),
    // [STOP_TASK_FAILURE]: (state, { payload: taskError }) => ({
    //   ...state,
    //   taskAction: {
    //     actionType: "stop",
    //     taskError,
    //     taskResult: null,
    //   }
    // }),
  },
  initialState
);

export default mapping;