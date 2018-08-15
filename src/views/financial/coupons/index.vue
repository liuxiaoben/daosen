<template>
	<div id="coupons">
		<el-row>
		  <el-col :span="24"><div class="grid-big-title">优惠券管理</div></el-col>
		</el-row>
		<div class="coupons_content">
			<div class="demo-input-suffix">
			  	方案名
			  	<el-input placeholder="请输入方案名称" v-model="input1"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
			  	合同号
			  	<el-input placeholder="请输入内容" v-model="input2"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
			  	代理公司
			  	<el-input placeholder="请输入内容" v-model="input3"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
			  	时间
			  	<el-date-picker v-model="value4" :editable="false" type="date" placeholder="请选择日期"></el-date-picker>
			    <el-date-picker v-model="value5" :editable="false" type="date" placeholder="请选择日期"></el-date-picker>
			</div>
			<el-row :gutter="32" class="grid-item">
			  	<el-col :span="6" class="coupons_item">
			  		<div class="grid-content">
			  			<router-link to="/coupons/couponsDetail">
			  				<div class="user_l">
			  					<div class="price">
			  						<div class="price_l"><span>&yen;</span>100</div>
			  						<div class="price_r">
			  							<p>类型一</p>
			  							<p>编号：1268946</p>
			  						</div>
			  					</div>
			  					<p>备注：本优惠券仅在购买红米套餐时使用</p>
								<p>2016.10.31-2018.09.21</p>
			  				</div>
			  				<div class="user_r">
			  					立即使用
			  				</div>
			  			</router-link>
				  	</div>
				</el-col>
			  	<el-col :span="6" class="coupons_item active">
			  		<div class="grid-content">
			  			<router-link to="/coupons/couponsDetail">
			  				<div class="user_l">
			  					<div class="price">
			  						<div class="price_l"><span>&yen;</span>100</div>
			  						<div class="price_r">
			  							<p>类型一</p>
			  							<p>编号：1268946</p>
			  						</div>
			  					</div>
			  					<p>备注：本优惠券仅在购买红米套餐时使用</p>
								<p>2016.10.31-2018.09.21</p>
			  				</div>
			  				<div class="user_r">
			  					立即使用
			  				</div>
			  			</router-link>
				  	</div>
				</el-col>
				<el-col :span="6" class="coupons_item">
			  		<div class="grid-content">
			  			<router-link to="/coupons/couponsDetail">
			  				<div class="user_l">
			  					<div class="price">
			  						<div class="price_l"><span>&yen;</span>100</div>
			  						<div class="price_r">
			  							<p>类型一</p>
			  							<p>编号：1268946</p>
			  						</div>
			  					</div>
			  					<p>备注：本优惠券仅在购买红米套餐时使用</p>
								<p>2016.10.31-2018.09.21</p>
			  				</div>
			  				<div class="user_r">
			  					立即使用
			  				</div>
			  			</router-link>
				  	</div>
				</el-col>
				<el-col :span="6" class="coupons_item">
			  		<div class="grid-content">
			  			<router-link to="/coupons/couponsDetail">
			  				<div class="user_l">
			  					<div class="price">
			  						<div class="price_l"><span>&yen;</span>100</div>
			  						<div class="price_r">
			  							<p>类型一</p>
			  							<p>编号：1268946</p>
			  						</div>
			  					</div>
			  					<p>备注：本优惠券仅在购买红米套餐时使用</p>
								<p>2016.10.31-2018.09.21</p>
			  				</div>
			  				<div class="user_r">
			  					立即使用
			  				</div>
			  			</router-link>
				  	</div>
				</el-col>
				<el-col :span="6" class="coupons_item">
			  		<div class="grid-content">
			  			<router-link to="/coupons/couponsDetail">
			  				<div class="user_l">
			  					<div class="price">
			  						<div class="price_l"><span>&yen;</span>100</div>
			  						<div class="price_r">
			  							<p>类型一</p>
			  							<p>编号：1268946</p>
			  						</div>
			  					</div>
			  					<p>备注：本优惠券仅在购买红米套餐时使用</p>
								<p>2016.10.31-2018.09.21</p>
			  				</div>
			  				<div class="user_r">
			  					立即使用
			  				</div>
			  			</router-link>
				  	</div>
				</el-col>
				<el-col :span="6" class="coupons_item">
			  		<div class="grid-content">
			  			<router-link to="/coupons/couponsDetail">
			  				<div class="user_l">
			  					<div class="price">
			  						<div class="price_l"><span>&yen;</span>100</div>
			  						<div class="price_r">
			  							<p>类型一</p>
			  							<p>编号：1268946</p>
			  						</div>
			  					</div>
			  					<p>备注：本优惠券仅在购买红米套餐时使用</p>
								<p>2016.10.31-2018.09.21</p>
			  				</div>
			  				<div class="user_r">
			  					立即使用
			  				</div>
			  			</router-link>
				  	</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script scoped>
	export default {
		data() {
			return {
				input1: '',
		    	input2: '',
		    	input3: '',
		    	value4: '',
		    	value5: ''
			}
		}
	};
</script>

<style>
	#coupons .el-input{
		width:160px!important;
		margin-bottom: 29px;
	}
	#coupons .coupons_item{
		margin-bottom: 30px;
	}
	#coupons .coupons_content{
		padding: 30px 40px;
	}
	#coupons .grid-content a{
		display: block;
		width:322px;
		height:126px;
		border:1px solid #f3f3f3;
	}
	#coupons .grid-content a .user_l{
		width:79%;
		height:100%;
		float: left;
		padding:15px 12px 0 11px;
		background:url(../../../assets/images/is_user.png)no-repeat;
		background-position: 200px 65px;
	}
	#coupons .grid-content a .user_l .price{
		height:36px;
		margin-bottom: 17px;
	}
	#coupons .grid-content a .user_l .price .price_l{
		float:left;
		font-size:46px;
		color:#41b3f9;
		line-height:36px;
		font-weight: 700;
		margin-right: 10px;
	}
	#coupons .grid-content a .user_l .price .price_l span{
		font-size:18px;
		vertical-align: top;
		font-weight: normal;
	}
	#coupons .grid-content a .user_l .price .price_r p{
		font-size:12px;
		color:#999999;
		line-height:18px;
	}
	#coupons .grid-content a .user_l .price .price_r p:first-child{
		color:#41b3f9;
	}
	#coupons .grid-content a .user_l>p{
		font-size:12px;
		color:#999999;
		line-height:22px;
	}
	#coupons .grid-content a .user_r{
		width: 21%;
		height:100%;
		float: left;
		background:url(../../../assets/images/user_bg.png)no-repeat center;
		background-size: 100% 100%;
		padding:14px 26px 18px;
		font-size:14px;
		color:#ffffff;
		line-height:23px;
		font-weight: bold;
	}
	#coupons .coupons_item.active .grid-content a .user_r{
		background:url(../../../assets/images/user_bg_active.png)no-repeat center;
	}
	#coupons .coupons_item.active .grid-content a .user_l{
		background:url(../../../assets/images/ok_user.png)no-repeat;
		background-position: 200px 65px;
	}
	@media screen and (max-width: 1900px) {
	    #coupons .el-col-6 {
	       width:33.33%;
	    }
	}
	@media screen and (max-width: 1508px) {
	    #coupons .el-col-6 {
	       width:50%;
	    }
	}
</style>


