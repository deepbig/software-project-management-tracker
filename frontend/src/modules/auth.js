import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const OPEN_FORM = 'auth/OPEN_FORM';
const OPEN_PASSWORD = 'auth/OPEN_PASSWORD';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER'
);

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN'
);

const [PASSWORD, PASSWORD_SUCCESS, PASSWORD_FAILURE] = createRequestActionTypes(
  'auth/PASSWORD'
);

const [LOGOUT] = createRequestActionTypes('auth/LOGOUT');

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'auth/CHECK',
);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register , login
    key, // username, password, passwordConfirm
    value // 실제 바꾸려는 값
  })
);
export const initializeForm = createAction(INITIALIZE_FORM, form => form); // register / login
export const openForm = createAction(OPEN_FORM, open_form => open_form);
export const openPassword = createAction(OPEN_PASSWORD, open_password => open_password);
export const register = createAction(REGISTER, ({ username, password }) => ({
  username,
  password
}));
export const login = createAction(LOGIN, ({ username, password, type }) => ({
  username,
  password,
  type
}));
export const password = createAction(PASSWORD, ({ update }) => ({
  update
}));
export const logout = createAction(LOGOUT);
export const check = createAction(CHECK);

// saga 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const passwordSaga = createRequestSaga(PASSWORD, authAPI.password);
const logoutSaga = createRequestSaga(LOGOUT, authAPI.logout);
const checkSaga = createRequestSaga(CHECK, authAPI.check);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(PASSWORD, passwordSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(CHECK, checkSaga);
}

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: ''
  },
  login: {
    username: '',
    password: ''
  },
  password: {
    // current: '',
    update: '',
    confirm: ''
  },
  auth: null,
  authError: null,
  user: null,
  checkError: null,
  passwordResult: null,
  open_password: false,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value; // 예: state.register.username을 바꾼다
      }),

    [OPEN_PASSWORD]: (state, { payload: open_password }) => ({
      ...state,
      open_password: open_password
    }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null, // 폼 전환 시 회원 인증 에러 초기화
      auth: null,
      passwordResult: null 
    }),
    // 회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    // 회원가입 실패
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    }),
    [PASSWORD_SUCCESS]: (state, { payload: result }) => ({
      ...state,
      passwordResult: result,
    }),
    [PASSWORD_FAILURE]: (state, { payload: error }) => ({
      ...state,
      passwordResult: error
    }),
    [LOGOUT]: (state) => ({
      ...state,
      authError: null,
      auth: null,
      user: null,
      checkError: null,
      passwordResult: null,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      checkError: null,
      user
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      checkError: error,
    }),
  },
  initialState
);

export default auth;