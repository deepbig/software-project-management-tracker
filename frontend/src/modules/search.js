import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_SEARCH = 'search/CHANGE_SEARCH';
const INITIALIZE_SEARCH = 'search/INITIALIZE_SEARCH';
const SEARCH_RESULT = 'search/SEARCH_RESULT';

export const changeSearch = createAction(
  CHANGE_SEARCH,
  ({ type, value }) => ({
    type, //node, task, ...
    value //검색하는 값
  })
);

export const initializeSearch = createAction(INITIALIZE_SEARCH, type => type);
export const searchResult = createAction(
  SEARCH_RESULT,
  ({ type, result }) => ({
    type, //nodeResult, taskResult, ...
    result //filter된 값
  })
);

const initialState = {
  node: '',
  task: '',
  main: '',
  srcObject: '',
  trgObject: '',
  srcColumn: '',
  trgColumn: '',
}

const search = handleActions(
  {
    [CHANGE_SEARCH]: (state, { payload: { type, value } }) =>
      produce(state, draft => {
        draft[type] = value; //예: state.node의 값을 바꾼다;
      }),
    [SEARCH_RESULT]: (state, { payload: { type, result } }) =>
      produce(state, draft => {
        draft[type] = result; //예: state.nodeResult의 값을 바꾼다;
      }),
    [INITIALIZE_SEARCH]: (state, { payload: type }) => ({
      ...state,
      [type]: initialState[type],
      [`${type}Result`]: initialState[`${type}Result`],
    })
  },
  initialState
)

export default search;