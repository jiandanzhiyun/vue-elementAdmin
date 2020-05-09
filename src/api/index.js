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
        data:query
    });
}
//bug状态修改
const bugModify=(query)=>{
    return request({
        url:'/status/update',
        method:'post',
        data:query
    });
}
const bugAdd=(query)=>{
    return request({
        url:'/status/add',
        method:'post',
        data:query
    });
}
//status/remove
const bugRemove =(query)=>{
    return request({
        url: '/status/remove',
        method: 'get',
        params: query
    });
}
///log/list
const bugLog =(query)=>{
    return request({
        url: '/search/log',
        method: 'post',
        data: query
    });
}
///log/classify
const bugClassify =(query)=>{
    return request({
        url: '/log/classify',
        method: 'post',
        data: query
    });
}

const bugGroup =(query)=>{
    return request({
        url: '/statusgroup/list',
        method: 'post',
        data: query
    });
}
const ajax={
    Info:Info,
    bugState:bugState,
    bugModify:bugModify,
    bugAdd:bugAdd,
    bugRemove:bugRemove,
    bugLog:bugLog,
    bugClassify:bugClassify,
    bugGroup:bugGroup
}
export default ajax;
