<template>
    <div class="x-bar">
        <div id="echart" style="height: 500px;width:calc(100vw - 16px);"></div>
    </div>
</template>
<script>
    import echarts from 'echarts'
    import 'echarts/map/js/china'
    import axios from 'axios'
    let option = {
        title:{
            text:'全国疫情地图',
            x:'center'
        },
        tooltip:{//提示框组件
            show:true,
            trigger:'item',
            formatter: '地区：{b}<br/>确诊：{c}'
        },
        visualMap:{//视觉映射组件
            type:'piecewise',//映射组件类型(1、piecewise--分段型;2、continuous--连续型)
            inRange:{
                color: ['#CCC', '#F2B252', '#D1241A']//数据段范围颜色
            },
            pieces: [//地图左下角显示可视化
                {min: 10000,color:'#D1241A'}, // 不指定 max，表示 max 为无限大（Infinity）。
                {min: 1000, max: 9999,color:'#F27152'},
                {min: 100, max: 999,color:'#F28E52'},
                {min: 10, max: 99,color:'#F2B252'},
                {min: 1, max: 9,color:'#ccc'},
                {value: 0}, // 表示 value 等于 0 的情况。
            ]
        },
        series: [{
            name: '',
            type: 'map',
            map:'china',
            zoom:1,//地图显示大小调整(默认为1)
            data: [],
            label:{//区域名称显示
                show:true
            },
            itemStyle:{//区域间样式调节
                borderColor:'lightblue'
            },
            emphasis:{//区域高亮显示时状态
                label:{//高亮时字体样式
                    color: '#fff',
                },
                itemStyle:{//高亮是区域样式
                    areaColor:'#409EFF',
                    borderColor:'#fff'
                }
            }
        }]
    };
    export default {
        data(){
            return{
                myChart:''//全局定义
            }
        },
        mounted(){
            this.myChart = echarts.init(document.getElementById('echart'));
            this.getData();//调用获取数据方法
        },
        methods:{
            getData(){
                axios.get('http://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427').then(res => {
                    var datalist = res.data.data.list.map(item=>{return{name:item.name,value:item.value}})
                    option.series[0].data=datalist;//数据动态绑定
                    this.myChart.setOption(option);
                }).catch(err => {
                    console.log(err)
                })
            }
        }

    }
</script>
