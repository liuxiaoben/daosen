<template>

	<div id="invoiceAsk" class="content_list">
		<div class="demo-input-suffix">
		  	订单编号
		  	<el-input placeholder="请输入方案名称" v-model="form.code"></el-input>
		  	<!-- 合同编号
		  	<el-input placeholder="请输入内容" v-model="input2"></el-input>&nbsp;&nbsp;&nbsp;&nbsp; -->
		    <el-button type="danger" @click="search()" size="small" style="margin-left: 10px;">搜索</el-button>
        <el-button type="primary" @click="openInvoices()" size="small" :disabled="buttonAble">批量申请开票</el-button>
		</div>
		<el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
			  <el-table-column  type="selection"  width="40">
		    </el-table-column>
    		<el-table-column  prop="code"  label="订单编号"  width="180">
    		</el-table-column>
    		<!-- <el-table-column  prop="time"  label="合同编号"  width="180">
    		</el-table-column> -->
    		<el-table-column  prop="lastAllMoney"  label="总金额">
    		</el-table-column>
    		<el-table-column  prop="payAllMoney"  label="已付款金额">
    		</el-table-column>
    		<el-table-column  prop="invoucedMoney"   label="可开票金额">
    		</el-table-column>
    		<el-table-column  prop="operation"   label="操作">
    			<template slot-scope="scope">
            <el-button type="text" size="mini" @click="detail(scope.row.orderId)" >详情</el-button>
            <el-button type="text" size="mini" @click="openInvoice(scope.row.orderId)" >申请开票</el-button>
					  <!-- <router-link to="detail(scope.row.orderId)">详情</router-link>
					  <router-link to="/invoice/invoiceFor">申请开票</router-link> -->
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

import { mapGetters } from "vuex";
import { askInvoiceList } from "@/api/financial";
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: null,

      form: {
        code: null,
      },

      input2: "",
      tableData: [],
      multipleSelection: []
    };
  },
  created() {
	  this.search();
  },
  computed: {
	  ...mapGetters(["token"]),
    buttonAble() {
      return !this.multipleSelection.length;
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
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
      askInvoiceList(this.pageNum, this.pageSize, this.form).then(response => {
      this.tableData = response.data.list;
      this.total = response.data.total;
	  }).catch(error => {});
    },
    detail(id) {
      this.$router.push({
        name: "InvoiceAskDetail",
        params: {
          orderId: id,
        }
      });
    },
    openInvoice(id) {
      var ids = [id];
      this.$router.push({
        name: "InvoiceFor",
        params: {
          orderIds: ids,
        }
      });
    },
    openInvoices() {

      var ids = new Array();
      this.multipleSelection.forEach(item => {
        ids.push(item.orderId);
      });

      this.$router.push({
        name: "InvoiceFor",
        params: {
          orderIds: ids,
        }
      });
    }
  }
};
</script>

<style>
#invoiceAsk .el-input {
  width: 160px !important;
  margin-bottom: 29px;
}

#invoiceAsk .fystyle .el-pagination button {
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  margin: 0px !important;
  background: #ffffff !important;
  border: 1px solid #edf1f5;
  border-radius: 0px !important;
}

.fystyle .el-pagination button span {
  display: block;
  height: 45px;
  line-height: 45px;
  color: #8e9eaa;
  font-size: 12px;
}

.fystyle .el-pagination .el-pager .number {
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

.fystyle .el-pagination .el-pager .active {
  background: #edf1f5 !important;
  color: #40b6ff;
}

.fystyle .el-pagination .el-pager .el-icon-more {
  margin: 7px 5px;
}
</style>
