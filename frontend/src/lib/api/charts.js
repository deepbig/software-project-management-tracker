import { bar_chart, doughnut_chart } from '../../modules/actions';
import { changeField } from '../../modules/charts';
import axios from "./client"
// import {Logout} from './logout';
import Alert from "../alert";



export const MetricsResourceLegend = (dispatch, task_id) => {
  const colors = ["#71697A", "#E4BE9E", "#D9D2B6", "#D0E1D4", "#e9edc7"];
  let chartColors = {};
  if (task_id !== undefined && task_id !== "") {
    axios.get(`/task/${task_id}/nodes`)
      .then((res) => {
        if (res.data === undefined) {
          return;
        } else if (res.data.success !== true) {
          Alert(0, res.data.msg, 'Okay', null, null);
          document.getElementById("alert-button-0").focus();
        } else {
          setTimeout(() => {
            if (res.data.length !== 0) {
              res.data.list.map((list, index) =>
                chartColors[list.name] = colors[index]);
              dispatch(changeField({ form: 'metrics_resource', key: 'metrics_resource_legend', value: chartColors }))
            } else {
              return;
            }
          }, 0);
        }
      });
  }
}


export async function MetricsDiskUsage(dispatch, task_id) {
  let promise = new Promise((resolve, reject) => {
    if (task_id !== undefined) {
      axios.get(`/metrics/${task_id}/resource/disk`).then((res) => {
        if (res.data === undefined) {
          return;
        } else if (res.data.success !== true) {
          Alert(0, res.data.msg, 'Okay', null, null);
          document.getElementById("alert-button-0").focus();
        } else if (res.data.data.usages_by_inst.length <= 0) {
          return;
        } else {
          setTimeout(() => {
            dispatch(changeField({ form: 'metrics_resource', key: `metrics_disk_usage`, value: res.data.data.usages_by_inst }))
            resolve(true);
          }, 0);
        }
      })
    }
  });
  let result = await promise;
  return result;
}


export async function MetricsResourceUsage(dispatch, task_id, call_type, latest, type) {
  let promise = new Promise((resolve, reject) => {
    const timeToMS = [1800000, 3600000]; // 30 mins, 1 hours BEGINNING_BEFORE
    const time = call_type === "BEGINNING_BEFORE" ? timeToMS[0] : latest;
    if (call_type === "BEGINNING_BEFORE") {
      ['cpu', 'memory', 'nif', 'icpu', 'imem'].forEach((type_check) => {
        axios.get(`/metrics/${task_id}/resource/${type_check}/before?time=${time}&limit=360`)
          .then((res) => {
            if (res.data === undefined) {
              return;
            } else if (res.data.success !== true) {
              Alert(0, res.data.msg, 'Okay', null, null);
              document.getElementById("alert-button-0").focus();
              return;
            } else if (res.data.data.usages_by_inst.length !== undefined && res.data.data.usages_by_inst.length <= 0) {
              resolve(true);
            } else {
              setTimeout(() => {
                switch (type_check) {
                  case "cpu":
                    dispatch(changeField({ form: 'metrics_resource', key: `metrics_cpu_usage`, value: res.data.data }))
                    break;
                  case "memory":
                    dispatch(changeField({ form: 'metrics_resource', key: `metrics_mem_usage`, value: res.data.data }))
                    break;
                  case "nif":
                    dispatch(changeField({ form: 'metrics_resource', key: `metrics_net_usage`, value: res.data.data }))
                    break;
                  case "icpu":
                    dispatch(changeField({ form: 'metrics_resource', key: `metrics_icpu_usage`, value: res.data.data }))
                    break;
                  case "imem":
                    dispatch(changeField({ form: 'metrics_resource', key: `metrics_imem_usage`, value: res.data.data }))
                    break;
                  default:
                    return;
                }
                resolve(true);
              }, 0)
            }
          })
      })
    } else { // Beggining_From
      const fromTime = {
        times: latest
      }
      axios.post(`/metrics/${task_id}/resource/${type}/from?limit=360`, fromTime)
        .then((res) => {
          if (res.data === undefined) {
            resolve(true);
          } else if (res.data.success !== true || res.data.data.usages_by_inst.length <= 0) {
            resolve(true);
          } else {
            setTimeout(() => {
              //기준시를 기점으로 360개 label 생성,
              //일단 보내줘야... 이름별로 확인 하는 과정은 여기서 못함.
              switch (type) {
                case "cpu":
                  dispatch(changeField({ form: 'metrics_resource', key: `metrics_cpu_usage`, value: res.data.data }))
                  break;
                case "memory":
                  dispatch(changeField({ form: 'metrics_resource', key: `metrics_mem_usage`, value: res.data.data }))
                  break;
                case "nif":
                  dispatch(changeField({ form: 'metrics_resource', key: `metrics_net_usage`, value: res.data.data }))
                  break;
                case "icpu":
                  dispatch(changeField({ form: 'metrics_resource', key: `metrics_icpu_usage`, value: res.data.data }))
                  break;
                case "imem":
                  dispatch(changeField({ form: 'metrics_resource', key: `metrics_imem_usage`, value: res.data.data }))
                  break;
                default:
                  return;
              }
              resolve(true);
            }, 0);
          }
        })
    }
  });
  let result = await promise;
  return result;
}

export const CleanBarChart = (dispatch) => {
  const default_bar_chart = {
    data: {
      labels: [],
      currentHour: undefined,
      datasets: [
        {

          label: "Inserts",
          data: [],
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgb(167,214,120,0.6)',
          borderColor: 'rgb(167,214,120,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgb(167,214,120,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgb(167,214,120,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        },
        {
          label: "Updates",
          data: [],
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgb(255,200,114,0.6)',
          borderColor: 'rgb(255,200,114,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgb(255,200,114,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgb(255,200,114,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        },
        {
          label: "Deletes",
          data: [],
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgb(200,162,200,0.6)',
          borderColor: 'rgb(200,162,200,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgb(200,162,200,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgb(200,162,200,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        },
      ]
    }
  }
  dispatch(bar_chart(default_bar_chart));
}

export const CleanDoughnutChart = (dispatch) => {
  const default_doughnut_chart = {
    data: {
      labels: ["Alters in 24hr", "Drops in 24hr", "Truncates in 24hr"],
      // currentHour: undefined,
      datasets: [
        {
          label: "Alters in 24hr",
          data: [],
          fill: false,
          lineTension: 0.1,
          backgroundColor: [
            "rgb(255,99,132, 0.6)",
            "rgb(54,162,235, 0.6)",
            "rgb(255,206,86, 0.6)"
          ],
          hoverBackgroundColor: [
            "rgb(255,99,132)",
            "rgb(54,162,235)",
            "rgb(255,206,86)"
          ],
        },
      ]
    },
  }
  dispatch(doughnut_chart(default_doughnut_chart));
}


