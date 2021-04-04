import { changeFieldWoForm } from '../../modules/team';
import axios from './client';
import Alert from '../alert';

export const MemberList = (dispatch, project_id) => {
  const get_data = {
    offset: 0,
    limit: 0,
  }
  axios.get(`/member/${project_id}`, { params: get_data })
    .then((res) => {
      if (res.data === undefined) { // in case client return error.
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
      } else {
        if (res.data.data.total !== undefined && res.data.data.total !== null) {
          dispatch(changeFieldWoForm({
            key: 'memberList',
            value: res.data.data
          }))
        } else {
          dispatch(changeFieldWoForm({
            key: 'memberList',
            value: {}
          }))
        }
      }
    })
}

export const UserList = (dispatch) => {
  const get_data = {
    offset: 0,
    limit: 0,
  }
  axios.get('/member/user', { params: get_data })
    .then((res) => {
      if (res.data === undefined) { // in case client return error.
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
      } else {
        if (res.data.data.total !== undefined && res.data.data.total !== null) {
          dispatch(changeFieldWoForm({
            key: 'userList',
            value: res.data.data
          }))
        } else {
          dispatch(changeFieldWoForm({
            key: 'userList',
            value: {}
          }))
        }
      }
    })
}

export const CreateUser = (dispatch, username, handleClose) => {
  axios.post(`/member/user/${username}`)
    .then((res) => {
      if (res.data === undefined) {
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
      } else {
        Alert(0, "New user is successfully created!", 'Okay', null, null);
        UserList(dispatch);
        handleClose();
      }
    })
}

export const RoleList = (dispatch) => {
  const get_data = {
    offset: 0,
    limit: 0,
  }
  axios.get('/member/role', { params: get_data })
    .then((res) => {
      if (res.data === undefined) { // in case client return error.
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
      } else {
        if (res.data.data.total !== undefined && res.data.data.total !== null) {
          dispatch(changeFieldWoForm({
            key: 'roleList',
            value: res.data.data
          }))
        } else {
          dispatch(changeFieldWoForm({
            key: 'roleList',
            value: {}
          }))
        }
      }
    })
}


export const CreateRole = (dispatch, rolename, handleClose) => {
  axios.post(`/member/role/${rolename}`)
    .then((res) => {
      if (res.data === undefined) {
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
      } else {
        Alert(0, "New role is successfully created!", 'Okay', null, null);
        RoleList(dispatch);
        handleClose();
      }
    })
}

export const CreateMember = (dispatch, addForm, project_id, handleClose) => {
  axios.post(`/member/${project_id}`, addForm)
    .then((res) => {
      if (res.data === undefined) {
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
      } else {
        Alert(0, "New member is successfully created!", 'Okay', null, null);
        MemberList(dispatch, project_id);
        handleClose();
      }
    })
}

export const DeleteMember = (dispatch, project_id, selected) => {
  if (selected.id === undefined || selected.id === null || selected.id === "") {
    Alert(0, "Please select a member you want to delete.", 'Okay', null, null);
  }
  axios.post(`/member/delete/${selected.id}`)
  .then((res) => {
    if (res.data === undefined) { // client return 400 level error
      return ;
    }
    if (res.data.success !== true) {
      Alert(0, res.data.msg, 'Okay', null, null);
      
    } else {
      Alert(0, "Deleting member is successfully completed!", 'Okay', null, null);
      MemberList(dispatch, project_id);
    }
  })
}