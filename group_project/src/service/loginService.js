import axios from 'axios';

// const dataServerUrl = 'http://127.0.0.1:8082';

function loginCheck(param, callback) {
    /*
        param: username, password
    */
    // const url = `${dataServerUrl}/api/login/v1/login`;
    const url = `api/login/v1/login`;
    const params = {
        param
    };
    axios.get(url, {params})
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
