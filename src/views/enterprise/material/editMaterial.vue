<template>
	<div class="newsucaizy">
		<p class="title">
       		修改素材
       	</p>
       	<div class="newsucai-body">
       		<el-form ref="form"  label-width="80px">
			  <el-form-item label="活动名称">
			    <el-input v-model="material.name" ></el-input>
			  </el-form-item>
			  <el-form-item label="素材地址">
			  	<div class="newsucai-dz">
			    	<el-input v-model="material.url" ></el-input><a href="#">预览</a>
			    </div>
			  </el-form-item>
			  <el-form-item label="素材预览图">
			  	<div class="newsucai-img">
			    	<img v-bind:src="material.url"/>
			    </div>
			  </el-form-item>
			  <el-form-item>
			  	<div class="newsucai-an">
				    <el-button @click="onSubmit">确定</el-button>
				    <el-button @click="cancel">取消</el-button>
			    </div>
			  </el-form-item>
			</el-form>
       	</div>
	</div>
</template>

<script>
import { mlibEdit } from '../../../api/material'
import { mlibDetail } from '../../../api/material'
	export default {
    data() {
      return {
        form: {
          name: '',
          address: '',

        },
         material:{},
      }
    },
    created(){
       var materialID=this.$route.params.materialID;
         mlibDetail(this.$store.getters.token,materialID).then(response => {
                  if(response.msgCode =="1000" && response.data){
                      this.material=response.data.material;
                  }
        })
    },
    methods: {
      onSubmit() {
          var name=this.material.name;
          var url=this.material.url;
          var materialID=this.$route.params.materialID;
          mlibEdit(this.$store.getters.token,name,url,materialID).then(response => {
                 if(response.msgCode =="1000"){
                     this.$router.push('/enterprise/material');
                 }else{
                    alert("修改失败");
                 }

		  })
      },
      cancel:function(){
        this.$router.push('/enterprise/material');
      }
    }
  }
</script>

<style>
	.el-container>.el-main{
		background: #FFFFFF;
		border-radius: 6px;
		padding: 0px;
	}

	/* .newsucai-title{
		height: 53px;
		line-height: 54px;
		padding: 0px 33px;
		font-size: 14px;
		color: #666666 !important;
		border-bottom: 1px solid #eeeeee;
		text-align: left;
	} */

	.newsucai-body{
		padding: 30px;
		min-height: 530px;
	}

	.newsucai-body .el-form-item__label{
		text-align: left;
		width: 80px !important;
		padding: 0px !important;
	}

	.newsucai-body .el-form{
		width: 587px;
	}

	.newsucai-dz{
		text-align: left;
	}

	.newsucai-dz .el-input{
		width: 413px;
	}

	.newsucai-dz>a{
		width: 75px;
		height: 35px;
		background: #c1cad7;
		color: #FFFFFF;
		display: inline-block;
		margin-left: 13px;
		line-height: 35px;
		text-align: center;
		border-radius: 6px;
	}

	.newsucai-img{
		text-align: left;
	}

	.newsucai-img>img{
		width: 230px;
		height: 146px;
	}

	.newsucai-an{
		text-align: left;
	}

	.newsucai-an>.el-button--default:nth-child(1){
		width: 81px;
		height: 32px;
		border-color: #e60012;
		padding: 0px;
		text-align: center;
		line-height: 32px;
		background: #e60012;
		color: #FFFFFF;
	}

	.newsucai-an>.el-button--default:nth-child(2){
		width: 81px;
		height: 32px;
		border-color: #c1cad7;
		padding: 0px;
		text-align: center;
		line-height: 32px;
		background: #c1cad7;
		color: #FFFFFF;
	}
</style>
