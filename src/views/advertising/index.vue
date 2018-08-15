<template>
  <div class="ggxg">
      <div class="ggxg1">
      	<img src="../../assets/images/mmxy.png" />
      </div>
      
      <el-form :inline="true" :model="formInline" class="demo-form-inline ggxg2">
			  <el-form-item label="订单编号">
			    <el-input v-model="formInline.user" placeholder=""></el-input>
			  </el-form-item>
			  <el-form-item label="订单名称">
			    <el-input v-model="formInline.user1" placeholder=""></el-input>
			  </el-form-item>
			  <el-form-item label="服务公司">
			    <el-select v-model="formInline.region" placeholder="">
			      <el-option label="区域一" value="shanghai"></el-option>
			      <el-option label="区域二" value="beijing"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="onSubmit">搜索</el-button>
			  </el-form-item>
			</el-form>
			
			<div class="ggxg3">
				<el-row :gutter="30">
				  <el-col :span="4">
				  	<div class="grid-content bg-purple">
				  		<div>
				  			<p>
				  				保利心语
				  			</p>
				  			<p>
				  				电梯LED广告方案
				  			</p>
				  		</div>
				  		<div>
				  			<img src="../../assets/images/fuwu-logo5.png" />
				  		</div>
				  		<div>
				  			<p>
				  				投放城市：<a>武汉</a>
				  			</p>
				  			<p>
				  				覆盖小区：<a>30个</a>
				  			</p>
				  			<p>
				  				覆盖人群：<a>100万</a>
				  			</p>
				  			<a>
				  				查看详情
				  			</a>
				  		</div>
				  	</div>
				  </el-col>
				  <el-col :span="4">
				  	<div class="grid-content bg-purple">
				  		<div>
				  			<p>
				  				保利心语
				  			</p>
				  			<p>
				  				电梯LED广告方案
				  			</p>
				  		</div>
				  		<div>
				  			<img src="../../assets/images/fuwu-logo5.png" />
				  		</div>
				  		<div>
				  			<p>
				  				投放城市：<a>武汉</a>
				  			</p>
				  			<p>
				  				覆盖小区：<a>30个</a>
				  			</p>
				  			<p>
				  				覆盖人群：<a>100万</a>
				  			</p>
				  			<a>
				  				查看详情
				  			</a>
				  		</div>
				  	</div>
				  </el-col>
				  <el-col :span="4">
				  	<div class="grid-content bg-purple">
				  		<div>
				  			<p>
				  				保利心语
				  			</p>
				  			<p>
				  				电梯LED广告方案
				  			</p>
				  		</div>
				  		<div>
				  			<img src="../../assets/images/fuwu-logo5.png" />
				  		</div>
				  		<div>
				  			<p>
				  				投放城市：<a>武汉</a>
				  			</p>
				  			<p>
				  				覆盖小区：<a>30个</a>
				  			</p>
				  			<p>
				  				覆盖人群：<a>100万</a>
				  			</p>
				  			<a>
				  				查看详情
				  			</a>
				  		</div>
				  	</div>
				  </el-col>
				  <el-col :span="4">
				  	<div class="grid-content bg-purple">
				  		<div>
				  			<p>
				  				保利心语
				  			</p>
				  			<p>
				  				电梯LED广告方案
				  			</p>
				  		</div>
				  		<div>
				  			<img src="../../assets/images/fuwu-logo5.png" />
				  		</div>
				  		<div>
				  			<p>
				  				投放城市：<a>武汉</a>
				  			</p>
				  			<p>
				  				覆盖小区：<a>30个</a>
				  			</p>
				  			<p>
				  				覆盖人群：<a>100万</a>
				  			</p>
				  			<a>
				  				查看详情
				  			</a>
				  		</div>
				  	</div>
				  </el-col>
				  <el-col :span="4">
				  	<div class="grid-content bg-purple">
				  		<div>
				  			<p>
				  				保利心语
				  			</p>
				  			<p>
				  				电梯LED广告方案
				  			</p>
				  		</div>
				  		<div>
				  			<img src="../../assets/images/fuwu-logo5.png" />
				  		</div>
				  		<div>
				  			<p>
				  				投放城市：<a>武汉</a>
				  			</p>
				  			<p>
				  				覆盖小区：<a>30个</a>
				  			</p>
				  			<p>
				  				覆盖人群：<a>100万</a>
				  			</p>
				  			<a>
				  				查看详情
				  			</a>
				  		</div>
				  	</div>
				  </el-col>
				  <el-col :span="4">
				  	<div class="grid-content bg-purple">
				  		<div>
				  			<p>
				  				保利心语
				  			</p>
				  			<p>
				  				电梯LED广告方案
				  			</p>
				  		</div>
				  		<div>
				  			<img src="../../assets/images/fuwu-logo5.png" />
				  		</div>
				  		<div>
				  			<p>
				  				投放城市：<a>武汉</a>
				  			</p>
				  			<p>
				  				覆盖小区：<a>30个</a>
				  			</p>
				  			<p>
				  				覆盖人群：<a>100万</a>
				  			</p>
				  			<a>
				  				查看详情
				  			</a>
				  		</div>
				  	</div>
				  </el-col>
				  <el-col :span="4">
				  	<div class="grid-content bg-purple">
				  		<div>
				  			<p>
				  				保利心语
				  			</p>
				  			<p>
				  				电梯LED广告方案
				  			</p>
				  		</div>
				  		<div>
				  			<img src="../../assets/images/fuwu-logo5.png" />
				  		</div>
				  		<div>
				  			<p>
				  				投放城市：<a>武汉</a>
				  			</p>
				  			<p>
				  				覆盖小区：<a>30个</a>
				  			</p>
				  			<p>
				  				覆盖人群：<a>100万</a>
				  			</p>
				  			<a>
				  				查看详情
				  			</a>
				  		</div>
				  	</div>
				  </el-col>
				  <el-col :span="4">
				  	<div class="grid-content bg-purple">
				  		<div>
				  			<p>
				  				保利心语
				  			</p>
				  			<p>
				  				电梯LED广告方案
				  			</p>
				  		</div>
				  		<div>
				  			<img src="../../assets/images/fuwu-logo5.png" />
				  		</div>
				  		<div>
				  			<p>
				  				投放城市：<a>武汉</a>
				  			</p>
				  			<p>
				  				覆盖小区：<a>30个</a>
				  			</p>
				  			<p>
				  				覆盖人群：<a>100万</a>
				  			</p>
				  			<a>
				  				查看详情
				  			</a>
				  		</div>
				  	</div>
				  </el-col>
				  <el-col :span="4">
				  	<div class="grid-content bg-purple">
				  		<div>
				  			<p>
				  				保利心语
				  			</p>
				  			<p>
				  				电梯LED广告方案
				  			</p>
				  		</div>
				  		<div>
				  			<img src="../../assets/images/fuwu-logo5.png" />
				  		</div>
				  		<div>
				  			<p>
				  				投放城市：<a>武汉</a>
				  			</p>
				  			<p>
				  				覆盖小区：<a>30个</a>
				  			</p>
				  			<p>
				  				覆盖人群：<a>100万</a>
				  			</p>
				  			<a>
				  				查看详情
				  			</a>
				  		</div>
				  	</div>
				  </el-col>
				  <el-col :span="4">
				  	<div class="grid-content bg-purple">
				  		<div>
				  			<p>
				  				保利心语
				  			</p>
				  			<p>
				  				电梯LED广告方案
				  			</p>
				  		</div>
				  		<div>
				  			<img src="../../assets/images/fuwu-logo5.png" />
				  		</div>
				  		<div>
				  			<p>
				  				投放城市：<a>武汉</a>
				  			</p>
				  			<p>
				  				覆盖小区：<a>30个</a>
				  			</p>
				  			<p>
				  				覆盖人群：<a>100万</a>
				  			</p>
				  			<a>
				  				查看详情
				  			</a>
				  		</div>
				  	</div>
				  </el-col>
				  <el-col :span="4">
				  	<div class="grid-content bg-purple">
				  		<div>
				  			<p>
				  				保利心语
				  			</p>
				  			<p>
				  				电梯LED广告方案
				  			</p>
				  		</div>
				  		<div>
				  			<img src="../../assets/images/fuwu-logo5.png" />
				  		</div>
				  		<div>
				  			<p>
				  				投放城市：<a>武汉</a>
				  			</p>
				  			<p>
				  				覆盖小区：<a>30个</a>
				  			</p>
				  			<p>
				  				覆盖人群：<a>100万</a>
				  			</p>
				  			<a>
				  				查看详情
				  			</a>
				  		</div>
				  	</div>
				  </el-col>
				  <el-col :span="4">
				  	<div class="grid-content bg-purple">
				  		<div>
				  			<p>
				  				保利心语
				  			</p>
				  			<p>
				  				电梯LED广告方案
				  			</p>
				  		</div>
				  		<div>
				  			<img src="../../assets/images/fuwu-logo5.png" />
				  		</div>
				  		<div>
				  			<p>
				  				投放城市：<a>武汉</a>
				  			</p>
				  			<p>
				  				覆盖小区：<a>30个</a>
				  			</p>
				  			<p>
				  				覆盖人群：<a>100万</a>
				  			</p>
				  			<a>
				  				查看详情
				  			</a>
				  		</div>
				  	</div>
				  </el-col>
				</el-row>
			</div>
			
			<!-- <div class="page-wrap" align="right" style="margin-top: 30px;">
												<div class="inner">
												<a href="#"><i class="fa fa-angle-left"></i></a>
												<a href="#">1</a>
												<a href="#" class="active">2</a>
												<a href="#">3</a>
												<a href="#">4</a>
												<a href="#">5</a>
												<a href="#"><i class="fa fa-angle-right"></i></a>
												</div>
											</div> -->
			<div class="fyfy fystyle">
				<el-pagination
					background
					layout="prev, pager, next"
					:total="1000">
				</el-pagination>
			</div>
			
  </div>
