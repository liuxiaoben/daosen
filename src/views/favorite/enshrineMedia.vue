<template>
  <div class="sc">
    <div class="title">我收藏的媒体</div>

    <div class="sc-body media_title">

      <!-- <p class="ziyuan" style="float: left;font-size:12px;">资源大类</p>
      <ul class="" style="height: auto;margin-bottom: 10px;font-size:12px;overflow:auto;padding-top:5px;">
        <li :class="{active:firstClass==0}" style="cursor:pointer">
          全部
        </li>
        <li :class="{active:firstClass==first.mtype_id}" v-for="(first,index) in firstLevel" @click="choiceFirstLevel(first.mtype_id)" style="cursor:pointer" :key="first,index">
          {{first.name}}
        </li>
      </ul> -->
      <!-- <div style="height:20px;"></div> -->
      <!-- <p class="ziyuan" style="float: left;font-size:12px;">资源分类</p>

      <ul class="" style="height: auto;margin-bottom: 10px;font-size:12px;overflow:auto;padding-top:5px;">
        <li :class="{active:secondClass==0}" @click="choiceSecondLevel(0)" style="cursor:pointer">
          全部
        </li>
        <li :class="{active:secondClass==second.mtype_id}" v-for="(second,index) in secondLevel" @click="choiceSecondLevel(second.mtype_id)" style="cursor:pointer" :key="second,index">
          {{second.name}}
        </li>
      </ul> -->
      <!-- <div style="height:20px;"></div> -->
      <!-- <p class="ziyuan" style="float: left;font-size:12px;">资源类型</p>
      <el-button @click="clickme()" style="float:right;font-size:12px;background:#edf1f5;padding:0px 20px;height:23px;line-height:23px;border-radius:0px;border:0px;">展开 <img src="../../assets/images/opendown.png" style="margin-bottom: -3px;" /></el-button>
      <ul :class="onoff?'auto':'no_auto'" style="height: 30px;font-size:12px;overflow:hidden;padding-top:5px;width:87%;margin-right:0px;">
        <li :class="{active:threeClass==0}" @click="choiceThreeLevel(0)" style="cursor:pointer">
          全部
        </li>
        <li :class="{active:threeClass==three.mtype_id}" v-for="(three,index) in threeLevel" @click="choiceThreeLevel(three.mtype_id)" style="cursor:pointer" :key="three,index">
          {{three.name}}（{{three.num}}）
        </li>
      </ul> -->

      <el-form :inline="true" :model="formInline" class="inlineForm">
        <el-form-item label="关键字">
          <el-input v-model="keywords" placeholder="搜索媒体资源"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="tableData1" style="width: 100%">
        <el-table-column prop="image" label="图片" width="200">
          <template slot-scope="scope">
            <img :src="scope.row.image" @error="imgError(scope.row)">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" width="150">
        </el-table-column>
        <el-table-column prop="types" label="类型" width="220">
        </el-table-column>
        <el-table-column prop="describe" label="描述">
          <template slot-scope="scope">
            <div class="ccc">
              {{scope.row.content}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="types" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.mtype_id)" type="text" size="small">查看详情</el-button>
            <el-button @click="cancelClick(scope.row.fav_id)" type="text" size="small">取消收藏</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="page-wrap fystyle" align="right" style="margin-top: 30px;margin-right:4%;">
        <div class="inner">
          <a v-if="pageNum>1" @click="setPage(pageNum-1)">
            <i class="fa fa-angle-left"></i>
          </a>
          <a :class="{active:index==pageNum}" v-for='index in pageShow' @click="setPage(index)" :key="index">{{index}}</a>
          <a v-if="pages>pageNum" @click="setPage(pageNum-1)">
            <i class="fa fa-angle-right"></i>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { getType } from "../../api/enshrineMedia";
