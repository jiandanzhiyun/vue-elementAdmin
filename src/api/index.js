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
//default/status
const defaultStatus=(query)=>{
    return request({
        url: '/default/status',
        method: 'post',
        data: query
    });
}
//get/importants
const getImport=(query)=>{
    return request({
        url: '/get/importants',
        method: 'post',
        data: query
    });
}
//default/important
const defaultImport=(query)=>{
    return request({
        url: '/default/important',
        method: 'post',
        data: query
    });
}
//get/levels
const getLevels=(query)=>{
    return request({
        url: '/get/levels',
        method: 'post',
        data: query
    });
}
const defaultLevels=(query)=>{
    return request({
        url: '/default/level',
        method: 'post',
        data: query
    });
}
//default/save
const defaultSave=(query)=>{
    return request({
        url: '/default/save',
        method: 'post',
        data: query
    });
}
//important/get
const ImportantGet=(query)=>{
    return request({
        url: '/important/get',
        method: 'post',
        data: query
    });
}
//important/add
const ImportantAdd=(query)=>{
    return request({
        url: '/important/add',
        method: 'post',
        data: query
    });
}
//important/update
const ImportantUpdate=(query)=>{
    return request({
        url: '/important/update',
        method: 'post',
        data: query
    });
}
///important/del
const ImportantDel=(query)=>{
    return request({
        url: '/important/del',
        method: 'get',
        params: query
    });
}
//level/get
const levelGet=(query)=>{
    return request({
        url: '/level/get',
        method: 'post',
        data: query
    });
}
//level/update
const levelUpdate=(query)=>{
    return request({
        url: '/level/update',
        method: 'post',
        data: query
    });
}
const levelAdd=(query)=>{
    return request({
        url: '/level/add',
        method: 'post',
        data: query
    });
}
///level/del
const levelDel=(query)=>{
    return request({
        url: '/level/del',
        method: 'get',
        params: query
    });
}
//position/list
const positionList=(query)=>{
    return request({
        url: '/position/list',
        method: 'post',
        data: query
    });
}
//position/add
const positionAdd=(query)=>{
    return request({
        url: '/position/add',
        method: 'post',
        data: query
    });
}
///position/update
const positionUpdate=(query)=>{
    return request({
        url: '/position/update',
        method: 'post',
        data: query
    });
}
//get/hypos
const getHypos=(query)=>{
    return request({
        url: '/get/hypos',
        method: 'post',
        data: query
    });
}
//position/del
const positionDel=(query)=>{
    return request({
        url: '/position/del',
        method: 'get',
        params: query
    });
}
const userGroup=(query)=>{
    return request({
        url: '/group/get',
        method: 'post',
        data: query
    });
}
///group/update
const userUpdate=(query)=>{
    return request({
        url: '/group/update',
        method: 'post',
        data: query
    });
}
///group/add
const userAdd=(query)=>{
    return request({
        url: '/group/add',
        method: 'post',
        data: query
    });
}
//get/user
const getName=(query)=>{
    return request({
        url: '/get/user',
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
    bugGroup:bugGroup,
    bugStatus:bugStatus,
    bugEdit:bugEdit,
    bugGroupadd:bugGroupadd,
    bugGroupremove:bugGroupremove,
    roleList:roleList,
    roleGet:roleGet,
    roleAdd:roleAdd,
    roleEdit:roleEdit,
    roleRemove:roleRemove,
    defaultStatus:defaultStatus,
    getImport:getImport,
    defaultImport:defaultImport,
    getLevels:getLevels,
    defaultLevels:defaultLevels,
    defaultSave:defaultSave,
    ImportantGet:ImportantGet,
    ImportantAdd:ImportantAdd,
    ImportantUpdate:ImportantUpdate,
    ImportantDel:ImportantDel,
    levelGet:levelGet,
    levelUpdate:levelUpdate,
    levelAdd:levelAdd,
    levelDel:levelDel,
    positionList:positionList,
    positionAdd:positionAdd,
    positionUpdate:positionUpdate,
    getHypos:getHypos,
    positionDel:positionDel,
    userGroup:userGroup,
    userUpdate:userUpdate,
    userAdd:userAdd,
    getName:getName
}
export default ajax;
