import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_FIELD = 'job/CHANGE_FIELD';
const INITIALIZE_STATE = 'job/INITIALIZE_STATE';

export const changeField = createAction(
  CHANGE_FIELD,
  ({ key, value }) => ({
    key, 
    value
  })
);
export const initializeState = createAction(INITIALIZE_STATE, form => form);

const initialState = {
  job_detail: {},
};

const job = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        draft[key] = value;
      }),
    [INITIALIZE_STATE]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),

  },
  initialState
);

export default job;