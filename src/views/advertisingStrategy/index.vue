<template>
  <div id="advertisingStrategy">
    <!-- tab -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="广告策略" name="first">
        <span slot="label" class="adSpan">广告策略</span>
        <!-- 表单控件 -->
        <el-row class="adForm">
          <el-form ref="form" :model="form" class="demo-form-inline" :inline="true">
            <el-form-item label="策略名称" class="stName">
              <el-input v-model="form.title" placeholder="输入策略名称"></el-input>
            </el-form-item>
            <el-form-item label="计划时间" class="plan">
              <el-col :span="11">
                <el-date-picker v-model="form.beginDate" type="datetime" :editable="false"  placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align:center;padding-left:7px;">-</el-col>
              <el-col :span="11">
                <el-date-picker v-model="form.endDate" type="datetime" :editable="false" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="行业" class="industry">
              <el-input v-model="form.industryName" placeholder="输入行业名称"></el-input>
            </el-form-item>
            <el-form-item label="品牌" class="brand">
              <el-input v-model="form.brand" placeholder="输入品牌名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" size="small" @click="onSubmit">搜索</el-button>
            </el-form-item>
            <el-form-item class="newStrategy">
              <el-button type="primary" size="small" @click="newStrategy()"> + 新建策略</el-button>
            </el-form-item>
            <div class="clear"></div>

          </el-form>
        </el-row>
        <!-- 广告策略主体内容 -->

        <div class="main_list">
          <div class="main_list_info" v-for="list in tableData" :key="list.id">
            <span class="title">{{ list.title }}</span>
            <span class="sign">{{ list.ename }}</span>
            <p>联系人：
              <span>{{ list.linkman }}</span> 联系方式：
              <span>{{ list.phone }}</span> 行业：
              <span>{{ list.industryName }}</span> 品牌：
              <span>{{ list.brand }}</span> 订单：
              <span>10</span> 投放预算：
              <span>{{ list.budget }}</span> 投放计划时间：
              <span>{{ list.beginDate }} - {{ list.endDate }}</span>
            </p>
            <p>描述：
              <span>{{ list.remark }}</span>
            </p>
            <!-- 详情按钮 -->
            <el-col :span="1" class="stDetail">
              <el-button type="info" plain size="mini" @click="advertisingStrategyDatail(list)">详情</el-button>
              <!-- 下拉菜单  -->
            </el-col>
            <el-dropdown class="others">
              <span class="el-dropdown-link">
                ...
              </span>
              <el-dropdown-menu slot="dropdown" class="othersContent">
                <el-dropdown-item>
                  <el-button type="text" size="small" @click="editor(list)">编辑</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" size="small" @click="dele(list.strId)">删除</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" size="small"> 复制</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" size="small"> 生成订单</el-button>
                </el-dropdown-item>
                </el-dropdown-item>
                <el-dropdown-item class="push">
                  <el-button type="text" size="small" @click="dialogVisible = true">推送服务公司</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

          <!-- 弹框--推送服务公司 -->
          <el-dialog title="选择服务公司" :visible.sync="dialogVisible">
            <el-row>
              <el-col :span="12" class="dialogInfo">
                <h3>选择服务公司</h3>
                <p>选择服务公司选择服务公司选择服务公司选择服务公司选择服务公司选择服务公司选择服务公司选择服务公司选择服务公司选择服务公司选择服务公司</p>
              </el-col>
              <el-col :span="12" class="serviceSompany">
                <el-row>
                  <h3>服务公司</h3>
                </el-row>
                <el-row>
                  <el-form ref="form" :model="form">
                    <el-form-item>
                      <el-checkbox-group v-model="form.type">
                        <el-row :gutter="30" class="check">
                          <el-col :span="12">
                            <label>
                              <img src="../../assets/images/03.png" alt="">
                              <el-checkbox label="道森媒体1" name="type"></el-checkbox>
                            </label>
                          </el-col>
                          <el-col :span="12">
                            <label>
                              <img src="../../assets/images/03.png" alt="">
                              <el-checkbox label="道森媒体2" name="type"></el-checkbox>
                            </label>
                          </el-col>
                          <el-col :span="12">
                            <label>
                              <img src="../../assets/images/03.png" alt="">
                              <el-checkbox label="道森媒体3" name="type"></el-checkbox>
                            </label>
                          </el-col>
                          <el-col :span="12">
                            <label>
                              <img src="../../assets/images/03.png" alt="">
                              <el-checkbox label="道森媒体4" name="type"></el-checkbox>
                            </label>
                          </el-col>
                        </el-row>

                      </el-checkbox-group>
                    </el-form-item>
                  </el-form>
                </el-row>
              </el-col>
            </el-row>

            <span slot="footer" class="dialog-footer">
              <el-button type="danger" @click="dialogVisible = false">确 定</el-button>
              <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="fyfy fystyle" v-if="total">
          <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="pageNum" @current-change="handleCurrentChange">
          </el-pagination>
        </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>




