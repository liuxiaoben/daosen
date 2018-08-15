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
        title: {
            text: '性别',
            textStyle:{
                //文字颜色
                color:'#333333',
                //字体风格,'normal','italic','oblique'
                fontStyle:'normal',
                //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                fontWeight:'400',
                //字体大小
        　　　　 fontSize:16
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                color: ['#e60012','#41b3f9'],
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                data:[
                    {value:1600, name:'女'},
                    {value:1548, name:'男'}
                ]
            }
        ]
      })
    }
  }
}
</script>
