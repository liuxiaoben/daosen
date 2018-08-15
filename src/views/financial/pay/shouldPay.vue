<template>
    <div class="transaction_records" id="yfk">
      	<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="应付明细" name="first">
		    	<payment-list></payment-list>
		    </el-tab-pane>
		    <el-tab-pane label="付款申请" name="second">
		    	<is-payment></is-payment>
		    </el-tab-pane>
		 </el-tabs>
    </div>
</template>

<script>
import paymentList from './paymentList'
import isPayment from './isPayment'

export default {
	components :{
		paymentList,
		isPayment
	},
    data() {
      return {
        activeName: 'first'
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
	#yfk .el-picker-panel__icon-btn,#yfk button{
		min-width: auto;
		height:auto;
	}
	#yfk .el-main{
		background:#fff;
	}
	/* #yfk .el-tabs__active-bar{
		width:44px !important;
		height: 9px !important;
		background:url(../../../assets/images/tab_active.png)no-repeat center;
	}
	#yfk .el-tabs__item{
		height:14px;
		line-height:14px;
	}
	#yfk .el-tabs__nav{
		padding-bottom: 20px;
	}
	#yfk .el-tabs__item.is-active,
	#yfk .el-tabs__item{
    	color: #999;
	}
	#yfk .el-button+.el-button{
		margin-left:0;
	}	 */
</style>
