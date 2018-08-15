<template>
  <div :class="className" :id="id" :data="data" :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from 'echarts'
    import {mergeKey, filterArr} from '../dataDeal'
    export default {
        props: {
            data:{
                type: Array,
                default: [],
            },
            className: {
                type: String,
                default: 'chart2'
            },
            id: {
                type: String,
                default: 'chart2'
            },
            width: {
                type: String,
                default: '200px'
            },
            height: {
                type: String,
                default: '500px'
            }
        },
        data() {
            return {
                chart: null
            }
        },
        methods: {
            initChart() {
                let data = this.data;
                if (data.length > 0) {
                    var temp = data.map((item, i) => {
                        return {
                            value: item.num,
                            name: item.name || '未知' + i
                        }
                    })
                    data = temp;
                }else{
                    data = [{
                        value: 0,
                        name: '没有数据'
                    }]
                }
                this.chart = echarts.init(document.getElementById(this.id))
                var option = {
                    backgroundColor: '#fff',
                    title: {
                        text: '性别',
                        textStyle: {
                            //文字颜色
                            color: '#333333',
                            //字体风格,'normal','italic','oblique'
                            fontStyle: 'normal',
                            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight: 'normal',
                            //字体大小
                  　　　　  fontSize: 12
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    series: [{
                        name: '访问来源',
                        type: 'pie',
                        color: ['#e60012', '#41b3f9', "#7ace4c"],
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        data: data 
                    }]
                }
                this.chart.setOption(option);
            }
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            this.chart.dispose()
            this.chart = null
        },
    }
</script>
