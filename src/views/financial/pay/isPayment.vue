<template>
  <div id="isPayment" class="content_list">
    <div class="demo-input-suffix">
      订单编号
      <el-input v-model="form.code" placeholder="请选择日期"></el-input>&nbsp;&nbsp;&nbsp;&nbsp; 服务公司
      <el-select v-model="form.tenantId" placeholder="请选择服务公司">
        <el-option v-for="item in companies" :key="item.tenant_id" :label="item.name" :value="item.tenant_id"></el-option>
      </el-select>&nbsp;&nbsp;&nbsp;&nbsp; 时间
      <el-date-picker v-model="form.beginTime" :editable="false" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期"></el-date-picker> -
      <el-date-picker v-model="form.endTime" :editable="false" type="date" value-format="yyyy-MM-dd" placeholder="请选择日期"></el-date-picker>
      <el-button type="danger" @click="dialogFormVisible = true" size="small" style="margin-left: 10px;">搜索</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="selection" width="40">
      </el-table-column>
      <el-table-column prop="code" label="订单编号">
      </el-table-column>
      <el-table-column prop="tenantName" label="服务公司">
      </el-table-column>
      <el-table-column prop="lastAllMoney" label="订单金额">
      </el-table-column>
      <el-table-column prop="payAllMoney" label="已付金额">
      </el-table-column>
      <el-table-column prop="name" label="未付金额">
        <template slot-scope="scope">
          {{ scope.row.lastAllMoney - scope.row.payAllMoney }}
        </template>
      </el-table-column>
      <el-table-column prop="payMoney" align="center" label="申请付款">
      </el-table-column>
      <el-table-column prop="createTime" align="center" label="申请时间">
      </el-table-column>
      <el-table-column prop="statusName" align="center" label="状态">
      </el-table-column>
      <el-table-column prop="operation" align="center" label="操作" width="250">
        <template slot-scope="scope" class="fksqczcz">
          <el-button type="text" size="mini" @click="detail(scope.row.orderApId)">详情</el-button>
          <el-button type="text" size="mini" @click="edit(scope.row.orderApId)" v-show="isShow(scope.row.status)">编辑</el-button>
          <el-button type="text" size="mini" @click="submit(scope.row.orderApId)" v-show="isShow(scope.row.status)">提交</el-button>
          <el-button type="text" size="mini" @click="delete(scope.row.orderApId)" v-show="isShow(scope.row.status)">删除</el-button>
          <el-button type="text" size="mini" @click="detail(scope.row.orderApId)" v-show="isShow(scope.row.status)">作废</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="fystyle">
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="pageNum" @current-change="handleCurrentChange" @prev-click="handlePrevClick" @next-click="handleNextClick">
      </el-pagination>
    </div>
  </div>
</template>

<script scoped>
import { paidList, myBindForSelect } from "@/api/financial";

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
            tableData: [],
            companies: [],
            multipleSelection: [],
            formLabelWidth: "120px"
        };
    },
    created() {
        paidList(this.pageNum, this.pageSize, this.form)
            .then(response => {
                this.tableData = response.data.list;
                this.total = response.data.total;
            })
            .catch(error => {});

        myBindForSelect()
            .then(response => {
                this.companies = response.data.sort((itemA, itemB) => {
                    return itemA.isDefault - itemB.isDefault;
                });
            })
            .catch(error => {});
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
        isShow(status) {
            // 待审核状态
            if (status == 2) {
                return false;
            }

            // 已付款状态
            if (status == 5) {
                return false;
            }

            // 待提交，作废隐藏；未通过，删除隐藏

            return true;
        },
        detail(id) {
            this.$router.push({
                name: "PaymentDetail",
                params: {
                    id: id,
                    isPaid: true
                }
            });
        }
    }
};
</script>

<style>
#isPayment .el-input {
    width: 160px !important;
    margin-bottom: 29px;
}
.fksqczcz {
}
#isPayment .fystyle .el-pagination button {
    width: 45px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    margin: 0px !important;
    background: #ffffff !important;
    border: 1px solid #edf1f5;
    border-radius: 0px !important;
}

#isPayment .fystyle .el-pagination button span {
    display: block;
    height: 45px;
    line-height: 45px;
    color: #8e9eaa;
    font-size: 12px;
}

#isPayment .fystyle .el-pagination .el-pager .number {
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

#isPayment .fystyle .el-pagination .el-pager .active {
    background: #edf1f5 !important;
    color: #40b6ff;
}

#isPayment .fystyle .el-pagination .el-pager .el-icon-more {
    margin: 7px 5px;
}
</style>
