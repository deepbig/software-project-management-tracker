import { changeField } from '../../modules/metrics';
import axios from "./client"
import Alert from "../alert";

// import { repair_data_single, repair_data_multiple } from "./dummy_data";

export const MetricsList = (dispatch, type) => {
  const data = {
    offset: 0,
    limit: 1000000,
    type: type,
  };
  axios.get("/metrics/summary/task", { params: data })
    .then((res) => {
      if (res.data === undefined) {
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, "Okay", null, null);
        document.getElementById("alert-button-0").focus();
      } else {
        // setTimeout(() => {
        if (res.data.length !== 0) {
          dispatch(changeField({
            key: 'metrics_list',
            value: res.data.data
          }))
        } else {
          dispatch(changeField({
            key: 'metrics_list',
            value: {}
          }))
        }
        // }, 0);
      }
    });
}

export const MetricsTaskStatus = (dispatch, task_id, metrics_task_status) => {
  axios.get(`/metrics/${task_id}/status`)
    .then((res) => {
      if (res.data === undefined) {
        return;
      } else if (res.data.success !== true) {
        Alert(0, res.data.msg, 'Okay', null, null);
        document.getElementById("alert-button-0").focus();
      } else {
        // setTimeout(() => {
        if (res.data.length !== 0) {
          if (JSON.stringify(metrics_task_status) !== JSON.stringify(res.data.data)) {
            dispatch(changeField({
              key: 'metrics_task_status',
              value: res.data.data
            }))
          }
        } else {
          dispatch(changeField({
            key: 'metrics_task_status',
            value: {}
          }))
        }
        // }, 0);
      }
    });
}

export const GetElementsValue = (dispatch, metrics_task_status) => {
  let elements = [];
  if (metrics_task_status.task_type === "REPLICATION") {

    const distance = 70;
    const max_height = metrics_task_status.source.total > metrics_task_status.target.total ?
      (metrics_task_status.source.total - 1) * distance : (metrics_task_status.target.total - 1) * distance;
    // its hard to compare in this stage. need to deal with this issue during api returns.

    metrics_task_status.source.nodes.forEach((inst, index) => {
      elements.push({
        id: inst.id.toString(),
        type: 'srNode',
        data: {
          type: 'source',
          name: inst.name,
          status: inst.status
        },
        style: {
          zIndex: 100
        },
        position: {
          x: 100,
          y: max_height === (metrics_task_status.source.total - 1) * distance ?
            distance * index : metrics_task_status.target.length > metrics_task_status.source.total + 1 ?
              (max_height) / (metrics_task_status.source.total + 1) * (index + 1) : max_height / metrics_task_status.source.total / 2 + (index * distance)
        }
      })
    })
    metrics_task_status.target.nodes.forEach((inst, index) => {
      elements.push({
        id: inst.id.toString(),
        type: 'srNode',
        data: {
          type: 'target',
          name: inst.name,
          status: inst.status
        },
        position: {
          x: 400,
          y: max_height === (metrics_task_status.target.total - 1) * distance ?
            distance * index : metrics_task_status.source.total > metrics_task_status.target.total + 1 ?
              (max_height) / (metrics_task_status.target.total + 1) * (index + 1) : max_height / metrics_task_status.target.total / 2 + (index * distance)
        }
      })
    })
    metrics_task_status.source.nodes.forEach((inst_src) => {
      metrics_task_status.target.nodes.forEach((inst_trg) => {
        elements.push({
          id: `e${inst_src.id}-${inst_trg.id}`,
          source: `${inst_src.id}`,
          target: `${inst_trg.id}`,
          // type: 'smoothstep',
          animated: inst_src.status === "RUNNING" && inst_trg.status === "RUNNING"
        })
      })
    })
    // return elements;
    dispatch(changeField({
      key: 'metrics_graph_elements',
      value: elements
    }))

  } else if (metrics_task_status.task_type === "COMPARISON") {
    elements.push({
      id: `agent_${metrics_task_status.source_status.id}`,
      type: 'vcAgentNode',
      data: {
        type: 'source',
        name: metrics_task_status.source_status.name,
        status: metrics_task_status.source_status.status
      },
      position: {
        x: 50,
        y: 50,
      }
    });
    elements.push({
      id: `server_${metrics_task_status.server_status.id}`,
      type: 'vcServerNode',
      data: {
        type: 'server',
        name: metrics_task_status.server_status.name,
        status: metrics_task_status.server_status.status

      },
      position: {
        x: 300,
        y: 50,
      }
    });
    elements.push({
      id: `agent_${metrics_task_status.target_status.id}`,
      type: 'vcAgentNode',
      data: {
        type: 'target',
        name: metrics_task_status.target_status.name,
        status: metrics_task_status.target_status.status
      },
      position: {
        x: 550,
        y: 50,
      }
    });
    elements.push({
      id: `eserver_${metrics_task_status.server_status.id}-agent_${metrics_task_status.source_status.id}`,
      source: `agent_${metrics_task_status.source_status.id}`,
      target: `server_${metrics_task_status.server_status.id}`,
      animated: false
      // type: 'smoothstep',
    });
    elements.push({
      id: `eserver_${metrics_task_status.server_status.id}-agent_${metrics_task_status.target_status.id}`,
      source: `server_${metrics_task_status.server_status.id}`,
      target: `agent_${metrics_task_status.target_status.id}`,
      animated: false
      // type: 'smoothstep',
    });

  }
  dispatch(changeField({
    key: 'metrics_graph_elements',
    value: elements
  }))
}

