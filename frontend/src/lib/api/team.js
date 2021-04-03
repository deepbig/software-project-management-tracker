import { changeField, changeFieldWoForm, initializeForm } from '../../modules/team';
import axios from './client';
import Alert from '../alert';

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
