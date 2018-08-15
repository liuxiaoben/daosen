<template>
  <div class="xt">
    <p class="title">操作日志</p>
    <div class="xt-body">
      <el-form :inline="true" :model="formInline" class="inlineForm">
        <el-form-item label="菜单">
          <el-input v-model="formInline.objName" placeholder="输入菜单"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="formInline.uname" placeholder="输入账号"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" class="time">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择时间" v-model="formInline.startTime" :editable="false" format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col style="text-align:center;padding-left:7px;" class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择时间" v-model="formInline.endTime" :editable="false" format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item style="margin-left:10px;margin-right:0;">
          <el-button type="danger" size="small" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>

      <template>
        <el-table :data="tableData" stripe style="width: 100%" class="czrzta">
          <el-table-column prop="objName" label="菜单" width="120">
          </el-table-column>
          <el-table-column prop="uname" label="账号" width="120">
          </el-table-column>
          <el-table-column prop="createTime" label="操作时间">
          </el-table-column>
          <el-table-column prop="remark" label="操作内容">
          </el-table-column>
          <el-table-column prop="" label="关联数据">
          </el-table-column>
        </el-table>
      </template>

      <div v-if="total" class="page-wrap  fystyle" align="right" style="margin-top: 30px;">
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="pageNum" :prev-text="prevText" :next-text="nextText" @current-change="handleCurrentChange">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
import { systemLogList } from "../../api/system";
export default {
    data() {
        return {
            formInline: {
                objName: "",
                uname: "",
                startTime: "",
                endTime: ""
            },

            tableData: [],
            pageNum: 1,
            pageSize: 10,
            total: 0,
            prevText: "<",
            nextText: ">",
            pre: false,
            next: false
        };
    },
    created() {
        this.getList(this.formInline);
    },
    methods: {
        onSubmit() {
            //console.log('submit!');
            this.pageNum = 1;
            this.getList(this.formInline);
        },
        getList(search) {
            if (search.objName) {
                this.formInline.objName = search.objName;
            }
            if (search.uname) {
                this.formInline.uname = search.uname;
            }
            if (search.startTime) {
                this.formInline.startTime = search.startTime;
            }
            if (search.endTime) {
                this.formInline.endTime = search.endTime;
            }
            systemLogList(
                this.pageNum,
                this.pageSize,
                this.$store.getters.token,
                this.formInline.objName,
                this.formInline.uname,
                this.formInline.startTime,
                this.formInline.endTime
            ).then(response => {
                this.tableData = response.data.list;
                this.total = response.data.total;
                this.pageNum = response.data.pageNum;
                this.pageSize = response.data.pageSize;
                this.pre = response.data.hasPreviousPage;
                this.next = response.data.hasNextPage;
            });
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getList(this.formInline);
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.xt-body {
    padding: 20px 40px;
}


.xt-body .inlineForm {
    .el-input{
      width: 160px;
    }
    .time .el-input__inner{
      width: 160px;
    }
}



.xt-body .el-form-item__label {
    color: #555555;
}

.xt-body .qd {
    background: #e60012;
    border-color: #e60012;
    color: #ffffff;
    font-size: 14px;
    margin-top: 2px;
    padding: 9px 20px;
}

.xt-body .cell {
    padding-left: 30px;
}

.czrzta {
    font-size: 12px;
}

.xt .fystyle .el-pagination button {
    width: 45px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    margin: 0px !important;
    background: #ffffff !important;
    border: 1px solid #edf1f5;
    border-radius: 0px !important;
}

.xt .fystyle .el-pagination button span {
    display: block;
    height: 45px;
    line-height: 45px;
    color: #8e9eaa;
    font-size: 12px;
}

.xt .fystyle .el-pagination .el-pager .number {
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

.xt .fystyle .el-pagination .el-pager .active {
    background: #edf1f5 !important;
    color: #40b6ff;
}

.xt .fystyle .el-pagination .el-pager .el-icon-more {
    margin: 7px 5px;
}
</style>
