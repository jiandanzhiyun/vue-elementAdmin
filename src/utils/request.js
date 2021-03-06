import axios from 'axios';
const service = axios.create({
    // process.env.NODE_ENV === 'development', //来判断是否开发环境
     headers:{'Content-Type':'application/json;charset=utf-8',"X-Token":localStorage.getItem('token')},
     baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
});
service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if (response.data.code==10 || response.data.code==20){
                    alert('登录失效,即将返回重新登录')
                localStorage.clear()
                setTimeout(()=>{
                    window.location.href="http://localhost:5200/#/login"

                },200)
            }
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