export async function MetricsTaskDetail(dispatch, task_id, task_mode) {
  let promise = new Promise((resolve, reject) => {
    if (task_id === undefined) {
      dispatch(changeField({
        key: 'metrics_task_detail',
        value: {}
      }))
    } else {
      axios.get(`/metrics/${task_id}/detail${task_mode !== undefined ? `?replication_mode=` + task_mode : ""}`)
        .then((res) => {
          if (res.data === undefined) {
            return;
          } else if (res.data.success !== true) {
            Alert(0, res.data.msg, "Okay", null, null);
            document.getElementById("alert-button-0").focus();
            resolve(true);
          } else {
            // setTimeout(() => {
            if (res.data.length !== 0) {

              dispatch(changeField({
                key: 'metrics_task_detail',
                value: res.data.data
              }))

              // // dev mode: REPLICATION
              // dispatch(changeField({
              //   key: 'metrics_task_detail',
              //   value: replication_data.data
              // }))

              // //dev mode: InitLoad
              // dispatch(changeField({
              //   key: 'metrics_task_detail',
              //   value: InitLoad_data.data
              // }))

              // //dev mode: InitEnv
              // dispatch(changeField({
              //   key: 'metrics_task_detail',
              //   value: initEnv_data.data
              // }))

              resolve(true);
            } else {
              dispatch(changeField({
                key: 'metrics_task_detail',
                value: {}
              }))
              resolve(true);
            }
            // }, 0);
          }
        });
    }
  });
  let result = await promise;
  return result;
}

export async function MetricsTaskMigration(
  dispatch,
  task_id,
  orderBy,
  order,
  page,
  rowsPerPage
) {
  let promise = new Promise((resolve, reject) => {
    if (task_id === "") {
      dispatch(changeField({
        key: 'metrics_task_migration',
        value: {}
      }))
    } else {
      const get_data = {
        offset: page * rowsPerPage,
        limit: rowsPerPage,
        sort_by: orderBy === "" ? "ID" : orderBy,
        sort_direction: order,
      };
      axios.get(`/metrics/${task_id}/migration`, { params: get_data })
        .then((res) => {
          if (res.data === undefined) {
            return;
          } else if (res.data.success !== true) {
            Alert(0, res.data.msg, "Okay", null, null);
            document.getElementById("alert-button-0").focus();
            resolve(true);
          } else {
            if (res.data.length !== 0) {
              dispatch(changeField({
                key: 'metrics_task_migration',
                value: res.data.data
              }))
              resolve(true);
            } else {
              dispatch(changeField({
                key: 'metrics_task_migration',
                value: {}
              }))
              resolve(true);
            }
          }
        })
    }
  });
  let result = await promise;
  return result;
}

export async function MetricsTaskObjects(
  dispatch,
  task_id,
  orderBy,
  order,
  page,
  rowsPerPage
) {
  let promise = new Promise((resolve, reject) => {
    if (task_id === "") {
      dispatch(changeField({
        key: 'metrics_task_objects',
        value: {}
      }))
    } else {
      const get_data = {
        offset: page * rowsPerPage,
        limit: rowsPerPage,
        sort_by: orderBy === "" ? "ID" : orderBy,
        sort_direction: order,
      };
      axios.get(`/metrics/${task_id}/objects`, { params: get_data })
        .then((res) => {
          if (res.data === undefined) {
            return;
          } else if (res.data.success !== true) {
            // Need to handle Session
            // Logout_P();
            Alert(0, res.data.msg, "Okay", null, null);
            document.getElementById("alert-button-0").focus();
            resolve(true);
          } else {
            setTimeout(() => {
              if (res.data.length !== 0) {
                dispatch(changeField({
                  key: 'metrics_task_objects',
                  value: res.data.data
                }))
                resolve(true);
              } else {
                dispatch(changeField({
                  key: 'metrics_task_objects',
                  value: {}
                }))
                resolve(true);
              }
            }, 0);
          }
        });
    }
  });
  let result = await promise;
  return result;
}

