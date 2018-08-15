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
      default: 'chart2'
    },
    id: {
      type: String,
      default: 'chart2'
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
      // const xData = (function() {
      //   const data = []
      //   for (let i = 1; i < 9; i++) {
      //     data.push(i + 'month')
      //   }
      //   return data
      // }())
      this.chart.setOption({
        backgroundColor: '#fff',
        grid: {
          borderWidth: 0,
          top: 10,
          bottom: 0,
          left: 10,
          right: 10,
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: [{
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          boundaryGap: false,
          splitLine: {
              show: true,
              interval: 0,
              lineStyle: {
                  color: '#999',
                  type: 'dashed'
              }
          },
          axisPointer: {
                label: {
                    formatter: function (params) {
                        return '降水量  ' + params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
          axisLine: {
            show: false
          },
          data: ["2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8", "2016-9"]
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
        series:
         [
          {
          name: 'male',
          type: 'line',
          symbol:'circle',
          symbolSize:10,
          smooth: true,
          stack: 'total',
          itemStyle: {
            normal: {
              color: '#97d3f9',
              barBorderRadius: 20,
              label: {
                show: false,
                position: 'top',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              },
              lineStyle:{  
                width:2, 
                color: '#41b3f9',
                type:'dotted'  //'dotted'虚线 'solid'实线  
              } 
            }
          },
          data: [
            327,
            1776,
            507,
            1200,
            800,
            482,
            800,
            482,
            204
          ]
        }
        
        ]

      })
    }
  }
}
</script>
