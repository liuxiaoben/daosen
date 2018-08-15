<template>
    <div id="orderDetails">
        <p class="title">
            <span class="orderDetailsTitle">订单详情</span>
            <span class="rightButton">
                <el-button type="danger" size="small" @click="centerDialogVisible2 = true">添加素材</el-button>
                <el-button type="danger" size="small">同意</el-button>
                <el-button type="primary" size="small">拒绝</el-button>
                <el-button type="primary" size="small">确认付款</el-button>
                <el-button type="primary" size="small">申请开票</el-button>
            </span>
        </p>
        <!-- 状态条 -->
        <el-row class="orderDetailsState">

            <div v-if="status == 0">
                <el-col :span="6">
                    <div class="step">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-dingdan"></span>
                            <span>提交订单</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="step">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-dingdantijiaochenggong1"></span>
                            <span>受理中</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="step">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-dingdan2"></span>
                            <span>确认订单</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="step">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-jsontijiao"></span>
                            <span>发布</span>
                        </div>
                    </div>
                </el-col>
            </div>

            <div v-else-if="status == 1">
                <el-col :span="6">
                    <div class="step red">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-dingdan"></span>
                            <span>提交订单</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="step">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-dingdantijiaochenggong1"></span>
                            <span>受理中</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="step ">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-dingdan2"></span>
                            <span>确认订单</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="step">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-jsontijiao"></span>
                            <span>发布</span>
                        </div>
                    </div>
                </el-col>
            </div>

            <div v-else-if="status == 2">
                <el-col :span="6">
                    <div class="step red">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-dingdan"></span>
                            <span>提交订单</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="step red">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-dingdantijiaochenggong1"></span>
                            <span>受理中</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="step">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-dingdan2"></span>
                            <span>确认订单</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="step">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-jsontijiao"></span>
                            <span>发布</span>
                        </div>
                    </div>
                </el-col>
            </div>

            <div v-else-if="status == 3">
                <el-col :span="6">
                    <div class="step red">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-dingdan"></span>
                            <span>提交订单</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="step red">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-dingdantijiaochenggong1"></span>
                            <span>受理中</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="step red">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-dingdan2"></span>
                            <span>确认订单</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="step">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-jsontijiao"></span>
                            <span>发布</span>
                        </div>
                    </div>
                </el-col>
            </div>

            <div v-else-if="status == 4">
                <el-col :span="6">
                    <div class="step red ">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-dingdan"></span>
                            <span>提交订单</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="step red">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-dingdantijiaochenggong1"></span>
                            <span>受理中</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="step red ">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-dingdan2"></span>
                            <span>确认订单</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="step red">
                        <div class="line"></div>
                        <div class="text">
                            <span class="iconfont icon-jsontijiao"></span>
                            <span>发布</span>
                        </div>
                    </div>
                </el-col>
            </div>
        </el-row>
        <!-- 折叠面板 -->
        <el-row class="collapse">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item name="1">
                    <template slot="title">
                        <span class="collapseSpan">订单信息</span>
                    </template>
                    <div class="name1">
                        <el-row>
                            <el-col :span="7">
                                <span class="span1">订单编号：</span> DH{{ code }}</el-col>
                            <el-col :span="6">
                                <span class="span1">订单金额：</span>{{ money }}元</el-col>
                            <el-col :span="6">
                                <span class="span1">订单来源：</span>策略提交</el-col>
                            <el-col :span="5">
                                <span class="span1">已付金额：</span>{{ payMoney }}元</el-col>
                        </el-row>
                        <el-row style="margin-top:20px">
                            <el-col :span="7">
                                <span class="span1">企业名称：</span>{{ ename }}</el-col>
                            <el-col :span="6">
                                <span class="span1">企业联系人：</span>{{ linkman }}</el-col>
                            <el-col :span="6">
                                <span class="span1">联系电话：</span>{{ phone }}</el-col>
                            <el-col :span="5">
                                <span class="span1">品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</span>{{ brand }}</el-col>
                        </el-row>
                        <el-row style="margin-top:20px">
                            <el-col :span="7">
                                <span class="span1">创建时间：</span>{{ createTime }}</el-col>
                            <el-col :span="6">
                                <span class="span1">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</span>{{ statusName }}</el-col>
                            <el-col :span="6">
                                <span class="span1">服务公司：</span>{{ tenantName }}</el-col>
                        </el-row>
                        <el-row style="margin-top:20px">
                            <el-col :span="7">
                                <span class="span1">已用优惠卷：</span>优惠券编号：123456789， 满减，满1000减100</el-col>
                        </el-row>
                    </div>
                </el-collapse-item>
                <!-- 已选资源 -->
                <el-collapse-item name="2" class="collapseMargin">
                    <template slot="title">
                        <span class="collapseSpan">已选资源</span>
                    </template>

                    <div class="name2">
                        <el-form :inline="true" v-model="formInline" class="demo-form-inline">
                            <el-form-item label="靓靓蒸虾策略" class="leftlaber">
                                <el-cascader :options="options" v-model="selectedOptions" @change="handleChange">
                                </el-cascader>
                            </el-form-item>
                            <el-form-item class="leftlaber">
                                <el-date-picker v-model="value1" type="date" placeholder="选择日期" :disabled="true">
                                </el-date-picker> -
                                <el-date-picker v-model="value2" type="date" placeholder="选择日期" :disabled="true">
                                </el-date-picker>
                            </el-form-item>

                            <el-form-item class="leftlaber">
                                <el-input placeholder="行业行业" v-model="value1" :disabled="true">
                                </el-input>
                                <el-input placeholder="品牌品牌" v-model="value2" :disabled="true">
                                </el-input>
                            </el-form-item>
                            <el-form-item class="rightlaber">
                                <el-button type="primary" size="small" @click="centerDialogVisible = true">查看对比</el-button>
                                <el-dialog :visible.sync="centerDialogVisible" center class="lookDialog">
                                    <el-tabs v-model="activeName" @tab-click="handleClick">
                                        <el-tab-pane name="first">
                                            <!-- 线下 -->
                                            <span slot="label" class="tableTitle">线下对比信息</span>

                                            <el-row>
                                                <el-col :span="12" class="underLine">
                                                    <span class="spanTitle">最新数据</span>
                                                    <!-- 树形结构 -->
                                                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                                                </el-col>
                                                <el-col :span="12" style="padding-left:30px;">
                                                    <span class="spanTitle">上次数据</span>
                                                    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                                                </el-col>
                                            </el-row>
                                        </el-tab-pane>
                                        <!-- 线上 -->
                                        <el-tab-pane name="second">
                                            <span slot="label" class="tableTitle">线上对比信息</span>
                                            <el-row>
                                                <el-col :span="12" class="underLine">
                                                    <span class="spanTitle">最新数据</span>
                                                    <!-- 树形结构 -->
                                                    <el-tree :data="data2" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                                                </el-col>
                                                <el-col :span="12" style="padding-left:30px;">
                                                    <span class="spanTitle">上次数据</span>
                                                    <el-tree :data="data2" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                                                </el-col>
                                            </el-row>
                                        </el-tab-pane>

                                        <el-tab-pane name="third">
                                            <span slot="label" class="tableTitle">非标</span>
                                            非标
                                        </el-tab-pane>
                                    </el-tabs>
                                </el-dialog>
                            </el-form-item>
                            <div class="clear"></div>
                        </el-form>
                    </div>
                </el-collapse-item>
                <!-- 付款信息 -->

                <el-collapse-item name="3" class="collapseMargin">
                    <template slot="title">
                        <span class="collapseSpan">付款信息</span>
                    </template>
                    <div class="name3">
                        <el-table :data="payList" stripe style="width: 100%">
                            <el-table-column prop="orderApId" label="编号" width="150">
                            </el-table-column>
                            <el-table-column prop="payTime" label="付款时间">
                            </el-table-column>
                            <el-table-column prop="money" label="付款金额">
                            </el-table-column>
                            <el-table-column prop="payTypeName" label="支付方式">
                            </el-table-column>
                            <el-table-column prop="remark" label="备注">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-collapse-item>

                <!-- 发票信息 -->

                <el-collapse-item name="4" class="collapseMargin MarginBottom">
                    <template slot="title">
                        <span class="collapseSpan">发票信息</span>
                    </template>
                    <div class="name4">
                        <el-table :data="invoiceList" stripe style="width: 100%">
                            <el-table-column prop="invCode" label="发票号" width="150">
                            </el-table-column>
                            <el-table-column prop="money" label="发票金额">
                            </el-table-column>
                            <el-table-column prop="title" label="发票抬头">
                            </el-table-column>
                            <el-table-column prop="openTypeName" label="发票性质">
                            </el-table-column>
                            <el-table-column prop="createTime" label="时间" width="200">
                            </el-table-column>
                            <el-table-column prop="statusName" label="状态">
                            </el-table-column>
                            <el-table-column prop="openType" label="发票备注">
                            </el-table-column>
                            <el-table-column label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small">详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-collapse-item>

            </el-collapse>
        </el-row>

         <!-- 添加素材弹窗 -->
        <el-dialog title="添加素材" :visible.sync="centerDialogVisible2" class="addMaterial">
            <h6>未添加素材</h6>
            <el-carousel indicator-position="outside" arrow="never">
                <el-carousel-item v-for="(items , i) in listTemp" :key="i">
                    <img v-for="(item , j) in items" :key="j" :id="'img'+(i*4+j)" :src="item.img">
                </el-carousel-item>
            </el-carousel>
            <h6>已添加素材</h6>
            <el-carousel indicator-position="outside" arrow="never">
                <el-carousel-item v-for="(items , i) in listTemp" :key="i">
                    <img v-for="(item , j) in items" :key="j" :id="'img'+(i*4+j)" :src="item.img">
                </el-carousel-item>
            </el-carousel>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="centerDialogVisible2 = false">确 定</el-button>
                <el-button @click="centerDialogVisible2 = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
