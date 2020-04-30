import request from '../utils/request';

const addProject=((data)=>{
    return request({
        url: '/doc/add/project',
        method: 'post',
        data
    })
})
const addDepartment=((data)=>{
    return request({
        url: '/doc/delete/project',
        method: 'post',
        data
    })
})
 const addDoc={
     addProject:addProject,
     addDepartment:addDepartment
 }
export default addDoc;
