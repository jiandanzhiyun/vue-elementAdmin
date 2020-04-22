<template>
        <div v-show="showMask" class="el-dialog__wrapper">
           <div  class="el-dialog dialog-fade-enter-active ">
                <div class="dialog-box">
                    <el-form ref="form" :model="query" label-width="100px">
                        <el-form-item label="服务名称">
                            <el-input v-model="query.name"></el-input>
                        </el-form-item>
                        <el-form-item label="缩略图">
                            <div class="crop-demo">
                                <img :src="cropImg" class="pre-img">
                                <div class="crop-demo-btn">选择图片
                                    <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
                                </div>
                                <div style="color: #999;padding-left: 20px">只能上传jpg/png格式文件，文件不能超过500kb，建议尺寸400*400</div>
                            </div>

                            <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
                                <vue-cropper ref='cropper' :src="query.thumb" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
                                <span slot="footer" class="dialog-footer">
                              <el-button @click="cancelCrop">取 消</el-button>
                                <el-button type="primary" @click="saveImg">确 定</el-button>
                             </span>
                            </el-dialog>
                        </el-form-item>
                        <el-form-item label="服务类别">
                            <el-select v-model="query.value" placeholder="服务类型" class="handle-select mr10" @change="changeSelect">
                                <el-option
                                        v-for="item in query.options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="服务信息">
                                <div v-for="i in listInp" class="listInp-justify">
                                    <el-input  v-model="i.name" placeholder='服务名称'></el-input>
                                    <el-input  v-model="i.num" placeholder='服务数量'></el-input>
                                    <el-input  v-model="i.price" placeholder='服务价格'></el-input>
                                </div>

                            <el-button type="primary" icon="el-icon-lx-add" @click="addInp">添加</el-button>
                            <el-button type="danger" icon="el-icon-lx-delete" @click="delectInp" v-show="listInp.length>0">删除</el-button>
                        </el-form-item>
                        <el-form-item label="参考价格">
                            <el-input v-model="query.proposed_price"></el-input>
                        </el-form-item>
                        <el-form-item label="可使用时间">
                            <el-checkbox-group v-model="checkedCities" size="mini" @change="handleCheckedCitiesChange">
                                <el-checkbox v-for="item in cityOptions" :label="item.label" :key="item.value">{{item.label}}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="">
                            <el-time-picker default-value
                                    is-range
                                    v-model="value1"
                                    range-separator="至"
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    placeholder="选择时间范围">
                            </el-time-picker>
                        </el-form-item>
                        <el-form-item label="预约须知">
                            <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>

                        </el-form-item>
                        <el-form-item>
                            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <div class="dialog-footer">
                   <el-button @click="cancel">取消</el-button>
                   <el-button @click="confirm">确定</el-button>
                </div>
           </div>

        </div>
</template>