//引入封装axios
import { orderDetails, payInformation, invInformation } from "../../../api/orderDetails"; //引入订单详情,付款信息,发票信息

export default {
    data() {
        return {
            //返回数据
            code: "",
            brand: "",
            money: "",
            phone: "",
            linkman: "",
            ename: "",
            statusName: "",
            tenantName: "",
            createTime: "",
            payMoney: "",
            //状态
            status:"",

            payList: [],
            invoiceList: [],

            //树形
            defaultProps: {
                children: "children",
                label: "label"
            },
            formInline: "",
            activeName: "first",
            centerDialogVisible: false,
            centerDialogVisible2: false,
            selectedOptions: [],
            activeNames: ["1"],
            value1: "",
            value2: "",
            formInline: "",
            handleNodeClick: "",
            data: [
                {
                    label: "发布时间：2018.05.01-2018.05.20",
                    children: [
                        {
                            label: "湖北省",
                            children: [
                                {
                                    label: "武汉市",
                                    children: [
                                        {
                                            label: "江夏区"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "发布时间：2018.05.01-2018.05.20",
                    children: [
                        {
                            label: "湖北省",
                            children: [
                                {
                                    label: "武汉市",
                                    children: [
                                        {
                                            label: "江夏区"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            data2: [
                {
                    label: "发布时间：2018.05.01-2018.05.20",
                    children: [
                        {
                            label: "湖北省",
                            children: [
                                {
                                    label: "微信朋友圈",
                                    children: [
                                        {
                                            label: "覆盖区域:湖北省"
                                        }
                                    ]
                                },
                                {
                                    label: "QQ空间",
                                    children: [
                                        {
                                            label: "覆盖区域:湖北省"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    label: "发布时间：2018.05.01-2018.05.20",
                    children: [
                        {
                            label: "湖北省",
                            children: [
                                {
                                    label: "微信朋友圈",
                                    children: [
                                        {
                                            label: "覆盖区域:湖北省"
                                        }
                                    ]
                                },
                                {
                                    label: "QQ空间",
                                    children: [
                                        {
                                            label: "覆盖区域:湖北省"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            list: [
                {
                    img: "../../../../static/img/fuwu-banner1.png"
                },
                {
                    img: "../../../../static/img/fuwu-banner1.png"
                },
                {
                    img: "../../../../static/img/fuwu-banner1.png"
                },
                {
                    img: "../../../../static/img/fuwu-banner1.png"
                },
                {
                    img: "../../../../static/img/fuwu-banner1.png"
                },
                {
                    img: "../../../../static/img/fuwu-banner1.png"
                },
                {
                    img: "../../../../static/img/fuwu-banner1.png"
                }
            ],
            tableData: [
                {
                    date: "01",
                    time: "2018.04.09 12:00:00",
                    address: "500.00",
                    mode: "支付宝",
                    Remarks: "付了500，请查收"
                }
            ],
            tableData2: [
                {
                    num: "01",
                    money: 100,
                    rise: "道森媒体",
                    Nature: "企业",
                    Remarks: "付了500，请查收",
                    time: "2018.02.03",
                    state: "待提交",
                    Remarks: ""
                }
            ],
            options: [
                {
                    value: "zhinan",
                    label: "指南",
                    children: [
                        {
                            value: "shejiyuanze",
                            label: "设计原则",
                            children: [
                                {
                                    value: "yizhi",
                                    label: "一致"
                                },
                                {
                                    value: "fankui",
                                    label: "反馈"
                                },
                                {
                                    value: "xiaolv",
                                    label: "效率"
                                },
                                {
                                    value: "kekong",
                                    label: "可控"
                                }
                            ]
                        },
                        {
                            value: "daohang",
                            label: "导航",
                            children: [
                                {
                                    value: "cexiangdaohang",
                                    label: "侧向导航"
                                },
                                {
                                    value: "dingbudaohang",
                                    label: "顶部导航"
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        handleChange(val) {
            console.log(val);
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    },
    computed: {
        listTemp: function() {
            var list = this.list;
            var arrTemp = [];
            var index = 0;
            var sectionCount = 4;
            for (var i = 0; i < list.length; i++) {
                index = parseInt(i / sectionCount);
                if (arrTemp.length <= index) {
                    arrTemp.push([]);
                }
                arrTemp[index].push(list[i]);
            }
            return arrTemp;
        }
    },
    //钩子函数
    created() {
        //点击订单信息，请求数据
        let orderId = this.$route.query.orderId;
        const orderDetailsToken = {
            token: this.$store.getters.token,
            orderId //这个时候直接写入这个变量，因为ID已经拿到了
        };

        orderDetails(orderDetailsToken).then(response => {
            let info = response.data.order;
            this.code = info.code;
            this.brand = info.brand;
            this.money = info.money;
            this.phone = info.phone;
            this.linkman = info.linkman;
            this.ename = info.ename;
            this.statusName = info.statusName;
            this.tenantName = info.tenantName;
            this.createTime = info.createTime;
            this.payMoney = info.payMoney;
            this.status = info.status;
        }).catch(() => {
            this.loading = false;
        });

        //点击付款信息，请求数据
        const payInformationToken = {
            token: this.$store.getters.token,
            orderId //这个时候直接写入这个变量，因为ID已经拿到了
        };
        payInformation(payInformationToken).then(response => {
            this.payList = response.data;
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        });

        //点击发票信息，请求数据
        const invoiceToken = {
            token: this.$store.getters.token,
            orderId //这个时候直接写入这个变量，因为ID已经拿到了
        };
        invInformation(invoiceToken).then(response => {
            this.invoiceList = response.data;
            this.loading = false;
        }).catch(() => {
            this.loading = false;
        });
    }
};
</script>
<style rel="stylesheet/scss" lang="scss">
#orderDetails {
    background-color: #fff;
    border-radius: 5px;
    margin-top: 30px;
}
#orderDetails .title {
    position: relative;
    height: 57px;
    line-height: 57px;
    padding: 0 30px;
    border-bottom: 1px solid #ddd;
    .orderDetailsTitle {
        color: #e60012;
        font-weight: normal;
    }
    .rightButton {
        float: right;
        & > .el-button {
            margin-left: 10px;
        }
    }
}

// 添加伪类，做出下划线
#orderDetails .title::after{
  content: " ";
  display: block;
  width: 55px;
  height: 9px;
  background: url(../../../assets/images/help-dbl.png) no-repeat center;
  position: absolute;
  bottom: 0;
}

/* 状态 */
.orderDetailsState {
    padding: 0 50px;
    margin: 30px 0px;
}
/* 折叠面板 */
.collapse {
    padding: 0 50px;
}

.collapse .el-collapse-item {
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
}
.collapse .el-collapse-item__header {
    background-color: #fafafa;
}
.collapse .el-collapse-item__content {
    padding-bottom: 0;
}
.collapse .collapseSpan {
    font-size: 14px;
    font-weight: 600;
    margin-left: 24px;
}
.collapse .collapseMargin {
    margin-top: 30px;
}
.collapse .name1,
.collapse .name2,
.collapse .name3,
.collapse .name4 {
    padding: 25px 24px 35px 24px;
    font-size: 12px;
}
.collapse .MarginBottom {
    margin-bottom: 30px;
}

.name3 .el-table,
.name4 .el-table {
    font-size: 12px;
    border-left: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    border-radius: 5px;
}
.collapse .name1 .span1 {
    font-weight: 600;
}
/* 已选资源 */
.collapseMargin .el-date-editor.el-input {
    width: 150px;
}
.cascaderTitle {
    line-height: 35px;
    height: 35px;
    color: #999;
}
.cascader1 .el-cascader {
    line-height: 35px;
}
.input .el-input {
    width: 40%;
}

/* 查看对比弹窗 */
.lookDialog .el-dialog {
    width: 750px;
    border-radius: 5px;
    text-align: left;
}
.lookDialog .el-dialog__header .el-dialog__headerbtn {
    z-index: 10;
}
.lookDialog .el-dialog--center .el-dialog__body {
    padding: 0;
}
.lookDialog .el-tabs__nav {
    margin: 15px 30px;
    font-weight: 800;
}
.lookDialog .el-tabs__content {
    padding: 10px 30px;
}
.lookDialog .el-dialog__header {
    padding: 0;
}
.lookDialog .el-tabs__nav-scroll {
    /* height: 60px;
    line-height: 60px; */
    background-color: #f9f9f9;
    border-radius: 5px;
}
.tableTitle {
    font-size: 18px;
    color: #333;
}
.lookDialog .el-tabs__item:hover,
.lookDialog .el-tabs__item.is-active {
    color: #333;
}
#orderDetails .lookDialog .el-tabs__active-bar {
    height: 9px;
    color: #e60012;
    // background-color: #e60012;
    background: url(../../../assets/images/help-dbl.png) repeat-x center;
    bottom: -15px;
}
/* 线下 */
.rightlaber .underLine {
    border-right: 1px dashed #d6dade;
}

/* 弹框--添加素材  开始 */
.addMaterial .el-dialog {
    width: 750px;
    border-radius: 5px;
    text-align: left;
}
.addMaterial .el-dialog .el-dialog__header {
    background-color: #f9f9f9;
    border-bottom: 1px solid #ddd;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
.addMaterial .el-dialog .el-dialog__header .el-dialog__title {
    font-weight: 800;
}
.addMaterial .el-dialog .el-dialog__body {
    padding: 30px;
}
.addMaterial .el-dialog .el-dialog__body h6 {
    font-weight: 800;
}
.addMaterial .el-dialog__footer {
    border-top: 1px solid #ddd;
    margin-left: 0;
    text-align: left;
}
.addMaterial .el-carousel__item img {
    width: 25%;
    border-radius: 5px;
}
.addMaterial .el-carousel__container {
    height: 95px;
}
.addMaterial .dialog-footer button:nth-child(1) {
    border-color: #e60012;
}

.addMaterial .dialog-footer button:nth-child(2) {
    background: #c1cad7;
    border-color: #c1cad7;
    color: #fff;
}
/* 结束 */

/* name2 */
.clear {
    clear: both;
}
.name2 .el-input {
    width: 150px;
}
.leftlaber {
    float: left;
}
.rightlaber {
    float: right;
    text-align: right;
    line-height: 35px;
}

.rightlaber .el-tabs__header {
    margin: 0;
}
.rightlaber .spanTitle {
    display: block;
    margin-top: 10px;
}
.rightlaber .el-tree {
    margin-top: 26px;
    margin-bottom: 50px;
}

.rightlaber .el-tree-node__label,
.rightlaber .el-tree-node__expand-icon {
    color: #e60012;
}
/* 新样式 */
.orderDetailsState .step {
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    position: relative;
    height: 51px;
}

.orderDetailsState .step div {
    padding: 0 15px;
    line-height: 48px;
}

.orderDetailsState .step .line {
    border: 2px dashed #e6e6e6;
    width: 100%;
    height: 2px;
}
.step .text {
    padding: 0 15px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
}
.step .text:last-child {
    font-size: 14px;
    color: #333;
}
.step .iconfont {
    color: #fff;
    font-size: 22px;
    font-weight: normal;
    margin-right: 10px;
    padding: 10px;
    border-radius: 50%;
    border: 3px solid #eee;
    background-color: #ccc;
}
.red .iconfont {
    border-color: #fcdbdc;
    background-color: #e60012;
}
.orderDetailsState .red .line {
    border-color: #ee9ea2;
}

</style>

