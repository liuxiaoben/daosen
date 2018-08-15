<template>
  <div :class="className" :id="id" :data="data" :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        props: {
            data:{
                type: Array,
                default: [],
            },
            className: {
                type: String,
                default: 'chart3'
            },
            id: {
                type: String,
                default: 'chart3'
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
                let data1 = [];
                let data2 = [];
                if (data.length > 0) {
                    data.forEach((item, i) => {
                        data1.push(item.name);
                        data2.push(item.num);
                    })
                }else{
                   data1 = ['0-17', '18-24', '25-30', '31-35', '36-40', '41-50', '50-60', '61以上']
                   data2 = [0, 0, 0, 0, 0, 0, 0, 0]
                }
                this.chart = echarts.init(document.getElementById(this.id))
                this.chart.setOption({
                    // grid:{
                    //     left: '16%',
                    // },
                    backgroundColor: '#fff',
                    title: {
                        text: '年龄',
                        textStyle: {
                            //文字颜色
                            color: '#333333',
                            //字体风格,'normal','italic','oblique'
                            fontStyle: 'normal',
                            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight: '400',
                            //字体大小
                    　　　　fontSize: 12
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                    },
                    xAxis: {
                        type: 'category',
                        data: data1,
                        axisLabel: {
                            interval: 0,
                            rotate: 90,
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                show: false,
                            }
                        }
                    },
                    yAxis: {
                        show: false,
                        type: 'value'
                    },
                    series: [{
                        data: data2,
                        type: 'bar',
                        barWidth: 5, //柱图宽度
                        itemStyle: {
                            //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
                            emphasis: {
                                barBorderRadius: 5,
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            normal: {
                                //柱形图圆角，初始化效果
                                barBorderRadius: [5, 5, 0, 0],
                                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                                color: function(params) {
                                    var colorList = ['#b21810', '#c9322c', '#cc1613', '#dc1216', '#eb4b51', '#e84e3d', '#f2695c', '#f59783'];
                                    return colorList[params.dataIndex];
                                }
                            }
                        },
                    }]
                })
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
