<template>
 <div class="default">
     <h4 class="bug-title">状态组是相对于bug管理的状态的，角色组是共享文件夹和接口文档的权限，都是必须项，姓名，邮箱，姓名都必须是唯一值</h4>
     <el-form ref="ruleForm" :model="ruleForm" label-width="120px" :rules="rules">
         <el-form-item label="昵称">
             <el-input v-model="input" placeholder="姓名首字母"></el-input>
         </el-form-item>
         <el-form-item label="姓名">
             <el-input v-model="input" placeholder="请输入姓名"></el-input>
         </el-form-item>
         <el-form-item label="邮箱">
            <el-input v-model="input" placeholder="请输入邮箱" type="email"></el-input>
         </el-form-item>
         <el-form-item label="密码">
            <el-input v-model="input" placeholder="请输入密码" type="password"></el-input>
         </el-form-item>
         <el-form-item label="确认密码">
            <el-input v-model="input" placeholder="请确认密码" type="password"></el-input>
         </el-form-item>
         <el-form-item label="状态组">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="角色组">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="职位名">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
         </el-form-item>
         <el-form-item>
             <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
             <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
         </el-form-item>
     </el-form>
 </div>
</template>

<script>
    import ajax from '@/api/index'
    export default {
        name: 'add-user',
        data(){
             var validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入密码'));
                } else {
                if (this.ruleForm.repassword !== '') {
                    this.$refs.ruleForm.validateField('repassword');
                }
                callback();
                }
            };
              var validatePass2 = (rule, value, callback) => {
                    if (value === '') {
                    callback(new Error('请再次输入密码'));
                    } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                    } else {
                    callback();
                    }
                };
            return{
               ruleForm: {
                nickname: '',
                realname: '',
                email: '',
                password: '',
                repassword: false,
                rolegroup:'',
                statusgroup: '',
                level: 0
                },
               
                 rules: {
                    nickname: [
                        { required: true, message: '请输入昵称', trigger: 'blur' }
                    ],
                    realname: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    email: [
                        { type: 'email', required: true, message: '请输入正确的邮箱格式', trigger: 'blur' }
                    ],
                    password: [
                        { type: 'password',validator: validatePass,trigger: 'blur' }
                    ],
                    repassword: [
                        { type: 'password',validator: validatePass2, trigger: 'blur' }
                    ],
                    rolegroup: [
                        { required: true, message: '请选择角色组', trigger: 'change' }
                    ],
                    statusgroup: [
                        { required: true, message: '请选择状态组', trigger: 'change' }
                    ],
                    level:[
                      { required: true, message: '请选择职位名', trigger: 'change' }   
                    ]
                    }
            }
        },
        created(){
        },
        mounted() {
            this.getRole()
        },
        methods:{
            getRole(){
                ajax.getGroup().then(res=>{
                   console.log(res) 
                })
            },
            submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
        }
    };
</script>

<style scoped>

</style>
