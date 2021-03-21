import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
// import { takeLatest } from 'redux-saga/effects';
// import createRequestSaga, {
//   createRequestActionTypes
// } from '../lib/createRequestSaga';

const CHANGE_FIELD = 'addForm/CHANGE_FIELD';
const CHANGE_FIELD_BIGDATA = 'addForm/CHANGE_FIELD_BIGDATA';
const INITIALIZE_FORM = 'addForm/INITIALIZE_FORM';
const OPEN_NODE_FORM = 'addForm/OPEN_NODE_FORM';
const OPEN_TASK_FORM = 'addForm/OPEN_TASK_FORM';
const ON_TRY_CONNECT = 'addForm/ON_TRY_CONNECT';
const ON_BACKDROP = 'addForm/ON_BACKDROP';

// const [ADD_NODE, ADD_NODE_SUCCESS, ADD_NODE_FAILURE] = createRequestActionTypes(
//   'addForm/ADD_NODE'
// );

// const [ADD_INSTANCE, ADD_INSTANCE_SUCCESS, ADD_INSTANCE_FAILURE] = createRequestActionTypes(
//   'addForm/ADD_INSTANCE'
// );

// const [LOGOUT] = createRequestActionTypes('auth/LOGOUT');

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // add_node, add_instance, add_task
    key, // ip, port, ...
    value // 실제 바꾸려는 값
  })
);

export const changeFieldBigdata = createAction(
  CHANGE_FIELD_BIGDATA,
  ({ form, key, index, type, value }) => ({
    form, // add_node
    key, // ip, port, ...
    index,
    type,
    value // 실제 바꾸려는 값
  })
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form); // add_node, add_instance
export const openNodeForm = createAction(OPEN_NODE_FORM, open_node_form => open_node_form);
export const openTaskForm = createAction(OPEN_TASK_FORM, open_task_form => open_task_form);
export const onTryConnect = createAction(ON_TRY_CONNECT, try_connect => try_connect);
export const onBackdrop = createAction(ON_BACKDROP, backdrop => backdrop);

// export const addNode = createAction(ADD_NODE, ({ type, name, desc, ip, port, db_ip, db_port, db_user, db_password }) => ({
//   type, name, desc, ip, port, db_ip, db_port, db_user, db_password }));
// export const addInstance = createAction(ADD_INSTANCE, ({ name, desc, priority, type, inst_name, store_type, db_ip, db_port, db_sid, db_user, db_password, db_sr_home, bd_list }) => ({
//   name, desc, priority, type, inst_name,  store_type,  db_ip,  db_port,  db_sid,  db_user, db_password, db_sr_home, bd_list }));

// export const logout = createAction(LOGOUT);

// // saga 생성
// const addNodeSaga = createRequestSaga(ADD_NODE, addFormAPI.add_node);
// const addInstnaceSaga = createRequestSaga(ADD_INSTNACE, addFormAPI.add_instance);
// export function* addFormSaga() {
//   yield takeLatest(ADD_NODE, addNodeSaga);
//   yield takeLatest(ADD_INSTNACE, addInstnaceSaga);
// }

const initialState = {
  add_node: {
    type: 'SR_MANAGER',
    name: '',
    desc: '',
    ip: '',
    port: '',
  },
  add_instance: {
    name: '',
    desc: '',
    priority: '',
    driver: '',
    role: 'SOURCE',
    store_product: '',
    ip: '',
    port: '',
    db_ip: '', 
    db_port: '', 
    db_sid: '', 
    db_user: '',
    db_password: '',
    db_sr_home: '',
    bd_list: [['','']],
  },
  add_task:{
    type: '',
    name: '',
    desc: '',
    src_add_name: [],
    src_added_name: [],
    trg_add_name: [],
    trg_added_name: [],
    add_vc_server: [],
    added_vc_server: 0,
    add_agent: [],
    added_src_agent: [],
    added_trg_agent: [],
    checkInitEnv: false,
    checkInitLoad: false,
  },
  open_node_form: false,
  open_task_form: false,
  try_connect: false,
  backdrop: false,
};

const addForm = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value; // 예: state.register.username을 바꾼다
      }),
    [CHANGE_FIELD_BIGDATA]: (state, { payload: { form, key, index, type, value } }) =>
      produce(state, draft => {
        draft[form][key][index][type] = value; // 예: state.add_instance.bd_list[1][0]을 바꾼다
      }),
    [OPEN_NODE_FORM]: (state, { payload: open_node_form }) => ({
      ...state,
      open_node_form: open_node_form
    }),
    [OPEN_TASK_FORM]: (state, { payload: open_task_form }) => ({
      ...state,
      open_task_form: open_task_form
    }),
    [ON_TRY_CONNECT]: (state, { payload: try_connect }) => ({
      ...state,
      try_connect: try_connect
    }),
    [ON_BACKDROP]: (state, { payload: backdrop }) => ({
      ...state,
      backdrop: backdrop
    }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      try_connect: false,
      backdrop: false 
    }),
  },
  initialState
);

export default addForm;