</template>
<script>
export default {
  data() {
      return {
        formInline: {
          user: '',
          user1: '',
          region: ''
        }
      }
  },
  methods: {
      onSubmit() {
        console.log('submit!');
      }
  }
}
</script>
<style>
	.ggxg{
		padding: 30px 0;
	}
	
	.ggxg1{
		border-radius: 6px;
		overflow: hidden;
	}
	
	.ggxg1>img{
		width: 100%;
	}
	
	.ggxg2{
		background: #FFFFFF;
		border-radius: 6px;
		height: 68px;
		padding: 0px 30px;
		margin:20px 0px ;
		/*line-height: 68px;*/
	}
	
	.ggxg2 .el-form-item{
		margin-bottom: 0px;
		margin-top: 15px;
	}
	
	.ggxg2 .el-button{
		background: #e60012;
		border-color: #e60012;
		padding: 10px 20px;
	}
	
	.ggxg3 .grid-content{
		height: 376px;
		background: #FFFFFF;
		border-radius: 6px;
		text-align: center;
		overflow: hidden;
		position: relative;
		margin-bottom: 30px;
	} 
	
	.ggxg3 .grid-content>div:nth-child(1){
		height: 148px;
		background: #8e9eaa;
		padding: 30px 0px 75px 0px;
	}
	
	.ggxg3 .grid-content>div:nth-child(1)>p:nth-child(1){
		font-size: 14px;
		color: #EEEEEE;
	}
	
	.ggxg3 .grid-content>div:nth-child(1)>p:nth-child(2){
		font-size: 14px;
		color: #EEEEEE;
	}
	
	.ggxg3 .grid-content>div:nth-child(2){
		width: 95px;
		height: 95px;
		border-radius: 48px;
		overflow: hidden;
		position: absolute;
		top: 100px;
		left: 50%;
		margin-left: -47.5px;
		background: #FFFFFF;
		border: 1px solid #f2f1f1;
	}
	
	.ggxg3 .grid-content>div:nth-child(2)>img{
		width: 100%;
		height: 100%;
	}
	
	.ggxg3 .grid-content>div:nth-child(3){
		height: 228px;
		padding-top: 72px;
		background: #FFFFFF;
	}
	
	.ggxg3 .grid-content>div:nth-child(3)>p{
		color: #2F323E;
		font-size: 14px;
		margin-bottom: 4px;
	}
	
	.ggxg3 .grid-content>div:nth-child(3)>p>a{
		color: #41B3F9;
		font-size: 14px;
		
	}
	
	.ggxg3 .grid-content>div:nth-child(3)>a{
		width: 130px;
		height: 35px;
		line-height: 35px;
		background: #e60012;
		border-radius: 6px;
		color: #FFFFFF;
		display: inline-block;
		margin-top: 29px;
		font-size: 14px;
	}

	.ggxg .fystyle{
		text-align: right;
	}
	.ggxg .fystyle>div{
		padding-right: 20px;
	}
	.ggxg .fystyle .el-pagination button{
    width: 45px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    margin: 0px !important;
    background: #ffffff !important;
    border: 1px solid #edf1f5;
    border-radius: 0px !important;
  }

  .ggxg .fystyle .el-pagination button span{
    display: block;
    height: 45px;
    line-height: 45px;
    color: #8e9eaa;
    font-size: 12px;
  }

  .ggxg .fystyle .el-pagination .el-pager .number{
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

  .ggxg .fystyle .el-pagination .el-pager .active{
    background: #cbd7e2 !important;
    color: #40b6ff;
  }

  .ggxg .fystyle .el-pagination .el-pager .el-icon-more{
    margin: 7px 5px;
  }
</style>


