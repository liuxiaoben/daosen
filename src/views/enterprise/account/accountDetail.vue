<template>
  <div id="son_details">
    <!-- title -->
    <div class="title">
      <span>子账号详情</span>
    </div>

    <!-- count -->
    <div class="son_count">
      <div class="avatar" big v-bind:style="{backgroundImage:'url(' + header + ')'}"></div>
      <!-- text -->
      <div class="text">
        <div class="text_name">
          <p>{{nick}}</p>
          <p>{{roleName}}</p>
          <p>手机号：{{phone}}</p>
        </div>
        <div class="text_logo">
          <p>服务公司</p>
          <div v-if="companies.length != 0">
            <div class="text_logo_count" v-for="company in companies" :key="company.id">
              <div class="text_logo_images">
                <img src="../../../assets/images/son_details_logo.png" alt="logo">
              </div>
              <div class="text_logo_into">
                <p>{{ company.name }}</p>
                <p>{{ company.instruction }}</p>
                <p>
                  <span>联系人：曾阿牛</span>
                  <span>电话：{{ company.phone }}</span>
                  <span>绑定时间：2018.04.19</span>
                  <span>公司地址：{{company.address}}</span>
                </p>
              </div>
              <div class="clear"></div>
            </div>
          </div>
          <div v-else class="text_logo_count">
            暂无服务公司信息
          </div>
        </div>
        <!-- ECharts -->
        <div class="son_echarts_title">
          <p>服务统计</p>
          <div class="son_echarts_ul">
            <ul>
              <li>
                <a href="#">交易金额（元）</a>
              </li>
              <li>
                <a href="#">查看明细</a>
              </li>
              <div class="clear"></div>
            </ul>
          </div>
        </div>
        <div class="son_echarts" id="main"></div>
        <!-- 动态 -->
        <div class="son_dynamic">
          <p>动态</p>
          <div class="son_state">
            <el-steps direction="vertical" :active="1" v-if="ynamicList && ynamicList.length">
              <el-step v-for="item in ynamicList" :title="dateFormat(item.createTime)" :description="item.uname + item.remark" :key="item.id"></el-step>
            </el-steps>
            <div v-else>暂无动态</div>
            <!-- parseTime(item.createTime, '{y}.{m}.{d} {h}:{i}:{s}') -->
          </div>
        </div>
        <!-- 按钮 -->
        <div class="son_button">
          <el-button type="danger" @click="editSubUser" size="small">编辑</el-button>
          <el-button type="info" @click="deleteSubUser" size="small">删除</el-button>
          <!-- <button class="primary" @click="editSubUser">编辑</button> -->
          <!-- <button @click="deleteSubUser">删除</button> -->
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
// import echarts from 'echarts'
import {
    detailSubUser,
    tenantInfo,
    dynamicLog,
    deleteSubUser
} from "@/api/childAccount";
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";

export default {
    data() {
        return {
            header: null,
            nick: null,
            phone: null,
            roleName: "",
            companies: [],
            ynamicList: null,
            pagesize: 100,
            pageNum: 1
        };
    },
    computed: {
        ...mapGetters(["token", "uid"])
    },
    mounted() {
        // 用户--用户详情
        this.phone = this.$route.params.user.phone;
        this.nick = this.$route.params.user.nick;
        this.roleName = this.$route.params.user.roleName;
        var params = { token: this.token, uid: this.$route.params.user.uid };
        detailSubUser(params)
            .then(response => {
                console.log("detailSubUser", response);
                this.header = response.data.header;
                this.nick = response.data.nick;
                if (response.data.phone) {
                    this.phone = response.data.phone;
                }
            })
            .catch(error => {});
        // 企业中心--获取子账号绑定的服务公司
        var params = { uid: this.$route.params.user.uid, token: this.token };
        tenantInfo(params, this.pageNum, this.pagesize)
            .then(response => {
                console.log("tenantInfo", response);
                this.companies = response.data.list;
            })
            .catch(error => {});
        // 服务统计

        // 企业中心--子账号日志动态
        var params = { uid: this.$route.params.user.uid, token: this.token };
        dynamicLog(params)
            .then(response => {
                console.log("dynamicLog", response);
                this.ynamicList = response.data;
            })
            .catch(error => {});
    },
    methods: {
        title() {
            // var echarts = require('echarts');
            // // 基于准备好的dom，初始化echarts实例
            // var myChart = echarts.init(document.getElementById('main'));
            // // 绘制图表
            // myChart.setOption({
            //     // title:{
            //     //     text: '服务统计',
            //     // },
            //        tooltip:{},
            //     xAxis: {
            //         data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
            //     },
            //     yAxis: {},
            //     series: [{
            //         name: '销量',
            //         type: 'bar',
            //         data: [5, 20, 36, 10, 10, 20],
            //     }]
            // });
        },
        editSubUser() {
            console.log("editSubUser");
            this.$router.push({
                name: "EditAccount",
                params: { user: this.$route.params.user }
            });
        },
        deleteSubUser() {
            this.$confirm("您确定要删除该子账号吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    var params = {
                        accountId: this.$route.params.user.uid,
                        token: this.token
                    };
                    deleteSubUser(params)
                        .then(response => {
                            this.$route.go(-1);
                            this.$message({
                                message: "删除成功",
                                type: "success"
                            });
                        })
                        .catch(error => {});
                })
                .catch(() => {});
        },
        // 时间戳转字符串
        dateFormat(time) {
            var d = new Date(time);
            var date =
                d.getFullYear() +
                "." +
                (d.getMonth() + 1) +
                "." +
                d.getDate() +
                " " +
                d.getHours() +
                ":" +
                d.getMinutes() +
                ":" +
                d.getSeconds();
            return date;
        }
    }
};
</script>
<style>
.clear {
    clear: both;
}

