<template>
    <div id="adOrder">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="first">
                <span slot="label" class="orderSpan">广告订单</span>
                <!-- count -->
                <el-row class="orderCount">
                    <!-- 输入框组 -->
                    <el-form ref="form" :model="form" :inline="true" class="demo-form-inline">
                        <el-form-item label="订单编号">
                            <el-input v-model="form.code" placeholder="输入订单编号"></el-input>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <el-col :span="11">
                                <el-date-picker v-model="form.beginTime" type="datetime" :editable="false" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2" style="text-align: center;padding-left:4px;">-</el-col>
                            <el-col :span="11">
                                <el-date-picker v-model="form.endTime" type="datetime" :editable="false" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="form.status" placeholder="请选择状态">
                                <el-option v-for="item in orderStaus" :key="item.value" :id="item.id" :label="item.label" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="策略">
                            <el-select v-model="form.strategy" placeholder="请选择策略">
                                <el-option v-for="item in strategySel" :key="item.value" :id="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="服务公司">
                            <el-select v-model="form.tenantId" placeholder="请选择服务公司">
                                <el-option v-for="item in serverComy" :key="item.value" :id="item.id" :label="item.name" :value="item.tenant_id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" size="small" style="margin-top:2px;" @click="searchOrder">搜索</el-button>
                        </el-form-item>
                    </el-form>
                </el-row>
                <!-- nav -->
                <el-row class="orderNav">
                    <el-col :span="4" class="orderCenter">订单内容</el-col>
                    <el-col :span="4" class="orderCenter">关联策略</el-col>
                    <el-col :span="3" class="orderCenter">订单金额</el-col>
                    <el-col :span="3" class="orderCenter">已付款</el-col>
                    <el-col :span="3" class="orderCenter">服务公司</el-col>
                    <el-col :span="3" class="orderCenter">创建方式</el-col>
                    <el-col :span="4" class="orderCenter">操作</el-col>
                </el-row>
                <!-- counttext -->
                <el-row class="countText" v-for="list in tableData" :key="list.id">
                    <el-row class="countTextSpan">
                        <span style="margin-left:10px;">创建时间：{{ list.createTime }}</span>&nbsp;&nbsp;
                        <span class="confirm">{{ list.statusName }}</span>
                        <!-- <span class="confirm" :class="(list.status==1 ||list.status==2 ||list.status==3)?'red':((list.status==4||type==5)?"blue":"grey")">{{ list.statusName }}</span> -->
                    </el-row>
                    <el-row class="countTextNext">
                        <el-col :span="4" class="Next">{{ list.code }}</el-col>
                        <el-col :span="4" class="Next">{{ list.strategyName }}1</el-col>
                        <el-col :span="3" class="Next moneyStyle">￥{{ list.money }}</el-col>
                        <el-col :span="3" class="Next moneyStyle">￥{{ list.payMoney }}</el-col>
                        <el-col :span="3" class="Next">{{ list.tenantName }}</el-col>
                        <el-col :span="3" class="Next">{{ list.orderTypeName }}</el-col>
                        <!-- 待提交 -->
                        <el-col :span="4" class="Nextlatst" v-if="list.status==1">
                            <el-button type="info" plain size="mini" @click="orderDetails(list)">详情</el-button>
                            <el-button type="info" plain size="mini" @click="editOrder(list.orderId)">编辑</el-button>
                            <el-button type="info" plain size="mini" @click="submit(list.orderId)">提交</el-button>
                            <el-button type="info" plain size="mini" @click="del(list.orderId)">删除</el-button>
                        </el-col>
                        <!-- 待审核 -->
                        <el-col :span="4" class="Nextlatst" v-else-if="list.status==2">
                            <el-button type="info" plain size="mini" @click="orderDetails(list)">详情</el-button>
                        </el-col>
                        <!-- 审核通过 -->
                        <el-col :span="4" class="Nextlatst" v-else-if="list.status==3">
                            <el-button type="info" plain size="mini" @click="orderDetails(list)">详情</el-button>
                        </el-col>
                        <!-- 拒绝 -->
                        <el-col :span="4" class="Nextlatst" v-else-if="list.status==4">
                            <el-button type="info" plain size="mini" @click="orderDetails(list)">详情</el-button>
                            <el-button type="info" plain size="mini" @click="editOrder(list.orderId)">编辑</el-button>
                            <el-button type="info" plain size="mini" @click="submit(list.orderId)">提交</el-button>
                            <el-button type="info" plain size="mini" @click="del(list.orderId)">删除</el-button>
                        </el-col>
                        <!-- 分配跟进 -->
                        <el-col :span="4" class="Nextlatst" v-else-if="list.status==5">
                            <el-button type="info" plain size="mini" @click="orderDetails(list)">详情</el-button>
                        </el-col>
                        <!-- 待确定 -->
                        <el-col :span="4" class="Nextlatst" v-else-if="list.status==6">
                            <el-button type="info" plain size="mini" @click="orderDetails(list)">详情</el-button>
                            <el-button type="info" plain size="mini" @click="orderDetails(list.orderId)">同意</el-button>
                            <el-button type="info" plain size="mini" @click="orderDetails(list.orderId)">拒绝</el-button>
                        </el-col>
                        <!-- 确定 -->
                        <el-col :span="4" class="Nextlatst" v-else-if="list.status==7">
                            <el-button type="info" plain size="mini" @click="orderDetails(list)">详情</el-button>
                        </el-col>
                        <!-- 待发布 -->
                        <el-col :span="4" class="Nextlatst" v-else-if="list.status==8">
                            <el-button type="info" plain size="mini" @click="orderDetails(list)">详情</el-button>
                        </el-col>
                        <!-- 发布完成 -->
                        <el-col :span="4" class="Nextlatst" v-else-if="list.status==9">
                            <el-button type="info" plain size="mini" @click="orderDetails(list)">详情</el-button>
                            <el-button type="info" plain size="mini" @click="orderDetails(list.orderId)">广告效果</el-button>
                        </el-col>
                    </el-row>
                </el-row>

                <div class="fyfy fystyle" v-if="total">
                    <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="pageNum" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { orderlist, listOrderStatus, listselect, myBind, delOrder, subOrders } from "../../api/order";

