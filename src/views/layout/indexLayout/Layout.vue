<template>
  <div id="layout" style="height:100%">
    <!-- nav -->
    <el-header>
      <div class="header" style="min-width:1200px;">
        <span style="margin-right:20px;">
          <a href="#" class="logo">
            <span class="brand"></span>广告主服务中心
          </a>
        </span>
        <el-menu :default-active="activeIndex" class="header-nav" mode="horizontal" @select="handleSelect" background-color="#30333f" text-color="#fff" active-text-color="#f00">
          <el-menu-item index="1" class="fll">
            <router-link to="/index">我的主页</router-link>
          </el-menu-item>
          <el-menu-item index="2" class="fll">
            <router-link to="/advertisingStrategy">广告策略</router-link>
          </el-menu-item>
          <el-menu-item index="3" class="fll">
            <router-link to="/order">广告订单</router-link>
          </el-menu-item>
          <el-menu-item index="4" class="fll">
            <router-link to="/server">服务公司</router-link>
          </el-menu-item>
          <el-menu-item index="5" class="fll">
            <router-link to="/financial">我的财务</router-link>
          </el-menu-item>

          <!-- <el-menu :default-active="activeIndex2" class="header-user" mode="horizontal" @select="handleSelect" background-color="#30333f" text-color="#fff" active-text-color="#f00"> -->
          <div class="header-user flr">
            <el-menu-item index="6" class="launch fll">
              <el-button type="danger" size="small" @click.native="mai">投放广告</el-button>
            </el-menu-item>
            <el-menu-item index="7" class="msg fll">
              <router-link to="/message/list">
                <img src="../../../assets/images/emgail.png" />
                <el-badge is-dot class="item"></el-badge>
              </router-link>
            </el-menu-item>
            <!-- <el-menu-item index="8" class="center fll">
              <router-link to="/enterprise">企业中心</router-link>
            </el-menu-item> -->

            <!-- 个人中心  下拉菜单 -->
            <el-dropdown class="personal fll">
              <span class="el-dropdown-link">
                <div class="avatar" style="background-image:url(http://img.hb.aicdn.com/f5645dcc8f78d642803ae0ff232f0e36c9ef4362195ac-SQeC5w_fw658)"></div>
                <span class="name" style="margin-left:7px">{{ username }}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="setColor">
                  <!-- <router-link to="/set/system">系统设置</router-link> -->
                  <router-link to="/enterprise">企业信息</router-link>
                </el-dropdown-item>
                <el-dropdown-item class="setColor">
                  <router-link to="/favorite/material">我的素材库</router-link>
                </el-dropdown-item>
                <el-dropdown-item class="setColor">
                  <router-link to="/favorite/enshrineMedia">我的媒体库</router-link>
                </el-dropdown-item>
                <el-dropdown-item class="setColor">
                  <a href="javascript:void(0)" @click="exit()">退出登录</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-menu>

        <div class="clear"></div>

      </div>
    </el-header>
    <!-- count -->
    <div class="outer-container" style="margin-bottom: 50px;">
      <el-main class="inner-container">
        <router-view></router-view>
      </el-main>
    </div>
    <!-- footer -->
    <el-footer style="height:160px;padding:0;">
      <div class="layout_footer_1">
        <ul>
          <li>
            <a href="#">友情链接：友情链接</a>
          </li>
          <li class="layout_footer_li">
            <a href="#">友情链接</a>
          </li>
          <li class="layout_footer_li">
            <a href="#">友情链接</a>
          </li>
          <li class="layout_footer_li">
            <a href="#">友情链接</a>
          </li>
          <li class="layout_footer_li">
            <a href="#">友情链接</a>
          </li>
          <li class="layout_footer_li">
            <a href="#">友情链接</a>
          </li>
          <li class="layout_footer_li">
            <a href="#">友情链接</a>
          </li>
          <li class="layout_footer_li">
            <a href="#">友情链接</a>
          </li>
          <li class="layout_footer_li">
            <a href="#">友情链接</a>
          </li>
          <li class="layout_footer_li">
            <a href="#">友情链接</a>
          </li>
          <li class="layout_footer_li">
            <a href="#">友情链接</a>
          </li>
          <li class="layout_footer_li">
            <a href="#">友情链接</a>
          </li>
        </ul>
        <div class="clear"></div>
      </div>
      <div class="layout_footer_2">
        <ul>
          <li>
            <a href="#">关于我们</a>
          </li>
          <li class="layout_footer_li_2">
            <a href="#">商务合作</a>
          </li>
          <li class="layout_footer_li_2">
            <a href="#">动态中心</a>
          </li>
          <li class="layout_footer_li_2">
            <a href="#">联系我们</a>
          </li>
          <li class="layout_footer_li_2">
            <a href="#">加入我们</a>
          </li>
          <li class="layout_footer_li_2">
            <a href="#">常见问题</a>
          </li>
          <li class="layout_footer_li_2">
            <router-link to="/help">帮助中心</router-link>
          </li>
          <div class="f-text flr">
            <span class="phone">
              <!-- <i class="fa fa-phone-square"></i> -->
              <img src="../../../assets/images/phgone.png" />　400-840-8772
            </span> 周一至周五 9:00 ~ 18:00
          </div>
        </ul>
        <div class="clear"></div>
      </div>
      <div class="layout_footer_3">
        <ul>
          <li>Copyright © 2013 道森媒体股份 版权所有 鄂ICP备13016394号-1</li>
        </ul>
        <div class="clear"></div>
      </div>
      <div class="clear"></div>
    </el-footer>
  </div>
</template>

