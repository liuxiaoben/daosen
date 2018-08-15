<template>
  <div id="register">
    <el-container>
      <!-- nav -->
      <el-header style="height: 77px;line-height: 77px;padding: 0 10%;background-color: #f4f8fb">
        <div class="register_nav">

          <div class="register_logo"><img src="../../assets/images/login_logo.png" alt="login_logo" style="vertical-align:middle"> 全媒体广告平台</div>
          <div class="register_nav_button">
            <a href="#/index">首页</a>
            <!-- <a href="#" class="login_nav_button_a">菜单1</a>
            <a href="#" class="login_nav_button_a">菜单1</a>
            <a href="#" class="login_nav_button_a">菜单1</a>
            <a href="#" class="login_nav_button_a">菜单1</a> -->
          </div>

          <!-- 登陆前  -->
          <div v-if="isLogin == 2" class="login_register">
            <a href="#" @click="goto_login">登录</a>&nbsp;&nbsp;
            <a href="#" @click="zhuce">注册</a>
          </div>

          <!-- 登陆后 -->
          <div v-if="isLogin == 1" class="item user-menu" style="min-width:115px;line-height:80px;float:right;">
            <div class="avatar" style="background-image:url(http://img.hb.aicdn.com/f5645dcc8f78d642803ae0ff232f0e36c9ef4362195ac-SQeC5w_fw658)"></div>
            <el-dropdown style="cursor:pointer">
              <span class="el-dropdown-link" style="color:#333;">
                {{username}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/index" style="color:#999999">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link to="/set/system" style="color:#999999">系统设置</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <a href="#" @click="exit()" style="color:#999999">退出登录</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="clear"></div>
        </div>
      </el-header>
      <el-main>
        <div class="mt-xq">
          <div class="mt-xq1">
            <div>
              {{name}}
              <span>
                <a to="">
                  媒体展示厅/
                </a>
                <a>
                  {{name}}
                </a>
              </span>
            </div>
          </div>
          <div class="mt-xq2">
            <div>
              <!-- <img src="../../assets/images/home-banner.png" /> -->
              <img :src="logo">
            </div>
            <div>
              <div>
                <h3>
                  {{name}}
                </h3>
                <a>
                  <span v-if="isCollect" @click="collectMedia()">❤</span>
                  <span v-if="isCollect == false" @click="collectMedia()" style="color:#8e9eaa;">收藏</span>
                  <span v-if="isCollect" @click="cancelCollectMedia()" style="color:#8e9eaa;">取消收藏</span>
                </a>
              </div>
              <p>
                {{content}}
              </p>
              <p>
                类型： {{mediaTypeName}}
              </p>
            </div>
          </div>
          <div class="mt-xq3">
            <template>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane name="first">
                  <span slot="label">
                    <label>简介</label>
                    <img src="../../assets/images/help-dbl.png" />
                  </span>

                  <div class="jj">
                    <p>
                      名称： {{name}}
                    </p>
                    <p>
                      类型： {{mediaTypeName}}
                    </p>
                    <p>
                      描述：{{content}}
                    </p>
                  </div>

                </el-tab-pane>
                <el-tab-pane name="second">
                  <span slot="label">
                    <label>图片</label>
                    <img src="../../assets/images/help-dbl.png" />
                  </span>

                  <div class="tp">
                    <template>
                      <el-tabs v-model="activeName2" @tab-click="handleClick2">
                        <el-tab-pane name="first" v-for="(item,index) in image" :key="index">
                          <span slot="label">
                            <h3 class="lunbo">
                              <!-- <img src="../../assets/images/home-banner.png" /> -->
                              <img :src="item.imgUrl" @click="bigImg(item.imgUrl)">
                            </h3>
                          </span>

                        </el-tab-pane>
                      </el-tabs>
                    </template>
                    <div class="hb">
                      <!-- <img src="../../assets/images/home-banner.png" /> -->
                      <img :src="imgUrl1">
                    </div>
                  </div>

                </el-tab-pane>
                <el-tab-pane name="third">
                  <span slot="label">
                    <label>媒体属性</label>
                    <img src="../../assets/images/help-dbl.png" />
                  </span>
                  <div class="jj">
                    <p v-for="(attr,attrindex) in mediaAttr" :key="attrindex" style="font-size:12px;">
                      {{attr.attrName}}： {{attr.attrValue}}
                    </p>
                  </div>
                </el-tab-pane>
                <el-tab-pane name="fourth">
                  <span slot="label">
                    <label>受众</label>
                    <img src="../../assets/images/help-dbl.png" />
                  </span>
                </el-tab-pane>
              </el-tabs>
            </template>
          </div>
        </div>
      </el-main>
      <el-footer style="height:84px;">
        <div class="register_footer">
          <ul class="register_footer_ul1">
            <li>
              <a href="#">关于我们</a>
            </li>
            <li class="register_footer_ul1_li">
              <a href="#">商务合作</a>
            </li>
            <li class="register_footer_ul1_li">
              <a href="#">动态中心</a>
            </li>
            <li class="register_footer_ul1_li">
              <a href="#">联系我们</a>
            </li>
            <li class="register_footer_ul1_li">
              <a href="#">加入我们</a>
            </li>
            <li class="register_footer_ul1_li">
              <a href="#">常见问题</a>
            </li>
          </ul>
          <ul class="register_footer_ul2">
            <li>
              <i class="icon iconfont icon-dianhua"></i>
            </li>
            <li class="register_footer_ul2_num">400-840-8772</li>
            <li>周一至周五 9:00-18:00</li>
          </ul>
          <div class="clear"></div>
          <div class="register_footer_ICP">
            Copyright © 2013 道森媒体股份 版权所有 鄂ICP备13016394号-1
          </div>
        </div>
      </el-footer>
    </el-container>

  </div>
</template>

<script>
import { mediaDetail } from "../../api/media";
import { mediaImage } from "../../api/media";
import { mediaAttribute } from "../../api/media";
import { mediaCollect } from "../../api/media";
import { mediaCancelCollect } from "../../api/media";
export default {
    data() {
        return {
            activeName: "second",
            activeName2: "first",
            mtypeId: this.$route.params.id,
            info: null,
            name: "",
            content: "",
            mediaTypeName: "",
            logo: "",
            image: [],
            mediaAttr: [],
            isCollect: "",
            favId: null,
            imgUrl1: null,
            isLogin: "",
            username: ""
        };
    },
    created() {
        this.getDetail(this.mtypeId, this.$store.getters.token);
        this.getImage(this.mtypeId, this.$store.getters.token);
        this.getMediaAttribute(this.mtypeId, this.$store.getters.token);
        if (this.$store.getters.token) {
            this.isLogin = 1;
            this.username = this.$store.getters.name;
            console.log(this.username);
        } else {
            this.isLogin = 2;
        }
    },
    methods: {
        goto_login() {
            this.$router.push("/login");
        },
        zhuce: function() {
            this.$router.push({ path: "/register" });
        },
        handleClick(tab, event) {
            //console.log(tab, event);
        },
        handleClick2(tab, event) {
            //console.log(tab, event);
        },
        getDetail(mtypeId, token) {
            mediaDetail(mtypeId, token).then(response => {
                if (!this.$store.getters.token) {
                    response.data.isFavorite = false;
                }
                this.info = response.data;
                this.name = response.data.name;
                this.mediaTypeName = response.data.mediaTypeName;
                this.content = response.data.content;
                this.logo = response.data.logo;
                this.isCollect = response.data.isFavorite;
                this.favId = response.data.fav_id;
                console.log(this.isCollect);
            });
        },
        getImage(mtypeId, token) {
            mediaImage(mtypeId, token).then(response => {
                this.image = response.data;
                this.imgUrl1 = this.image[0].imgUrl;
            });
        },
        getMediaAttribute(mtypeId, token) {
            mediaAttribute(mtypeId, token).then(response => {
                this.mediaAttr = response.data;
            });
        },
        mediaCollect(mtypeId, token) {
            mediaCollect(mtypeId, token).then(response => {
                this.isCollect = response.success;
                this.getDetail(mtypeId, token);
            });
        },
        collectMedia() {
            if (!this.$store.getters.token) {
                this.$router.push("/login");
            } else {
                this.mediaCollect(this.mtypeId, this.$store.getters.token);
            }
        },
        mediaCancelCollect(favId, token) {
            mediaCancelCollect(favId, token).then(response => {
                this.isCollect = false;
                this.favId = null;
            });
        },
        cancelCollectMedia() {
            this.mediaCancelCollect(this.favId, this.$store.getters.token);
        },
        bigImg(imgUrl) {
            this.imgUrl1 = imgUrl;
        },
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
        }
    }
};
</script>

