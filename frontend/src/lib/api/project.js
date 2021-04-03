import { changeField, changeFieldWoForm } from '../../modules/project';
import axios from './client';
import Alert from '../alert';

export const ProjectList = (dispatch) => {
  const get_data = {
    offset: 0,
    limit: 0,
  }
  axios.get('/project', { params: get_data })
    .then((res) => {
      if (res.data === undefined) { // in case client return error.
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
      } else {
        if (res.data.data.total !== undefined && res.data.data.total !== null) {
          dispatch(changeFieldWoForm({
            key: 'projectList',
            value: res.data.data
          }))
        } else {
          dispatch(changeFieldWoForm({
            key: 'projectList',
            value: {}
          }))
        }
      }
    })
}

export const CreateProject = (dispatch, addForm, handleClose) => {
  axios.post('/project', addForm)
    .then((res) => {
      if (res.data === undefined) {
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
      } else {
        Alert(0, "New Project is successfully created!", 'Okay', null, null);
        ProjectList(dispatch);
        handleClose();
      }
    })
}
