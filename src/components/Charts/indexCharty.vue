<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))

      this.chart.setOption({
        backgroundColor: '#fff',
        title: {
          top: 20,
          show:false,
          text: '',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 50,
          icon: 'bar',
          itemWidth: 20,
          itemHeight: 10,
          itemGap: 30,
          data: [
            {
              name:'代理公司一',
              icon:'image://../../../static/img/dlgsy.png'
            }, 
            {
              name:'代理公司二',
              icon:'image://../../../static/img/dlgse.png'
            }
            ],
          left: '4%',
          textStyle: {
            fontSize: 12,
            color: '#333'
          }
        },
        grid: {
          top: 120,
          left: '5%',
          right: '5%',
          bottom: '5%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          // name: '月份',
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLine: {
            show:false,
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel:{
            textStyle: {
              color: '#8e9eaa'
            }
          },
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        }],
        yAxis: [{
          show:true,
          axisTick: {show:false},
          type: 'value',
          name: '金额',
          axisTick: {
            show: false
          },
          nameTextStyle: {  
            color: ['#8e9eaa']  
          },  
          axisLine: {
            show:false,
            lineStyle: {
              color: '#57617B',
              show: false
            }
          },
          axisLabel:{
            textStyle: {
              color: '#8e9eaa'
            },
            formatter: function (value) {
            var texts = [];
            if(value==0){
            texts.push('0');
            }
            else if (value <=3000) {
            texts.push('3k');
            }
            else if (value<= 6000) {
            texts.push('6k');
            }
            else if(value<= 9000){
            texts.push('9k');
            }
            else if(value<= 12000){
            texts.push('12k');
            }
            else if(value<= 15000){
            texts.push('15k');
            }
            return texts;

            }
          },
          splitLine: {
            show:true,
            lineStyle: {
              color: '#eef0f1'
            }
          },
        }],
        series: [{
          name: '代理公司一',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(51,173,248, 1)'
              }, {
                offset: 0.8,
                color: 'rgba(51,173,248, 1)'
              }], false),
              // shadowColor: 'rgba(0, 0, 0, 0.1)',
              // shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(51,173,248)',
              borderColor: 'rgba(51,173,248,1)',
              borderWidth: 12

            }
          },
          data: [0, 2000, 6000, 10000, 4000, 15000, 10000, 4150, 8000, 2000, 3000, 0]
        },{
          name: '代理公司二',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(137,207,251, 1)'
              }, {
                offset: 0.8,
                color: 'rgba(137,207,251, 1)'
              }], false),
              // shadowColor: 'rgba(0, 0, 0, 0.1)',
              // shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(137,207,251)',
              borderColor: 'rgba(137,207,251, 1)',
              borderWidth: 12
            }
          },
          data: [0, 3000, 5000, 8000, 12000, 7000, 4000, 12150, 1000, 3000, 1000, 0]
        }]
      })
    }
  }
}
</script>
