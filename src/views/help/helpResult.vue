<template>
  <div class="help">
      	<div class="help-rbody" style="clear:both;overflow: hidden;">
		
			<div>
				<h3>
					<img src="../../assets/images/help-end.png"/>&nbsp;{{data.title}}
				</h3>
				<p>
					{{data.description}}
				</p>
			</div>
			
			<!-- <div>
				<h3>
					<img src="../../assets/images/help-end.png"/>&nbsp;个人版快速入门
				</h3>
				<p>
					本文档介绍了如何快速创建实例、远程连接实例、格式化数据盘等。旨在引导您一站式完成实例的创建、登录和格式化数据盘。云服务器 ECS 实例，有时候也被称为阿里云服务器、云服务器、云服务器 ECS 等。为避免引起误解，本文一律使用 云服务器 ECS 实例 这一名称，简称 实例读者对象<br />
					本文档作为快速入门参考，适用于有以下需求的读者：了解如何购买云服务器 ECS 实例远程登录实例、使用管理终端登录实例格式化和/或挂载数据盘
本文档仅适用于控制台操作。如果您是 API 用户，请参考 API 参考文档。
				</p>
			</div> -->
      	
     	</div>
  </div>
</template>
<script>
	import { helpDetail } from '@/api/help'

 	export default {
    data() {
      return {
        data: [],
      }
    },
    created() {
    	var hid = this.$route.params['hid'];
    	var params = {hid: hid,type:'4'};
        helpDetail(params).then(response => {
        	console.log(response);

        	if (response.data.lenght > 0) {
        		this.data = response.data;
        	}else {
        		alert('没有搜索结果');
        	}
        }).catch(error => {
        	console.log(error);
        });
    },
  };
	

	
</script>
<style>
	.help{
		margin:42px 0px 31px 0px ;
		background: #FFFFFF;
		border-radius: 6px;
	}
	.help-center{
		text-align: center;
		padding: 78px 0px 43px 0px;
	}
	.help-center>h2{
		margin: 0px;
		margin-bottom:60px ;
		color: #333333;
		font-size: 36px;
	}
	.help-center>.el-form--inline{
		width: 911px;
		height: 50px;
		margin: 0 auto;
	}
	.help-center>.el-form--inline>.el-form-item:nth-child(1){
		width: 821px;
		margin: 0px;
		height: 50px;
		float: left;
	}
	.help-center .el-form-item__content{
		display: block;
		height: 50px;
	}
	.help-center .el-input__inner{
		height: 50px;
		border-radius:6px 0px 0px 6px !important ;
		border-right:#FFFFFF !important;
	}
	.help-center>.el-form--inline>.el-form-item:nth-child(2){
		float: left;
		margin: 0px;
		width: 90px;
		height: 50px;
	}
	.help-center .el-button{
		width: 90px;
		height: 50px;
		border-radius:0px 6px 6px 0px !important ;
		background: #e60012;
		border-color: #e60012;
		color: #FFFFFF;
	}
	.help-sg{
		border-bottom: 1px solid #eeeeee;
		margin-top: 100px;
	}
	
	.help-rbody{
		padding: 0px 4%;
		padding-bottom: 98px;
	}
	
	.help-rbody>div>h3{
		color: #333333;
		font-size: 14px;
		font-weight:600 ;
		margin: 0px;
		margin-bottom: 25px;
	}
	
	.help-rbody>div>h3>img{
		margin-bottom: -3px;
	}
	
	.help-rbody>div>p{
		font-size: 12px;
		color: #666666;
		padding-left: 28px;
	}
	
	.help-rbody>div{
		margin-bottom: 60px;
	}
</style>


