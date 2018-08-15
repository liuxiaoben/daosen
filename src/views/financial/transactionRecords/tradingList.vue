<template>
	<div id="tradingList" class="content_list">
		<div class="demo-input-suffix">
		  	订单编号
		  	<el-input placeholder="请输入方案名称" v-model="params.code"></el-input>&nbsp;&nbsp;&nbsp;&nbsp;
		  	<!-- 合同号
		  	<el-input placeholder="请输入内容" v-model="input2"></el-input>&nbsp;&nbsp;&nbsp;&nbsp; -->
		  	服务公司
        <el-select v-model="params.tenantId" placeholder="请选择服务公司">
          <el-option v-for="item in companies" :key="item.tenant_id" :label="item.name" :value="item.tenant_id"></el-option>
        </el-select>&nbsp;&nbsp;&nbsp;&nbsp;
		  	时间
		  	<el-date-picker v-model="params.beginTime" :editable="false" type="date" value-format="yyyy-MM-dd"  placeholder="请选择日期"></el-date-picker> -
		    <el-date-picker v-model="params.endTime" :editable="false" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期"></el-date-picker>
			<el-button type="danger" @click="search" size="small" style="margin-left: 10px;">搜索</el-button>
		</div>
		<el-table :data="tableData" stripe style="width: 100%">
    		<el-table-column  prop="code"  label="流水号">
    		</el-table-column>
    		<el-table-column  prop="createTime"  label="创建时间">
    		</el-table-column>
    		<el-table-column  prop="orderTypeName"  label="方案">
    		</el-table-column>
    		<!-- <el-table-column  prop="contract"  label="合同" >
    		</el-table-column> -->
    		<el-table-column  prop="tenantName"  label="代理公司">
    		</el-table-column>
    		<el-table-column  prop="money"  label="总金额" >
    		</el-table-column>
    		<el-table-column  prop="payMoney"  label="本次支付">
    		</el-table-column>
    		<el-table-column  prop="remaining_amount"  label="剩余支付">
				<template slot-scope="scope">
					{{ scope.row.money - scope.row.payMoney }}
				</template>
    		</el-table-column>
    		<el-table-column  prop="operation"  label="操作" >
    			<template slot-scope="scope">
					<el-button size="small" type="text" @click="details(scope.row.orderId)">详情</el-button>
				</template>
    		</el-table-column>
  		</el-table>
		<div class="page-wrap fyfy fystyle"  v-if="total" align="right">
			<el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="pageNum" @current-change="handleCurrentChange" @prev-click="handlePrevClick" @next-click="handleNextClick">
            </el-pagination>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import { orderList, myBindForSelect } from "@/api/financial";

export default {
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: null,

      params: {
        beginTime: null,
        endTime: null,
        code: null,
        tenantId: null
      },

      tableData: [],
      companies: [],
    };
  },
  created() {
    this.setupData();

    myBindForSelect().then(response => {
      this.companies = response.data.sort((itemA, itemB) => {
        return itemA.isDefault - itemB.isDefault;
      });
    }).catch(error => {});
  },
  computed: {
    ...mapGetters(["token"])
  },
  methods: {
    setupData() {
      this.params["token"] = this.token;
      orderList(this.pageNum, this.pageSize, this.params)
        .then(response => {
          this.tableData = response.data.list;
          this.total = response.data.total;
        })
        .catch(error => {});
    },
    search() {
      this.setupData();
    },
    details(id) {
      this.$router.push({
        name: "TradingDetail",
        params: {
          id: id
        }
      });
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
    }
  }
};
</script>

<style scoped>
#tradingList .content_list {
  padding: 34px 27px 30px 48px;
}
#tradingList .el-input {
  width: 160px !important;
  margin-bottom: 29px;
}
</style>
