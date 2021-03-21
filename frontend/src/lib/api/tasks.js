import { changeFieldWoForm } from '../../modules/tasks';
import axios from "./client"
import Alert from '../alert';

export const TaskList = (dispatch, type) => {
  const data = {
    offset: 0,
    limit: 1000000,
    type: type
  }
  axios.get('/task', { params: data })
    .then((res) => {
      if (res.data === undefined) {
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
        document.getElementById("alert-button-0").focus();
      } else {
          if (res.data.length !== 0) {
            dispatch(changeFieldWoForm({
              key: 'task_list',
              value: res.data.data
            }))
          } else {
            dispatch(changeFieldWoForm({
              key: 'task_list',
              value: {}
            }))
          }
      }
    });
}

export const TaskDetail = (dispatch, task_id) => {
  axios.get(`/task/${task_id}?withNodes=false`)
    .then((res) => {
      if (res.data === undefined) {
        return;
      } else if (res.data.success !== true) {
        Alert(2, res.data.msg, null, "Okay", () => { window.location.href = '/app/main'; });
        document.getElementById("alert-button-0").focus();
      } else {
          if (res.data.length !== 0) {
            dispatch(changeFieldWoForm({
              key: 'task_detail',
              value: res.data.data
            }))
          } else {
            dispatch(changeFieldWoForm({
              key: 'task_detail',
              value: {}
            }))
          }
      }
    });
}

export const runTask = ({ task_id, form }) => (
  form.type === "REPLICATION" ? 
  axios.post(`/task/${task_id}/start`)
  :
  axios.post(`/task/${task_id}/start`, form)
);

export const stopTask = ({ task_id }) => axios.post(`/task/${task_id}/stop`);
