<template>
	<div id="invoiceFor">
		<el-row>
		  <el-col :span="24"><div class="grid-big-title">发票索取</div></el-col>
		</el-row>
		<el-form ref="form" :model="form" label-width="80px">
			<div class="bg-gray">
				<el-form-item label="发票信息">
					<el-select v-model="form.infoId" placeholder="请选择发票信息">
						<el-option v-for="item in templetList" :key="item.id" :label="item.title" :value="item.id">
							抬头：{{item.title}}（{{item.typeName}}）
						</el-option>
					</el-select>
					<span class="tips">
						<span class="tips_item">
							当前没有发票信息，请<router-link to="/">&nbsp;&nbsp;&nbsp;&nbsp;新增</router-link>
						</span>
					</span>
				</el-form-item>
				<el-form-item label="发票地址">
					<el-select v-model="form.addId" placeholder="请选择发票地址">
						<el-option v-for="item in addressList" :key="item.invoAddId" :label="item.provinceName + item.cityName + item.districtName + item.zipcode" :value="item.invoAddId"></el-option>
					</el-select>
					<span class="tips">
						<span class="tips_item">
							当前没有地址信息，请<router-link to="/">&nbsp;&nbsp;&nbsp;&nbsp;新增</router-link>
						</span>
					</span>
				</el-form-item>
				<el-form-item label="发票备注">
					<el-input v-model="form.remark"></el-input>
				</el-form-item>
			</div>
			<div class="pad-top" v-for="(item, index) in list" :key="index">
      <el-row>
        <el-col :span="24"><div class="grid-title bor-left">道森传媒</div></el-col>
      </el-row>
			<el-row v-for="order in item.shows" :key="order.orderApId">
				<el-col :span="4">
					<div class="grid-content">订单编号：<span>{{order.code}}</span></div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content">总金额：<span>{{order.lastAllMoney}}</span></div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content">已付金额：<span>{{order.payMoney}}</span></div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content">可开票金额：<span>{{order.invoiceMoney}}</span></div>
				</el-col>
				<el-col :span="4">
					<el-form-item label="开票金额">
						<el-input @change="inputMoney(order)" v-model="order.inputMoney" placeholder="请输入"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			</div>
			<el-row class="pad-top">
				<el-button type="danger" @click="save()">保存</el-button>
				<el-button type="primary" @click="submit()">提交</el-button>
				<el-button @click="cancel()">取消</el-button>
			</el-row>
		</el-form>
	</div>
</template>

<script type="text/javascript">
import { detailInvoice, invoiceShow, addInvoice, saveInvoice } from "@/api/financial";
import { templetList, addressList } from "@/api/invoice";
export default {
  data() {
    return {
      tableData: [],
      form: {
        infoId: "",
        addId: "",
        remark: "",
      },

      money: null,

      list: [],
      addressList: [],
      templetList: [],
      invoiceDetails: [],
    };
  },
  created() {
    templetList(this.$store.getters.token).then(response => {
        this.templetList = response.data;
    });
	
    addressList(this.$store.getters.token).then(response => {
      this.addressList = response.data;
    });

    this.orderIds.forEach((id, index) => {
      var item = {
        id: id,
        detail: {},
        shows: [],
        invoiceJson: [],
      };
      this.list[index] = item;

      invoiceShow({ orderId: id})
        .then(response => {
          item.shows = response.data;
        })
        .catch(error => {});

      detailInvoice({invApplyId: id }).then(response => {
        item.detail = response.data;
      });
    });
  },
  computed: {
    orderIds() {
      return this.$route.params.orderIds;
    }
  },
  methods: {
    inputMoney(order) {
      // console.log(order);
      this.$nextTick(() => {
        this.list.forEach(item => {
          item.shows.forEach((od, index) => {
            if(od == order) {
              item.invoiceJson[index] = {
                orderApId: order.orderApId,
                money: order.inputMoney,
              }
            }
          });
        });
      });
    },
    save() {
      var count = 0;

      var params = this.form;
      this.list.forEach(item => {
        params.orderId = item.id;
        params.invoiceJson = JSON.stringify(item.invoiceJson);
        console.log(params);
        addInvoice(params).then(response => {
          count++;
        }).catch(error => {});
      });

      if(count == this.list.length ) {
        this.$message({
          type: 'success',
          message: '保存成功!'
        });
      }
    },
    submit() {
      var count = 0;
      var params = this.form;
      this.list.forEach(item => {
        params['orderId'] = item.id;
        params['invoiceJson'] = JSON.stringify(item.invoiceJson);
        saveInvoice(params).then(response => {
          count++;
        }).catch(error => {});
      });

      if(count == this.list.length ) {
        this.$message({
          type: 'success',
          message: '保存成功!'
        });
      }
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
#invoiceFor .grid-item {
  padding: 23px 0px 30px;
  margin: 0 35px !important;
  border-bottom: 1px solid #e4e7ea;
}
#invoiceFor .grid-item:last-child {
  border: none;
}
#invoiceFor .grid-title {
  font-size: 14px;
  color: #555;
  line-height: 55px;
  font-weight: bold;
}
#invoiceFor .grid-content {
  font-size: 14px;
  color: #555555;
  line-height: 40px;
}
#invoiceFor .grid-content span {
  color: #34a3e8;
  font-weight: bold;
}
#invoiceFor .el-table {
  text-align: center;
}
#invoiceFor .grid-content a {
  color: #e60011;
  font-weight: bold;
}
#invoiceFor .bg-gray {
  background: #fafafa;
  padding: 25px 20px 1px;
}
#invoiceFor .el-form {
  padding: 20px 37px 80px 33px;
}
#invoiceFor .el-input {
  width: 350px;
}
#invoiceFor .bg-gray .el-select,
#invoiceFor .bg-gray .el-input {
  width: 500px;
}
#invoiceFor .tips {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  background: url(../../../assets/images/tips.png) no-repeat center;
  margin-left: 10px;
  padding-right: 30px;
}
#invoiceFor .tips_item {
  position: absolute;
  left: 30px;
  top: -24px;
  display: block;
  width: 190px;
  height: 62px;
  border: 1px solid #dbe0e3;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
  padding: 5px 25px;
  text-align: center;
  line-height: 25px;
  display: none;
}
#invoiceFor .tips:hover .tips_item {
  display: block;
}
#invoiceFor .bor-left {
  padding-left: 16px;
  position: relative;
}
#invoiceFor .bor-left:after {
  content: "";
  display: block;
  width: 6px;
  height: 14px;
  position: absolute;
  left: 0;
  top: 20px;
  background: #e60012;
}
#invoiceFor button {
  line-height: 9px;
}
#invoiceFor .pad-top {
  padding-top: 40px;
  border-top: 1px solid #e4e7ea;
  margin-top: 21px;
}
</style>
                                                                                         
