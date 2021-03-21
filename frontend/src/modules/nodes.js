import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_FIELD = 'nodes/CHANGE_FIELD';
const INITIALIZE_STATE = 'nodes/INITIALIZE_STATE';
const ON_BACKDROP = 'nodes/ON_BACKDROP';

export const changeField = createAction(
  CHANGE_FIELD,
  ({ key, value }) => ({
    key, 
    value
  })
);
export const initializeState = createAction(INITIALIZE_STATE, form => form);
export const onBackdrop = createAction(ON_BACKDROP, backdrop => backdrop);

const initialState = {
  node_list: {},
  backdrop: false,
};

const nodes = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, draft => {
        draft[key] = value;
      }),
    [ON_BACKDROP]: (state, { payload: backdrop }) => ({
      ...state,
      backdrop: backdrop
    }),
    [INITIALIZE_STATE]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      backdrop: false 
    }),
  },
  initialState
);

export default nodes;