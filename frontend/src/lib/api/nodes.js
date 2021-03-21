import { changeField } from '../../modules/nodes';
import axios from "./client"
import Alert from '../alert';

export const NodeList = (dispatch, type) => {
  const data = {
    offset: 0,
    limit: 1000000,
    type: type !== undefined ? type : "",
  }
  axios.get('/node', { params: data })
  .then((res) => {
      if (res.data === undefined) {
          return ;
      } else if (res.data.success !== true) {
          Alert(0, res.data.msg, 'Okay', null, null);
          document.getElementById("alert-button-0").focus();
      } else {
          // setTimeout(() => {
              if(res.data.length !== 0) {
                  dispatch(changeField({
                    key: 'node_list',
                    value: res.data.data
                  }))
              } else {
                dispatch(changeField({
                  key: 'node_list',
                  value: {}
                }))
              }
          // }, 0);
      }
  });
}