export default {
    data() {
        return {
            activeName: "first",
            value1: "",
            orderStaus: [],
            strategySel: [],
            serverComy: [],
            tableData: [],
            form: {
                code: "",
                beginTime: "",
                endTime: "",
                status: "",
                strategy: "",
                tenantId: ""
            },
            pageNum: 1,
            pageSize: 4,
            total: null,
        };
    },
    methods: {
         // 获取订单列表
        orderlists() {
            const sendData = Object.assign({},{token: this.$store.getters.token}, this.form )
            orderlist(sendData, this.pageNum, this.pageSize) .then(response => {
                this.tableData = response.data.list;
                this.total = response.data.total;
                this.pageNum = response.data.pageNum;
                this.pageSize = response.data.pageSize;
                this.pre = response.data.hasPreviousPage;
                this.next = response.data.hasNextPage;
            });
        },

        //翻页
        handleCurrentChange(val) {
            this.pageNum = val;
            this.orderlists();
        },

        //订单详情
        orderDetails(list) {
            this.$router.push({
                path: "/orderDetails",
                query: { orderId: list.orderId }
            });
        },

        //修改订单
        editOrder(id) {
            this.$router.push({
                path: "/editOrder",
                query: { orderId: id }
            });
        },


        //搜索
        searchOrder() {
            if (this.form.code || this.form.beginTime || this.form.endTime || this.form.status || this.form.strategy || this.form.tenantId ) {
                this.orderlists();
            } else {
                this.$message.warning("请输入搜索条件");
            }
        },

        //提交订单
        submit(id) {
            this.orderId = id;
            this.$confirm("请确认是否提交订单信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                subOrders({
                    totoken: this.$store.getters.token,
                    orderId: this.orderId
                }).then(response => {
                    if (response.msgCode == "1000") {
                        this.orderlists()
                        this.$message.success("提交成功");
                    } else {
                        this.$message.error("提交失败");
                    }
                });
            });
        },

        //删除订单
        del(id) {
            this.orderId = id;
            this.$confirm("请确认是否删除订单信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                delOrder({
                    totoken: this.$store.getters.token,
                    orderId: this.orderId
                }).then(response => {
                    if (response.msgCode == "1000") {
                        this.orderlists();
                        this.$message.success('删除成功!');
                    } else {
                        this.$message.error("删除失败");
                    }
                });
            });
        },

        handleClick(tab, event) {
           // console.log(tab, event);
        },

    },
    created() {
        //订单列表
        this.orderlists();

        const token = { token: this.$store.getters.token };
        //订单状态
        listOrderStatus(token).then(response => {
            this.orderStaus = response.data;
        })

        //策略选择
        listselect(token).then(response => {
            this.strategySel = response.data;
        })

        //我的服务公司
        const myBindToken = {
            token: token,
            uid: this.$store.getters.uid
        };
        myBind(1, 10000, myBindToken) .then(response => {
            this.serverComy = response.data.list;
        })
    }
};
</script>
<style>
#adOrder {
    /* width: 1710px; */
    margin-top: 30px;
    min-height: 500px;
    border-radius: 5px;
    background-color: #fff;
}
#adOrder .orderSpan {
    margin-left: 30px;
    width: 55px;
    color: #e3030e;
}
#adOrder .el-tabs__active-bar {
    margin-left: 30px;
    background-color: #e3030e;
    width: 55px !important;
    height: 9px;
    background: url(../../assets/images/tab_active2.png) no-repeat center;
}
#adOrder .el-tabs__nav-scroll {
    height: 57px;
    line-height: 57px;
}
/* count */
#adOrder .orderCount {
    margin: 10px 30px 10px 30px;
}
#adOrder .orderCount .el-input {
    width: 150px;
}

