<template>
	<div id="tradingList" class="content_list">
		<div class="demo-input-suffix">
		  	方案名
		  	<el-input placeholder="请输入方案名称" v-model="input1"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
		  	合同号
		  	<el-input placeholder="请输入内容" v-model="input2"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
		  	代理公司
		  	<el-input placeholder="请输入内容" v-model="input3"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
		  	时间
		  	<el-date-picker v-model="value4" :editable="false" type="date"  placeholder="请选择日期"></el-date-picker> -
		    <el-date-picker v-model="value5" :editable="false" type="date"  placeholder="请选择日期"></el-date-picker>
		</div>
		<el-table :data="tableData" stripe style="width: 100%">
    		<el-table-column  prop="serial"  label="流水号" align="center">
    		</el-table-column>
    		<el-table-column  prop="time"  label="时间" align="center">
    		</el-table-column>
    		<el-table-column  prop="plan"  label="方案" align="center">
    		</el-table-column>
    		<el-table-column  prop="contract"  label="合同" align="center">
    		</el-table-column>
    		<el-table-column  prop="agent"  label="代理公司" align="center">
    		</el-table-column>
    		<el-table-column  prop="total_amount"  label="总金额" align="center">
    		</el-table-column>
    		<el-table-column  prop="amount"  label="本次支付" align="center">
    		</el-table-column>
    		<el-table-column  prop="remaining_amount"  label="剩余支付" align="center">
    		</el-table-column>
    		<el-table-column  prop="operation"  label="操作" align="center">
    			<template slot-scope="scope">
					<router-link to="/financial/tradingDetail">详情</router-link>
				</template>
    		</el-table-column>
  		</el-table>
  		<el-pagination  background  layout="prev, pager, next"  :total="1000" align="center">
		</el-pagination>
	</div>
</template>

<script>
export default {
	import { login } from '../../api/financial';

	data() {
	    return {
	      	input1: '',
		    input2: '',
		    input3: '',
		    value4: '',
		    value5: '',
		    tableData: []
	        }
	    }
  	},
  	created() {
  		orderList().then(response => {
  			const data = response.data
  			console.log(data);
  		})
  	}
}
</script>

<style scoped>
	#tradingList .content_list{
		padding:34px 27px 30px 48px;
	}
	#tradingList .el-input{
		width:160px!important;
		margin-bottom: 29px;
	}

</style>
