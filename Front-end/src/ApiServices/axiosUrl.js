import axios from 'axios';

const instance = axios.create(
    {
        baseURL: "https://shelp-webapp.herokuapp.com/"
    }
);

export default instance;