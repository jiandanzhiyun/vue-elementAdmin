import Vue from 'vue';
import Router from 'vue-router';
const login=()=>import('../components/page/Login.vue')
const dashboard = () => import('../components/common/Home.vue')
const board = () => import('../components/page/Dashboard.vue')
const serve = () => import('../view/serveList.vue')

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component:dashboard,
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: board,
                    meta: { title: '系统首页' }
                },

                {
                    path: '/serve',
                    component:serve,
                    meta: { title: '商家列表' }
                },
            ]
        },
        {
            path: '/login',
            component:login,
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