import { getTypeByPid } from "../../api/enshrineMedia";
import { favList } from "../../api/enshrineMedia";
import { favSearch } from "../../api/enshrineMedia";
import { cancel } from "../../api/enshrineMedia";
export default {
    data() {
        return {
            formInline: {
                user: ""
            },
            pageNum: 1,
            pageSize: 7,
            level: 1,
            firstClass: 0,
            secondClass: 0,
            threeClass: 0,
            firstLevel: [],
            secondLevel: [],
            threeLevel: [],
            allCount: 0,
            activeName: "first",
            activeName2: "first",
            tableData1: [
              {
                name: "阿牛"
              }
            ],
            keywords: "",
            pageShow: [],
            pages: 1,
            onoff: ""
        };
    },
    methods: {
        imgError(logo) {
            logo.image = require("../../assets/images/home-mediaImg2.png");
        },
        clickme() {
            if (this.onoff) {
                this.onoff = false;
            } else {
                this.onoff = true;
            }
        },
        comList(pageNum, pageSize, mtype_id) {
            favList(
                this.$store.getters.token,
                this.$store.getters.uid,
                pageNum,
                pageSize,
                mtype_id
            ).then(response => {
                this.tableData1 = [];
                if (
                    response.msgCode == "1000" &&
                    response.data &&
                    response.data.list
                ) {
                    for (var i = 0; i < response.data.list.length; i++) {
                        var dataObject = {};
                        dataObject.image = response.data.list[i].logo;
                        dataObject.name = response.data.list[i].name;
                        dataObject.types = response.data.list[i].mediaTypeName;
                        dataObject.describe = response.data.list[i].content;
                        dataObject.mtype_id = response.data.list[i].mtype_id;
                        dataObject.fav_id = response.data.list[i].fav_id;
                        this.tableData1.push(dataObject);
                    }
                    if (
                        response.data.pageNum + 2 < response.data.pages &&
                        response.data.pageNum > 3
                    ) {
                        this.pageShow = [
                            response.data.pageNum - 2,
                            response.data.pageNum - 1,
                            response.data.pageNum,
                            response.data.pageNum + 1,
                            response.data.pageNum + 2
                        ];
                    } else if (response.data.navigatepageNums.length < 5) {
                        this.pageShow = response.data.navigatepageNums;
                    } else if (
                        response.data.pageNum + 2 >= response.data.pages &&
                        response.data.navigatepageNums.length > 4
                    ) {
                        this.pageShow = [
                            response.data.pages - 4,
                            response.data.pages - 3,
                            response.data.pages - 2,
                            response.data.pages - 1,
                            response.data.pages
                        ];
                    } else if (
                        response.data.pageNum < 4 &&
                        response.data.navigatepageNums.length > 5
                    ) {
                        this.pageShow = [1, 2, 3, 4, 5];
                    }

                    this.pageNum = response.data.pageNum;
                    this.pages = response.data.pages;
                }
            });
        },
        //点击查询
        onSubmit() {
            var keywords = this.keywords;
            this.firstClass = 0;
            this.secondClass = 0;
            this.threeClass = 0;
            if (keywords) {
                favSearch(
                    this.$store.getters.token,
                    this.$store.getters.uid,
                    1,
                    7,
                    keywords
                ).then(response => {
                    this.tableData1 = [];
                    if (
                        response.msgCode == "1000" &&
                        response.data &&
                        response.data.list
                    ) {
                        for (var i = 0; i < response.data.list.length; i++) {
                            var dataObject = {};
                            dataObject.image = response.data.list[i].logo;
                            dataObject.name = response.data.list[i].name;
                            dataObject.types =
                                response.data.list[i].mediaTypeName;
                            dataObject.describe = response.data.list[i].content;
                            dataObject.mtype_id =
                                response.data.list[i].mtype_id;
                            dataObject.fav_id = response.data.list[i].fav_id;
                            this.tableData1.push(dataObject);
                        }
                    }
                });
            }
        },
        //点击分页
        setPage: function(page) {
            var keywords = this.keywords;
            this.comList(page, this.pageSize, this.threeClass);
        },
        handleClick(mtype_id) {
            this.$router.push("/media/mediaDetail/" + mtype_id);
        },
        //取消收藏
        cancelClick(fav_id) {
            cancel(this.$store.getters.token, fav_id).then(response => {
                if (response.msgCode == "1000") {
                    this.$router.go("favorite/enshrineMedia");
                }
            });
        },
        //切换以及分类时
        choiceFirstLevel: function(mtype_id) {
            this.firstClass = mtype_id;
            //获取二级分类
            getTypeByPid(this.$store.getters.uid, mtype_id).then(response => {
                if (response.msgCode == "1000") {
                    this.secondLevel = response.data;
                    this.secondClass = this.secondLevel[0].mtype_id;
                    //通过父id获取媒体类型及统计数据
                    getTypeByPid(
                        this.$store.getters.uid,
                        this.secondLevel[0].mtype_id
                    ).then(response => {
                        if (response.msgCode == "1000") {
                            this.threeLevel = response.data;
                            this.threeClass = this.threeLevel[0].mtype_id;
                            //根据媒体类型id 获取收藏的媒体列表
                            this.comList(
                                this.pageNum,
                                this.pageSize,
                                this.threeLevel[0].mtype_id
                            );
                        }
                    });
                }
            });
        },
        //切换二级分类
        choiceSecondLevel: function(mtype_id) {
            this.secondClass = mtype_id;
            if (mtype_id == 0) {
                if (this.firstClass == 0) {
                    return false;
                }
                this.threeClass = 0;
                //根据媒体类型id 获取收藏的媒体列表
                this.comList(this.pageNum, this.pageSize, this.firstClass);
            } else {
                //获取三级分类
                getTypeByPid(this.$store.getters.uid, mtype_id).then(
                    response => {
                        if (response.msgCode == "1000") {
                            this.threeLevel = response.data;
                            this.threeClass = this.threeLevel[0].mtype_id;
                            //根据媒体类型id 获取收藏的媒体列表
                            this.comList(
                                this.pageNum,
                                this.pageSize,
                                this.threeLevel[0].mtype_id
                            );
                        }
                    }
                );
            }
        },
        //切换三级分类
        choiceThreeLevel: function(mtype_id) {
            this.threeClass = mtype_id;
            if (mtype_id == 0) {
                if (this.secondClass == 0) {
                    if (this.firstClass == 0) {
                        return false;
                    }
                    //根据媒体类型id 获取收藏的媒体列表
                    this.comList(this.pageNum, this.pageSize, this.firstClass);
                } else {
                    //根据媒体类型id 获取收藏的媒体列表
                    this.comList(this.pageNum, this.pageSize, this.secondClass);
                }
            }

            //根据媒体类型id 获取收藏的媒体列表
            this.comList(this.pageNum, this.pageSize, mtype_id);
        }
    },
    mounted() {
        //一级分类
        getType(this.$store.getters.uid, this.level).then(response => {
            if (response.msgCode == "1000") {
                this.firstLevel = response.data;
                this.firstClass = this.firstLevel[0].mtype_id;
                //通过父id获取媒体类型及统计数据
                getTypeByPid(
                    this.$store.getters.uid,
                    this.firstLevel[0].mtype_id
                ).then(response => {
                    this.allCount = 0;
                    if (response.msgCode == "1000") {
                        this.secondLevel = response.data;
                        this.secondClass = this.secondLevel[0].mtype_id;
                        //通过父id获取媒体类型及统计数据
                        getTypeByPid(
                            this.$store.getters.uid,
                            this.secondLevel[0].mtype_id
                        ).then(response => {
                            if (response.msgCode == "1000") {
                                this.threeLevel = response.data;
                                this.threeClass = this.threeLevel[0].mtype_id;
                                //根据媒体类型id 获取收藏的媒体列表
                                this.comList(
                                    this.pageNum,
                                    this.pageSize,
                                    this.threeLevel[0].mtype_id
                                );
                            }
                        });
                    }
                });
            }
        });
    }
};
</script>
<style>
.el-container > .el-main {
    background: #ffffff;
    border-radius: 6px;
    padding: 0px;
}

