<template>
	<div id="paymentDetail">
		<el-row>
		  <el-col :span="24"><div class="grid-big-title">交易详情</div></el-col>
		</el-row>
		<el-row :gutter="10" class="grid-item">
			<el-col :span="20"><div class="grid-title">订单信息</div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>订单编号：</span>{{order.code}}</div></el-col>
			<el-col :span="5"><div class="grid-content"><span>订单金额：</span>{{order.money}} </div></el-col>
			<el-col :span="5"><div class="grid-content"><span>订单来源：</span>{{order.orderTypeName}} </div></el-col>
			<el-col :span="5"><div class="grid-content"><span>已付款：</span>{{order.payMoney}}  </div></el-col>
			<el-col :span="5"><div class="grid-content"><span>代理公司：</span>{{order.tenantName}} </div></el-col>
			<el-col :span="5"><div class="grid-content"><span>企业联系人：</span>{{order.linkman}} </div></el-col>
			<el-col :span="5"><div class="grid-content"><span>联系电话：</span>{{order.phone}} </div></el-col>
			<el-col :span="5"><div class="grid-content"><span>品牌：</span> {{order.brand}}  </div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>创建时间：</span>{{order.createTime}}</div></el-col>
		  	<el-col :span="5"><div class="grid-content"><span>服务公司：</span>{{order.ename}} </div></el-col>
		</el-row>
		<el-row :gutter="10" class="grid-item">
			<el-col :span="20"><div class="grid-title">合同信息</div></el-col>
			<el-table :data="tableData" stripe style="width: 100%">
	    		<el-table-column  prop="serial"  label="合同编号" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="time"  label="合同名称" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="plan"  label="合同金额" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="contract"  label="签约时间" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="operation"  label="操作" align="center">
	    			<template slot-scope="scope">
						<el-button type="text">详情</el-button>
						<!-- <router-link to="">合同详情</router-link> -->
					</template>
	    		</el-table-column>
	  		</el-table>
		</el-row>
		<el-row :gutter="10" class="grid-item" v-if="isPaid">
			<el-col :span="20"><div class="grid-title">发票信息</div></el-col>
			<el-table :data="invoiceInfos" stripe style="width: 100%">
	    		<el-table-column  prop="money"  label="发票金额" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="title"  label="发票抬头" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="openTypeName"  label="发票性质" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="createTime"  label="时间" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="statusName"  label="状态" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="total_amount"  label="发票备注" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="operation"  label="操作" align="center">
	    			<template slot-scope="scope">
						<el-button type="text">详情</el-button>
						<!-- <router-link to="">方案详情</router-link> -->
					</template>
	    		</el-table-column>
	  		</el-table>
		</el-row>
		<el-row class="grid-item" v-if="isPaid">
			<el-col :span="20"><div class="grid-title">付款记录</div></el-col>
			<el-table :data="payInfos" stripe style="width: 100%">
	    		<el-table-column  prop="payTime"  label="申请时间" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="money"  label="申请金额" align="center">
	    		</el-table-column>
				<el-table-column  prop="payTypeName"  label="申请方式" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="statusName"  label="状态" align="center">
	    		</el-table-column>
				<el-table-column  prop="remark"  label="备注" align="center">
	    		</el-table-column>
	    		<el-table-column  prop="operation"  label="操作" align="center">
	    			<template slot-scope="scope">
						<!-- orderApId -->
						<el-button type="text">详情</el-button>
					</template>
	    		</el-table-column>
	  		</el-table>
		</el-row>

		<el-row class="grid-item" v-if="isPaid">
			<el-col :span="20"><div class="grid-title">资源使用情况</div></el-col>
			<el-row v-for="item in tableData" :key="item.id">
				<el-col :span="24" class="dynamicInfo">
					<div class="fll" v-for="item in mediums" :key="item.id">
					  <p style="line-height: 24px"><span>2018-05-12 10:30</span> - <span>2018-05-12 10:30</span> 使用资源总数 {{item.num}} 个，金额 {{item.money}} 元</p>
					</div>
				</el-col>
        </el-row>
		</el-row>
		<el-row type="flex" class="row-bg" justify="space-between" v-if="isPaid">
			<el-col :span="24"><div class="grid-content bg-purple-light" style="margin-top:40px" align="center"><el-button @click="dialogFormVisible = true">付款申请</el-button></div></el-col>
		</el-row>

		<!-- 弹窗 -->
	<el-dialog title="申请付款" :visible.sync="dialogFormVisible" class="applyPay">
		<el-form :model="form">
			<el-form-item label="活动名称">
				<el-input v-model="form.name" placeholder="请输入活动名称"></el-input>
			</el-form-item>
			<el-form-item label="活动区域">
				<el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<div slot="footer">
			<el-button type="danger" @click="save">保 存</el-button>
			<el-button type="danger" @click="dialogFormVisible = false">确 定</el-button>
			<el-button type="info" @click="dialogFormVisible = false">取 消</el-button>
		</div>
	</el-dialog>
	</div>
</template>

<script type="text/javascript">
import { mapGetters } from "vuex";
import {
  orderDetail,
  payInfo,
  selectedMedium,
  invoiceInfo
} from "@/api/financial";

export default {
  name: "tradingDetail",
  data() {
    return {
			dialogFormVisible: false,

			form:{
				name: "",
				region: "",
			},

      order: {},
      payInfos: [],
      mediums: [],
      invoiceInfos: [],
      tableData: []
    };
  },
  created() {
    var params = { orderId: this.orderId, token: this.token };
    orderDetail(params)
      .then(response => {
        this.order = response.data.order;
      })
      .catch(error => {});

    payInfo(params)
      .then(response => {
        this.payInfos = response.data;
      })
      .catch(error => {});

    selectedMedium(params)
      .then(response => {
        this.mediums = response.data;
      })
      .catch(error => {});

    invoiceInfo(params)
      .then(response => {
        this.invoiceInfos = response.data;
      })
      .catch(error => {});
  },
  computed: {
    ...mapGetters(["token", "uid"]),
    orderId() {
      return this.$route.params.id;
		},
		isPaid() {
			return !this.$route.params.isPaid;
		}
	},
	methods: {
		save() {}
	}
};
</script>

<style scoped>
/* #paymentDetail .grid-big-title {
  font-size: 14px;
  color: #555555;
  line-height: 54px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e4e7ea;
  position: relative;
  padding: 0 30px;
} */
/*.grid-big-title:before{
		content: '';
		position: absolute;
		display: block;
		bottom:0;
		left:-20px;
		width:102.5%;
		height:1px;
		background:#e4e7ea;
	}*/
#paymentDetail .grid-item {
  padding: 23px 0px 30px;
  margin: 0 35px !important;
  border-bottom: 1px solid #e4e7ea;
}
#paymentDetail .grid-item:nth-child(4) {
  border: none;
}
#paymentDetail .grid-title {
  font-size: 14px;
  color: #555;
  line-height: 55px;
  font-weight: bold;
}
#paymentDetail .grid-content {
  font-size: 12px;
  color: #555555;
  line-height: 31px;
}
#paymentDetail .grid-content span {
  color: #8e9eaa;
}
#paymentDetail .el-button {
  text-align: center;
  margin: 0 auto;
}
#paymentDetail .grid-content a {
  color: #e60011;
  font-weight: bold;
}

</style>


