<template>
	<div id="invoiceList" class="content_list">
		<div class="demo-input-suffix">
		  	发票号
		  	<el-input placeholder="请输入发票号" v-model="form.code"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
		  	<!-- 方案名
		  	<el-input placeholder="请输入内容" v-model="input2"></el-input>&nbsp;&nbsp;&nbsp;&nbsp; -->
		  	时间
		  	<el-date-picker v-model="form.time" :editable="false" type="date" value-format="yyyy-MM-dd"  placeholder="请选择日期"></el-date-picker>&nbsp;&nbsp;&nbsp;&nbsp;
		  	状态
		  	<el-select v-model="form.status" placeholder="请选择">
					<el-option label="全部"  value=""></el-option>
			    <el-option  v-for="item in options"  :key="item.value"  :label="item.label"  :value="item.value">
			    </el-option>
			</el-select>
			<el-button type="danger" @click="search" size="small" style="margin-left: 10px;">搜索</el-button>
		</div>
		<el-table :data="tableData" stripe style="width: 100%">
    		<el-table-column  prop="invApplyId"  label="发票号" >
    		</el-table-column>
    		<el-table-column  prop="money"  label="发票金额" >
    		</el-table-column>
    		<el-table-column  prop="title"  label="发票抬头" >
    		</el-table-column>
    		<el-table-column  prop="typeName"  label="发票性质" >
    		</el-table-column>
    		<el-table-column  prop="createTime"  label="时间" >
    		</el-table-column>
    		<el-table-column  prop="statusName"  label="状态">
    		</el-table-column>
    		<el-table-column  prop="remark"  label="发票备注">
    		</el-table-column>
    		<el-table-column  prop="operation"  label="操作" width="200">
    			<template slot-scope="scope">
					<el-button type="text" size="mini" @click="detail(scope.row.invApplyId)" >详情</el-button>
					<el-button type="text" size="mini" @click="edit(scope.row.invApplyId)" >编辑</el-button>
					<el-button type="text" size="mini" @click="submit(scope.row.invApplyId)" >提交</el-button>
					<el-button type="text" size="mini" @click="invalid(scope.row.invApplyId)" >作废</el-button>
				</template>
    		</el-table-column>
  		</el-table>
		<div class="fystyle">
			<el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="pageNum" @current-change="handleCurrentChange" @prev-click="handlePrevClick" @next-click="handleNextClick">
			</el-pagination>
		</div>
	</div>
</template>

<script>

import { invoiceList, invoiceApplyStatus, deleteInvoice, checkInvoice, cancelInvoice } from "@/api/financial";

export default {
	data() {
	    return {
				pageNum: 1,
				pageSize: 10,
				total: null,

				form: {
					code: null,
					status: "",
					time: null,
				},

		    tableData: [],
				options: [],
				value: ''
	    }
		},
		created() {
			this.search();

			invoiceApplyStatus().then(response => {
				this.options = response.data;
			}).catch(error => {});
		},
		methods: {
			handleCurrentChange(val) {
				this.pageNum = val;
				this.setupData();
			},
			handleNextClick(val) {
				console.log("handleNextClick" + val);
			},
			handlePrevClick(val) {
				console.log("handlePrevClick" + val);
			},
			search() {
				invoiceList(this.pageNum, this.pageSize, this.form).then(response => {
					this.tableData = response.data.list;
					this.total = response.data.total;
				}).catch(error => {});
			},
			detail(id) {
				this.$router.push({
					name: "InvoiceDetail",
					params: {
						invApplyId: id,
					}
				});
			},
			edit(id) {},
			submit(id) {
				checkInvoice({invApplyIds:id}).then(res => {

				});
			},
			invalid(id) {
				cancelInvoice({invApplyIds:id}).then(res => {

				});
			},
		}
}
</script>

<style>
	#invoiceList .el-input{
		width:160px!important;
		margin-bottom: 29px;
	}
	.fystyle .el-pagination button{
    width: 45px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    margin: 0px !important;
    background: #ffffff !important;
    border: 1px solid #edf1f5;
    border-radius: 0px !important;
  }

  .fystyle .el-pagination button span{
    display: block;
    height: 45px;
    line-height: 45px;
    color: #8e9eaa;
    font-size: 12px;
  }

  .fystyle .el-pagination .el-pager .number{
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

  .fystyle .el-pagination .el-pager .active{
    background: #edf1f5 !important;
    color: #40b6ff;
  }

  .fystyle .el-pagination .el-pager .el-icon-more{
    margin: 7px 5px;
  }
</style>
