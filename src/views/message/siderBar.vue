<template>
  <div>
    <div class="caiwuWrap xxwrap">

      <el-container>

        <el-container>
          <el-aside width="240px" style="margin-right: 20px;">
            <ul>
              <li>
                <router-link tag="a" to="/message/list">全部消息（{{allCount}}）</router-link>
              </li>
              <li>
                <router-link tag="a" to="/message/unread">未读消息（{{unreadCount}}）</router-link>
              </li>
              <li>
                <router-link tag="a" to="/message/read">已读消息（{{readCount}}）</router-link>
              </li>
            </ul>

            <!-- <ul class="">
              <li v-for="item in sideNav" @click="selectMapNav(item.title)" :class="{'active': isSelect == item.title}">
                <router-link :to="item.url">{{ item.title }}</router-link>
              </li>
            </ul> -->

          </el-aside>
          <el-container>

            <el-main>
              <router-view></router-view>
            </el-main>



          </el-container>
        </el-container>
      </el-container>

    </div>

  </div>
</template>

<script>
import { messageCount } from "../../api/message";
export default {
    data() {
        return {
            allCount: 0,
            readCount: 0,
            unreadCount: 0
        };
    },
    created() {
        //this.getCount()
    },
    methods: {
        getCount() {
            messageCount(this.$store.getters.token).then(response => {
                this.allCount = response.data.allCount;
                this.readCount = response.data.readCount;
                this.unreadCount = response.data.unreadCount;
            });
        }
    }
};
</script>

<style>
.caiwuWrap .el-header,
.caiwuWrap .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
}
.caiwuWrap {
    margin: 31px 0 42px;
}
.caiwuWrap .el-aside {
    background-color: #fff;
    color: #333;
    /*text-align: center;*/
    line-height: 44px;
    border-radius: 5px;
}
.caiwuWrap .el-aside ul {
    padding: 28px 40px;
    background: #ffffff;
    border-radius: 5px;
}
.caiwuWrap .el-aside ul li {
    font-size: 14px;
    color: #555555;
    height: 48px;
    line-height: 48px;
    cursor: pointer;
}
.caiwuWrap .el-aside ul li:hover,
.caiwuWrap .el-aside ul li.active {
    color: #e60012;
}
.caiwuWrap .el-main {
    background-color: #fff;
    color: #333;
    /*text-align: center;*/
    line-height: 10px;
    border-radius: 5px;
    padding: 0;
}

.caiwuWrap .el-container {
    /*margin-bottom: 40px;*/
}

.caiwuWrap .el-container:nth-child(5) .el-aside,
.caiwuWrap .el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.caiwuWrap .el-container:nth-child(7) .el-aside {
    line-height: 320px;
}

.caiwuWrap .caiwuWrap ul li {
    color: black;
}
.caiwuWrap .grid-big-title {
    font-size: 14px;
    color: #555555;
    line-height: 54px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e4e7ea;
    position: relative;
    padding: 0 30px;
}
.caiwuWrap .content_list {
    padding: 34px 27px 30px 48px;
}
.caiwuWrap .el-table {
    border: 1px solid #e4e7ea;
    border-radius: 5px;
    margin-bottom: 30px;
    /*margin-top: 30px;*/
}
.caiwuWrap .el-table__header .has-gutter tr th {
    background: #edf1f5;
}
/*头部*/
.caiwuWrap .el-tabs__nav-scroll {
    padding: 20px 30px 0;
}
.caiwuWrap .el-tabs__header {
    margin: 0;
}
.caiwuWrap .el-tabs__item {
    height: 14px;
    line-height: 14px;
}
.caiwuWrap .transaction_records .el-tabs__nav {
    padding-bottom: 20px;
}
.caiwuWrap i {
    margin-bottom: -3px;
    margin-right: 5px;
}
.xxwrap .el-aside ul li a {
    display: block;
    font-size: 14px;
    color: #555555;
    height: 48px;
    line-height: 48px;
    cursor: pointer;
    padding-left: 38px;
}
.xxwrap .el-aside ul li:nth-child(1) a {
    background: url(../../assets/images/ico_14.png) no-repeat left;
}
.xxwrap .el-aside ul li:nth-child(2) a {
    background: url(../../assets/images/ico_20.png) no-repeat left;
}
.xxwrap .el-aside ul li:nth-child(3) a {
    background: url(../../assets/images/ico_26.png) no-repeat left;
}
.xxwrap .el-aside ul li:nth-child(1) .router-link-active,
.xxwrap .el-aside ul li:hover:nth-child(1) a {
    background: url(../../assets/images/ico_16.png) no-repeat left;
}
.xxwrap .el-aside ul li:nth-child(2) .router-link-active,
.xxwrap .el-aside ul li:hover:nth-child(2) a {
    background: url(../../assets/images/ico_22.png) no-repeat left;
}
.xxwrap .el-aside ul li:nth-child(3) .router-link-active,
.xxwrap .el-aside ul li:hover:nth-child(3) a {
    background: url(../../assets/images/ico_27.png) no-repeat left;
}
.xxwrap .el-aside ul li:hover a,
.xxwrap .el-aside ul li .router-link-active {
    color: #e60012;
}


/* 无数据加背景色 */

.qbxx-body{
  position: relative;
}
.bgimg{
  width: 100%;
  min-height: 800px;
  z-index: 1000;
  background: url(../../assets/images/warning.png) no-repeat center center;
  position: absolute;
  top: 0;
  left: 0;
}
.bgimg p{
  font-size: 18px;
  color: #40b6ff;
  font-weight: bold;
  text-align: center;
  margin-top: 250px;
}

</style>
