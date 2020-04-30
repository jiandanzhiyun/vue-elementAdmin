<template>
        <div class="editProject">
            <el-dialog
                    :title="title"
                    :visible.sync="dialogVisible"
                    width="50%">

                <slot></slot>
            </el-dialog>

        </div>
</template>

<script>
    export default {
        name: 'editProject',
        data(){
            return{

                dialogVisible: false
            }

        },
        props:{
          title:''
        },
        methods:{
            init(show){
                this.dialogVisible=show
            }

        }
    };
</script>

<style scoped>

</style>
