import { changeFieldWoForm } from '../../modules/project';
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

export const ProjectDetail = (dispatch, project_id) => {
  axios.get(`/project/${project_id}`)
    .then((res) => {
      if (res.data === undefined) { // in case client return error.
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
      } else {
        if (res.data.data !== undefined && res.data.data !== null) {
          dispatch(changeFieldWoForm({
            key: 'projectDetail',
            value: res.data.data
          }))
        } else {
          dispatch(changeFieldWoForm({
            key: 'projectDetail',
            value: {}
          }))
        }
      }
    })
}

export const DeleteProject = (dispatch, selected) => {
  if (selected.id === undefined || selected.id === null || selected.id === "") {
    Alert(0, "Please select a project you want to delete.", 'Okay', null, null);
  }
  axios.post(`/project/delete/${selected.id}`)
  .then((res) => {
    if (res.data === undefined) { // client return 400 level error
      return ;
    }
    if (res.data.success !== true) {
      Alert(0, res.data.msg, 'Okay', null, null);
      
    } else {
      Alert(0, "Deleting project is successfully completed!", 'Okay', null, null);
      ProjectList(dispatch, selected.id);
    }
  })
}