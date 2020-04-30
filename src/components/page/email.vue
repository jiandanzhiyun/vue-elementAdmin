<template>
    <div class="email-box">
        <h3 class="message-title email-title">选择邮件通知的项目，测试邮件是为了验证是否能正确收到邮件通知</h3>
        <el-switch
                v-model="value1"
                active-text="禁用通知"
                active-color="#13ce66"
                inactive-color="#ff4949"
                inactive-text="启用创建用户通知">
        </el-switch>
        <el-switch style="display: block"
                v-model="value2"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="禁用通知"
                inactive-text="启用创建bug通知">
        </el-switch>
        <el-switch style="display: block"
                v-model="value3"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="禁用通知"
                inactive-text="启用转交bug通知">
        </el-switch>
        <div class="email-bottom">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="邮箱地址">
                    <el-input v-model="form.email"  autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱端口">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="测试邮箱">
                    <el-input v-model="form.test"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" @click="onSubmit">验证</el-button>
                    <el-button type="primary">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'email',
        data(){
            return{
                value1:true,
                value2:true,
                value3:false,
                form:{
                    email:'',
                    password:'',
                    desc:'',
                    test:''
                }
            }

        },
        methods:{
            onSubmit(){
                this.$refs.form.validate(valid => {
                    if(valid){
                        console.log(this.form)
                    }
                })
            }
        }

    };
</script>

<style scoped>
    .email-title{
        padding: 10px 0 30px 0;
    }
    .el-switch{
        padding: 5px 0;
        width:auto;
    }
    .email-box{
        padding: 10px 0 10px 20px;
    }
    .email-bottom{
        width: 50%;

    }

</style>
