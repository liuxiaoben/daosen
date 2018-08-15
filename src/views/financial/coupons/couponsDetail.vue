<template>
	<div id="couponsDetail">
		<el-row>
		  <el-col :span="24"><div class="grid-big-title">交易详情</div></el-col>
		</el-row>
		<el-row :gutter="10" class="grid-item">
			<el-col :span="20"><div class="grid-title">基本信息</div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>优惠券编号：</span>001</div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>类型：</span>2018.01.02 12:00</div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>面值：</span>曾阿牛 </div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>生效时间：</span>道森媒体 </div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>失效时间：</span>1200.00 </div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>状态：</span> 200.00  </div></el-col>
		  	<el-col :span="10"><div class="grid-content"><span>备注：</span>1000.00  </div></el-col>
		  	<el-col :span="24"><div class="grid-content"><span>介绍：</span>500.00 </div></el-col>
		</el-row>
		<el-row :gutter="10" class="grid-item">
			<el-col :span="20"><div class="grid-title">使用的方案</div></el-col>
		  	<el-col :span="10"><div class="grid-content"><span>2018.02.03  12:00:00</span>保利心语电梯广告</div></el-col>
		  	<el-col :span="4" :offset="6"><div class="grid-content"><router-link to="">查看详情</router-link></div></el-col>
		</el-row>
	</div>
</template>

<script scoped>
	export default {
		name: 'tradingDetail',
		data() {
			return {
			}
		}
	};
</script>

<style type="text/css" scoped>
	#couponsDetail .grid-item{
		padding:23px 0px 30px;
		margin:0 35px!important;
		border-bottom: 1px solid #e4e7ea;
	}
	#couponsDetail .grid-item:last-child{
		border:none;
	}
	#couponsDetail .grid-title{
		font-size:14px;
		color:#555;
		line-height:55px;
		font-weight: bold;
	}
	#couponsDetail .grid-content{
		font-size:12px;
		color:#555555;
		line-height:31px;
	}
	#couponsDetail .grid-content span{
		color:#8e9eaa;
	}
	#couponsDetail .el-table{
		text-align: center;
	}
	#couponsDetail .grid-content a{
		color:#e60011;
		font-weight: bold;
	}
</style>
                                                                                         
                                     
