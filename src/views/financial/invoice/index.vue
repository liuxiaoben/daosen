<template>
    <div class="transaction_records">
      	<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="发票索取" name="first">
		    	<invoice-ask></invoice-ask>
		    </el-tab-pane>
		    <el-tab-pane label="发票列表" name="second">
		    	<invoice-list></invoice-list>
		    </el-tab-pane>
		    <el-tab-pane label="发票信息管理" name="third">
		    	<invoice-info></invoice-info>
		    </el-tab-pane>
		 </el-tabs>
    </div>
</template>

<script>
import invoiceAsk from './invoiceAsk'
import invoiceList from './invoiceList'
import invoiceInfo from './invoiceInfo'

export default {
	components :{
		invoiceAsk,
		invoiceList,
		invoiceInfo
	},
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {}
    }
}
</script>

<style>
	.el-picker-panel__icon-btn{
		min-width: auto!important;
		height:auto;
	}
	.el-main{
		background:#fff;
	}
	.transaction_records .el-tabs__active-bar{
		width:44px;
		height: 9px;
		background:url(../../../assets/images/tab_active.png)no-repeat center;
	}
	.transaction_records .el-tabs__item{
		height:14px;
		line-height:14px;
	}
	.transaction_records .el-tabs__nav{
		padding-bottom: 20px;
	}
	.transaction_records .el-tabs__item.is-active,
	.transaction_records .el-tabs__item{
    	color: #999;
	}	
</style>