/* nav */
#adOrder .orderNav {
    margin: 0 30px 0 30px;
    height: 40px;
    line-height: 40px;
    background-color: #edf0f5;
    color: #8e9eab;
    font-weight: 600;
    font-size: 12px;
}
.orderCenter {
    text-align: center;
}
/* countText */
.countText {
    margin: 20px 30px 10px 30px;
}
.countTextSpan {
    font-size: 12px;
    color: #999;
    height: 30px;
    line-height: 30px;
    background-color: #f8fcff;
    border: 1px solid #eff3f6;
}
.confirm {
    display: inline-block;
    width: 50px;
    height: 20px;
    border-radius: 5px;
    background-color: #fe4451;
    line-height: 20px;
    text-align: center;
    color: #fff;
}
.countTextNext {
    height: 98px;
    line-height: 98px;
    border-left: 1px solid #eff3f6;
    border-right: 1px solid #eff3f6;
    border-bottom: 1px solid #eff3f6;
    font-size: 12px;
}
.Next {
    border-right: 1px solid #eff3f6;
    text-align: center;
}
.Nextlatst {
    margin-top: 15px;
    line-height: 35px;
    text-align: center;
}
.moneyStyle {
    color: #fe4451;
}
/* 分页 */
.fyfy {
    margin-top: 33px;
    margin-bottom: 50px;
    text-align: right;
}
.fystyle .el-pagination {
    padding: 2px 30px;
}

.fystyle .el-pagination button {
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

/* addstyle */
/* .red {
    background-color: red;
}
.blue {
    background-color: #42b3f9;
}
.hui {
    background-color: #c2cad7;
} */
</style>

