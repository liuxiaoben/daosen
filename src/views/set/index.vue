<template>
  <div id="Set">
    <div class="caiwuWrap xitongWrap">

      <el-container>

        <el-container>
          <el-aside width="240px" style="margin-right: 20px;">
            <!-- <ul>
              <li><router-link tag="li" to="/set/system"><i class="the-icon" type="system" size="i2"></i>系统设置</router-link></li>
              <li><router-link tag="li" to="/set/operationlog"><i class="the-icon" type="system" size="i1"></i>操作日志</router-link></li>
            </ul> -->
            <ul class="">
              <li v-for="item in sideNav" @click="selectMapNav(item.title)" :class="{'active': isSelect == item.title}">
                <router-link :to="item.url">{{ item.title }}</router-link>
              </li>
            </ul>
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
export default {
    data() {
        return {
            isSelect: "系统设置",
            sideNav: [
                {
                    title: "系统设置",
                    url: "/set/system"
                },
                {
                    title: "操作日志",
                    url: "/set/operationlog"
                }
            ]
        };
    },
    methods: {
        selectMapNav(title) {
            this.isSelect = title;
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

.caiwuWrap ul li {
    color: black;
}

.caiwuWrap .el-aside ul li a {
    display: block;
    font-size: 14px;
    color: #555555;
    height: 48px;
    line-height: 48px;
    cursor: pointer;
    padding-left: 38px;
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
.xitongWrap .el-aside ul li:nth-child(1) a {
    background: url(../../assets/images/ico_03.png) no-repeat left;
}
.xitongWrap .el-aside ul li:nth-child(2) a {
    background: url(../../assets/images/ico_07.png) no-repeat left;
}
.xitongWrap .el-aside ul li.active:nth-child(1) a,
.xitongWrap .el-aside ul li:hover:nth-child(1) a {
    background: url(../../assets/images/icon_34.png) no-repeat left;
}
.xitongWrap .el-aside ul li.active:nth-child(2) a,
.xitongWrap .el-aside ul li:hover:nth-child(2) a {
    background: url(../../assets/images/ico_09.png) no-repeat left;
}
.xitongWrap .el-aside ul li:hover a,
.xitongWrap .el-aside ul li.active a {
    color: #e60012;
}
#Set .xitongWrap .title{
line-height: 55px;
    padding-left: 30px;
    font-size: 14px;
    color: #e60012;
    position: relative;
    border-bottom: 2px solid #e4e7ed;
}
/* 添加伪类，做出下划线 */
#Set .xitongWrap .title::after {
    content: " ";
    display: block;
    width: 55px;
    height: 9px;
    background: url(../../assets/images/help-dbl.png) repeat-x center;
    position: absolute;
    bottom: 0;
}
</style>
