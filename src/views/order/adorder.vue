<template>
    <div id="adOrder">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="first">
                <span slot="label" class="orderSpan">广告订单</span>
                <!-- count -->
                <el-row class="orderCount">
                    <!-- 输入框组 -->
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-col :span="3">
                            <el-form-item label="订单编号" class="ding">
                                <el-input v-model="form.name" placeholder="输入资源名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" class="orderTime">
                            <el-form-item label="创建时间">
                                <el-date-picker v-model="value1" type="date" :editable="false" placeholder="选择日期">
                                </el-date-picker>-
                                <el-date-picker v-model="value1" type="date" :editable="false" placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            状态
                            <el-cascader :options="options" v-model="selectedOptions" placeholder="全部">
                            </el-cascader>
                        </el-col>
                        <el-col :span="3">
                            策略
                            <el-cascader :options="options" v-model="selectedOptions" placeholder="全部">
                            </el-cascader>
                        </el-col>
                        <el-col :span="4">
                            服务公司
                            <el-cascader :options="options" v-model="selectedOptions" placeholder="全部">
                            </el-cascader>
                        </el-col>
                        <el-col :span="1">
                            <el-button type="danger" size="small" style="margin-top:2px;">搜索</el-button>
                        </el-col>
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
                <el-row class="countText">
                    <el-row class="countTextSpan">
                        <span style="margin-left:10px;">创建时间：2018-05-05 &nbsp;&nbsp;12:00:00</span>&nbsp;&nbsp;
                        <span class="confirm">待确认</span>
                    </el-row>
                    <el-row class="countTextNext">
                        <el-col :span="4" class="Next">BH201805031215</el-col>
                        <el-col :span="4" class="Next">靓靓蒸虾</el-col>
                        <el-col :span="3" class="Next moneyStyle">￥6980:00</el-col>
                        <el-col :span="3" class="Next moneyStyle">￥6980:00</el-col>
                        <el-col :span="3" class="Next">道森媒体</el-col>
                        <el-col :span="3" class="Next">自主创建</el-col>
                        <el-col :span="4" class="Nextlatst">
                            <el-button type="info" plain size="mini" @click="orderDetails()">详情</el-button>
                        </el-col>
                    </el-row>
                </el-row>
                <div class="fyfy fystyle">
                    <el-pagination background layout="prev, pager, next" :total="1000">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: "first",
            value1: "",
            options: [],
            selectedOptions: [],
            form: {
                name: "",
                region: "",
                date1: "",
                date2: "",
                delivery: false,
                type: [],
                resource: "",
                desc: ""
            }
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        //广告订单详情
        orderDetails() {
            this.$router.push("/orderDetails");
        }
    }
};
</script>
<style>
#adOrder {
    /* width: 1710px; */
    margin-top: 30px;
    height: 500px;
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
    width: 55px;
}
#adOrder .el-tabs__nav-scroll {
    height: 57px;
    line-height: 57px;
}
/* count */
#adOrder .orderCount {
    margin: 10px 30px 10px 30px;
    /* height: 300px; */
    /* background-color: bisque; */
}
#adOrder .orderTime .el-date-editor.el-input,
#adOrder .el-date-editor.el-input__inner {
    width: 150px;
    line-height: 40px;
}
#adOrder .orderCount .el-cascader {
    width: 150px;
}
#adOrder .ding .el-form-item__label {
    text-align: left;
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
</style>

