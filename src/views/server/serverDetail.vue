<template>
  <div class="fw-xq">
    <div class="fw-xq1">
      <div>
        {{ companyInfo.name }}
        <span>
          <a>
            我的服务公司 /
          </a>
          <a>
            {{ statusList.status!=2?'未':'已' }}绑定服务公司
          </a>
        </span>
      </div>
    </div>
    <div class="fw-xq2">
      <div class="fw-img">
        <img :src="companyInfo.logo" />
      </div>
      <div class="fwxq">
        <h3>
          {{ companyInfo.name }}
        </h3>
        <p class="p1">
          {{ companyInfo.instruction }}
        </p>
        <p class="p2">
          联系人：
          <span style="min-width:50px;display:inline-block;">{{ companyInfo.linker }}</span>
          电话：
          <span style="min-width:66px;display:inline-block;">{{ companyInfo.phone }}</span>
          绑定时间：
          <span style="min-width:66px;display:inline-block;">{{ companyInfo.createTime }}</span>
          公司地址：
          <span style="min-width:66px;display:inline-block;">{{ companyInfo.address }}</span>
        </p>
        <p class="p3">
          服务状态：
          <span>{{ statusList.statusName }}</span>
        </p>
        <p class="p4" v-if="statusList.status==2">
          跟进人信息
        </p>
        <div class="p5" v-if="statusList.status==2">
          <div>
            <img src="../../assets/images/home-mediaImg3.png" />
          </div>
          <div>
            <p>
              曾阿牛
            </p>
            <p>
              角色：业务员&nbsp;&nbsp;&nbsp;&nbsp;手机号：13260658569&nbsp;&nbsp;&nbsp;&nbsp;
              <a>查看详情</a>&nbsp;&nbsp;&nbsp;&nbsp;
              <a>更换子账号</a>
            </p>
          </div>
        </div>
        <div v-if="qualificationInfo !=null ">
          <p class="p6">
            资质信息
          </p>

          <p class="p7">
            企业名称：
            <span style="min-width:66px;display:inline-block;">{{ qualificationInfo.name }}</span>
            企业联系人：
            <span style="min-width:66px;display:inline-block;">{{ qualificationInfo.creator }}</span>
            联系方式：
            <span style="min-width:66px;display:inline-block;">{{ qualificationInfo.phone }}</span>
          </p>
          <p class="p8">
            <span>公司地址：{{ qualificationInfo.address }}</span>
          </p>
          <div class="p9">
            <img :src="qualificationInfo.businessLicenseUrl" />
            <img :src="qualificationInfo.organizationCodeUrl" />
            <img :src="qualificationInfo.taxPicUrl" />
          </div>
        </div>
        <p class="p10">
          交易信息
        </p>

        <div class="chart p11" ref="chartOne" :style="{width: width, height: height}"></div>

        <p v-if="qualificationInfo !=null" class="p12">
          <a v-if="statusList.status==1" @click="openServer(1)">
            开启服务
          </a>
          <a v-if="statusList.status==2" @click="openServer(2)">
            结束服务
          </a>
          <el-button type="danger" @click="dialogFormVisible = true,getChild()" v-if="statusList.status==0">
            申请绑定
          </el-button>

          <el-dialog title="申请绑定" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-position="top">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="选择公开信息">
                    <el-radio-group v-model="form.resource">
                      <el-radio label="1">公开资质信息</el-radio>
                      <el-radio label="2">不公开资质信息</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="选择子账号">
                    <el-select v-model="form.region" placeholder="请选择">
                      <el-option v-for="(value, key) in userChild" :label="value.roleName" :value="value.uid" :key="key">{{ value.roleName }}</el-option>
                    </el-select>
                    <a href="#">
                      <i class="fa fa-plus-circle" style="font-size: 18px;color:#41b3f9 ;"></i>&nbsp;&nbsp;&nbsp新增子账号
                    </a>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="服务公司需提供的资料">
                    <p class="xxzl">
                      1. 资料信息资料信息资料信息资料信息资料信息资料信息
                    </p>
                    <p class="xxzl">
                      2. 资料信息资料信息资料信息资料信息资料信息资料信息
                    </p>
                    <p class="xxzl">
                      3. 资料信息资料信息资料信息资料信息资料信息资料信息
                    </p>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="danger" @click="dialogFormVisible = false,applyBind()">提 交</el-button>
              <el-button  type="info" @click="dialogFormVisible = false">取 消</el-button>
            </div>
          </el-dialog>
        </p>
        <p v-if="qualificationInfo == null">
          请先通过资质认证
        </p>

      </div>
      <div style="clear:both;"></div>
    </div>
  </div>
</template>

