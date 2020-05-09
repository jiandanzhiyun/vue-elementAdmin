<template>
    <div class="bug-box">
        <h4 class="bug-title">增加选择可以改变bug状态的组</h4>
        <div class="bug-btn">
            <el-button type="primary"  class="el-icon-plus" @click="addBug">添加状态组名</el-button>
            <el-button type="primary" plain class="el-icon-refresh-right" @click="getData">刷新</el-button>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%" max-height="600">
            <el-table-column
                    fixed
                    prop="id"
                    label="id">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="项目名">
            </el-table-column>
            <el-table-column
                    prop="bugstatuslist"
                    label="状态权限">
                <template slot-scope="scope">

                    <el-tag v-for="item in scope.row.bugstatuslist" type="success" class="mr10">
                        {{item}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" align="center"
                             label="操作"
                             width="200">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="modify(scope.row)"
                            type="primary"
                            size="small">
                        编辑
                    </el-button>
                    <el-button
                            @click.native.prevent="deleteRow(scope.$index, scope.row)"
                            type="danger"
                            size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>


        <editProject ref="editProject" v-show="isShow" :title="title">
            <div slot>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="项目名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">修改</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </editProject>
    </div>
</template>

<script>
    import ajax from '@/api/index'
    import editProject from "@/components/edit/editProject"
    export default {
        name: 'bug-group',
        data(){
            return{
                tableData: [],
                isShow:false,
                form:{
                    name:'',
                    id:-1
                },
                title:'添加bug状态',
                number:0,
                loading:true
            }
        },
        components:{
            editProject
        },
        mounted(){
            this.getData()
        },
        methods:{
            getData(){
                this.tableData=[]
                const loading = this.$loading({
                    lock: true,
                    text: '拼命加载中',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                ajax.bugGroup().then(res=>{
                    console.log(res)
                    if(res.code==0){
                        this.tableData=res.departmentlist
                        setTimeout(() => {
                            loading.close();
                        }, 1000);
                    }else{
                        this.$message.error(res.msg || '加载错误');
                    }


                })
            },
            //修改
            modify(item){
                this.isShow=true;
                this.title="编辑bug状态"
                this.number=1;
                this.form=item
                this.$refs.editProject.init(this.isShow)
            },
            addBug(){
                this.isShow=true;
                this.number=0;
                this.title="添加bug状态"
                this.$refs.editProject.init(this.isShow)
            },
            //删除
            deleteRow(index,item){
                this.$confirm('此操作将关闭bug, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    ajax.bugRemove({id:item.id}).then(res=>{
                        if(res.code==0){
                            this.$message({
                                message: res.msg || '删除成功',
                                type: 'success'
                            });
                            this.tableData.splice(index, 1)
                            this.getData()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            onSubmit(){
                if(this.number==0){
                    ajax.bugAdd(this.form).then(res=>{
                        if(res.code==0){
                            this.$message({
                                message: res.msg || '添加成功',
                                type: 'success'
                            });
                            this.getData()
                            this.cancel()
                        }

                    })
                }else{
                    ajax.bugModify(this.form).then(res=>{
                        if(res.code==0){
                            this.$message({
                                message: res.msg || '修改成功',
                                type: 'success'
                            });
                            this.getData()
                            this.cancel()
                        }
                    })
                }


            },
            cancel(){
                this.isShow=false;
                this.$refs.editProject.init(this.isShow)
            }
        }
    };
</script>

<style scoped>
    .bug-box{
        padding: 10px 0 0 30px;
    }
    .bug-title{
        color: #333;
        padding: 0 0 20px 0;
    }
    .bug-btn{
        padding: 10px;
        background: #fff;
    }
</style>
