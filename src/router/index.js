import Vue from 'vue';
import Router from 'vue-router';
const login=()=>import('../view/page/Login.vue')
const Home = () => import('../components/common/Home.vue')
const dashboard = () => import('../view/page/Dashboard.vue')
const email = () => import('../view/page/system/email.vue')
const bug = () => import('../view/page/system/bug.vue')
const bugManage = () => import('../view/page/system/bug-manage.vue')
const bugLog = () => import('../view/page/system/log.vue')
const bugGroup = () => import('../view/page/system/bug-group.vue')
const roleGroup = () => import('../view/page/system/role-group.vue')
const defaultValue = () => import('../view/page/system/default-value.vue')
const bugImportant = () => import('../view/page/system/bug-important.vue')
const bugLevel = () => import('../view/page/system/bug-level.vue')
const position = () => import('../view/page/system/position.vue')
const usergroup = () => import('../view/page/system/usergroup.vue')
const adduser = () => import('../view/page/user/add.vue')
const Tabs = () => import('../view/page/Tabs.vue')
const BaseForm = () => import('../view/page/BaseForm.vue')
const VueEditor = () => import('../view/page/VueEditor.vue')
const Markdown = () => import('../view/page/Markdown.vue')
const Upload = () => import('../view/page/Upload.vue')
const BaseProject = () => import('../view/page/BaseProject.vue')
const DragList = () => import('../view/page/DragList.vue')
const DragDialog = () => import('../view/page/DragDialog.vue')
const I18n = () => import('../view/page/I18n.vue')
const Permission = () => import('../view/page/Permission.vue')

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
                },{
                    path: '/log',
                    component:bugLog,
                    meta: { title: '操作日志' }
                },{
                    path: '/bug-group',
                    component:bugGroup,
                    meta: { title: 'bug状态组' }
                },{
                    path: '/role-group',
                    component:roleGroup,
                    meta: { title: '角色组' }
                },{
                    path: '/default-value',
                    component:defaultValue,
                    meta: { title: '默认值' }
                },{
                    path: '/bug-important',
                    component:bugImportant,
                    meta: { title: '重要性' }
                },{
                    path: '/bug-level',
                    component:bugLevel,
                    meta: { title: '优先级' }
                },{
                    path: '/position',
                    component:position,
                    meta: { title: '职位' }
                },{
                    path: '/usergroup',
                    component:usergroup,
                    meta: { title: '用户组' }
                },{
                    path: '/add',
                    component:adduser,
                    meta: { title: '添加用户' }
                },
                //
                {
                    path: '/404',
                    component: () => import('../view/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import( '../view/page/403.vue'),
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