<script>
//引入Echarts主模块
// let echarts=require('echarts/lib/echarts');
//引入柱状图
// require('echarts/lib/chart/bar');
//引入圆饼图
//require('echarts/lib/chart/pie');
//引入所需组件
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/legend');
import {
    tenantDetail,
    getPeople,
    getAuthor,
    changeService,
    bindStatus,
    subUser,
    applyBind
} from "../../api/server";
export default {
    props: {
        width: {
            type: String,
            default: "100%"
        },
        height: {
            type: String,
            default: "auto"
        },
        autoResize: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            resource: "1",
            dialogFormVisible: false,
            form: {
                resource: "",
                region: ""
            },
            qualificationInfo: [],
            statusList: [],
            companyInfo: [],

            userChild: ""
        };
    },
    created() {
        this.getDetail();
        this.getStatus();
        if (this.statusList.status == 2) {
            this.peopleInfo();
        }
        this.authorInfo();
    },
    methods: {
        //获取服务公司详情

        getDetail() {
            tenantDetail({
                token: this.$store.getters.token,
                tenantId: this.$route.params.tenantId
            }).then(response => {
                this.companyInfo = JSON.parse(response.data);
            });
        },
        //获取服务公司状态
        getStatus() {
            bindStatus({
                eid: this.$store.getters.eid,
                tenantId: this.$route.params.tenantId
            }).then(response => {
                this.statusList = response.data;
            });
        },
        //获取子账号信息列表
        getChild() {
            subUser({
                token: this.$store.getters.token,
                eid: this.$store.getters.eid
            }).then(response => {
                this.userChild = response.data;
            });
        },
        //申请绑定
        applyBind() {
            applyBind({
                token: this.$store.getters.token,
                subAccountId: this.form.region,
                tenantId: this.$route.params.tenantId,
                kind: this.$store.getters.kind,
                authId:
                    this.form.resource == 1 ? this.qualificationInfo.authId : ""
            }).then(response => {
                console.log(response);
                if (response.msgCode == "0") {
                    this.$message({
                        message: "绑定成功",
                        type: "success"
                    });
                    this.$router.push({ path: "/server" });
                }
            });
        },
        //获取跟进人信息
        peopleInfo() {
            const tenantInfo = {
                token: this.$store.getters.token,
                tenantId: this.$route.params.tenantId
            };
            getPeople(tenantInfo).then(response => {});
        },
        // 资质信息
        authorInfo() {
            const tenantInfo = {
                token: this.$store.getters.token,
                tenantId: this.$route.params.tenantId
            };
            getAuthor(tenantInfo).then(response => {
                this.qualificationInfo = response.data;
                console.log(this.qualificationInfo);
            });
        },
        // 开启/关闭服务
        openServer(status) {
            const tenantInfo = {
                token: this.$store.getters.token,
                tenantId: this.$route.params.tenantId,
                status: status
            };
            changeService(tenantInfo).then(response => {
                console.log(response.data);
            });
        },
        /*创建图表一*/
        createChartOne() {
            let chartOne = echarts.init(this.$refs.chartOne);

            chartOne.setOption({
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        crossStyle: {
                            color: "#999"
                        }
                    }
                },
                toolbox: {
                    feature: {
                        //          dataView: {show: true, readOnly: false},
                        //          magicType: {show: true, type: ['line', 'bar']},
                        //          restore: {show: true},
                        //          saveAsImage: {show: true}
                    }
                },
                legend: {},
                xAxis: [
                    {
                        type: "category",
                        data: [
                            "张三",
                            "里斯",
                            "赵晓",
                            "王武",
                            "张三",
                            "里斯",
                            "赵晓",
                            "王武"
                        ],
                        axisPointer: {
                            type: "shadow"
                        }
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "交易金额（元）",
                        min: 0,
                        max: 18000,
                        interval: 3000,
                        axisLabel: {
                            formatter: "{value}"
                        }
                    }
                ],
                series: [
                    {
                        //          name:'蒸发量',
                        type: "bar",
                        data: [
                            9000,
                            11000,
                            15000,
                            9000,
                            18000,
                            10000,
                            14000,
                            9000
                        ]
                    },
                    {
                        //          name:'降水量',
                        type: "bar",
                        data: [5000, 6500, 12000, 5000, 13000, 6000, 8000, 5000]
                    }
                ]
            });
        }
    },
    mounted() {
        this.createChartOne();
    }
};
</script>

<style>
.fw-xq1 {
    background: #ffffff;
    width: 100vw;
    position: fixed;
    left: 0px;
    height: 46px;
    line-height: 46px;
    top: 60px;
    z-index: 999;
}
.fw-xq1 > div {
    width: 100%;
    padding: 0px 110px;
    min-width: 1400px;
    font-weight: 600;
    font-size: 14px;
    color: #2f323e;
}
.fw-xq1 > div > span {
    float: right;
    font-weight: 400;
    font-size: 12px;
    color: #2f323e;
}
.fw-xq1 > div > span > a:nth-child(1) {
    color: #a1b1bc;
}

.fw-xq2 {
    background: #ffffff;
    border-radius: 6px;
    /* min-height: 1433px; */
    height: auto;
    padding: 50px 40px;
    margin-top: 80px;
    margin-bottom: 68px;
}

