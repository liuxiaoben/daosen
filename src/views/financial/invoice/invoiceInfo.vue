<template>
	<div id="invoiceInfo" class="content_list">
		<el-row class="grid-item">
			<div class="grid-title marginStyle">发票信息</div>
			<el-table :data="tableData"  v-loading.body="listLoading"  element-loading-text="Loading" stripe style="width: 100%">
	    		<!-- <el-table-column  prop="cateName"  label="发票" align="center">
	    			<template slot-scope="scope">
	    				<span>{{ scope.row.cateName }}</span>
	    			</template>
	    		</el-table-column> -->
	    		<el-table-column  prop="title"  label="发票抬头">
	    		</el-table-column>
	    		<el-table-column  prop="type"  label="开具类型" >
	    			<template slot-scope="scope">
	    				<span>{{ scope.row.cate === 1 ? '个人' : '企业'}}</span>
	    			</template>
	    		</el-table-column>
	    		<el-table-column  prop="createTime"  label="发票类型" >
	    			<template slot-scope="scope">
	    				<span>{{ scope.row.type === 1 ? '增值税普票' : '增值税专票'}}</span>
	    			</template>
	    		</el-table-column>
	    		<el-table-column  prop="id"  label="操作" >
	    			<template slot-scope="scope">
						<router-link :to="'/invoice/invoiceDetail/'+ scope.row.id" type="text">详情</router-link>
						<router-link :to="'/invoice/editInvoice/'+ scope.row.id" type="text">编辑</router-link>
						<el-button type="text" @click="deleteInvoice(scope.$index,scope.row.id)">删除</el-button>
					</template>
	    		</el-table-column>
	  		</el-table>
	  		<el-col :span="20"><div class="grid-content">
	  			<router-link to="/invoice/addInvoice">
	  				<span class="add"></span> 新增发票
	  			</router-link>
	  		</div></el-col>
		</el-row>
		<el-row class="grid-item">
			<div class="grid-title">地址管理</div>
			<el-table :data="addressList" stripe style="width: 100%">
	    		<el-table-column  prop="name"  label="收件人" >
	    		</el-table-column>
	    		<el-table-column  prop="phone"  label="电话号码" >
	    		</el-table-column>
	    		<el-table-column  prop="address"  label="地址" >
	    			<template slot-scope="scope">
	    				<span>{{ scope.row.province + scope.row.city + scope.row.district + scope.row.street}}</span>
	    			</template>
	    		</el-table-column>
	    		<el-table-column  prop="zipcode"  label="邮编" >
	    		</el-table-column>
	    		<el-table-column  prop="operation"  label="操作" >
	    			<template slot-scope="scope">
						<router-link :to="'/invoice/addressDetail/'+ scope.row.invoAddId" type="text">详情</router-link>
						<router-link :to="'/invoice/addressEdit/'+ scope.row.invoAddId" type="text">编辑</router-link>
						<el-button type="text" @click="deleteAddress(scope.$index,scope.row.invoAddId)">删除</el-button>
					</template>
	    		</el-table-column>
	  		</el-table>
	  		<el-col :span="20"><div class="grid-content">
	  			<router-link to="/invoice/addAddress">
	  				<span class="add"></span> 新增地址
	  			</router-link>
	  		</div></el-col>
		</el-row>
	</div>
</template>
<script type="text/javascript">
	import { templetList, addressList, invoiceDelete, deleteAddress } from '../../../api/invoice'

	export default {
		data() {
			return {
				tableData:null,
				addressList:null,
				listLoading: true
			}
		},
		created() {
	  		templetList(this.$store.getters.token).then(response => {
	  			this.tableData = response.data
	  			this.listLoading = false
	  		}),
	  		addressList(this.$store.getters.token).then(response => {
	  			this.addressList = response.data
	  			this.listLoading = false
	  			console.log(this.addressList)
	  		})
	  	},
	  	methods: {
	  		deleteInvoice(index,id) {
	  			this.$confirm('此操作将永久删除该发票, 是否继续?', '提示', {
          			confirmButtonText: '确定',
          			cancelButtonText: '取消',
          			type: 'warning'
    			}).then(() => {
    				const templetId = {templetId:id,token:this.$store.getters.token}
		  			invoiceDelete(templetId).then(response => {
	  					this.tableData.splice(index, 1)
	  					this.$message({
						    message: '删除成功',
						    type: 'success'
						});
		  			})
    			}).catch(() => {
      				this.$message({
		            	type: 'info',
		            	message: '已取消删除'
		          	});
		        });
	  		},
	  		deleteAddress(index,id) {
	  			this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
          			confirmButtonText: '确定',
          			cancelButtonText: '取消',
          			type: 'warning'
    			}).then(() => {
    				const addressId = {addressId:id,token:this.$store.getters.token}
		  			deleteAddress(addressId).then(response => {
	  					this.addressList.splice(index, 1)
	  					this.$message({
            				type: 'success',
            				message: '删除成功!'
          				});
		  			})
    			}).catch(() => {
      				this.$message({
		            	type: 'info',
		            	message: '已取消删除'
		          	});
		        });
	  		}
	  	}
	}
</script>
<style>
	#invoiceInfo .grid-title{
		font-size:14px;
		color:#555;
		line-height:55px;
		font-weight: bold;
	}
  #invoiceInfo .marginStyle{
    line-height: 16px;
    margin-bottom: 16px;
  }
	#invoiceInfo .add{
		display: inline-block;
		width:18px;
		height:18px;
		background:url(../../../assets/images/add.png)no-repeat center;
		vertical-align: middle;
		margin:-2px 5px 0;
	}
	#invoiceInfo .grid-item:last-child{
		margin-top: 20px;
	}
</style>
