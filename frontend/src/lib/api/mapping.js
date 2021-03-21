import { changeField, changeFieldWoForm } from '../../modules/mapping';
import axios from "./client"
import Alert from '../alert';

export const MappingList = (dispatch, id, version, orderBy, order, page, rowsPerPage) => {
  const data = {
    offset: page * rowsPerPage,
    limit: rowsPerPage,
    sort_by: orderBy === "" ? "ID" : orderBy,
    direction: order,
  }
  axios.get(`/mapping/${id}/${version}`, { params: data })
    .then((res) => {
      if (res.data === undefined) {
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
        document.getElementById("alert-button-0").focus();
      } else {
        if (res.data.data.length !== 0 ) {
          dispatch(changeFieldWoForm({
            key: 'mappingList',
            value: res.data.data
          }))
        } else {
          dispatch(changeFieldWoForm({
            key: 'mappingList',
            value: []
          }))
        }
      }
    })
}

export const GetMappingList = (dispatch, id, version, orderBy, order, page, rowsPerPage) => {
  const data = {
    offset: page * rowsPerPage,
    limit: rowsPerPage,
    sort_by: orderBy === "" ? "ID" : orderBy,
    direction: order,
  }
  axios.get(`/mapping/${id}/${version}/simple`, { params: data })
    .then((res) => {
      if (res.data === undefined) {
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
        document.getElementById("alert-button-0").focus();
      } else {
        if (res.data.data.length !== 0) {
          dispatch(changeField({
            form: 'objectMapping',
            key: 'mapping_list',
            value: res.data.data
          }))
        } else {
          dispatch(changeField({
            form: 'objectMapping',
            key: 'mapping_list',
            value: []
          }))
        }
      }
    })
}

export const GetSchema = (dispatch, id, type) => {
  axios.get(`/meta/schemas?task_id=${id}&task_type=${type}&role=SOURCE`)
    .then((res) => {
      if (res.data === undefined) {
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
        document.getElementById("alert-button-0").focus();
      } else {
        setTimeout(() => {
          if (res.data.length !== 0) {
            // dispatch(src_schema(res.data.list));
            dispatch(changeField({
              form: 'objectMapping',
              key: 'src_schema',
              value: res.data.list
            }))
          } else {
            console.log("error from GetSchema")
          }
        }, 0);
      }
    });
  axios.get(`/meta/schemas?task_id=${id}&task_type=${type}&role=TARGET`)
    .then((res) => {
      if (res.data === undefined) {
        return;
      } else if (res.data.success !== true) {
        // Need to handle Session
        // Logout_P();
        Alert(0, res.data.msg, 'Okay', null, null);
        document.getElementById("alert-button-0").focus();
      } else {
        setTimeout(() => {
          if (res.data.length !== 0) {
            dispatch(changeField({
              form: 'objectMapping',
              key: 'trg_schema',
              value: res.data.list
            }))
          } else {
            console.log("error from GetSchema")
          }
        }, 0);
      }
    });
}

export const GetSrcObjects = (dispatch, id, type, schema) => {
  if (schema === "") {
    dispatch(changeField({
      form: 'objectMapping',
      key: 'src_objects',
      value: []
    }))
  } else {
    axios.get(`/meta/objects?task_id=${id}&task_type=${type}&schema=${schema}&type=SOURCE`)
      .then((res) => {
        if (res.data === undefined) {
          return;
        } else if (res.data.success !== true) {
          // Need to handle Session
          // Logout_P();
          Alert(0, res.data.msg, 'Okay', null, null);
          document.getElementById("alert-button-0").focus();
        } else {
            if (res.data.length !== 0) {
              dispatch(changeField({
                form: 'objectMapping',
                key: 'src_schema_selected',
                value: schema
              }))
              dispatch(changeField({
                form: 'objectMapping',
                key: 'src_objects',
                value: res.data.list
              }))
            } else {
              console.log("error from GetObjects")
            }
        }
      });
  }
}

export const GetTrgObjects = (dispatch, id, type, schema) => {
  if (schema === "") {
    dispatch(changeField({
      form: 'objectMapping',
      key: 'trg_objects',
      value: []
    }))
  } else {
    axios.get(`/meta/objects?task_id=${id}&task_type=${type}&schema=${schema}&type=TARGET`)
      .then((res) => {
        if (res.data === undefined) {
          return;
        } else if (res.data.success !== true) {
          // Need to handle Session
          // Logout_P();
          Alert(0, res.data.msg, 'Okay', null, null);
          document.getElementById("alert-button-0").focus();
        } else {
          setTimeout(() => {
            if (res.data.length !== 0) {
              dispatch(changeField({
                form: 'objectMapping',
                key: 'trg_schema_selected',
                value: schema
              }))
              dispatch(changeField({
                form: 'objectMapping',
                key: 'trg_objects',
                value: res.data.list
              }))
            } else {
              console.log("error from GetObjects")
            }
          }, 0);
        }
      });
  }
}

// export const CleanSrcObjects = (dispatch) => {
//   dispatch(changeField({
//     form: 'objectMapping',
//     key: 'src_objects',
//     value: "cleaning"
//   }))
// }

// export const CleanTrgObjects = (dispatch) => {
//   dispatch(changeField({
//     form: 'objectMapping',
//     key: 'trg_objects',
//     value: "cleaning"
//   }))
// }

// export const SrcObjectSelected = (dispatch, value) => {
//   dispatch(src_object_selected(value));
// }

// export const TrgObjectSelected = (dispatch, value) => {
//   dispatch(trg_object_selected(value));
// }

// export const CleanObjectMapping = (dispatch) => {
//   dispatch(object_mapping_copy({}));
//   dispatch(src_schema([]));
//   dispatch(trg_schema([]));
//   dispatch(src_objects([]));
//   dispatch(trg_objects([]));
//   dispatch(src_object_selected(""));
//   dispatch(trg_object_selected(""));
//   dispatch(trg_schema_selected(""));
//   dispatch(src_schema_selected(""));
//   dispatch(mapping_list_selected({}));
//   dispatch(mapping_list([]));
// }