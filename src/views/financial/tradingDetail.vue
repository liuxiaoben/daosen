<template>
	<div id="tradingDetail">
		<el-row>
		  <el-col :span="24"><div class="grid-big-title">交易详情</div></el-col>
		</el-row>
		<el-row :gutter="10" class="grid-item">
			<el-col :span="20"><div class="grid-title">基本信息</div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>流水号：</span>001</div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>时间：</span>2018.01.02 12:00</div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>子账号：</span>曾阿牛 </div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>代理公司：</span>道森媒体 </div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>总金额：</span>1200.00 </div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>优惠价：</span> 200.00  </div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>实际付款：</span>1000.00  </div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>本次付款：</span>500.00 </div></el-col>
		</el-row>
		<el-row :gutter="10" class="grid-item">
			<el-col :span="20"><div class="grid-title">合同信息</div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>合同号：</span>001</div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>合同名称：</span>2018.01.02 12:00</div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>合同金额：</span>曾阿牛 </div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>签约时间：</span>道森媒体 </div></el-col>
		  	<el-col :span="4"><div class="grid-content"><router-link to="">合同详情</router-link></div></el-col>
		</el-row>
		<el-row :gutter="10" class="grid-item">
			<el-col :span="20"><div class="grid-title">订单信息</div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>订单名称：</span>001</div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>订单金额：</span>2018.01.02 12:00</div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>订单时间：</span>2018.01.02 12:00</div></el-col>
		  	<el-col :span="5"><div class="grid-content"><router-link to="">方案详情</router-link></div></el-col>
		</el-row>
		<el-row class="grid-item">
			<el-col :span="20"><div class="grid-title">发票</div></el-col>
			<el-table :data="tableData" stripe style="width: 100%">
	    		<el-table-column  prop="serial"  label="发票" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="time"  label="发票抬头" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="plan"  label="发票性质" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="contract"  label="时间" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="agent"  label="状态" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="total_amount"  label="发票备注" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="operation"  label="操作" align="center">
	    			<template slot-scope="scope">
						<el-button type="text">详情</el-button>
					</template>
	    		</el-table-column>
	  		</el-table>
		</el-row>
	</div>
</template>

<script scoped>
	export default {
		name: 'tradingDetail',
		data() {
			return {
				tableData: [{
	          	serial: '01',
	          	time: '2016-05-02',
	          	plan: '电梯广告',
	          	contract: 'HT123',
	          	agent: '道森媒体',
	          	total_amount: '1000.00',
	        	}]
			}
		}
	};
</script>

<style type="text/css" scoped>
	#tradingDetail .grid-item{
		padding:23px 0px 30px;
		margin:0 35px!important;
		border-bottom: 1px solid #e4e7ea;
	}
	#tradingDetail .grid-item:last-child{
		border:none;
	}
	#tradingDetail .grid-title{
		font-size:14px;
		color:#555;
		line-height:55px;
		font-weight: bold;
	}
	#tradingDetail .grid-content{
		font-size:12px;
		color:#555555;
		line-height:31px;
	}
	#tradingDetail .grid-content span{
		color:#8e9eaa;
	}
	#tradingDetail .el-table{
		text-align: center;
	}
	#tradingDetail .grid-content a{
		color:#e60011;
		font-weight: bold;
	}
</style>
                                                                                         
                                     
