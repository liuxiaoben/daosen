<template>
	<div id="addressDetail">
		<el-row>
		  <el-col :span="24"><div class="grid-big-title">发票详情</div></el-col>
		</el-row>
		<el-row :gutter="10" class="grid-item">
			<el-col :span="20"><div class="grid-title">基本信息</div></el-col>
		  	<el-col :span="24"><div class="grid-content"><span>收件人姓名：</span>{{ addressDetail.name }}</div></el-col>
		  	<el-col :span="24"><div class="grid-content"><span>所在地区：</span>{{ addressDetail.province + addressDetail.city + addressDetail.district }}</div></el-col>
		  	<el-col :span="24"><div class="grid-content"><span>街道地址：</span>{{ addressDetail.street }}</div></el-col>
		  	<el-col :span="24"><div class="grid-content"><span>邮政编码：</span>{{ addressDetail.zipcode }}</div></el-col>
		  	<el-col :span="24"><div class="grid-content"><span>手机号：</span>{{ addressDetail.phone }}</div></el-col>
		</el-row>
	</div>
</template>

<script>
	import { addressDetail } from '@/api/invoice'
	export default {
		name: 'tradingDetail',
		data() {
			return {
				listLoading: true,
				addressDetail:[]
			}
		},
		created() {
			this.invoiceInfo()
			this.listLoading = false
		},
		methods: {
			invoiceInfo() {
				const id = this.$route.params.addressId
				addressDetail({addressId:id,token:this.$store.getters.token}).then( response => {
					this.addressDetail = response.data
				})
			}
		}
	};
</script>

<style type="text/css">
	#addressDetail .grid-item{
		padding:23px 0px 30px;
		margin:0 35px!important;
		border-bottom: 1px solid #e4e7ea;
	}
	#addressDetail .grid-item:last-child{
		border:none;
	}
	#addressDetail .grid-title{
		font-size:14px;
		color:#555;
		line-height:55px;
		font-weight: bold;
	}
	#addressDetail .grid-content{
		font-size:12px;
		color:#555555;
		line-height:31px;
	}
	#addressDetail .grid-content span{
		color:#8e9eaa;
	}
	v.el-table{
		text-align: center;
	}
	#addressDetail .grid-content a{
		color:#e60011;
		font-weight: bold;
	}
</style>
                                                                                         
                                     
