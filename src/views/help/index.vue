<template>
  <div class="help">
      <div class="help-center">
      	<h2>
      		帮助中心
      	</h2>
      	<el-form :inline="true" :model="formInline" class="demo-form-inline">
		  <el-form-item label="">
		    <!-- <el-input v-model="formInline.user" placeholder="输入关键词搜索" @change="search"></el-input> -->
		    <el-autocomplete v-model="formInline.user" placeholder="输入关键词搜索" @select="handleSelect" :trigger-on-focus="false" :fetch-suggestions="querySearch" value="title"></el-autocomplete>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="" @click="onSubmit">查询</el-button>
		  </el-form-item>
		</el-form>
      </div>
      <div>
      	<router-view></router-view>
      </div>
  </div>
</template>
<script>
	import { search, rootList } from '@/api/help'

 	export default {
	    data() {
	      return {
		        formInline: {
		          user: ''
		        },
		        restaurants: [],
		        allCates: [],
		        rootCates: [],
		    }
	    },
	    
	    created() {
	    	var params = {type: 4};
	    	rootList(params).then(response => {
	    		console.log(response);
	    		this.setupRootCates(response.data);
	    	}).catch(error => {
	    		console.log(error);
	    	});
	    },
	    methods: {
	    	setupRootCates(cates) {
	    		var tempCates = cates.filter((cate) => {
	    			return cate.parentId == 0;
	    		}).sort((cate1, cate2) => {
		      		return cate1.helpCateId - cate2.helpCateId;
		      	});
		      	this.rootCates = tempCates;
	    	},
	    	search() {
	    		console.log(this.$route);
		    	var searchParams = {key: this.formInline.user,type:'4'};
		        search(searchParams).then(response => {
		        	console.log('search',response);
		        	if (response.data.lenght > 0) {
		        		this.restaurants = response;
		        	}else {
		        		alert('没有搜索结果');
		        	}
		        }).catch(error => {
		        	console.log(error);
		        });
	    	},
	      	onSubmit() {
	      		console.log('onSubmit!');
	      		if (this.formInline.user.length > 0) {
	      			// this.$router.push({name: 'HelpResult', params: {key: this.formInline.user}});
	      			this.$router.push({name: 'HelpResult', params: {hid: item.id}});
	      		}else {
	      			alert('搜索不能为空');
	      		}
	      	},
	      	querySearch(queryString, cb) {
		        var searchParams = {key: this.formInline.user,type:'4'};
		        search(searchParams).then(response => {
		        	console.log('querySearch',response);
		        	var results = queryString ? response.data.filter(this.createFilter(queryString)) : response.data;
		        	// 调用 callback 返回建议列表的数据
		        	cb(results);
		        }).catch(error => {
		        	console.log(error);
		        });
		    },
	      	createStateFilter(queryString) {
	        	return (state) => {
	        	  	return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
	        	};
	      	},
	      	// 选择搜索结果项
	      	handleSelect(item) {
	        	console.log(item);
	        	this.$router.push({name: 'HelpResult', params: {hid: item.id}});
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
	.help-center .el-autocomplete{
		height: 50px;
		width: 821px;
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
	.help-sg{
		border-bottom: 1px solid #eeeeee;
		margin-top: 100px;
	}
	
</style>


