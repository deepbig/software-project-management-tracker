import { changeFieldWoForm } from '../../modules/risk';
import axios from './client';
import Alert from '../alert';

export const RiskList = (dispatch, project_id) => {
  const get_data = {
    offset: 0,
    limit: 0,
  }
  axios.get(`/risk/${project_id}`, { params: get_data })
    .then((res) => {
      if (res.data === undefined) { // in case client return error.
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
      } else {
        if (res.data.data.total !== undefined && res.data.data.total !== null) {
          dispatch(changeFieldWoForm({
            key: 'riskList',
            value: res.data.data
          }))
        } else {
          dispatch(changeFieldWoForm({
            key: 'riskList',
            value: {}
          }))
        }
      }
    })
}

export const CreateRisk = (dispatch, addForm, project_id, handleClose) => {
  if (addForm.name === "" || addForm.priority === "") {
    Alert(0, "The name and priority fields cannot be empty.", 'Okay', null, null);
  } else {
    axios.post(`/risk/${project_id}`, addForm)
      .then((res) => {
        if (res.data === undefined) {
          return;
        } else if (res.data.success !== true) {
          Alert(0, res.data.msg, 'Okay', null, null);
        } else {
          Alert(0, "New risk is successfully created!", 'Okay', null, null);
          RiskList(dispatch, project_id);
          handleClose();
        }
      })
  }

}

export const DeleteRisk = (dispatch, project_id, selected) => {
  if (selected.id === undefined || selected.id === null || selected.id === "") {
    Alert(0, "Please select a risk you want to delete.", 'Okay', null, null);
  }
  axios.post(`/risk/delete/${selected.id}`)
  .then((res) => {
    if (res.data === undefined) { // client return 400 level error
      return ;
    }
    if (res.data.success !== true) {
      Alert(0, res.data.msg, 'Okay', null, null);
      
    } else {
      Alert(0, "Deleting risk is successfully completed!", 'Okay', null, null);
      RiskList(dispatch, project_id);
    }
  })
}