<script>
//引入封装
import { policyList, delList } from "../../api/advertisingStrategy";
export default {
    data() {
        return {
            activeName: "first",
            value1: "",
            value2: "",
            dialogVisible: false,
            //定义需要传入的参数，这些参数是搜索的条件
            pageSize: 4, //一页里面展示多少条数据
            pageNum: 1, //传入的页数，第一页
            tableData: [],

            form: {
                title: "",
                beginDate: "",
                endDate: "",
                brand: "",
                industryName: ""
            },
            total: null
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        //广告策略详情
        advertisingStrategyDatail(list) {
            this.$router.push({
                path: "/advertisingStrategyDatail",
                query: { strId: list.strId }
            });
        },
        //策略编辑
        editor(list) {
            this.$router.push({
                path: "/editorStrategyDatail",
                query: { strId: list.strId }
            });
        },
        //新建策略
        newStrategy() {
            this.$router.push("/newStrategy");
        },

        //业务逻辑
        //查询
        onSubmit() {
            const policyListToken = {
                token: this.$store.getters.token,
                title: this.form.title,
                beginDate: this.form.beginDate,
                endDate: this.form.endDate,
                brand: this.form.brand,
                industryName: this.form.industryName
            };
            policyList(policyListToken, this.pageNum, this.pageSize)
                .then(response => {
                    this.tableData = [];
                    this.tableData = response.data.list;
                    console.log(this.tableData);
                    (this.total = response.data.total), //总的信息数量
                        (this.pageNum = response.data.pageNum), //页码
                        (this.pageSize = response.data.pageSize), //每一页页码的信息数量
                        (this.pre = response.data.hasPreviousPage), //上一页
                        (this.next = response.data.hasNextPage); //下一页
                    this.listLoading = false;
                })
                .catch(() => {
                    this.loading = false;
                });
        },
        //翻页
        handleCurrentChange(val) {
            this.pageNum = val;
            if (
                //这里用了或的逻辑运算符，如果不加的话，必须要把所有的条件填完，才能去查找，加了的话，只要输入一个，就按照这一个条件去查找，其他的为空
                this.form.title ||
                this.form.beginDate ||
                this.form.endDate ||
                this.form.brand ||
                this.form.industryName
            ) {
                const policyListToken = {
                    token: this.$store.getters.token,
                    title: this.form.title,
                    beginDate: this.form.beginDate,
                    endDate: this.form.endDate,
                    brand: this.form.brand,
                    industryName: this.form.industryName
                };
                this.getadclue(policyListToken);
            } else {
                const policyListToken = { token: this.$store.getters.token };
                this.getadclue(policyListToken);
            }
        },
        //查询后翻页
        getadclue(policyListToken) {
            console.log(this.pageNum);
            console.log(this.pageSize);
            //调用初始化列表方法
            this.createdList();
        },
        //删除信息
        dele(id) {
            this.strId = id;
            this.$confirm("请确认是否删除策略信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                delList({
                    totoken: this.$store.getters.token,
                    strId: this.strId
                }).then(response => {
                    if (response.msgCode == "1000") {
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        //调用初始化列表方法
                        this.createdList();
                    } else {
                        this.$message.error("删除失败");
                    }
                });
            });
        },
        //封装初始化
        createdList() {
            //初始化列表
            const policyListToken = { token: this.$store.getters.token };
            console.log(policyListToken);
            policyList(policyListToken, this.pageNum, this.pageSize)
                .then(response => {
                    this.tableData = [];
                    this.tableData = response.data.list;
                    console.log(this.tableData);
                    (this.total = response.data.total), //总的信息数量
                        (this.pageNum = response.data.pageNum), //页码
                        (this.pageSize = response.data.pageSize), //每一页页码的信息数量
                        (this.pre = response.data.hasPreviousPage), //上一页
                        (this.next = response.data.hasNextPage); //下一页
                    this.listLoading = false;
                })
                .catch(() => {
                    this.loading = false;
                });
        }
    },
    //钩子函数
    created() {
        //调用初始化列表方法
        this.createdList();
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
#advertisingStrategy {
    max-width: 1710px;
    min-width: 900px;
    margin-top: 30px;
    height: 820px;
    border-radius: 5px;
    background-color: #fff;
}
#advertisingStrategy .adSpan {
    margin-left: 30px;
    width: 55px;
    color: #e3030e;
}
#advertisingStrategy .el-tabs__active-bar {
    margin-left: 30px;
    background-color: #e3030e;
    width: 55px !important;
    height: 9px;
    background: url(../../assets/images/tab_active2.png) no-repeat center;
}
#advertisingStrategy .el-tabs__nav-scroll {
    height: 57px;
    line-height: 57px;
}