.fw-img {
    float: left;
    width: 18%;
    height: 202px;
    margin-right: 3%;
}

.fw-img > img {
    width: 100%;
    height: 202px;
    border-radius: 6px;
}

.fwxq {
    width: 78%;
    float: left;
}

.fwxq > h3 {
    color: #2f323e;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 15px;
}

.fwxq > .p1 {
    font-size: 12px;
    color: #555555;
    margin-bottom: 25px;
}

.fwxq > .p2 {
    font-size: 12px;
    color: #555555;
}

.fwxq > .p2 > span {
    display: inline-block;
    margin-right: 30px;
    color: #8e9eaa;
    margin-bottom: 55px;
}

.fwxq > .p3 {
    font-size: 14px;
    color: #555555;
    margin-bottom: 55px;
}

.fwxq > .p3 > span {
    font-size: 16px;
    color: #7ace4c;
    font-weight: 600;
}

.fwxq > .p4 {
    font-size: 14px;
    color: #555555;
    font-weight: 600;
    margin-bottom: 25px;
}

.fwxq > .p5 {
    height: 100px;
    clear: both;
    overflow: hidden;
    border-bottom: 1px solid #e4e7ea;
    padding-bottom: 40px;
    margin-bottom: 35px;
}

.fwxq > .p5 > div:nth-child(1) {
    float: left;
    width: 60px;
    height: 60px;
    margin-right: 25px;
}

.fwxq > .p5 > div:nth-child(1) > img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
}

.fwxq > .p5 > div:nth-child(2) {
    float: left;
}

.fwxq > .p5 > div:nth-child(2) > p:nth-child(1) {
    font-size: 14px;
    color: #2f323e;
    margin-bottom: 30px;
}

.fwxq > .p5 > div:nth-child(2) > p:nth-child(2) {
    font-size: 12px;
    color: #555555;
}

.fwxq > .p5 > div:nth-child(2) > p:nth-child(2) > a {
    font-size: 12px;
    color: #34a3e8;
}

.fwxq .p6 {
    color: #555555;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
}

.fwxq .p7 {
    color: #555555;
    font-size: 12px;
    margin-bottom: 20px;
}

.fwxq.p7 > span {
    display: inline-block;
    width: 280px;
}

.fwxq .p8 {
    color: #555555;
    font-size: 12px;
    margin-bottom: 20px;
}

.fwxq .p8 > span {
    display: inline-block;
    width: 280px;
}

.fwxq .p9 {
    height: 190px;
    padding-bottom: 31px;
    border-bottom: 1px solid #e4e7ea;
    margin-bottom: 42px;
}

.fwxq .p9 > img {
    width: 232px;
    height: 158px;
    margin-right: 30px;
}

.fwxq .p10 {
    color: #555555;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
}

.fwxq .p12 {
    padding-top: 50px;
    border-top: 1px solid #e4e7ea;
}

.fwxq .p12 > a {
    display: block;
    width: 120px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    color: #ffffff;
    border-radius: 6px;
    background: #e60012;
}

/* 弹窗--申请绑定 */
.fwxq .p12 .el-dialog {
    border-radius: 5px;
    width: 750px;
}
.fwxq .p12 .el-dialog__header {
    text-align: left;
    padding-left: 30px;
    font-weight: 800;
    border-bottom: 1px solid #e4e7ea;
}
.fwxq .p12 .el-dialog__body {
    padding: 10px 30px;
}
.fwxq .p12 .el-form-item__label {
    font-size: 16px;
    color: #555555;
    font-weight: 600;
    border-left: 4px solid #e60012;
    line-height: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 0px;
    text-align: left;
    padding-left: 20px;
    /* width: 500px; */
}

.fwxq .p12 .el-select {
    display: block;
    width: 80%;
}
.fwxq .p12 .el-form-item__content {
    margin-left: 25px !important;
}

.fwxq .p12 .el-radio-group {
    display: block;
}

.fwxq .p12 .el-radio__inner::after {
    background-color: #e70618;
    width: 8px;
    height: 8px;
}

.fwxq .p12 .el-radio__input.is-checked .el-radio__inner {
    background: #ffffff;
    border-color: #e70618;
}

.fwxq .p12 .el-radio__input.is-checked + .el-radio__label {
    color: #e70618;
}

.fwxq .p12 .xxzl {
    font-size: 14px;
    line-height: 25px;
}

.fwxq .el-dialog__footer {
    border-top: 1px solid #e4e7ea;
    margin-left: 0;
    text-align: left;
    padding: 11px 30px;
}

.fwxq .p12 .dialog-footer {
    text-align: left;
}

.fwxq .p12 .dialog-footer button:nth-child(1) {
    background: #e60012;
    border-color: #e60012;
}

.fwxq .p12 .dialog-footer button:nth-child(2) {
    background: #c1cad7;
    border-color: #c1cad7;
    color: #fff;
}
</style>
