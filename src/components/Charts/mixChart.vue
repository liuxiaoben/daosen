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
      default: 'chart3'
    },
    id: {
      type: String,
      default: 'chart3'
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
          x: '5%',
          top: '10%',
          textStyle: {
            color: '#90979c'
          },
          data: ['female', 'male', 'average']
        },
        calculable: true,
        xAxis: [{
          show:false,
          axisLine: {
            lineStyle: {
              color: '#90979c'
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
              color: '#90979c'
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
        series: [{
          name: 'female',
          type: 'bar',
          stack: 'total',
          barMaxWidth: 10,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: '#97d3f9',
              label: {
                show: false,
                textStyle: {
                  color: '#fff'
                },
                position: 'insideTop',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: [
            709,
            1917,
            2455,
            2610,
            1719,
            1433,
            2455,
            2610,
            1544
          ]
        },
        ]
      })
    }
  }
}
</script>
