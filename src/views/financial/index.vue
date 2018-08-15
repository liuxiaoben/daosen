<template>
  <div id="financial">
    <div class="caiwuWrap">
      <el-container>
        <el-container>
          <el-aside width="240px" style="margin-right: 20px;min-height:666px;">
            <ul>
              <li v-for="item in sideNav" :key="item.name" @click="selectMapNav(item.title)" :class="{'active':$router.currentRoute.name == item.name}">
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
            isSelect: "交易记录",
            sideNav: [
                {
                    title: "交易记录",
                    url: "/financial/record",
                    name: "Record"
                },
                {
                    title: "应付款",
                    url: "/financial/shouldPay",
                    name: "ShouldPay"
                },
                {
                    title: "发票管理",
                    url: "/invoice",
                    name: "Invoice"
                },
                {
                    title: "优惠券",
                    url: "/coupons",
                    name: "Coupons"
                }
            ]
        };
    },
    created() {
        console.log(this.$router);
    },
    methods: {
        selectMapNav(title) {
            this.isSelect = title;
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss">
.content_list,
.coupons_content,
.coupons_content input,
.content_list button,
.content_list table,
.content_list input {
    font-size: 12px;
}
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
    padding: 30px 40px;
    background: #ffffff;
    border-radius: 5px;
}
.caiwuWrap .el-aside ul li a {
    display: block;
    font-size: 14px;
    color: #555;
    height: 48px;
    line-height: 48px;
    cursor: pointer;
    padding-left: 38px;
}
.caiwuWrap .el-aside ul li:nth-child(1) a {
    background: url(../../assets/images/nav1.png) no-repeat left;
}
.caiwuWrap .el-aside ul li:nth-child(2) a {
    background: url(../../assets/images/nav2.png) no-repeat left;
}
.caiwuWrap .el-aside ul li:nth-child(3) a {
    background: url(../../assets/images/nav3.png) no-repeat left;
}
.caiwuWrap .el-aside ul li:nth-child(4) a {
    background: url(../../assets/images/nav4.png) no-repeat left;
}
.caiwuWrap .el-aside ul li.active:nth-child(1) a,
.caiwuWrap .el-aside ul li:hover:nth-child(1) a {
    background: url(../../assets/images/nav_active1.png) no-repeat left;
}
.caiwuWrap .el-aside ul li.active:nth-child(2) a,
.caiwuWrap .el-aside ul li:hover:nth-child(2) a {
    background: url(../../assets/images/nav_active2.png) no-repeat left;
}
.caiwuWrap .el-aside ul li.active:nth-child(3) a,
.caiwuWrap .el-aside ul li:hover:nth-child(3) a {
    background: url(../../assets/images/nav_active3.png) no-repeat left;
}
.caiwuWrap .el-aside ul li.active:nth-child(4) a,
.caiwuWrap .el-aside ul li:hover:nth-child(4) a {
    background: url(../../assets/images/nav_active4.png) no-repeat left;
}
.caiwuWrap .el-aside ul li:hover a,
.caiwuWrap .el-aside ul li.active a {
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

.caiwuWrap .content_list {
    padding: 30px 40px;
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

/* 页面标题样式 */
#financial .caiwuWrap .grid-big-title {
    line-height: 55px;
    padding-left: 30px;
    font-size: 14px;
    color: #e60012;
    position: relative;
    border-bottom: 2px solid #e4e7ed;
}
// 添加伪类，做出下划线
#financial .caiwuWrap .grid-big-title::after {
    content: " ";
    display: block;
    width: 55px;
    height: 9px;
    background: url(../../assets/images/help-dbl.png) repeat-x center;
    position: absolute;
    bottom: 0;
}
#financial #coupons .grid-big-title::after {
    width: 70px;
}

#financial #addInvoice .grid-big-title::after{
    width: 84px;
}

// tab切换卡样式
#financial .caiwuWrap .el-tabs__active-bar {
    width: 55px;
    height: 9px;
    background: url(../../assets/images/tab_active2.png) no-repeat center;
}
#financial .caiwuWrap .el-tabs__item {
    height: 14px;
}
#financial .caiwuWrap .el-tabs__nav {
    line-height: 57px;
    padding: 0;
}

#financial .caiwuWrap .el-tabs__item {
    color: #333;
}

#financial .caiwuWrap .el-tabs__item.is-active {
    color: #e60012;
}

// #financial .el-tabs__active-bar {
//     background-color: #e60012;
//     min-width: 55px;
//     height: 9px;
//     background: url(../../assets/images/tab_active2.png) no-repeat center;
// }
#financial .caiwuWrap .el-tabs__nav-scroll {
    padding: 0 0 0 30px;
}
#financial .caiwuWrap .el-tabs__nav-wrap::after {
    background-color: #e4e7ed;
}
#financial .caiwuWrap .el-tabs__header {
    margin: 0;
}
</style>