/* form表单控件 */
#advertisingStrategy .adForm {
    margin: 10px auto;
    padding: 0 30px;
    position: relative;
}
#advertisingStrategy .el-input {
    width: 120px;
}
#advertisingStrategy .plan .el-input {
    width: 160px;
}
#advertisingStrategy .adForm .newStrategy {
    float: right;
}
.clear {
    clear: both;
}
/* 广告策略主体内容  */
.main_list {
    padding: 0 30px;
}
.main_list_info {
    font-size: 12px;
    border-bottom: 2px solid #edf0f5;
    line-height: 30px;
    padding: 15px 0 20px;
    position: relative;
}
.main_list_info > .title {
    font-weight: 700;
    margin-right: 10px;
    line-height: 40px;
}
.main_list_info span {
    margin-right: 30px;
}
.main_list_info > .sign {
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    background-color: #ff4452;
    color: #fdffff;
    border-radius: 8px;
    padding: 5px;
}
.main_list_info > p {
    padding-right: 100px;
}
/* 详情按钮 */
.main_list_info .el-button--info span {
    margin: 0;
    font-size: 12px;
}
.main_list_info .el-button--info {
    text-align: center;
    border: none;
    background-color: #fff;
}
.main_list_info .el-button--info.is-plain:active,
.main_list_info .el-button--info.is-plain:hover {
    background-color: #fff;
    color: #ff4452;
}
.main_list_info .stDetail {
    position: absolute;
    top: 30px;
    right: 40px;
}

/* 下拉菜单 */
#advertisingStrategy .main_list_info .el-dropdown {
    position: absolute;
    padding-right: 0;
    top: 20px;
    right: -20px;
}
#advertisingStrategy .main_list_info .el-dropdown .el-dropdown-link {
    font-size: 30px;
    font-weight: 900;
}
#advertisingStrategy .others .el-dropdown-link:focus,
#advertisingStrategy .others .el-dropdown-link:hover {
    color: #e60012;
}
.othersContent {
    border-radius: 5px;
    .el-dropdown-menu__item {
        line-height: 30px;
        // font-size: 12px;
        width: 134px;
        padding: 0;
        .el-button--text {
            color: #666;
            z-index: 3000;
            padding: 0 30px;
            padding-right: 100%;
        }
    }
    .el-dropdown-menu__item:focus,
    .el-dropdown-menu__item:not(.is-disabled):hover {
        background-color: #fff6f6;
    }
    .el-dropdown-menu__item:focus .el-button--text,
    .el-dropdown-menu__item:not(.is-disabled):hover .el-button--text {
        color: #e60012;
        font-weight: bold;
    }
}

// 复选框样式
#advertisingStrategy .el-checkbox__input.is-checked .el-checkbox__inner,
#advertisingStrategy .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #fff;
    border-color: #ccc;
}
#advertisingStrategy .el-checkbox__inner:hover,
#advertisingStrategy .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #ccc;
}
#advertisingStrategy .el-checkbox__inner::after {
    border-color: #e60012;
}
#advertisingStrategy .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #e60012;
}

/* 弹窗--推送服务公司 */
#advertisingStrategy .el-dialog {
    width: 750px;
    border-radius: 5px;
}
#advertisingStrategy .el-dialog .el-dialog__header {
    background-color: #f9f9f9;
    padding: 20px 30px;
    border-bottom: 1px solid #e3e8e9;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
#advertisingStrategy .el-dialog .el-dialog__header .el-dialog__title {
    font-weight: 800;
}
#advertisingStrategy .el-dialog .el-dialog__body {
    padding: 30px;
}
#advertisingStrategy .el-dialog__body .dialogInfo {
    padding-right: 15px;
}
#advertisingStrategy .serviceSompany {
    padding-left: 15px;
}
#advertisingStrategy .el-dialog h3 {
    font-weight: 800;
    margin-bottom: 10px;
}
#advertisingStrategy .el-dialog p {
    font-size: 12px;
}
#advertisingStrategy .serviceSompany .check {
    margin-bottom: 30px;
}
#advertisingStrategy .serviceSompany .check .el-col-12:nth-child(2n) {
    margin-bottom: 0;
}
#advertisingStrategy .el-dialog .el-checkbox {
    margin-bottom: 10px;
}
#advertisingStrategy .serviceSompany .el-checkbox__label {
    font-weight: 800;
}
#advertisingStrategy .el-dialog .el-form-item__content {
    line-height: 20px;
}
#advertisingStrategy .el-dialog .serviceSompany img {
    border: 1px solid #eee;
    padding: 10px;
    border-radius: 5px;
}
#advertisingStrategy .el-dialog__footer {
    border-top: 1px solid #ecf1f2;
    margin-left: 0;
    text-align: left;
    padding: 11px 30px;
}

/* 页码 */
#advertisingStrategy .fyfy {
    margin-top: 33px;
    margin-bottom: 50px;
    text-align: right;
}
#advertisingStrategy .fystyle .el-pagination {
    padding: 2px 30px;
}

#advertisingStrategy .fystyle .el-pagination button {
    width: 45px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    margin: 0px !important;
    background: #ffffff !important;
    border: 1px solid #edf1f5;
    border-radius: 0px !important;
}

#advertisingStrategy .fystyle .el-pagination button span {
    display: block;
    height: 45px;
    line-height: 45px;
    color: #8e9eaa;
    font-size: 12px;
}

#advertisingStrategy .fystyle .el-pagination .el-pager .number {
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

#advertisingStrategy .fystyle .el-pagination .el-pager .active {
    background: #edf1f5 !important;
    color: #40b6ff;
}

#advertisingStrategy .fystyle .el-pagination .el-pager .el-icon-more {
    margin: 7px 5px;
}
</style>
