<template>
        <div class="bug-box">
            <h4 class="bug-title">bug的所有状态</h4>
            <div class="bug-btn">
                <el-button type="primary" plain class="el-icon-plus" @click="addBug">添加bug状态</el-button>
            </div>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        fixed
                        prop="id"
                        label="id">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="状态名">
                </el-table-column>
                <el-table-column fixed="right" align="center"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="modify(scope.row)"
                                type="danger"
                                size="small">
                            修改
                        </el-button>
                        <el-button
                                @click.native.prevent="deleteRow(scope.$index, scope.row)"
                                type="primary"
                                size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>


            <editProject ref="editProject" v-show="isShow" :title="title">
                <div slot>
                 <el-form ref="form" :model="form" label-width="80px">
                                        <el-form-item label="状态名">
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
        name: 'bug',
        data(){
            return{
                tableData: [],
                isShow:false,
                form:{
                    name:'',
                    id:''
                },
                title:'添加bug状态'
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
              ajax.bugState().then(res=>{
                  console.log(res)
                  if(res.code==0){
                      this.tableData=res.statuslist
                  }else{
                      this.$message.error(res.msg || '加载错误');
                  }


              })
            },
            //修改
            modify(item){
                this.isShow=true;
                this.title="编辑bug状态"
                this.form=item
                this.$refs.editProject.init(this.isShow)
            },
            addBug(){
                this.isShow=true;
                this.title="添加bug状态"
                this.$refs.editProject.init(this.isShow)
            },
            //删除
            deleteRow(index,item){
               console.log(item)
            },
            onSubmit(){
                debugger
            ajax.bugModify(this.form).then(res=>{
                console.log(res)
            })
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
