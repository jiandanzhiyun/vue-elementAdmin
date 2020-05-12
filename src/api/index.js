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
const bugStatus =(query)=>{
    return request({
        url: '/get/status',
        method: 'post',
        data: query
    });
}
//statusgroup/edit
const bugEdit =(query)=>{
    return request({
        url: '/statusgroup/edit',
        method: 'post',
        data: query
    });
}
//statusgroup/add
const bugGroupadd=(query)=>{
    return request({
        url: '/statusgroup/add',
        method: 'post',
        data: query
    });
}
//statusgroup/remove
const bugGroupremove=(query)=>{
    return request({
        url: '/statusgroup/remove',
        method: 'get',
        params: query
    });
}
//role/list
const roleList=(query)=>{
    return request({
        url: '/rolegroup/list',
        method: 'post',
        data: query
    });
}
//role/get
const roleGet=(query)=>{
    return request({
        url: '/roles/get',
        method: 'get',
        params: query
    });
}
//role/add
const roleAdd=(query)=>{
    return request({
        url: '/rolegroup/add',
        method: 'post',
        data: query
    });
}
//role/edit
const roleEdit=(query)=>{
    return request({
        url: '/rolegroup/edit',
        method: 'post',
        data: query
    });
}
//rolegroup/remove
const roleRemove=(query)=>{
    return request({
        url: '/rolegroup/remove',
        method: 'get',
        params: query
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
    bugGroup:bugGroup,
    bugStatus:bugStatus,
    bugEdit:bugEdit,
    bugGroupadd:bugGroupadd,
    bugGroupremove:bugGroupremove,
    roleList:roleList,
    roleGet:roleGet,
    roleAdd:roleAdd,
    roleEdit:roleEdit,
    roleRemove:roleRemove
}
export default ajax;