.sc-body {
    padding: 33px;
}

/* .sc-title {
    height: 53px;
    line-height: 54px;
    padding: 0px 33px;
    font-size: 14px;
    color: #666666 !important;
    border-bottom: 1px solid #eeeeee;
    text-align: left;
} */

.sc-dz {
    text-align: left;
}

.sc-dz .el-input {
    width: 413px;
}

.sc-dz > a {
    width: 75px;
    height: 35px;
    background: #c1cad7;
    color: #ffffff;
    display: inline-block;
    margin-left: 13px;
    line-height: 35px;
    text-align: center;
    border-radius: 6px;
}

.sc-body > .el-tabs--border-card {
    box-shadow: none;
    border: none;
}

.sc-body > .el-tabs--border-card > .el-tabs__header {
    border-bottom: none;
    background: #edf1f5 !important;
}

.sc-body .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2),
.el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
.el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
.el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    border: none;
}

.sc-body .inlineForm {
    /* margin-top: 20px; */
}

.sc-body .inlineForm .el-input {
    width: 400px;
}

.sc-body .el-form .el-form-item__content .el-button {
    width: 80px;
    line-height: 32px;
    border-color: #e60012;
    padding: 0px;
    text-align: center;
    background: #e60012;
    color: #fff;
}

.sc-body .el-tabs__nav > .is-active {
    border-top: 2px solid #e60012 !important;
    border-left: none;
    border-right: none;
    color: #ff7676 !important;
}
.sc-body .el-tabs--border-card > .el-tabs__header .el-tabs__item:hover {
    color: #ff7676 !important;
}

