import request from '../utils/request';

//用户信息
const Info =(query)=>{
    return request({
        url: '/user/info',
        method: 'get',
        params: query
    });
}
//bug所有状态
const bugState=(query)=>{
    return request({
        url:'/status/list',
        method:'post',
        query
    });
}
//bug状态修改
const bugModify=(query)=>{
    return request({
        url:'/status/update',
        method:'post',
        query
    });
}
const ajax={
    Info:Info,
    bugState:bugState,
    bugModify:bugModify
}
export default ajax;
