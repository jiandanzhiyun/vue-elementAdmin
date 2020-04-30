<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-redpacket_fill"></i> 支持作者
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">如果该框架对你有帮助，那就请作者喝杯茶吧！加微信号Sylvaforset探讨问题。</div>
            <div>

            </div>
        </div>
    </div>
</template>

<script>
 import ajax from '../../api/index'
export default {
        name:'',
    data(){
            return{

            }
    },
    mounted(){
        this.getUser()
    },
    methods:{
        getUser(){
            ajax.Info().then(res=>{
                console.log(res)
            })
        }
    }
};
</script>

<style>
</style>