.sc-body .cell > img {
    width: 94px;
    height: 61px;
    border-radius: 6px;
    /* background:url(../../assets/images/home-mediaImg2.png); */
    background-size: 100% 100%;
}

.sc-body .el-table {
    border-radius: 6px;
    border: 1px solid #e4e7ea;
    font-size: 12px;
}

.sc-body .cell {
    text-align: left;
}

.sc-body > .el-tabs > .el-tabs__content > .el-tab-pane .el-tabs__header {
    border: none !important;
    background: #edf1f5 !important;
}

.sc-body .is-hidden {
    background: #edf1f5 !important;
}

.sc-body > .el-tabs > .el-tabs__content > .el-tab-pane .el-tabs__item {
    border: none !important;
    height: 30px;
    line-height: 30px;
}

.sc-body > .el-tabs > .el-tabs__content > .el-tab-pane .el-tabs__nav {
    border: none !important;
}

.sc-body > .el-tabs > .el-tabs__content > .el-tab-pane .is-active > span {
    display: inline-block;
    background: #ff7676;
    color: #ffffff;
    border-radius: 15px;
    padding: 0px 10px;
}

.sc-body .el-table__body > tbody > tr:nth-child(even) {
    background: #f9fcfe !important;
}

.media_title > ul > li {
    float: left;
    margin: 0 1.5%;
    padding: 5px 10px;
    border-radius: 20px;
    margin-top: -5px;
    margin-bottom: 20px;
    cursor: pointer;
}
.media_title li:hover {
    color: #ffffff !important;
    background: #ff7676 !important;
}
.media_title .active {
    color: #ffffff !important;
    background: #ff7676 !important;
}
.media_title .ziyuan {
    margin-right: 1%;
    margin-top: 5px;
}
.media_title .el-table_1_column_4 .cell {
    overflow-y: auto;
    height: 40px;
}
.fystyle .inner .active {
    background: #edf1f5 !important;
    color: #40b6ff !important;
}
.auto {
    height: auto !important;
}
.sc-body .el-table__header .has-gutter tr {
    background: #edf1f5;
}
.ccc {
    overflow-y: auto;
    width: 90%;
    height: 40px;
    /* overflow: hidden; */
}
</style>


