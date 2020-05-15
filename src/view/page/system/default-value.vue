<template>
 <div class="default">
     <h4 class="bug-title">某些选项的默认值</h4>
     <el-form ref="form" :model="form" label-width="120px">
         <el-form-item label="新建bug的状态">
             <el-select v-model="form.defaultstatus" placeholder="bug的状态">
                 <el-option :label="item" :value="item" v-for="item in bugValue"></el-option>
             </el-select>
         </el-form-item>
         <el-form-item label="重要程度">
             <el-select v-model="form.Important" placeholder="重要程度">
                 <el-option :label="item" :value="item" v-for="item in ImportantValue"></el-option>
             </el-select>
         </el-form-item>
         <el-form-item label="严重级别">
             <el-select v-model="form.Level" placeholder="严重级别">
                 <el-option :label="item" :value="item" v-for="item in LevelValue"></el-option>
             </el-select>
         </el-form-item>
         <el-form-item>
             <el-button type="primary" @click="save()">保存</el-button>
         </el-form-item>
     </el-form>
 </div>
</template>

<script>
    import ajax from '@/api/index'
    export default {
        name: 'default-value',
        data(){
            return{
                form:{
                    defaultstatus:'',
                    Important:'',
                    Level:''
                },
                bugValue:[],
                ImportantValue:[],
                LevelValue:[]
            }
        },
        created(){
            this.getStatus()
        },
        mounted() {

        },
        methods:{
            getStatus(){
                ajax.bugStatus().then(res=>{
                    if(res.code==0){
                        this.bugValue=res.statuslist
                    }
                }).then(()=>{
                    ajax.defaultStatus().then(res=>{
                        if(res.code==0){
                            this.form.defaultstatus=res.defaultstatus
                        }
                    })
                }).then(()=>{
                    ajax.getImport().then(res=>{
                        if(res.code==0){
                            this.ImportantValue=res.importants
                        }
                    })
                }).then(()=>{
                    ajax.defaultImport().then(res=>{
                        if(res.code==0){
                           this.form.Important=res.defaultimportant
                        }
                    })
                }).then(()=>{
                    ajax.getLevels().then(res=>{
                        if(res.code==0){
                            this.LevelValue=res.levels
                        }
                    })
                }).then(()=>{
                    ajax.defaultLevels().then(res=>{
                        if(res.code==0){
                            this.form.Level=res.defaultlevel
                        }
                    })
                })
            },
           save(){
               this.$refs.form.validate(valid=>{
                   if(valid){
                       ajax.defaultSave(this.form).then(res=>{
                           if(res.code==0){
                               this.$message({
                                   message: '保存成功',
                                   type: 'success'
                               });
                           }else{
                               this.$message.error('请求失败');
                           }
                       })
                   }
               })
           }
        }
    };
</script>

<style scoped>

</style>
