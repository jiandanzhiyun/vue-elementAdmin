import request from '../utils/request';

//服务列表
const fetchData =(query)=>{
    return request({
        url: '/merchant/Service',
        method: 'get',
        params: query
    });
}

//服务列表缩略图片上传
const abridge=(query)=>{
    return request({
        url: '/api/active/dashboard/upload',
        method: 'post',
        query
    });
}
//服务列表新增
const addServe=(query)=>{
    return request({
        url: '/merchant/Service/add',
        method: 'post',
        query
    });
}
const ajax={
    fetchData:fetchData,
    abridge:abridge,
    addServe:addServe
}
export default ajax;
