<template>
  <div id="advertisingStrategyDatail">
    <!-- tab 标签 -->
    <el-row class="title">
      <el-tabs v-model="activeName1" @tab-click="handleClick">
        <el-tab-pane label="策略详情" name="first">
          <span slot="label" class="strategySpan">策略详情</span>

          <!-- 策略详情折叠菜单 -->
          <el-row class="detailForm">
            <el-collapse v-model="activeName2" accordion>
              <el-collapse-item title="策略信息" name="1" class="strategyInfo">

                <el-row class="strategyTitle">策略信息</el-row>
                <el-row>
                  <el-col :span="12">
                    <h3>策略名称：</h3>
                    <span>{{ title }}</span>
                  </el-col>
                  <el-col :span="12">
                    <h3>预　　算：</h3>
                    <span>{{ budget }}元</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <h3>投放时间：</h3>
                    <span>{{ beginDate }}-{{ endDate }}</span>
                  </el-col>
                  <el-col :span="12">
                    <h3>备　　注：</h3>
                    <span>原型设计</span>
                  </el-col>
                </el-row>

                <el-row class="strategyTitle addstrategyTitle">企业信息</el-row>
                <el-row>
                  <el-col :span="12">
                    <h3>企业名称：</h3>
                    <span>{{ ename }}</span>
                  </el-col>
                  <el-col :span="12">
                    <h3>行　　业：</h3>
                    <span>{{ industryName }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <h3>联&nbsp;系&nbsp;人：</h3>
                    <span>{{ linkman }}</span>
                  </el-col>
                  <el-col :span="12">
                    <h3>联系方式：</h3>
                    <span>{{ phone }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <h3>品　　牌：</h3>
                  <span>{{ brand }}</span>
                </el-row>

                <!-- 目的 -->
                <el-row class="strategyTitle addstrategyTitle">目　　的</el-row>
                <el-row>
                  <el-col :span="12">
                    <h3>目　　的：</h3>
                    <span>自定义</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col v-for=" list1 in purposesData" :key="list1.id">
                    <el-col v-for="list2 in list1.children" :key="list2.id">
                      <strong>{{ list2.name }}</strong>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row class="strategyTitle addstrategyTitle">投放区域</el-row>
                <el-tree :data="cityTree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
              </el-collapse-item>

              <!-- 受众 -->
              <el-collapse-item title="受众" name="2" class="audience">

                <el-row class="audienceTitle">基本属性</el-row>
                <el-row>
                  <el-col v-for="list1 in tableData" :key="list1.id">
                    <div class="dataStyle">
                      <strong>{{ list1.name }}</strong>
                    </div>
                    <div class="dataStyle">
                      <el-col v-for="list2 in list1.childs" :key="list2.id">
                        <div class="dataStyle">{{list2.name}} 等级：</div>
                        <div class="dataStyle">
                          <span style="color:red;">{{list2.value}}</span>
                        </div>
                      </el-col>
                    </div>
                  </el-col>
                </el-row>
              </el-collapse-item>

              <el-collapse-item title="媒体偏好" name="3" class="media">
                <el-row class="add-margin">
                  <!-- <el-row class="strategyTitle-text add-margin"> -->
                  <el-row class="media-title">
                    <el-col :span="3" :offset="1">
                      <el-rate v-model="value5" disabled show-score text-color="#e60012;" score-template="{value}">
                      </el-rate>
                    </el-col>
                    <el-col :span="20" class="media-text">
                      温馨提示：红色填充的星星个数越多，喜好程度越高，最高5个。
                    </el-col>
                  </el-row>
                  <!-- 线上 线下  非标 -->
                  <!-- 线上 -->
                  <el-row class="media-title-margin">
                    <el-col v-for="likes in likesData" :key="likes.id">
                      <div class="dataStyle">{{likes.label}}</div>
                      <div class="dataStyle">
                        <el-col v-for="likes2 in likes.children" :key="likes2.id">
                          <div class="dataStyle">{{likes2.label}}</div>
                          <div class="dataStyle">
                            <el-col v-for="like3 in likes2.children" :key="like3.id">
                              <div class="dataStyle">
                                {{like3.label}}
                              </div>
                              <div>
                                <el-rate v-model="like3.score" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
                              </div>
                            </el-col>
                          </div>
                        </el-col>
                      </div>
                    </el-col>
                  </el-row>
                </el-row>
              </el-collapse-item>
              <!-- 策略动态 -->
              <el-collapse-item title="策略动态" name="4" class="stDynamic">
                <el-row>
                  <el-form ref="form" :model="form" class="demo-form-inline" :inline="true">
                    <el-form-item>
                      <el-date-picker v-model="value1" type="date" :editable="false" placeholder="选择时间">
                      </el-date-picker> -
                      <el-date-picker v-model="value2" type="date" :editable="false" placeholder="选择时间">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="danger" size="small">搜索</el-button>
                    </el-form-item>
                  </el-form>
                </el-row>
                <div class="detailNotice">
                  <el-row class="strategyPush">
                    <el-col :span="1">
                      <img src="../../assets/images/user-02.png" alt="">
                    </el-col>
                    <el-col :span="21" class="info">
                      <p class="userName">kitty</p>
                      <p>
                        <span>
                          <strong>策略推送：</strong>
                        </span>
                        <span>您已成功将该策略推送给服务公司 道森媒体</span>
                      </p>
                    </el-col>
                    <el-col :span="2" class="time">2018-06-08</el-col>
                  </el-row>
                  <el-row class="orderPush">
                    <el-col :span="1">
                      <img src="../../assets/images/user-01.png" alt="">
                    </el-col>

                    <el-col :span="21" class="info">
                      <p class="userName">kitty</p>
                      <p>
                        <span>
                          <strong>订单推送：</strong>
                        </span>
                        <span>服务公司道森媒体向您推送了订单【
                          <span>DF201805140618</span>】 </span>
                      </p>

                    </el-col>
                    <el-col :span="2" class="time">2018-06-08</el-col>
                  </el-row>
                  <el-row class="strategyPush">
                    <el-col :span="1">
                      <img src="../../assets/images/user-02.png" alt="">
                    </el-col>
                    <el-col :span="21" class="info">
                      <p class="userName">kitty</p>
                      <p>
                        <span>
                          <strong>策略推送：</strong>
                        </span>
                        <span>您已成功将该策略推送给服务公司 道森媒体</span>
                      </p>
                    </el-col>
                    <el-col :span="2" class="time">2018-06-08</el-col>
                  </el-row>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-row>

  </div>
</template>

<script >
//引入封装
import { details } from "../../api/advertisingStrategy";
export default {
    data() {
        return {
            //定义返回数据
            title: "",
            budget: "",
            beginDate: "",
            endDate: "",
            ename: "",
            linkman: "",
            phone: "",
            industry: "",
            industryName: "",
            brand: "",
            audiences: "",
            purposes: "",
            tableData: [],
            cityTree: [],
            //评分
            likesData: [],
            //目的
            purposesData: [],

            //---------------
            activeName1: "first",
            activeName2: "1",
            activeName3: "",
            form: "",
            value1: "",
            value2: "",
            show3: true,
            value5: 3.7,
            form: {
                model: ""
            },
            data: [
                {
                    id: 1,
                    label: "湖北省",
                    children: [
                        {
                            id: 2,
                            label: "武汉市",
                            children: [
                                {
                                    id: 3,
                                    label: "洪山区/江夏区/东湖高新技术开发区"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 4,
                    label: "湖南省",
                    children: [
                        {
                            id: 5,
                            label: "洪湖市",
                            children: [
                                {
                                    id: 6,
                                    label: "洪山区/江夏区/东湖高新技术开发区"
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: "children",
                label: "label"
            }
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleNodeClick(data) {
            console.log(data);
        }
    },

    //业务逻辑

    //钩子函数

    created() {
        //接收从广告策略带过来的ID
        let strId = this.$route.query.strId;
        console.log(strId);
        const detailsToken = {
            token: this.$store.getters.token,
            strId //这个时候直接写入这个变量，因为ID已经拿到了
        };
        details(detailsToken)
            .then(response => {
                let info = response.data;
                // console.log(response.data);
                // this.strId = info.strId;
                this.title = info.title;
                this.budget = info.budget;
                this.beginDate = info.beginDate;
                this.endDate = info.endDate;
                this.ename = info.ename;
                this.linkman = info.linkman;
                this.phone = info.phone;
                this.industry = info.industry;
                this.industryName = info.industryName;
                this.brand = info.brand;
                this.audiences = info.audiences;
                //目的
                this.purposesData = [];
                this.purposesData = response.data.purposes;
                console.log(this.purposesData);
                //受众
                this.tableData = [];
                this.tableData = response.data.audiences;
                //树形
                this.cityTree = [response.data.areas];
                console.log(this.cityTree);
                //评分
                this.likesData = [];
                this.likesData = response.data.likes;
                console.log(this.likesData);
            })
            .catch(() => {
                this.loading = false;
            });
    }
};
</script>



<style rel="stylesheet/scss" lang="scss">
#advertisingStrategyDatail {
    max-width: 1710px;
    min-width: 900px;
    margin-top: 30px;
    height: auto;
    border-radius: 5px;
    background-color: #fff;
}
/* 去掉外层边框 */
#advertisingStrategyDatail .el-collapse,
.el-collapse-item__header,
.el-collapse-item__wrap {
    border: none;
}

/* 标题 */
#advertisingStrategyDatail .title {
    line-height: 57px;
    font-size: 14px;
    color: #333;
}
#advertisingStrategyDatail .title .el-tabs__header {
    margin: 0;
    padding-left: 30px;
    border-bottom: 2px solid #e4e7ed;
    position: relative;
}

// 去掉默认底部横线
#advertisingStrategyDatail .el-tabs__nav-wrap::after {
    height: 0;
}
#advertisingStrategyDatail .title .rightButton {
    margin-top: 12px;
    position: absolute;
    right: 30px;
    z-index: 1;
}
#advertisingStrategyDatail .title .el-tabs__item {
    color: #e60012;
}
#advertisingStrategyDatail .title .el-tabs__active-bar {
    height: 9px;
    background: url(../../assets/images/help-dbl.png) no-repeat center;
}

/* 折叠菜单 */
#advertisingStrategyDatail .detailForm {
    margin: 10px 60px;
}
/* 折叠菜单子项 */
#advertisingStrategyDatail .detailForm .el-collapse-item {
    margin: 20px auto;
    border: 1px solid #edf1f5;
    border-radius: 5px;
}

/* 折叠菜单子项内部 */
#advertisingStrategyDatail .detailForm .el-collapse-item__content {
    border-top: 1px solid #edf1f5;
    padding: 20px 30px;
}
/* 折叠菜单头部 */
#advertisingStrategyDatail .detailForm .el-collapse-item__header {
    padding: 0 15px;
    font-size: 16px;
    font-weight: 800;
    background-color: #fafafa;
}

/* 策略信息 */
.el-collapse .strategyInfo h3 {
    display: inline-block;
    font-weight: 600;
}
.strategyInfo .el-row {
    margin: 10px 0;
}
.strategyInfo .strategyTitle {
    font-size: 14px;
    font-weight: 800;
}
.strategyInfo .addstrategyTitle {
    margin-top: 50px;
}
.strategyInfo .el-tree-node__expand-icon {
    color: red;
}

/* 受众 */
.audience {
    margin-top: 100px;
}
.audienceTitle {
    font-size: 14px;
    font-weight: 800;
}
.audience-title-head {
    margin-top: 15px;
    font-weight: 600;
}
.audience-title-text {
    margin-top: 15px;
    color: #333;
}
.audience-title-text-color {
    color: #e60012;
}

/* 媒体偏好 */
.media {
    margin-top: 100px;
}
.media-title {
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    background-color: #fafdff;
}
.media-title .el-rate {
    margin-top: 5px;
}
.media-title .el-rate__text {
    display: none;
}
.media-title-margin {
    margin-top: 30px;
}
.media-text {
    color: #67c4fe;
}
.media-line {
    font-weight: 600;
}
.media-stars {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-image: url(../../assets/images/media-stars.png);
    background-size: cover;
    background-repeat: no-repeat;
}
.media-score {
    color: #e60012;
}
.media-margin {
    margin-top: 20px;
}

/* 策略动态 */
.stDynamic .el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 150px;
}
.stDynamic .el-form-item {
    margin-bottom: 10px;
}
.detailNotice .el-row {
    height: 72px;
    margin: 10px 0;
}
.detailNotice .info {
    padding: 12px 0;
}
/* 用户图片 */
.detailNotice .el-col-1 {
    width: 72px;
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.detailNotice img {
    width: 36px;
    border-radius: 50%;
}
.detailNotice .userName,
.detailNotice .time {
    color: #acacac;
}
.detailNotice .time {
    position: absolute;
    right: 0;
    bottom: 12px;
}
.detailNotice .orderPush {
    background-color: #f8f8f8;
    margin-left: 72px;
}
.detailNotice .orderPush img {
    border-radius: 5px;
    box-sizing: content-box;
    padding: 5px;
    background-color: #fff;
}
.detailNotice .orderPush .time {
    right: 20px;
}
/* addStyle */
.dataStyle {
    float: left;
    padding-right: 20px;
}
</style>
