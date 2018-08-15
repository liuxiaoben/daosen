<template>
    <div id="transaction_records">
      	<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="交易总览" name="first">
		    	<el-row style="background:#fff;padding:16px 0px 0;margin-bottom:32px;">
			      	<line-chart :chart-data="lineChartData"></line-chart>
			    </el-row>
			    <el-row style="background:#fff;padding:16px 0px 0;margin-bottom:32px;">
			      	<line-chart :chart-data="lineChartData"></line-chart>
			    </el-row>
		    </el-tab-pane>
		    <el-tab-pane label="交易明细" name="second">
		    		<trading-list></trading-list>
		    </el-tab-pane>
		 </el-tabs>
    </div>
</template>

<script>
import LineChart from './LineChart'
import tradingList from './tradingList'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}


export default {
	components :{
		LineChart,
		tradingList
	},
    data() {
      return {
        activeName: 'first',
        lineChartData: lineChartData.newVisitis
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>

<style>
	#transaction_records .el-picker-panel__icon-btn{
		min-width: auto!important;
		height:auto;
	}
	#transaction_records .el-main{
		background:#fff;
	}
	#transaction_records .el-tabs__active-bar{
		width:44px;
		height: 9px;
		background:url(../../assets/images/tab_active.png)no-repeat center;
	}
	#transaction_records .el-tabs__item{
		height:14px;
		line-height:14px;
	}
	#transaction_records .el-tabs__nav{
		padding-bottom: 20px;
	}
	#transaction_records .el-tabs__item.is-active,
	#transaction_records .el-tabs__item{
    	color: #999;
	}
	/*头部*/
	#transaction_records .el-tabs__nav-scroll{
		padding:20px 30px 0;
	}
	#transaction_records .el-tabs__header {
	    margin: 0;
	}
</style>
