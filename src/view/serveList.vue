<template>
    <div class="basetable">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 服务列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">

                <el-select v-model="value" placeholder="服务类型" class="handle-select mr10" @change="changeSelect">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-input v-model="query.keyword" placeholder="请输入关键字" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <div class="handle-box">
                <el-button
                        type="primary"
                        icon="el-icon-lx-add"
                        class="handle-del mr10"
                        @click="handleAdd"
                >新增服务</el-button>
                <el-button
                        type="danger"
                        icon="el-icon-delete"
                        class="handle-del mr10"
                        @click="delAllSelection"
                >批量删除</el-button>
                <el-button
                        type="success"
                        icon="el-icon-lx-top"
                        class="handle-del mr10"
                        @click="batchShelve"
                >上架</el-button>
                <el-button
                        type="warning"
                        icon="el-icon-lx-down"
                        class="handle-del mr10"
                        @click="batchLower"
                >下架</el-button>
                <el-button
                        type="primary"
                        icon="el-icon-lx-forward"
                        class="handle-del mr10"
                        @click="batchExport"
                >批量导出</el-button>

            </div>
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
                    @selection-change="handleSelectionChange" v-loading="loading"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                                class="table-td-thumb"
                                :src="scope.row.thumb"
                                :preview-src-list="[scope.row.thumb]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="服务名称"  align="center"></el-table-column>
                <el-table-column label="服务类别" align="center">
                    <template slot-scope="scope">
                        {{scope.row.ms_class==1 ? '单项服务':scope.row.ms_class==2 ?'套餐服务':'全部'}}
                    </template>
                </el-table-column>

                <el-table-column label="服务内容清单"  align="center">
                    <template slot-scope="scope">

                        <el-popover
                                placement="right"
                                width="350"
                                trigger="click">
                            <el-table :data="gridData">
                                <el-table-column width="150" property="name" label="名称"></el-table-column>
                                <el-table-column width="100" property="num" label="数量"></el-table-column>
                                <el-table-column width="100" property="price" label="单价"></el-table-column>
                            </el-table>
                            <div style="padding-top: 15px;font-weight: bold;">套餐价格:{{scope.row.proposed_price+'元'}}</div>
                            <el-button slot="reference" @click="handSever(scope.row)">点击查看清单</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="预约须知"  align="center">
                    <template slot-scope="scope">
                        <el-popover
                                placement="right"
                                width="400"
                                trigger="click">
                                <div v-html="scope.row.introduction"></div>
                            <el-button slot="reference">点击查看</el-button>
                        </el-popover>
                    </template>
                </el-table-column>

                <el-table-column prop="proposed_price" label="参考价格" align="center"></el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                @click="handleEdit(scope.$index, scope.row)"
                        >{{scope.row.status==1 ? '上架':scope.row.status==2?'下架':''}}</el-button>
                        <el-button
                                type="text"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                type="text"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="currentPage"
                        :page-size="per_page"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <commonDialog  v-show="isShow"   ref="commonDialog" @cancel="cancelEdit" @confirm="confirmBtn"></commonDialog>

    </div>

</template>

<script>
import ajax from '../api/index';
    export default {
        name: 'basetable',
        components: {
            commonDialog: ()=> import("../components/edit/commonDialog")
        },
        data() {
            return {
                query: {
                    msc:'全部',
                    keyword: '',
                    page:1,
                    limit: 5
                },
                tableData: [],
                gridData:[],
                currentPage:1,
                per_page:0,
                multipleSelection: [],
                delList: [],
                isShow:false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1,
                loading:true,
                options:[
                    {
                    value:0,
                    label:'全部'
                    },
                    {
                        value:1,
                        label:'单项服务'
                    },
                    {
                        value:2,
                        label:'套餐服务'
                    }
                    ],
                value:0
            };
        },

        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                this.query.msc=this.value
                ajax.fetchData(this.query).then(res => {
                    if(res.code==1){
                        this.tableData = res.data.data;
                        this.pageTotal = res.data.total || 50;
                        this.currentPage=Number(res.data.current_page);
                        this.per_page=res.data.per_page
                        this.loading=false
                    }if(res.code==10001){
                        this.$confirm(res.msg, '提示', {
                            type: 'warning'
                        })
                            .then(() => {

                                this.$router.push('/login')
                            })
                            .catch(() => {});
                    }

                }).catch(() => {});
            },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'page', 1);
                this.getData();
            },
            changeSelect(){
                this.$set(this.query, 'page', 1);
                this.getData();
            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {});
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].id + ' ';
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            },
            // 编辑操作
            handleEdit(index, row) {
                this.$refs.commonDialog.init(row)
                this.isShow = true;
                this.idx = index;
                this.form = row;
            },
            //新增
            handleAdd(){
                this.isShow = true;
            },
            confirmBtn(){
//        模拟确定按钮调取接口
                this.isShow=false
            },
            // 保存编辑
            cancelEdit() {
                this.isShow = false;
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'page', val);
                this.getData();
            },
            //点击查看清单
            handSever(row){
                console.log(JSON.parse(row.service))
                this.gridData=JSON.parse(row.service)
            },
            //批量导出
            batchExport(){

            },
            //上架
            batchShelve(){

            },
            //下架
            batchLower(){

            }
        }
    };
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
