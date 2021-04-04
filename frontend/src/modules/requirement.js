import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_FIELD = "requirement/CHANGE_FIELD";
const CHANGE_FIELD_WO_FORM = "requirement/CHANGE_FIELD_WO_FORM";
const INITIALIZE_FORM = 'requirement/INITIALIZE_FORM';
const INITIALIZE_STATE = 'requirement/INITIALIZE_STATE';

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
  requirementList: {},
  totalPersonHoursList: {},
  hoursList: {},
  addForm: {
    title: "",
    description: "",
    requirement_type: "",
  },
  selected: {},
  updateForm: {
    hour_total: 0,
    hour_analysis: 0,
    hour_designing: 0,
    hour_coding: 0,
    hour_testing: 0,
    hour_proj_mgt: 0,
  }
}

const requirement = handleActions(
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

export default requirement;