<style>
.mt-xq1 {
    background: #ffffff;
    width: 100vw;
    position: fixed;
    left: 0px;
    height: 46px;
    line-height: 46px;
    top: 77px;
    z-index: 999;
    padding: 0 10%;
}
.mt-xq1 > div {
    width: 100%;
    padding: 0px 5%;
    /* min-width: 1400px; */
    font-weight: 600;
    font-size: 14px;
    color: #2f323e;
}
.mt-xq1 > div > span {
    float: right;
    font-weight: 400;
    font-size: 12px;
    color: #2f323e;
}
.mt-xq1 > div > span > a:nth-child(1) {
    color: #a1b1bc;
}

.mt-xq2 {
    background: #ffffff;
    height: 180px;
    margin-top: 78px;
    padding: 30px;
    border-radius: 6px;
}

.mt-xq2 > div:nth-child(1) {
    width: 114px;
    height: 114px;
    float: left;
    margin-right: 30px;
}

.mt-xq2 > div:nth-child(1) > img {
    width: 114px;
    height: 114px;
    border-radius: 8px;
}

.mt-xq2 > div:nth-child(2) > div {
    height: 35px;
}

.mt-xq2 > div:nth-child(2) > div > h3 {
    float: left;
    font-size: 16px;
    color: #2f323e;
}

