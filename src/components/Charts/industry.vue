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
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                color: ['#ffa800','#7ace4c','#41b3f9','#e60012'],
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                
                data:[
                    {value:335, name:'饮食'},
                    {value:310, name:'服务'},
                    {value:1548, name:'互联网'},
                    {value:548, name:'物流'}
                ]
            }
        ]
      })
    }
  }
}
</script>
