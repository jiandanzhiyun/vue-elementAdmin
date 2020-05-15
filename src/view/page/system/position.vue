<template>
        <div class="bug-box">
            <h4 class="bug-title">职位，在管理的时候，上级有管理下级的权限，级别只有普通员工和管理者，管理者也可以被其他管理者管理（从属于），一个员工只能被一个管理者管理</h4>
            <div class="bug-btn">
                <el-button type="primary"  class="el-icon-plus" @click="addPosition">添加职位</el-button>
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
                        label="职位名">
                </el-table-column>
                <el-table-column
                        prop="level"
                        label="职位级别">
                    <template slot-scope="scope">

                        <el-tag type="success" class="mr10 mb10">
                            {{scope.row.level== 1 ?'管理者':'普通员工'}}
                        </el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                        prop="hypo"
                        label="从属于">

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
                        <el-form-item label="职位名">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-radio-group v-model="form.level">
                                <el-radio :label="1">管理者</el-radio>
                                <el-radio :label="2">普通员工</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="从属于">
                            <el-select v-model="form.hypo" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :label="item"
                                        :value="item">
                                </el-option>
                            </el-select>
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
        name: 'position',
        data(){
            return{
                tableData:[],
                isShow:false,
                form:{
                    name:'',
                    level:1,
                    hypo:''
                },
                number:0,
                title:'',
                value:'',
                options:[]
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
                ajax.positionList().then(res=>{
                    if(res.code==0){
                        this.tableData=res.positions
                        setTimeout(() => {
                            loading.close();
                        }, 1000);
                    }else{
                        this.$message.error(res.msg || '加载错误');
                    }
                }).then(()=>{
                    ajax.getHypos().then(res=>{
                        if(res.code==0){
                            this.options=res.hypos
                        }
                    })
                })
            },
            modify(item){
                this.title="编辑职位"
                this.form=item
                this.number=1
                this.isShow=true;
                this.$refs.editProject.init(this.isShow)
            },
            addPosition(){
                this.title="新增职位"
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
                    ajax.positionDel({id:item.id}).then(res=>{
                        if(res.code==0){
                            this.$message({
                                message: res.msg || '删除成功',
                                type: 'success'
                            });
                            this.tableData.splice(index, 1)
                            this.getData()
                        }else{
                            this.$message.error(res.message || '删除失败')
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
                this.form.level=JSON.parse(this.form.level)
                if(this.number==0){
                    ajax.positionAdd(this.form).then(res=>{
                        if(res.code==0){
                            this.$message({
                                message: res.msg || '添加成功',
                                type: 'success'
                            });
                        }
                    })
                }else{
                    ajax.positionUpdate(this.form).then(res=>{
                        if(res.code==0){
                            this.$message({
                                message: res.msg || '修改成功',
                                type: 'success'
                            });
                        }
                    })
                }
                this.getData()
                this.cancel()
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