.mt-xq2 > div:nth-child(2) > div > a {
    float: right;
    font-size: 14px;
    color: #8e9eaa;
}

.mt-xq2 > div:nth-child(2) > div > a > span {
    color: #f33155;
}

.mt-xq2 > div:nth-child(2) > p:nth-child(2) {
    display: -webkit-box;
    color: #666666;
    font-size: 12px;
    line-height: 23px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    -moz-box-orient: vertical;
    -moz-line-clamp: 2;
    overflow: hidden;
    margin-bottom: 18px;
}

.mt-xq2 > div:nth-child(2) > p:nth-child(3) {
    font-size: 12px;
    color: #2f323e;
}

.mt-xq3 {
    background: #ffffff;
    height: auto;
    margin-top: 30px;
    border-radius: 6px;
    padding: 20px 0px;
    margin-bottom: 50px;
}

.mt-xq3 .el-tabs__item {
    height: 50px;
}

.mt-xq3 .el-tabs__item img {
    display: none;
}

.mt-xq3 .is-active img {
    display: block;
    margin-top: -8px;
}

.mt-xq3 .is-active label {
    color: #e3030e;
}

.mt-xq3 .el-tabs__item:hover {
    color: #e3030e;
}

.mt-xq3 .el-tabs__item label {
    display: block;
    text-align: center;
    width: 80px;
    height: 50px;
}

.mt-xq3 .el-tabs__active-bar {
    display: none;
}

.mt-xq3 .jj {
    padding: 20px 30px;
}

.mt-xq3 .jj p {
    font-size: 16px;
    color: #2f323e;
    margin-bottom: 20px;
    line-height: 28px;
}

.mt-xq3 .tp {
    /*width: 1125px;*/
    padding: 0px 30px;
}

.mt-xq3 .tp .el-carousel__item:nth-child(3) {
    transform: translateX(0px) scale(1) !important;
}

