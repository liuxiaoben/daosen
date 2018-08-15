<template>
  <div class="help">
  	<!-- <div class="help-center">
			<div class="help-sg">
				<router-link tag="div" to="/help/helpGuide">
				  <p>流程指南</p>
					<img src="../../assets/images/help-dbl.png"/>
      	</router-link>
      	<router-link tag="div" to="/help/helpProblem">
				  <p>常见问题</p>
					<img src="../../assets/images/help-dbl.png"/>
      	</router-link>
      	<router-link tag="div" class="active" to="/help/helpContact">
				  <p>联系晓道</p>
					<img src="../../assets/images/help-dbl.png"/>
      	</router-link>
      	<router-link tag="div" to="/help/HelpOther">
				  <p>其他</p>
					<img src="../../assets/images/help-dbl.png"/>
      	</router-link>
			</div>
			
  	</div> -->
      <div class="help-cbody" style="clear:both;overflow: hidden;">
      	<div>
      		<img src="../../assets/images/login_logo.png"/>
      	</div>
      	<div>
      		<h3>
      			武汉道森媒体股份有限公司
      		</h3>
      		<p>
      			<img src="../../assets/images/help-add.png"/>&nbsp;地址：武汉市硚口区解放大道1007号兴隆大厦14楼
      		</p>
      		<p>
      			<img src="../../assets/images/help-http.png"/>&nbsp;网址：www/daoseng.com
      		</p>
      		<p>
      			<img src="../../assets/images/help-p.png"/>&nbsp;电话：0731-85514433
      		</p>
      		<p>
      			<img src="../../assets/images/help-email.png"/>&nbsp;email：daoseng@163.com
      		</p>
      	</div>
      </div>
  </div>
</template>
<script>
 	export default {
    data() {
      return {
        formInline: {
          user: ''
        },
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1'
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1'
          }, {
            label: '二级 2-2'
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1'
          }, {
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleNodeClick(data) {
        console.log(data);
      }
      
    }
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
	.help-sg>div{
		display: inline-block;
		margin: 0px 90px;
		cursor:pointer;
	}
	.help-sg>div>p{
		font-size: 14px;
		color: #666666;
	}
	.help-sg>div>img{
		margin-bottom: -3px;
		opacity: 0;
	}
	.help-sg>.active>img{
		opacity: 1;
	}
	.help-sg>.active>p{
		color: #e3030e;
	}
	
	.help-cbody{
		padding-bottom: 98px;
	}
	.help-cbody>div{
		float: left;
	}
	.help-cbody>div:nth-child(1){
		width: 411px;
		height: 245px;
		border: 1px solid #d7dfe5;
		text-align: center;
		line-height: 300px;
		border-radius: 6px;
		margin-left: 6.9%;
		margin-right: 50px;
	}
	.help-cbody>div:nth-child(1)>img{
		width: 353px;
		height: 78px;
	}
	.help-cbody>div:nth-child(2)>h3{
		font-size: 18px;
		color: #2F323E;
		margin-bottom: 50px;
	}
	.help-cbody>div:nth-child(2)>p{
		height: 33px;
		line-height: 33px !important;
		font-size: 14px;
		color: #2F323E;
		margin-bottom: 15px;
	}
	.help-cbody>div:nth-child(2)>p>img{
		margin-bottom: -12px;
	}
</style>


