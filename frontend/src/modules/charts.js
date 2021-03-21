import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_FIELD = 'charts/CHANGE_FIELD';
const INITIALIZE_STATE = 'charts/INITIALIZE_STATE';
const INITIALIZE_STATE_CHART = 'charts/INITIALIZE_STATE_CHART';


export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // latest_resource...
    key, // latest_cpu, latest_mem ...
    value
  })
);
export const initializeState = createAction(INITIALIZE_STATE, type => type);
export const initializeStateChart = createAction(INITIALIZE_STATE_CHART);

const initialState = {
  metrics_resource: {
    metrics_resource_legend: {},
    metrics_cpu_usage: {},
    metrics_mem_usage: {},
    metrics_net_usage: {},
    metrics_icpu_usage: {},
    metrics_imem_usage: {},
    metrics_disk_usage: [],
  },
  cpu: {
    chart_data_cpu: [],
    latest_cpu: [],
  },
  mem: {
    chart_data_mem: [],
    latest_mem: [],
  },
  net: {
    chart_data_net: [],
    latest_net: [],
  },
  icpu: {
    chart_data_icpu: [],
    latest_icpu: [],
  },
  imem: {
    chart_data_imem: [],
    latest_imem: [],
  },

  bar_chart: {
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
  },
  
  doughnut_chart: {
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
    }
  },
}

const charts = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) => key === "all" ?
      produce(state, draft => {
        draft[form] = value; // ex) state.latest_resource
      }) :
      produce(state, draft => {
        draft[form][key] = value; // ex) state.latest_resource.latest_cpu
      }),
    [INITIALIZE_STATE]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [INITIALIZE_STATE_CHART]: () => ({
      ...initialState,
    }),
  },
  initialState,

);

export default charts;