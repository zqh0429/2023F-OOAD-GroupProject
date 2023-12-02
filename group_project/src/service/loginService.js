import axios from 'axios';

const dataServerUrl = 'http://127.0.0.1:8082';

function loginCheck(param, callback) {
    /*
        param: username, password
    */
    const url = `${dataServerUrl}/api/user/v1/login`;
    axios.get(url, param)
        .then(resp => {
            callback(resp);
        })
        .catch(errResp => {
            console.log(errResp);
        });
}

export default {
    loginCheck,
};