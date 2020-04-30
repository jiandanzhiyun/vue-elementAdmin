
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const key ='token'
const username = 'username'

const store =new Vuex.Store({
    state(){
        return{
            token:localStorage.getItem('token') ? localStorage.getItem('token'):'',
            username:localStorage.getItem('username') ? localStorage.getItem('username'):''
            //  账号

        }
    },
    getters:{
        getSortage:function (state) {
            if(!state.token){
                state.token =JSON.parse(localStorage.getItem(key))
            }
            return state.token
        },
        getaccount: function(state){
            state.username=JSON.parse(localStorage.getItem(username))
            return state.username
        }
    },
    mutations:{
        $_setStorage(state,value){
            state.token =value;
            localStorage.setItem(key,value)
            //  localStorage.setItem(key,JSON.stringify(value))
        },
        $_setAccount(state,account_va){
            state.username =account_va
            localStorage.setItem("username",account_va)

            //  localStorage.setItem(account,JSON.stringify(account))
        }
    },
})
export default store