/* title标题 */
/* #son_details > .title {
    height: 53px;
    font-size: 14px;
    line-height: 53px;
    text-align: left;
    padding-left: 40px;
    padding-right: 40px;
    border-bottom: 1px solid #dee0e3;
}

#son_details > .title span {
    color: #8e9eaa;
} */

/* imglogo */

#son_details .son_count {
    text-align: left;
    margin-top: 40px;
}

#son_details .avatar {
    margin-left: 40px;
    float: left;
}

/* text */

#son_details .text {
    float: left;
    width: 75%;
    height: auto;
    /* background-color: aqua; */
    margin-left: 5%;
}

#son_details .text_name {
    padding: 20px 0 44px 0;
    border-bottom: 1px solid #e4e7ea;
}

#son_details .text_name > p:nth-child(1) {
    font-size: 16px;
    font-weight: bold;
}

#son_details .text_name > p:nth-child(2) {
    margin-top: 25px;
    font-size: 12px;
}

#son_details .text_name > p:nth-child(3) {
    margin-top: 10px;
    font-size: 12px;
}

/* logo */

#son_details .text_logo {
    height: 200px;
    /* background-color: bisque; */
    border-bottom: 1px solid #e4e7ea;
}

#son_details .text_logo > p:nth-child(1) {
    font-size: 14px;
    font-weight: bold;
    padding-top: 38px;
}

#son_details .text_logo_images,
#son_details .text_logo_into {
    float: left;
}

#son_details .text_logo_into {
    margin-top: 10px;
    margin-left: 5%;
}

#son_details .text_logo_into > p:nth-child(1) {
    font-size: 14px;
    font-weight: bold;
}

#son_details .text_logo_into > p:nth-child(2) {
    font-size: 12px;
    margin-top: 14px;
}

#son_details .text_logo_into > p:nth-child(3) {
    font-size: 12px;
    margin-top: 30px;
}

#son_details .text_logo_into > p:nth-child(3) > span:nth-child(2) {
    margin-left: 5%;
}

#son_details .text_logo_count {
    margin-top: 20px;
    font-size: 12px;
}

/* echatrs */

#son_details .son_echarts_title {
    width: 100%;
    height: 80px;

    /* background-color: aquamarine; */
}

#son_details .son_echarts_title > p:nth-child(1) {
    font-size: 14px;
    font-weight: bold;
    padding-top: 40px;
}

#son_details .son_echarts_ul {
    margin-top: 15px;
}

#son_details .son_echarts_ul > ul > li:nth-child(1) {
    float: left;
    font-size: 12px;
}

#son_details .son_echarts_ul > ul > li:nth-child(2) {
    float: right;
    font-size: 12px;
}

#son_details .son_echarts_ul > ul > li:nth-child(2) > a {
    color: #41b3f9;
}

#son_details .son_echarts {
    height: 375px;
    width: 100%;
    /* background-color: red; */
    border-bottom: 1px solid #e4e7ea;
}

/*动态 */

#son_details .son_dynamic > p:nth-child(1) {
    font-size: 14px;
    font-weight: bold;
    margin-top: 30px;
}

#son_details .son_state {
    height: 300px;
    margin-top: 25px;
    padding-bottom: 50px;
    border-bottom: 1px solid #dee0e3;
    font-size: 12px;
}

/* 按钮 */

#son_details .son_button {
    margin-top: 40px;
    padding-bottom: 68px;
}

#son_details .son_button > button {
    cursor: pointer;
}
</style>
