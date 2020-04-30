<template>
    <div class="chart-container">
        <div class="project-container">
            <el-card v-for="(project, index) in projects" :key="index" class="box-card">
                <div class="div_box_card" @click="getEdit(project)">{{ project.name }}</div>
            </el-card>
            <el-card class="add-card">
                <span @click="one">添加项目+</span>
            </el-card>
        </div>
<!--        简单的组件封装，方便简化代码-->
        <editProject ref="editProject" v-show="isShow" @onSubmit="submit" @cancel="cancel" :title="'编辑项目'"></editProject>
    </div>
</template>

<script>
 import {formatDate} from '@/utils/date'
 import editProject from "@/components/edit/editProject"
    export default {
        name: 'Project',
        data() {
            return {
                projects: [
                    { name: 'aaa', id: 0 },
                    { name: 'bbb', id: 1 },
                    { name: 'ccc', id: 2 }
                ],
                isShow:false,
                form: {
                    auth: false,
                    name: '',
                    owner: '',
                    id: -1
                },
                rdwrlist: []
            }
        },
        components:{
            editProject
        },
        methods: {
            getEdit(item){
                this.isShow=true;
                //延时避免数据未加载报错
                setTimeout(()=>{
                    this.$refs.editProject.init(item,this.isShow)
                })

            },
            cancel() {
                this.isShow=false;
            },
            one() {
                this.projects.push({name:formatDate(new Date(),'yyyy-MM-dd')})
            },
            submit(event){
                this.isShow=false;
              console.log(event)
            }
        }
    }
</script>

<style>
    .el-card__body {
        padding: 0px !important;
    }
</style>

<style scoped>
    .char-container{
        position: relative;
        padding:20px;
        width: 100%;
        height:85vh;
    }
    .box-card {
        padding: 0px;
        width: 180px;
        font-weight: 700;
        color: #777;
        height: 100px;
        margin: 20px;
    }

    .add-card {
        cursor: pointer;
        width: 180px;
        padding: 20px;
        height: 100px;
        font-weight: 700;
        margin: 20px;
    }
    .project-container {
        margin: auto;
        display: flex;
        /* flex-direction:column; */
        flex-wrap: wrap ;
        max-width: 700px;
        margin-top: 30px;
    }
    .setting {
        float: right;
    }
    .div_box_card {
        padding: 20px
    }
</style>

