import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_FIELD = 'metrics/CHANGE_FIELD';
const INITIALIZE_STATE = 'metrics/INITIALIZE_STATE';
const INITIALIZE_STATE_METRICS = 'metrics/INITIALIZE_STATE_METRICS';

export const changeField = createAction(
  CHANGE_FIELD,
  ({ key, value }) => ({
    key, 
    value
  })
);
export const initializeState = createAction(INITIALIZE_STATE, form => form);
export const initializeStateMetrics = createAction(INITIALIZE_STATE_METRICS);

const initialState = {
  metrics_list: {},
  metrics_task_detail: {},
  metrics_task_migration: {},
  metrics_task_objects: {},
  metrics_task_status: {},
  metrics_graph_elements: [],
  metrics_task_history: {},
  metrics_task_job: {},
  metrics_task_job_selected: {},
};

const metrics = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        draft[key] = value;
      }),
    [INITIALIZE_STATE]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [INITIALIZE_STATE_METRICS]: () => ({
      ...initialState
    }),
  },
  initialState
);

export default metrics;