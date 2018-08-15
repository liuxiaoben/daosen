<template>
  <div class="help" style="margin:0px;">
  	<div class="help-center" style="padding-top:0px;">
		<div class="help-sg">
			<router-link tag="div" v-for="(cate, index) in rootCates" :class="{active: selectIndex == index}" to="" @click.native="selectedCate(cate, index)" :key="index">
				<p>{{ cate.name }}</p>
				<img src="../../assets/images/help-dbl.png"/>
			</router-link>
			<!-- <router-link tag="div" class="active" to="/help/helpGuide">
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
	      	<router-link tag="div" to="/help/HelpOther">
					  <p>其他</p>
						<img src="../../assets/images/help-dbl.png"/>
	      	</router-link> -->
		</div>
			
  	</div>
      <div class="help-gbody" style="clear:both;overflow: hidden;" v-if="currentCate.name != '联系晓道'">
      	<div>
	      		<el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
	      	</div>
	      	<div>
	      		<el-collapse v-model="activeNames" @change="handleChange">

						  <el-collapse-item v-for='item in listData' :key="item.id">
						  	<template slot="title">
	     						•&nbsp;{{ item.title }}
	    					</template>
						    <div>{{ item.description }}</div>
						  </el-collapse-item>
				</el-collapse>
	      	</div>
      </div>
      <div class="help-cbody" style="clear:both;overflow: hidden;" v-else>
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
	import { rootList, cateList, helpList } from '@/api/help'

 	export default {
    data() {
      return {
        formInline: {
          user: ''
        },
        rootCates: [],
        treeData: [],
        listData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
		activeNames: '1',
		selectIndex: 0,
		currentCate: null,
      }
    },
    created() {
		var params = {type: 4};
    	rootList(params).then(response => {
    		// console.log(response);
    		this.setupRootCates(response.data);
    	}).catch(error => {
    		// console.log(error);
    	});
    },
    methods: {
    	selectedCate(cate, index) {
    		this.selectIndex = index;
    		this.listData = [];
    		this.setupChildCates(cate);
    	},
      	onSubmit() {
        	console.log('submit!');
      	},
      	handleNodeClick(data) {
        	console.log('handleNodeClick', data);
        	if (data.parentId != 0) {
        	// 获取数据
        		var params = {cateId: data.helpCateId, type: 4};
        		helpList(params).then(response => {
        		// console.log(response);
        			this.listData = response.data;
        		}).catch(error => {
        		// console.log(error);
	        	});
    	    }
      	},
      	handleChange(data) {
        	console.log('handleChange', data);
      	},
      	setupTreeData(items) {
      		var tempData = [];
      		items.forEach(item => {
      			if (item.parentId == this.currentCate.helpCateId) {
      				tempData.push(item);
      			}
      		});
      	
	      	tempData.forEach(temp => {
	      		temp.children = new Array();
	      		items.forEach(item => {
	      			if (temp.helpCateId == item.parentId) {
	      				temp.children.push(item);
	      			}
	      		});
	      	});
	      	this.treeData = tempData;
      	},

      	setupRootCates(cates) {
			this.rootCates = cates.filter((cate) => {
				return cate.parentId == 0;
			}).sort((cate1, cate2) => {
	      		return cate1.helpCateId - cate2.helpCateId;
	      	});
	      	this.setupChildCates(this.rootCates[0]);
		},

		setupChildCates(cate) {
			console.log('setupChildCates',cate);
			this.currentCate = cate;
			// this.currentparentId = pid;
	    	var params = {type: 4, pid: cate.helpCateId};
	    	cateList(params).then(response => {
	    		console.log(response);
	    		this.setupTreeData(response.data);
	    	}).catch(error => {
	    		console.log(error);
	    	});
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
		margin-top: 60px;
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


