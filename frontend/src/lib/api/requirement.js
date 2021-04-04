import { changeFieldWoForm } from '../../modules/requirement';
import axios from './client';
import Alert from '../alert';

export const TotalPersonHoursList = (dispatch, project_id) => {
  axios.get(`/requirement/total_person_hours/${project_id}`)
    .then((res) => {
      if (res.data === undefined) { // in case client return error.
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
      } else {
        if (res.data.data !== undefined && res.data.data !== null) {
          dispatch(changeFieldWoForm({
            key: 'totalPersonHoursList',
            value: res.data.data
          }))
        } else {
          dispatch(changeFieldWoForm({
            key: 'totalPersonHoursList',
            value: {}
          }))
        }
      }
    })
}

export const RequirementList = (dispatch, project_id) => {
  const get_data = {
    offset: 0,
    limit: 0,
  }
  axios.get(`/requirement/${project_id}`, { params: get_data })
    .then((res) => {
      if (res.data === undefined) { // in case client return error.
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
      } else {
        if (res.data.data !== undefined && res.data.data !== null) {
          dispatch(changeFieldWoForm({
            key: 'requirementList',
            value: res.data.data
          }))
        } else {
          dispatch(changeFieldWoForm({
            key: 'requirementList',
            value: {}
          }))
        }
      }
    })
}

export const CreateRequirement = (dispatch, addForm, project_id, handleClose) => {
  if (addForm.title === "" || addForm.requirement_type === "") {
    Alert(0, "The title and requirement type fields cannot be empty.", 'Okay', null, null);
  } else {
    axios.post(`/requirement/${project_id}`, addForm)
      .then((res) => {
        if (res.data === undefined) {
          return;
        } else if (res.data.success !== true) {
          Alert(0, res.data.msg, 'Okay', null, null);
        } else {
          Alert(0, "New requirement is successfully created!", 'Okay', null, null);
          RequirementList(dispatch, project_id);
          handleClose();
        }
      })
  }
}

export const UpdateHours = (dispatch, updateForm, project_id, requirement_id, handleClose) => {
  const save_data = {
    id: requirement_id,
    hour_total: updateForm.hour_analysis + updateForm.hour_designing +
      updateForm.hour_coding + updateForm.hour_testing + updateForm.hour_proj_mgt,
    hour_analysis: updateForm.hour_analysis,
    hour_designing: updateForm.hour_designing,
    hour_coding: updateForm.hour_coding,
    hour_testing: updateForm.hour_testing,
    hour_proj_mgt: updateForm.hour_proj_mgt,
  }
  axios.post(`/requirement/hours/${project_id}`, save_data)
    .then((res) => {
      if (res.data === undefined) {
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
      } else {
        Alert(0, "Requirement hours are successfully added!", 'Okay', null, null);
        RequirementList(dispatch, project_id);
        TotalPersonHoursList(dispatch, project_id);
        handleClose();
      }
    })
}

export const DeleteRequirement = (dispatch, project_id, selected) => {
  if (selected.id === undefined || selected.id === null || selected.id === "") {
    Alert(0, "Please select a requirement you want to delete.", 'Okay', null, null);
  }
  axios.post(`/requirement/delete/${selected.id}`)
    .then((res) => {
      if (res.data === undefined) { // client return 400 level error
        return;
      }
      if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);

      } else {
        Alert(0, "Deleting requirement is successfully completed!", 'Okay', null, null);
        RequirementList(dispatch, project_id);
        TotalPersonHoursList(dispatch, project_id);
      }
    })
}