export async function MetricsTaskHistory(
  dispatch,
  task_id,
  page,
  rowsPerPage
) {
  let promise = new Promise((resolve, reject) => {
    if (task_id === undefined) {
      dispatch(changeField({
        key: 'metrics_task_history',
        value: {}
      }))
    } else {
      const get_data = {
        offset: page * rowsPerPage,
        limit: rowsPerPage,
      };
      axios.get(`/metrics/${task_id}/history`, { params: get_data })
        .then((res) => {
          if (res.data === undefined) {
            return;
          } else if (res.data.success !== true) {
            Alert(0, res.data.msg, "Okay", null, null);
            document.getElementById("alert-button-0").focus();
            resolve(true);
          } else {
            // setTimeout(() => {
            if (res.data.length !== 0) {
              dispatch(changeField({
                key: 'metrics_task_history',
                value: res.data.data
              }))
              resolve(true);
            } else {
              dispatch(changeField({
                key: 'metrics_task_history',
                value: {}
              }))
              resolve(true);
            }
          }
        });
    }
  });
  let result = await promise;
  return result;
}

export async function MetricsTaskHistoryJob(
  dispatch,
  task_id,
  job_id,
  page,
  rowsPerPage
) {
  let promise = new Promise((resolve, reject) => {
    if (task_id === undefined || job_id === undefined || job_id === null) {
      dispatch(changeField({
        key: 'metrics_task_job',
        value: {offset: 0, size: 0, total: 0, list: null }
      }))
    } else {
      const get_data = {
        offset: page * rowsPerPage,
        limit: rowsPerPage,
      };
      // axios.get(`/metrics/${task_id}/history/${Number(job_id)}`, { params: get_data })
      axios.get(`/metrics/${task_id}/history/${job_id}`, { params: get_data })
        .then((res) => {
          if (res.data === undefined) {
            return;
          } else if (res.data.success !== true) {
            Alert(0, res.data.msg, "Okay", null, null);
            document.getElementById("alert-button-0").focus();
            resolve(true);
          } else {
            // setTimeout(() => {
            if (res.data.length !== 0) {

              // // organized dummy data
              // let dummy_list = [];
              // res.data.data.list.forEach((list, index) => {
              //   list.src_object = {
              //     base_scn: 0,
              //     index: "string",
              //     name: `test_object${parseInt(Math.random() * 100)}`,
              //     partition: "string",
              //     schema: `test_schema${parseInt(Math.random() * 100)}`,
              //     scn: 0
              //   };
              //   dummy_list.push(list);
              // })

              // let dummy_data = {
              //   offset: get_data.offset,
              //   size: get_data.limit,
              //   total: 30,
              //   list: dummy_list
              // }

              dispatch(changeField({
                key: 'metrics_task_job',
                // value: res.data.data
                value: res.data.data
              }))


              resolve(true);
            } else {
              dispatch(changeField({
                key: 'metrics_task_job',
                value: {}
              }))
              resolve(true);
            }
            // }, 0);
          }
        });
    }
  });
  let result = await promise;
  return result;
}

export const MetricsTaskHistoryJobSelected = (
  dispatch,
  task_id,
  compare_id,
  page,
  rowsPerPage
) => {

  const get_data = {
    offset: page * rowsPerPage,
    limit: rowsPerPage,
  };
  axios.get(`/metrics/${task_id}/irs/${compare_id}`, { params: get_data })
  .then((res) => {
    if (res.data === undefined) {
      return;
    } else if (res.data.success !== true) {
      Alert(0, res.data.msg, "Okay", null, null);
      document.getElementById("alert-button-0").focus();
    } else {
      if (res.data.length !== 0) {
        dispatch(changeField({
          key: 'metrics_task_job_selected',
          value: res.data.data
        }))
      } else {
        dispatch(changeField({
          key: 'metrics_task_job_selected',
          value: {}
        }))
      }
    }
  });
}