<script>
import VueCropper  from 'vue-cropperjs';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
import ajax from '../../api/index';
    export default {
        components: {
            VueCropper,
            quillEditor
        },
        data(){
            return{
                showMask: false,
                listData:[],
                query:{
                    name:'',//服务名称
                    thumb:'',//缩略图
                    ms_class:'',//服务类别
                    service:'',//服务信息json[{"name":"test","num":1,"price":"10.25"}]
                    proposed_price:'',//参考价格
                    bus_time:'',//可使用时间 1-7分别代表星期一到星期日[1,2]
                    interval:'',//每日营业时间
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
                },
                service:{},
                defaultSrc: require('../../assets/img/img.jpg'),
                fileList: [],
                imgSrc: '',
                cropImg: '',
                dialogVisible: false,
                file:'',
                listInp:[],
                checkedCities:[],
                cityOptions: [
                    {
                    label:'周一',
                    value:1,
                    },
                    {
                        label:'周二',
                        value:2,
                    },
                    {
                        label:'周三',
                        value:3,
                    },
                    {
                        label:'周四',
                        value:4,
                    },
                    {
                        label:'周五',
                        value:5,
                    },
                    {
                        label:'周六',
                        value:6,
                    },
                    {
                        label:'周日',
                        value:7,
                    }
                        ],
                 value1:  [new Date(2020, 3, 4, 0, 0), new Date(2020, 3, 4, 23, 59)],
                content: '',
                editorOption: {
                    placeholder: 'Hello World'
                },
                rigour:''

            }
        },

        methods:{
            //获取父级传值
            init(list){
                console.log(list)
                this.$set(this.query.options,'value',list.ms_class);
                this.query=list
                this.cropImg=list.thumb
                this.listInp=JSON.parse(list.service)
                console.log(this.listInp)
               let str=list.bus_time.split(',')
                this.checkedCities=str
                for(let i=0;i<this.checkedCities.length;i++){
                 this.rigour=JSON.parse(this.checkedCities[i])

                }
                console.log(this.rigour)
            },
            cancel(){
                this.$emit('cancel')
            },
            confirm(){
                this.$emit('confirm')
            },
            //图片裁剪上传 start
            setImage(e){
                console.log(e)
                const file = e.target.files[0];
                const formData =new FormData()
                formData.append('file', file);
                if (!file.type.includes('image/')) {
                    return;
                }
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.dialogVisible = true;
                    this.query.thumb = event.target.result;
                    this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
                this.file=formData
            },
            cropImage () {
                this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            },
            cancelCrop(){
                this.dialogVisible = false;
                this.cropImg = this.defaultSrc;
            },
            imageuploaded(res) {
                console.log(res)
            },

            saveImg(){
                ajax.abridge(this.file).then(res=>{
                    if(res.code==1){
                        this.dialogVisible = false;
                        this.cropImg=res.data.path;
                        this.query.thumb=res.data.path;
                    }else{
                        this.$message.error(res.msg);
                    }
                    console.log(res)
                }).catch(() => {});
            },
            //图片裁剪上传end
            //服务类别
            changeSelect(val){
                this.query.value=val
            },
            //添加服务信息
            addInp(){
                this.listInp.push({value:''})
            },
            //删除服务信息
            delectInp(index){
                this.listInp.splice(index,1)
            },
            //复选框
            handleCheckedCitiesChange(value) {
                console.log(value)
            },
            //富文本编辑
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit(){
                console.log(this.content);
                debugger
                ajax.addServe(this.query).then(res=>{

                }).cath(()=>{})
                this.$message.success('提交成功！');
            }

        },
        created(){
            this.cropImg = this.defaultSrc;
        }

    };
</script>

<style  scoped>
.el-dialog__wrapper{
    background: rgba(0,0,0,.5);
    z-index: 2000;
    overflow: hidden;
}
 .el-dialog{
     width: 80%;
     margin: 5% 0 10% 2%;
     padding: 2%;
     position: relative;
     margin-left:10%;
     height: calc(100vh - 20%);
     box-sizing: border-box;
     overflow-y: scroll;
  }
 .dialog-box{
     width: 100%;
     padding: 0 10% 0 2%;
     box-sizing: border-box;
 }
    .dialog-footer{
        display: flex;
        justify-content: flex-end;
        width: 100%;
    }
.el-dialog::-webkit-scrollbar {

    width: 3px;

    height: 3px;

}

/*正常情况下滑块的样式*/

.el-dialog::-webkit-scrollbar-thumb {

    background-color: rgba(0,0,0,.3);

    border-radius: 10px;

    -webkit-box-shadow: inset 1px 1px 0 rgba(0,0,0,.1);

}

/*鼠标悬浮在该类指向的控件上时滑块的样式*/

.el-dialog:hover::-webkit-scrollbar-thumb {

    background-color: rgba(0,0,0,.2);

    border-radius: 10px;

    -webkit-box-shadow: inset 1px 1px 0 rgba(0,0,0,.5);

}

/*鼠标悬浮在滑块上时滑块的样式*/

.el-dialog::-webkit-scrollbar-thumb:hover {

    background-color: rgba(0,0,0,.4);

    -webkit-box-shadow: inset 1px 1px 0 rgba(0,0,0,.1);

}

/*正常时候的主干部分*/

.el-dialog::-webkit-scrollbar-track {

    border-radius: 10px;

    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);

    background-color: white;

}

/*鼠标悬浮在滚动条上的主干部分*/

.el-dialog::-webkit-scrollbar-track:hover {

    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.4);

    background-color: rgba(0,0,0,.01);

}
.content-title{
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
.pre-img{
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 5px;
}
.crop-demo{
    display: flex;
    align-items: center;
}
.crop-demo-btn{
    position: relative;
    width: 100px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    margin-left: 30px;
    background-color: #409eff;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    box-sizing: border-box;
}
.crop-input{
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}
    .listInp-justify{
        display: flex;
        justify-content: flex-start;

    }
.listInp-justify>.el-input{
    margin-right: 10px;
    margin-bottom: 10px;
}
</style>
