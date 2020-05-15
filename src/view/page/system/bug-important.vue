<template>
    <div class="bug-box">
        <h4 class="bug-title">bug重要性</h4>
        <div class="bug-btn">
            <el-button type="primary"  class="el-icon-plus" @click="addImportant">添加重要程度</el-button>
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
                    label="重要程度名">
            </el-table-column>
            <el-table-column fixed="right" align="center"
                             label="操作"
                             width="200">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="modify(scope.row)"
                            type="primary"
                            size="small">
                        修改
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
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="重要程度名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">确定</el-button>
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
        name: 'bug-important',
        data(){
            return{
                tableData:[],
                form:{
                    id:'',
                    name:''
                },
                isShow:false,
                title:'',
                number:0
            }
        },
        components:{
            editProject
        },
        mounted() {
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
                ajax.ImportantGet().then(res=>{
                    if(res.code==0){
                        this.tableData=res.importantlist
                        setTimeout(() => {
                            loading.close();
                        }, 1000);
                    }else{
                        this.$message.error(res.msg || '加载错误');
                    }
                })
            },
            modify(item){
                this.title="编辑bug重要性"
                this.form=item
                this.number=1
                this.isShow=true;
                this.$refs.editProject.init(this.isShow)
            },
            addImportant(){
                this.title="新增bug重要性"
                this.number=0
                this.isShow=true;
                this.form={}
                this.$refs.editProject.init(this.isShow)

            },
            //删除
            deleteRow(index,item){
                this.$confirm('此操作将删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    ajax.ImportantDel({id:item.id}).then(res=>{
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
                    ajax.ImportantAdd(this.form).then(res=>{
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
                   ajax.ImportantUpdate(this.form).then(res=>{
                       if(res.code==0){
                           this.$message({
                               message: res.msg || '添加成功',
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

</style>
