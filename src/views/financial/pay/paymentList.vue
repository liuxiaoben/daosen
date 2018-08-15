<template>
  <div id="paymentList" class="content_list">
    <div class="demo-input-suffix">
      订单编号
      <el-input placeholder="请选择日期" v-model="form.code"></el-input>&nbsp;&nbsp;&nbsp;&nbsp; 服务公司
      <el-select v-model="form.tenantId" placeholder="请选择服务公司">
        <el-option v-for="item in companies" :key="item.tenant_id" :label="item.name" :value="item.tenant_id"></el-option>
      </el-select>&nbsp;&nbsp;&nbsp;&nbsp; 时间
      <el-date-picker v-model="form.beginTime" :editable="false" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期"></el-date-picker> -
      <el-date-picker v-model="form.endTime" :editable="false" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期"></el-date-picker>
      <el-button type="danger" @click="search" size="small" style="margin-left: 10px;">搜索</el-button>
      <el-button type="primary" @click="dialogFormVisible2 = true" size="small" :disabled="payButtonAble">批量申请付款</el-button>
    </div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="40">
      </el-table-column>
      <el-table-column prop="code" label="订单编号">
      </el-table-column>
      <el-table-column prop="tenantName" label="服务公司">
      </el-table-column>
      <el-table-column prop="lastMoney" label="订单金额">
      </el-table-column>
      <el-table-column prop="payMoney" label="已付金额">
      </el-table-column>
      <el-table-column prop="name" label="未付金额">
        <template slot-scope="scope">
          {{ scope.row.lastMoney - scope.row.payMoney }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
      </el-table-column>
      <el-table-column prop="name" label="操作" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <router-link to="/financial/paymentDetail">详情</router-link> -->
          <el-button size="small" type="text" @click="details(scope.row.id)">详情</el-button>
          <el-button size="small" type="text" @click="dialogFormVisible1 = true">申请付款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-wrap fyfy fystyle" v-if="total" align="right">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="pageNum" @current-change="handleCurrentChange" @prev-click="handlePrevClick" @next-click="handleNextClick">
      </el-pagination>
    </div>

    <!-- 弹窗 -->
    <el-dialog title="申请付款" :visible.sync="dialogFormVisible1" class="applyPayDialog">
      <el-row>
        <el-col>
          <span>订单编号：</span>A000152
        </el-col>
        <el-col>
          <span>应付款：</span>1000.00
        </el-col>
      </el-row>
      <el-form ref="form" :model="form" label-width="80px" label-position="left">
        <el-form-item label="付款金额">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="付款时间">
          <el-date-picker v-model="form.date1" :editable="false" type="date" placeholder="请选择日期" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="付款方式">
          <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 100%">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="具体信息">
          <el-input type="textarea" :rows="2" placeholder="请输入具体信息" v-model="form.name">
          </el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="danger" @click="dialogFormVisible1 = false">确 定</el-button>
        <el-button type="info" @click="dialogFormVisible1 = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script scoped>
import { payList, myBindForSelect } from "@/api/financial";

export default {
    data() {
        return {
            pageNum: 1,
            pageSize: 10,
            total: null,

            form: {
                code: null,
                beginTime: null,
                endTime: null,
                tenantId: null
            },
            multipleSelection: [], // 选中批量付款的信息
            tableData: [],
            companies: [],
            dialogFormVisible1: false,
            dialogFormVisible2: false,
            labelPosition: "top"
        };
    },
    created() {
        this.search();

        myBindForSelect()
            .then(response => {
                this.companies = response.data.sort((itemA, itemB) => {
                    return itemA.isDefault - itemB.isDefault;
                });
            })
            .catch(error => {});
    },
    computed: {
        payButtonAble() {
            return !this.multipleSelection.length;
        }
    },
    methods: {
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
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
            payList(this.pageNum, this.pageSize, this.form)
                .then(response => {
                    this.tableData = response.data.list;
                    this.total = response.data.total;
                })
                .catch(error => {});
        },
        details(id) {
            this.$router.push({
                name: "PaymentDetail",
                params: {
                    id: id
                }
            });
        },
        save() {}
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#paymentList .content_list {
    padding: 34px 27px 30px 48px;
}
#paymentList .demo-input-suffix{
  margin-bottom: 20px;
}
#paymentList .demo-input-suffix .el-input {
    width: 150px !important;
    margin-bottom: 20px;
}
.shou .el-dialog {
    width: 750px;
}

/* 弹窗--申请付款 */
.applyPay .el-dialog {
    width: 750px;
    border-radius: 5px;
}

.applyPay .el-dialog__header {
    background-color: #f9f9f9;
    padding: 20px 30px;
    border-bottom: 1px solid #e3e8e9;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
.applyPay .el-dialog__header .el-dialog__title {
    font-weight: 800;
}
.applyPay .el-dialog__body {
    padding: 30px;
}
.applyPay .el-dialog__footer {
    border-top: 1px solid #ecf1f2;
    margin-left: 0;
    text-align: left;
    font-size: 14px;
    padding: 11px 30px;
}
.applyPay .el-dialog__footer button {
    border-color: #e60012;
    font-size: 14px;
}
.applyPay .el-dialog__footer button:nth-child(3) {
    background: #c1cad7;
    border-color: #c1cad7;
    color: #fff;
}

/* 申请付款 */
#paymentList .applyPayDialog .el-dialog {
    width: 750px;
    border-radius: 5px;
}

#paymentList .applyPayDialog .el-dialog__header {
    background-color: #f9f9f9;
    padding: 20px 30px;
    border-bottom: 1px solid #e3e8e9;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
#paymentList .applyPayDialog .el-dialog__header .el-dialog__title {
    font-weight: 800;
}
#paymentList .applyPayDialog .el-dialog__body {
    padding: 30px;
    .el-row .el-col{
      margin-bottom: 10px;
      span{
        font-weight: bold;
      }
    }
    .el-form {
      margin-top: 20px;
        .el-form-item {
            margin-bottom: 20px;
            .el-form-item__content {
                line-height: 20px;
            }
        }
    }
}

#paymentList .applyPayDialog .el-dialog__footer {
    border-top: 1px solid #ecf1f2;
    margin-left: 0;
    text-align: left;
    font-size: 14px;
    padding: 11px 30px;
}
</style>
