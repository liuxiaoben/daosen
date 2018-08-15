<template>
    <div :class="className" :id="id" :data="data" :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from "echarts";
    export default {
        props: {
            data:{
                type: Array,
                default:  [{
                    value: 0,
                    name: '没有数据'
                }],
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
            };
        },
        methods: {
            getBusinessData(point) {
                var sendData = {
                    lat: point.lat,
                    lng: point.lng
                };
                businessData(sendData).then(res => {
                   
                    this.initChart(this.data);
                });
            },

            initChart() {
                var data = this.data;
                if (data.length > 0) {
                    var temp = data.map((item, i) => {
                        return {
                            value: item.num,
                            name: item.industryName || '未知' + i
                        }
                    })
                    this.data = temp;
                }else{
                    data = [{
                        value: 0,
                        name: '没有数据'
                    }]
                }
                this.chart = echarts.init(document.getElementById(this.id));
                var option = {
                    tooltip: {
                        trigger: "item",
                        formatter: "{b}: {c} ({d}%)"
                    },
                    series: [{
                        type: "pie",
                        color: ["#ffa800", "#7ace4c", "#41b3f9", "#e60012"],
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        data: data
                    }]
                };
                this.chart.setOption(option);
            }
        },
        mounted() {

        },
        beforeDestroy() {
            if (!this.chart) {
                return;
            }
            this.chart.dispose();
            this.chart = null;
        }
    };
</script>
