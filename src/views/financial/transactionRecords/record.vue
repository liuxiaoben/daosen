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

          <!-- 无数据展现提示页面 -->
          <div class="bgimg">
            <p>不好意思，暂时没有数据</p>
          </div>

		    </el-tab-pane>
		    <el-tab-pane label="交易明细" name="second">
		    		<trading-list></trading-list>
		    </el-tab-pane>
		 </el-tabs>
    </div>
</template>

<script>
import LineChart from "./LineChart";
import tradingList from "./tradingList";

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
};

export default {
  components: {
    LineChart,
    tradingList
  },
  data() {
    return {
      activeName: "first",
      lineChartData: lineChartData.newVisitis
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style>
#transaction_records .el-picker-panel__icon-btn {
  min-width: auto !important;
  height: auto;
}
#transaction_records .el-main {
  background: #fff;
}
#transaction_records .el-tabs__active-bar {
  width: 44px;
  height: 9px;
  background: url(../../../assets/images/tab_active.png) no-repeat center;
}
#transaction_records .el-tabs__item {
  height: 14px;
  line-height: 14px;
}
#transaction_records .el-tabs__nav {
  padding-bottom: 20px;
}
#transaction_records .el-tabs__item.is-active,
#transaction_records .el-tabs__item {
  color: #999;
}
/*头部*/
#transaction_records .el-tabs__nav-scroll {
  padding: 20px 30px 0;
}
#transaction_records .el-tabs__header {
  margin: 0;
}
.fystyle .el-pagination button {
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  margin: 0px !important;
  background: #ffffff !important;
  border: 1px solid #edf1f5;
  border-radius: 0px !important;
}

.fystyle .el-pagination button span {
  display: block;
  height: 45px;
  line-height: 45px;
  color: #8e9eaa;
  font-size: 12px;
}

.fystyle .el-pagination .el-pager .number {
  width: 45px;
  height: 45px;
  line-height: 45px;
  background: #ffffff !important;
  color: #8e9eaa !important;
  font-size: 12px;
  border: 1px solid #edf1f5;
  margin: 0px;
  border-radius: 0px !important;
}

.fystyle .el-pagination .el-pager .active {
  background: #edf1f5 !important;
  color: #40b6ff;
}

.fystyle .el-pagination .el-pager .el-icon-more {
  margin: 7px 5px;
}

/* 无数据加背景色 */
.bgimg{
  width: 100%;
  min-height: 800px;
  z-index: 1000;
  background: url(../../../assets/images/warning.png) no-repeat center center;
  position: absolute;
  top: 0;
  left: 0;
}
.bgimg p{
  font-size: 18px;
  color: #40b6ff;
  font-weight: bold;
  text-align: center;
  margin-top: 250px;
}

</style>
