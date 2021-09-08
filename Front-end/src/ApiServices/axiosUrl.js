import axios from 'axios';
import url from './BackendUrl';

const instance = axios.create(
    {
        baseURL: url
    }

);

instance.interceptors.response.use((response) => {
    return response
 }, function (error) {

    const originalRequest = error.config;
    console.log(originalRequest);
    
    if(error){
        if (error.response.status === 401 && originalRequest.url === url + "auth/token") {
            localStorage.clear()
            window.location.href = '/login'
            return Promise.reject(error);
        }
     
        if (error.response.status === 401 && !originalRequest._retry) {
     
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('ref_token');
            if(refreshToken){
                console.log("calling reqqq")
                return axios.post(url + 'auth/token/', {refresh_token:refreshToken},
                {
                    headers: {
                        Authorization: 'Bearer '+ refreshToken
                    }
                })
                .then(res => {
                    if (res.status === 201 || res.status=== 200) {
                        console.log("sucess")
                        localStorage.setItem("ref_token",res.data.refresh_token);
                        localStorage.setItem("user",res.data.access_token);
                        originalRequest.headers["Authorization"] = 'Bearer ' + localStorage.getItem('user');
                        return axios(originalRequest);
                    }
                })
                .catch(err=>{
                    console.log(err.response);
                    localStorage.clear();
                    window.location.href = '/login'
                })
            }
            else {
                console.log("No ref token was found")
                localStorage.clear();
                return window.location.href = '/login'
    
            }
            
        }
    }

   
    return Promise.reject(error);
 });

export default instance;