.mt-xq3 .tp .el-carousel__item:nth-child(4) {
    transform: translateX(135px) scale(1) !important;
}

.mt-xq3 .tp .el-carousel__item:nth-child(5) {
    transform: translateX(270px) scale(1) !important;
}

.mt-xq3 .tp .el-carousel__item:nth-child(6) {
    transform: translateX(405px) scale(1) !important;
}

.mt-xq3 .tp .el-carousel__item:nth-child(7) {
    transform: translateX(540px) scale(1) !important;
}

.mt-xq3 .tp .el-carousel__item:nth-child(8) {
    transform: translateX(675px) scale(1) !important;
}

.mt-xq3 .tp .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 80px;
    height: 80px;
    width: 135px;
    margin: 0;
}

.mt-xq3 .tp .el-carousel__item .lunbo > img {
    margin: 0px;
    width: 100%;
    height: 100%;
}

.mt-xq3 .tp .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.mt-xq3 .tp .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.mt-xq3 .tp .el-carousel__item--card {
    height: 80px;
    width: 135px;
}

.mt-xq3 .el-carousel__arrow {
    display: inline-block !important;
    position: absolute !important;
    transform: none !important;
    background: #e9e9e9 !important;
    color: #b5b7be !important;
    left: 850px;
    width: 45px;
    min-width: 45px;
    height: 80px;
    border-radius: 0px;
    top: 0px;
}
.mt-xq3 .el-carousel__indicators {
    display: none !important;
}
.mt-xq3 .el-carousel__arrow--left {
    display: none !important;
}

.lunbo {
    width: 135px;
    height: 80px;
}

.lunbo > img {
    display: inline !important;
    width: 135px;
    height: 80px;
    border-radius: 4px;
    margin: 0px !important;
}

.tp .el-tabs__item {
    padding: 0 15px;
}

.tp .el-tabs__nav-wrap::after {
    height: 0px;
}

.tp .is-active .lunbo img {
    padding: 2px;
    /* border: 2px solid #333333; */
}

.mt-xq3 .hb {
    margin-top: 35px;
    margin-bottom: 100px;
}

.mt-xq3 .hb img {
    max-width: 1416px;
    width: 100%;
    min-width: 850px;
    height: 850px;
    border-radius: 0px !important;
}

.clear {
    clear: both;
}
#register {
    height: 100%;
}
#register .el-container {
    height: 100%;
}
#register .el-header {
    line-height: 77px;
    padding: 0 10%;
    background-color: #f4f8fb;
    border-bottom: 1px solid #e4e7ea;
}
#register .el-main {
    padding: 0 10%;
    background-color: #edf1f5;
    height: 100%;
}
#register .el-footer {
    padding: 0 10%;
    background-color: #f4f8fb;
    border-top: 1px solid #e4e7ea;
}
#register .login_register {
    float: right;
    text-align: center;
}
#register .register_logo {
    width: 177px;
    float: left;
    text-align: left;
    color: #2f323e;
}
#register .register_nav_button {
    width: 35%;
    margin-left: 5%;
    float: left;
    text-align: left;
}
#register .register_register {
    margin-left: 19%;
    width: 11%;
    float: left;
    text-align: right;
}
#register .register_register > a {
    color: #41b3f9;
}
#register .register_nav_button > a {
    color: #2f323e;
}
#register .register_nav_button_a {
    margin-left: 8%;
}

#register .register_footer {
    margin-top: 20px;
    color: #2f323e;
}

#register .register_footer ul li {
    display: inline-block;
}
#register .register_footer_ul1 {
    float: left;
    width: 55%;
    text-align: left;
}
#register .register_footer_ul2 {
    float: left;
    width: 35%;
    margin-left: 10%;
    text-align: right;
}
#register .register_footer_ul1_li {
    margin-left: 5%;
}
#register .register_footer_ul2_num {
    margin-right: 5%;
    font-size: 16px;
}

#register .register_footer_ICP {
    font-size: 12px;
    color: #999999;
    margin-top: 15px;
    text-align: left;
}
</style>
