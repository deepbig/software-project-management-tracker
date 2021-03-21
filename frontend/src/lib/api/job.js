import { changeField } from '../../modules/job';
import axios from "./client"
import Alert from '../alert';

// import Logout_P from './logout';

export const JobDetail = (dispatch, top_id) => {
    axios.get(`/job/${top_id}`)
    .then((res) => {
        if (res.data === undefined) {
            return ;
        } else if(res.data.success !== true) {
            // Need to handle Session
            // Logout_P();
            Alert(0, res.data.msg, 'Okay', null, null);
            document.getElementById("alert-button-0").focus();
        } else {
            setTimeout(() => {
                if(res.data.length !== 0) {
                    dispatch(changeField({
                      key: 'job_detail',
                      value: res.data.data
                    }))
                } else {
                    dispatch(changeField({
                      key: 'job_detail',
                      value: {}
                    }))
                }
            }, 0);
        }
    });
}


// export const CleanJobTopology = (dispatch) => {
//     dispatch(job_detail({}));
// }