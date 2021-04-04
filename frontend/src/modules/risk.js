import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_FIELD = "risk/CHANGE_FIELD";
const CHANGE_FIELD_WO_FORM = "risk/CHANGE_FIELD_WO_FORM";
const INITIALIZE_FORM = 'risk/INITIALIZE_FORM';
const INITIALIZE_STATE = 'risk/INITIALIZE_STATE';

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
export const initializeForm = createAction(INITIALIZE_FORM, form => form);
export const initializeState = createAction(INITIALIZE_STATE);

const initialState = {
  riskList: {},
  addForm: {
    name: "",
    priority: "",
  },
  selected: {},
}

const risk = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
    produce(state, draft => {
      draft[form][key] = value;
    }),
    [CHANGE_FIELD_WO_FORM]: (state, { payload: { key, value } }) =>
    produce(state, draft => {
      draft[key] = value;
    }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [INITIALIZE_STATE]: () => ({
      ...initialState
    }),
  },
  initialState
)

export default risk;