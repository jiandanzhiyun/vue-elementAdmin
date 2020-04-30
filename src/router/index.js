import Vue from 'vue';
import Router from 'vue-router';
const login=()=>import('../components/page/Login.vue')
const Home = () => import('../components/common/Home.vue')
const dashboard = () => import('../components/page/Dashboard.vue')
const email = () => import('../components/page/email.vue')
const bug = () => import('../components/page/bug.vue')
const bugManage = () => import('../components/page/bug-manage.vue')
const Tabs = () => import('../components/page/Tabs.vue')
const BaseForm = () => import('../components/page/BaseForm.vue')
const VueEditor = () => import('../components/page/VueEditor.vue')
const Markdown = () => import('../components/page/Markdown.vue')
const Upload = () => import('../components/page/Upload.vue')
const BaseProject = () => import('../components/page/BaseProject.vue')
const DragList = () => import('../components/page/DragList.vue')
const DragDialog = () => import('../components/page/DragDialog.vue')
const I18n = () => import('../components/page/I18n.vue')
const Permission = () => import('../components/page/Permission.vue')

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component:Home,
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component:dashboard,
                    meta: { title: '系统首页' }
                },
                {
                    path: '/email',
                    component:email,
                    meta: { title: 'email' }
                },
                {
                    path: '/bug',
                    component:bug,
                    meta: { title: 'bug状态' }
                },
                {
                    path: '/bug-manage',
                    component:bugManage,
                    meta: { title: 'bug管理' }
                },
                {
                    path: '/404',
                    component: () => import('../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import( '../components/page/403.vue'),
                    meta: { title: '403' }
                }
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