<script>
export default {
    //钩子函数，载入页面的时候，自动获取用户的信息，展示在header的右侧
    data() {
        return {
            //给username为空
            username: "",
            activeIndex: "1",
            fullscreenLoading: false
        };
    },
    //页面加载的时候，执行这个方法
    created() {
        this.getUserDetails();
    },
    methods: {
        getUserDetails() {
            //指的是当前的对象，是JQ的方法
            var _this = this;
            this.$store
                .dispatch("GetInfo")
                .then(() => {
                    _this.username = this.$store.state.user.userName;
                    console.log("成功得到", _this.username, "   -----");
                })
                .catch(() => {
                    console.log("error");
                });
        },
        // 导航栏选择
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        //退出登录  LogOut在store里面定义的已经清除了token
        exit() {
            var _this = this;
            this.$store
                .dispatch("LogOut")
                .then(() => {
                    console.log("退出");
                    this.$router.push({ path: "/login" });
                    //登录成功后提示弹窗
                    this.$message({
                        message: "退出成功",
                        type: "success"
                    });
                })
                .catch(() => {
                    console.log("error");
                    this.loading = false;
                });
        },
        mai() {
            this.$router.push("/pushadvertising");
        }
        // myIndex() {
        //     this.$router.push("/index");
        //     const loading = this.$loading({
        //         lock: true,
        //         text: "Loading",
        //         spinner: "el-icon-loading",
        //         background: "rgba(0, 0, 0, 0.7)"
        //     });
        //     setTimeout(() => {
        //         loading.close();
        //     }, 1000);
        // }
    }
};
</script>

<style scoped>
/* 公共样式 */
a {
    color: #fff;
}
.fll {
    float: left;
}
.flr {
    float: right;
}
.clear {
    clear: both;
}
#layout .el-header,
#layout .el-footer {
    background-color: #2f323e;
    color: #edf1f5;
    line-height: 60px;
    text-align: center;
}

/* 页面头部 */
#layout .header {
    position: relative;
}
#layout .header .el-menu {
    position: static;
}
/* 导航栏绝对定位 */
#layout .el-header {
    padding: 0;
    position: fixed;
    width: 100%;
    height: 60px;
    z-index: 999;
    min-width: 1200px;
    top: 0px;
    left: 0px;
}
/* 消除导航默认样式 */
#layout .el-menu .el-menu-item a,
#layout .el-menu .el-menu-item a:hover {
    color: #fff;
}
#layout .el-menu-item:hover {
    background-color: #2f323e !important;
}
#layout .el-menu-item,
#layout .el-submenu__title {
    height: 60px;
    line-height: 60px;
}
/* logo区域 */
#layout .header .logo {
    margin: 0;
}
/* 导航栏 */
.header-nav .el-menu-item {
    padding: 0;
    margin: 0 18px;
}
/* 右侧导航栏 */
#layout .header-user {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
}
/* 清除右侧导航栏选中下划线 */
.header-user .launch.is-active,
.header-user .msg.is-active {
    border-color: #2f323e !important;
}
.center.is-active {
    border-bottom: 2px solid red;
}
/* 添加资源按钮 */
/* 消除按钮默认样式 */
.el-button--danger:focus,
.el-button--danger:hover {
    background-color: #e60012;
    border-color: #e60012;
}

/* 信息标签msg */
#layout .el-badge {
    right: 5px;
}

/* 下拉菜单--个人中心 */
.personal {
    min-width: 130px;
    color: #fff;
    margin: 0 40px 0 10px;
    cursor: pointer;
}
.avatar {
    width: 35px;
    height: 35px;
}
.setColor > a {
    color: #999;
    font-size: 14px;
}
.setColor > a:hover {
    color: #999;
    background-color: #ecf5ff;
}

/* 页面主体部分 */
#layout .outer-container {
    position: relative;
    min-height: 729px;
    /* margin-top:120px; */
    /* overflow: hidden; */
    max-width: 1710px;
    width: 100%;
    min-width: 1200px;
    margin: 0 auto;
}
#layout .inner-container {
    /* position: absolute; */
    left: 0;
    /* overflow-x: hidden;
    overflow-y: scroll; */
    padding: 0;
    background-color: #edf1f5;
    margin: 0 auto;
    overflow: -Scroll;
    width: 100%;
    min-height: 100%;
    padding-top: 60px;
}

/* 页面底部 */
#layout .layout_footer_1 > ul > li {
    float: left;
    font-size: 12px;
}
#layout .layout_footer_1 {
    height: 45px;
    background-color: #5d5f67;
    line-height: 45px;
}
#layout .layout_footer_li {
    margin-left: 1%;
}
#layout .layout_footer_2 {
    height: 55px;
    line-height: 55px;
}
#layout .layout_footer_2 > ul > li {
    float: left;
}
#layout .layout_footer_li_2 {
    margin-left: 3%;
}
#layout .layout_footer_3 {
    height: 60px;
    line-height: 60px;
}
#layout .layout_footer_3 > ul > li {
    float: left;
    color: #999999;
    font-size: 12px;
}
/* footer add */
.layout_footer_1 > ul:nth-child(1) {
    margin: 0 auto;
    width: 100%;
    min-width: 1200px;
    max-width: 1710px;
}
.layout_footer_2 > ul:nth-child(1) {
    margin: 0 auto;
    height: 55px;
    width: 100%;
    min-width: 1200px;
    max-width: 1710px;
    border-bottom: 1px solid #464954;
}
.layout_footer_3 > ul:nth-child(1) {
    margin: 0 auto;
    height: 55px;
    width: 100%;
    min-width: 1200px;
    max-width: 1710px;
}

/* navbar-BUG */
.header-user:focus {
    outline: none !important;
}
</style>
