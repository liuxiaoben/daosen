<template>
  <div class="help">
  	<div class="help-center">
			<div class="help-sg">
				<router-link tag="div" to="/help/helpGuide">
				  <p>流程指南</p>
					<img src="../../assets/images/help-dbl.png"/>
      	</router-link>
      	<router-link tag="div" to="/help/helpProblem">
				  <p>常见问题</p>
					<img src="../../assets/images/help-dbl.png"/>
      	</router-link>
      	<router-link tag="div" to="/help/helpContact">
				  <p>联系晓道</p>
					<img src="../../assets/images/help-dbl.png"/>
      	</router-link>
      	<router-link tag="div" class="active" to="/help/HelpOther">
				  <p>其他</p>
					<img src="../../assets/images/help-dbl.png"/>
      	</router-link>
			</div>
			
  	</div>
      <div class="help-gbody" style="clear:both;overflow: hidden;">
      	<div>
      		<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      	</div>
      	<div>
      		<el-collapse v-model="activeNames" @change="handleChange">
					  <el-collapse-item>
					  	<template slot="title">
     						•&nbsp;一致性 Consistency
    					</template>
					    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
					    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
					  </el-collapse-item>
					  <el-collapse-item>
					  	<template slot="title">
     						•&nbsp;一致性 Consistency
    					</template>
					    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
					    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
					  </el-collapse-item>
					  <el-collapse-item>
					  	<template slot="title">
     						•&nbsp;一致性 Consistency
    					</template>
					    <div>简化流程：设计简洁直观的操作流程；</div>
					    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
					    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
					  </el-collapse-item>
					  <el-collapse-item>
					  	<template slot="title">
     						•&nbsp;一致性 Consistency
    					</template>
					    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
					    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
					  </el-collapse-item>
					</el-collapse>
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
        activeNames: '1',
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
      },
      handleChange(data) {

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
	.help-gbody{
		padding-bottom: 98px;
	}
	.help-gbody>div:nth-child(1){
		width: 11.6%;
		margin: 0 auto;
		float: left;
		margin-left: 3%;
		margin-right: 3%;
		border: 1px solid #e4e7ea;
		border-radius: 6px;
		box-shadow: 0px 0px 5px 5px #f7f7f7;
	}
	.help-gbody>div:nth-child(1)>.el-tree .el-tree-node__content{
		padding-left: 20px !important;
		height: 44px;
		border-bottom: 1px solid #e4e7ea;
		font-size: 14px;
		color: #555555;
	}
	
	.help-gbody>div:nth-child(1) .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover{
		background: #FFFFFF;
		color: #e60012 !important;
	}
	
	.help-gbody>div:nth-child(2){
		width: 70%;
		float: left;
		
	}
	
	.help-gbody>div:nth-child(2) .el-collapse-item__wrap{
		border-bottom: none;
	}
	.help-gbody>div:nth-child(2) .el-collapse{
		border: none;
	}
	.help-gbody>div:nth-child(2) .el-collapse-item__header{
		border: none;
		color: #333333;
		font-size: 14px;
	}
	.help-gbody>div:nth-child(2) .el-collapse-item .is-active{
		color: #e60012;
	}
	.help-gbody>div:nth-child(2) .el-collapse-item__content>div{
		padding-left: 15px;
		color: #666666;
		font-size: 12px;
	}
	
	
</style>


