import { changeField } from '../../modules/addForm';
import axios from "./client";
import Alert from '../alert';

export const TaskSrcInstAdd = (dispatch) => {
  axios.get('/node/replication/source?not_assigned=true')
    .then((res) => {
      if (res.data === undefined) {
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
        document.getElementById("alert-button-0").focus();
      } else {

        setTimeout(() => {
          if (res.data.length !== 0) {

            if (res.data.list !== undefined) {
              const src_add_name = [];
              res.data.list.map((list) => (
                src_add_name.push([list.id, list.name])
              ))
              dispatch(changeField({
                form: 'add_task',
                key: 'src_add_name',
                value: src_add_name
              }))
            }
          } else {
            //initial empty array.
          }
        }, 0);
      }
    });
}

export const TaskTrgInstAdd = (dispatch) => {
  axios.get('/node/replication/target?not_assigned=true')
    .then((res) => {
      if (res.data === undefined) {
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
        document.getElementById("alert-button-0").focus();
      } else {
        setTimeout(() => {
          if (res.data.length !== 0) {
            if (res.data.list !== undefined) {
              const trg_add_name = []
              res.data.list.map((list) => (
                trg_add_name.push([list.id, list.name])
              ))
              dispatch(changeField({
                form: 'add_task',
                key: 'trg_add_name',
                value: trg_add_name
              }))
            }
          } else {
            //initial empty array.
          }
        }, 0);
      }
    });
}

export const TaskVCServerAdd = (dispatch) => {
  const data = {
    offset: 0,
    limit: 1000000,
    type: "VC_SERVER",
    with_child: false
  }
  // axios.get('/node/comparison', { params: data })
  axios.get('/node', { params: data })
    .then((res) => {
      
      if (res.data === undefined) {
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
        document.getElementById("alert-button-0").focus();
      } else {
        setTimeout(() => {
          if (res.data.data.length !== 0) {
            if (res.data.data.list !== undefined) {
              const add_name = []
              res.data.data.list.map((list) => (
                add_name.push([list.id, list.name])
              ))
              dispatch(changeField({
                form: 'add_task',
                key: 'add_vc_server',
                value: add_name
              }))
            }
          } else {
            //initial empty array.
          }
        }, 0);
      }
    });
}

export const TaskVCAgentAdd = (dispatch, node_id) => {
  axios.get(`/node/comparison/${node_id}`)
    .then((res) => {
      if (res.data === undefined) {
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
        document.getElementById("alert-button-0").focus();
      } else {
        setTimeout(() => {
          if (res.data.length !== 0) {
            if (res.data.list !== undefined) {
              const add_name = []
              res.data.list.map((list) => (
                add_name.push([list.id, list.name])
              ))
              dispatch(changeField({
                form: 'add_task',
                key: 'add_agent',
                value: add_name
              }))
            }
          } else {
            //initial empty array.
          }
        }, 0);
      }
    });
}