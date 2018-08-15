<template>
	<div id="invoiceDetail">
		<el-row>
		  <el-col :span="24"><div class="grid-big-title">发票详情</div></el-col>
		</el-row>
		<el-row :gutter="10" class="grid-item">
			<el-col :span="20"><div class="grid-title">基本信息</div></el-col>
      <el-col :span="24"><div class="grid-content"><span>开具类型：</span>{{ invoiceDetail.apply.openTypeName}}</div></el-col>
      <el-col :span="24"><div class="grid-content"><span>发票抬头：</span>{{ invoiceDetail.apply.title }}</div></el-col>
      <el-col :span="24"><div class="grid-content"><span>发票类型：</span>{{ invoiceDetail.apply.invTypeName}}</div></el-col>
      <el-col :span="24"><div class="grid-content"><span>时间：</span>{{ invoiceDetail.apply.createTime }}</div></el-col>
      <el-col :span="24"><div class="grid-content"><span>状态：</span>{{ invoiceDetail.apply.statusName }}</div></el-col>
      <el-col :span="24"><div class="grid-content"><span>发票备注：</span>{{ invoiceDetail.apply.remark }}</div></el-col>
		</el-row>
    <el-row :gutter="10" class="grid-item">
			<el-col :span="20"><div class="grid-title">邮寄地址</div></el-col>
      <el-col :span="24"><div class="grid-content"><span>收件人：</span>{{ invoiceDetail.apply.openTypeName}}</div></el-col>
      <el-col :span="24"><div class="grid-content"><span>所在地区：</span>{{ invoiceDetail.title }}</div></el-col>
      <el-col :span="24"><div class="grid-content"><span>街道地址：</span>{{ invoiceDetail.type ==1?'增值税普通发票':'增值税专用发票'}}</div></el-col>
      <el-col :span="24"><div class="grid-content"><span>邮政编码：</span>{{ invoiceDetail.affairNum }}</div></el-col>
      <el-col :span="24"><div class="grid-content"><span>手机号：</span>{{ invoiceDetail.affairNum }}</div></el-col>
		</el-row>

    <el-row :gutter="10" class="grid-item">
			<el-col :span="20"><div class="grid-title">开票订单</div></el-col>
      <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column  prop="invApplyId"  label="订单编号" >
          </el-table-column>
          <el-table-column  prop="money"  label="服务公司" >
          </el-table-column>
          <el-table-column  prop="title"  label="订单金额" >
          </el-table-column>
          <el-table-column  prop="typeName"  label="开票金额" >
          </el-table-column>
          <el-table-column  prop="createTime"  label="创建时间" >
          </el-table-column>
          <el-table-column  prop="statusName"  label="状态">
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
import { detailInvoice } from "@/api/financial";
export default {
  name: "tradingDetail",
  data() {
    return {
      listLoading: true,
      invoiceDetail: {
        apply: {
          openTypeName: "",
          title: "",
          invTypeName: "",
          createTime: "",
          statusName: "",
          remark: "",
        },
        details: [],
        orders: [],
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
      const id = this.$route.params.invApplyId;
      detailInvoice({invApplyId: id }).then(response => {
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
                                                                                         
                                     
