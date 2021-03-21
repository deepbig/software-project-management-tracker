import axios from 'axios';
// import swal from 'sweetalert2';
import Alert from "../alert";

const client = axios.create();
client.interceptors.response.use(response => {
  if (response.data.code === -11006) {
    response.data = "loginRequired";
    return response.data;
  }
  return response;
}, error => {
  if (error === undefined || error.response === undefined || error.response.status === undefined) {
    //eror needed to be handled: Error: Network Error net::ERR_NETWORK_CHANGED
  }
  else if (error.response.status === 401) {
    Alert(2, "Your session has expired. Would you like to be redirected to the login page?", null, "Yes", () => { window.location.href = '/login'; })
    document.getElementById("alert-button-0").focus();
  } else if (error.response.status === 405) {
    Alert(0, "You don't have enough permission to update database.", 'Okay', null, null);
    document.getElementById("alert-button-0").focus();
  }
  return error;
});


/*
글로벌 설정 예시:

// API 주소를 다른 곳으로 사용함
client.defaults.baseURL = 'https://external-api-server.com/' 
// 헤더 설정
client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';
// 인터셉터 설정
axios.intercepter.response.use(\
  response => {
    // 요청 성공 시 특정 작업 수행
    return response;
  }, 
  error => {
    // 요청 실패 시 특정 작업 수행
    return Promise.reject(error);
  }
})  
*/

export default client;