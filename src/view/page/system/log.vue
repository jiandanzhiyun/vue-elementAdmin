<template>
        <div class="log" v-cloak>
            <div class="log-head">
               <el-select v-model="value" placeholder="请选择"  @change="getData()" class="mr10" clearable >
                    <el-option
                            v-for="item in options"
                            :label="item.value"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-date-picker class="mr10"
                        v-model="value1"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期" @change="getTime(value1)">
                </el-date-picker>
               <el-button type="primary" @click="getData()">搜索</el-button>
            </div>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="id"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="exectime"
                        label="日期"
                        width="180">
                    <template slot-scope="scope">
                        <span>{{ scope.row.exectime | formatDate }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="classify"
                        label="分类">
                </el-table-column>
                <el-table-column
                        prop="ip"
                        label="ip">
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="操作者">
                </el-table-column>
                <el-table-column
                        prop="action"
                        fixed="right"
                        label="操作">
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage2"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="100"
                    layout="sizes, prev, pager, next"
                    :total="total">
            </el-pagination>
        </div>
</template>

<script>
import ajax from "@/api/index"
import {formatDate} from '@/utils/date';
    export default {
        name: 'log',
        data(){
            return{
                tableData:[],
                value1:'',
                value:'',
                form:{
                    page:1,
                    endtime:0,
                    limit:20,
                    starttime:0,
                    classify:''
                },
                options:[],
                total:0,
                currentPage2:1
            }

        },
        filters: {
            formatDate(time) {
                time = time * 1000
                let date = new Date(time)
                return formatDate(date, 'yyyy-MM-dd hh:mm')
            }
        },
        mounted(){
        this.getData()
            this.getClass()
        },
        methods:{
            getData(){
                const loading = this.$loading({
                    lock: true,
                    text: '拼命加载中',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.form.classify=this.value ? this.value:''
                this.tableData=[]
                ajax.bugLog(this.form).then(res=>{
                    if(res.code==0){
                        this.tableData=res.loglist
                        this.total=res.count
                        setTimeout(() => {
                            loading.close();
                        }, 1000);
                    }else{
                        this.$message.error(res.msg || '加载错误');
                    }

                });

            },
            getClass(){
                ajax.bugClassify().then(res=>{
                    if(res){
                        res.map((item)=>{
                            this.options.push({value:item})
                        })
                    }



                })
            },
            getTime(e){
                if (e.length === 0) {
                    this.form.starttime = 0
                    this.form.endtime = 0
                } else {
                    this.form.starttime = e[0] / 1000
                    this.form.endtime = e[1] / 1000
                }
            },
            handleSizeChange(val) {
                this.form.limit=val
                this.getData()
            },
            handleCurrentChange(val) {
                this.form.page=val
                this.getData()
            }
        }

    };
</script>

<style scoped>
.log{
    padding: 20px 0;
    background: #fff;
}
    .log-head{
        padding: 0 20px 20px;
        display: flex;
        justify-content: flex-start;
    }
</style>
