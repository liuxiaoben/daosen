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
      default: 'chart1'
    },
    id: {
      type: String,
      default: 'chart1'
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
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
      const xData = (function() {
        const data = []
        for (let i = 1; i < 9; i++) {
          data.push(i + 'month')
        }
        return data
      }())
      this.chart.setOption({
        backgroundColor: '#fff',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          }
        },
        grid: {
          borderWidth: 0,
          top: 0,
          bottom: 0,
          left:0,
          right:0,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          show:false,
          data: ['female', 'male', 'average']
        },
        calculable: true,
        xAxis: [{
          show:false,
          axisLine: {
            lineStyle: {
              color: '#41b3f9'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 0

          },
          data: xData
        }],
        yAxis: [{
          show:false,
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#41b3f9'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0
          },
          splitArea: {
            show: false
          }
        }],
        series : [
        {
            name:'邮件营销',
            type:'line',
            symbolSize:0,
            areaStyle: {
              color: '#97d3f9'
            },
            lineStyle: {
              color: '#97d3f9',
              type: 'dashed'
            },
            data:[0, 26, 5 , 24, 18, 26 , 5, 0]
        },
        {
            name:'联盟广告',
            type:'line',
            symbolSize:0,
            areaStyle: {
              color: '#daecf9'
            },
            lineStyle: {
              color: '#daecf9'
            },
            data:[0, 10, 26, 6, 24,10, 26, 0]
        }]
      })
    }
  }
}
</script>
