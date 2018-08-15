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
                default: 'chart4'
            },
            id: {
                type: String,
                default: 'chart4'
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
                    data1 = ['小学', '初中', '高中','大专', '本科', '硕士', '博士', '未知']
                    data2 = [0, 0, 0, 0, 0, 0, 0, 0]
                }
                this.chart = echarts.init(document.getElementById(this.id))
                this.chart.setOption({
                    backgroundColor: '#fff',
                    title: {
                        text: '学历',
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
                        type: 'value',
                        show: false,
                        axisTick: {
                            show: false
                        },
                        // y 轴线
                        axisLine: {
                            show: false,
                        },
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
                                    var colorList = ['#005999', '#0278be', '#0188ce', '#039de2', '#03aaf3', '#27b6f4', '#4fc4f7', '#81d4f9'];
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
