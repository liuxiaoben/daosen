<template>
	<div id="invoiceDetail">
		<el-row>
		  <el-col :span="24"><div class="grid-big-title">发票详情</div></el-col>
		</el-row>
		<el-row :gutter="10" class="grid-item">
			<el-col :span="20"><div class="grid-title">基本信息</div></el-col>
      <el-col :span="5"><div class="grid-content"><span>订单编号：</span>{{invoiceDetail.order.order.code}}</div></el-col>
			<el-col :span="5"><div class="grid-content"><span>订单金额：</span>{{invoiceDetail.order.order.money}} </div></el-col>
			<el-col :span="5"><div class="grid-content"><span>订单来源：</span>{{invoiceDetail.order.order.orderTypeName}} </div></el-col>
			<el-col :span="5"><div class="grid-content"><span>已付款：</span>{{invoiceDetail.order.order.payMoney}}  </div></el-col>
			<el-col :span="5"><div class="grid-content"><span>代理公司：</span>{{invoiceDetail.order.order.tenantName}} </div></el-col>
			<el-col :span="5"><div class="grid-content"><span>企业联系人：</span>{{invoiceDetail.order.order.linkman}} </div></el-col>
			<el-col :span="5"><div class="grid-content"><span>联系电话：</span>{{invoiceDetail.order.order.phone}} </div></el-col>
			<el-col :span="5"><div class="grid-content"><span>品牌：</span> {{invoiceDetail.order.order.brand}}  </div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>创建时间：</span>{{invoiceDetail.order.order.createTime}}</div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>服务公司：</span>{{invoiceDetail.order.order.ename}} </div></el-col>
		</el-row>
    <el-row :gutter="10" class="grid-item">
			<el-col :span="20"><div class="grid-title">策略</div></el-col>
      <el-col :span="5"><div class="grid-content"><span>联系人：</span>{{ invoiceDetail.order.strategy.linkname}}</div></el-col>
      <el-col :span="5"><div class="grid-content"><span>行业：</span>{{ invoiceDetail.order.strategy.industryName }}</div></el-col>
      <el-col :span="5"><div class="grid-content"><span>电话：</span>{{ invoiceDetail.order.strategy.phone}}</div></el-col>
      <el-col :span="5"><div class="grid-content"><span>标题：</span>{{ invoiceDetail.order.strategy.title }}</div></el-col>
      <el-col :span="5"><div class="grid-content"><span>创建时间：</span>{{ invoiceDetail.order.strategy.createTime }}</div></el-col>
		</el-row>

    <el-row :gutter="10" class="grid-item">
			<el-col :span="20"><div class="grid-title">订单列表</div></el-col>
      <el-table :data="invoiceDetail.pays" stripe style="width: 100%">
          <el-table-column  prop="bankcode"  label="银行号" >
          </el-table-column>
          <el-table-column  prop="bankName"  label="开户行" >
          </el-table-column>
          <el-table-column  prop="commonCode"  label="通用号" >
          </el-table-column>
          <el-table-column  prop="fullName"  label="全称" >
          </el-table-column>
          <el-table-column  prop="money"  label="金额" >
          </el-table-column>
          <el-table-column  prop="payTime"  label="支付时间">
          </el-table-column>
          <el-table-column  prop="statusName"  label="状态">
          </el-table-column>
          <el-table-column  prop="remark"  label="备注">
          </el-table-column>
          <el-table-column  prop="operation"  label="操作" width="200">
            <template slot-scope="scope">
            <el-button type="text" size="mini" @click="detail(scope.row.invApplyId)" >详情</el-button>
          </template>
          </el-table-column>
        </el-table>
      </el-row>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import { payOrderDetail } from "@/api/financial";
export default {
  name: "tradingDetail",
  data() {
    return {
      listLoading: true,
      invoiceDetail: {
        order: {
          order: {
            code: null,
          },
          strategy: {},
        },
        pays: [],
      },
      tableData: [],
    };
  },
  created() {
    this.invoiceInfo();
    this.listLoading = false;
  },
  computed: {
    ...mapGetters(["token"])
  },
  methods: {
    invoiceInfo() {
      const id = this.$route.params.orderId;
      payOrderDetail({orderId: id }).then(response => {
        this.invoiceDetail = response.data;
      });
    }
  }
};
</script>

<style type="text/css">
#invoiceDetail .grid-item {
  padding: 23px 0px 30px;
  margin: 0 35px !important;
  border-bottom: 1px solid #e4e7ea;
}
#invoiceDetail .grid-item:last-child {
  border: none;
}
#invoiceDetail .grid-title {
  font-size: 14px;
  color: #555;
  line-height: 55px;
  font-weight: bold;
}
#invoiceDetail .grid-content {
  font-size: 12px;
  color: #555555;
  line-height: 31px;
}
#invoiceDetail .grid-content span {
  color: #8e9eaa;
}
v.el-table {
  text-align: center;
}
#invoiceDetail .grid-content a {
  color: #e60011;
  font-weight: bold;
}
</style>
                                                                                         
                                     
