
<template>
  <div id="enterpriseCenter">
    <div id="qiyeinformation">
      <div class="qiyeWrap">

        <el-container>

          <el-container>
            <el-aside class="" width="240px" style="margin-right: 20px;">
              <!-- <ul class="qiyeleftul">
              <li><router-link tag="li" to="/enterprise/info"><img src="../../assets/images/enterprise-icon1-1.png" alt=""><img src="../../assets/images/enterprise-icon1-1.png" alt="">企业信息</router-link></li>
              <li><router-link tag="li" to="/enterprise/data"><img src="../../assets/images/enterprise-icon2-1.png" alt=""><img src="../../assets/images/enterprise-icon2-1.png" alt="">基本资料</router-link></li>
              <li><router-link tag="li" to="/enterprise/amendPassword"><img src="../../assets/images/enterprise-icon3-1.png" alt=""><img src="../../assets/images/enterprise-icon3-1.png" alt="">密码修改</router-link></li>
              <li><router-link tag="li" to="/enterprise/childAccount"><img src="../../assets/images/enterprise-icon4-1.png" alt=""><img src="../../assets/images/enterprise-icon4-1.png" alt="">子账号管理</router-link></li>
              <li class="active"><router-link tag="li" to="/enterprise/material"><img src="../../assets/images/enterprise-icon5-2.png" alt=""><img src="../../assets/images/enterprise-icon5-2.png" alt="">素材库</router-link></li>
              <li><router-link tag="li" to="/enterprise/enshrineMedia"><img src="../../assets/images/enterprise-icon6-1.png" alt=""><img src="../../assets/images/enterprise-icon6-1.png" alt="">我收藏的媒体</router-link></li>
            </ul> -->
              <ul class="qiyeleftul">
                <li v-for="(item,index) in sideNav" @click="selectMapNav(item.title)" :class="{'active': isSelect == item.title}" :key="index">
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
  </div>

</template>
<script>
export default {
    data() {
        return {
            isSelect: "企业信息",
            sideNav: [
                {
                    title: "企业信息",
                    url: "/enterprise/info"
                },
                {
                    title: "基本资料",
                    url: "/enterprise/data"
                },
                {
                    title: "密码修改",
                    url: "/enterprise/amendPassword"
                },
                {
                    title: "子账号管理",
                    url: "/enterprise/childAccount"
                }
                // {
                //     title: "我的素材库",
                //     url: "/enterprise/material"
                // },
                // {
                //     title: "我收藏的媒体",
                //     url: "/enterprise/enshrineMedia"
                // }
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
<style rel="stylesheet/scss" lang="scss">
#qiyeinformation .el-main {
    padding: 0;
    background-color: #fff;
    border-radius: 6px;
    min-height: 800px;
}
#qiyeinformation .el-header,
.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    /* line-height: 60px; */
}

#qiyeinformation .qiyeWrap .el-aside {
    border-radius: 6px;
}

#qiyeinformation .qiyeWrap {
    margin-top: 30px;
    margin-bottom: 45px;
}

#qiyeinformation .qiyeleftul {
    background: #ffffff;
    padding: 30px 40px;
}

#qiyeinformation .qiyeleftul > li {
    text-align: left;
    /* padding-left: 20%; */
    color: #2f323e !important;
    cursor: pointer;
}

#qiyeinformation .qiyeleftul .active > li {
    color: #e60012;
}

#qiyeinformation .qiyeleftul li img {
    margin-bottom: -2px;
    margin-right: 15px;
}

#qiyeinformation .qiyeleftul li > img:nth-child(2) {
    display: none;
}

#qiyeinformation .qiyeleftul .active > li > img:nth-child(1) {
    display: none;
}

#qiyeinformation .qiyeleftul .active > li > img:nth-child(2) {
    display: inline-block;
}

#qiyeinformation .qiyeWrap .el-aside {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 44px;
}

#qiyeinformation .qiyeWrap .el-main {
    background-color: #fff;
    color: #333;
}

body > .el-container {
    margin-bottom: 40px;
}

#qiyeinformation .el-container:nth-child(5) .el-aside,
#qiyeinformation .el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

#qiyeinformation .el-container:nth-child(7) .el-aside {
    line-height: 320px;
}

#qiyeinformation .qiyeWrap ul li {
    color: black;
}

.qiyeWrap .el-aside ul li a {
    display: block;
    font-size: 14px;
    color: #555555;
    height: 48px;
    line-height: 48px;
    cursor: pointer;
    padding-left: 38px;
}
.qiyeWrap .el-aside ul li:nth-child(1) a {
    background: url(../../assets/images/enterprise-icon1-1.png) no-repeat left;
}
.qiyeWrap .el-aside ul li:nth-child(2) a {
    background: url(../../assets/images/enterprise-icon2-1.png) no-repeat left;
}
.qiyeWrap .el-aside ul li:nth-child(3) a {
    background: url(../../assets/images/enterprise-icon3-1.png) no-repeat left;
}
.qiyeWrap .el-aside ul li:nth-child(4) a {
    background: url(../../assets/images/enterprise-icon4-1.png) no-repeat left;
}
.qiyeWrap .el-aside ul li:nth-child(5) a {
    background: url(../../assets/images/enterprise-icon5-1.png) no-repeat left;
}
.qiyeWrap .el-aside ul li:nth-child(6) a {
    background: url(../../assets/images/enterprise-icon6-1.png) no-repeat left;
}
.qiyeWrap .el-aside ul li.active:nth-child(1) a,
.qiyeWrap .el-aside ul li:hover:nth-child(1) a {
    background: url(../../assets/images/icon_03.png) no-repeat left;
}
.qiyeWrap .el-aside ul li.active:nth-child(2) a,
.qiyeWrap .el-aside ul li:hover:nth-child(2) a {
    background: url(../../assets/images/icon_05.png) no-repeat left;
}
.qiyeWrap .el-aside ul li.active:nth-child(3) a,
.qiyeWrap .el-aside ul li:hover:nth-child(3) a {
    background: url(../../assets/images/icon_07.png) no-repeat left;
}
.qiyeWrap .el-aside ul li.active:nth-child(4) a,
.qiyeWrap .el-aside ul li:hover:nth-child(4) a {
    background: url(../../assets/images/icon_14.png) no-repeat left;
}
.qiyeWrap .el-aside ul li.active:nth-child(5) a,
.qiyeWrap .el-aside ul li:hover:nth-child(5) a {
    background: url(../../assets/images/icon_09.png) no-repeat left;
}
.qiyeWrap .el-aside ul li.active:nth-child(6) a,
.qiyeWrap .el-aside ul li:hover:nth-child(6) a {
    background: url(../../assets/images/icon_11.png) no-repeat left;
}
.qiyeWrap .el-aside ul li:hover a,
.qiyeWrap .el-aside ul li.active a {
    color: #e60012;
}

/* 页面标题样式 */
#enterpriseCenter .title {
    line-height: 55px;
    margin-left: 0;
    padding: 0 30px;
    font-size: 14px;
    color: #e60012;
    position: relative;
    border-bottom: 2px solid #e4e7ed;
}
#enterpriseCenter .title > span {
    font-size: 14px;
    color: #e60012;
    margin-left: 0;
}
/* 添加伪类，做出下划线 */
#enterpriseCenter .title::after {
    content: " ";
    display: block;
    width: 56px;
    height: 9px;
    background: url(../../assets/images/help-dbl.png) repeat-x center;
    position: absolute;
    bottom: 0;
}

#enterpriseCenter .sc .title::after {
    width: 86px;
}
#enterpriseCenter #sonNum,
#enterpriseCenter #add_son,
#enterpriseCenter #son_details,
#enterpriseCenter #son_modify,
#enterpriseCenter #Modifynum,
#enterpriseCenter .sucaizy {
    .title::after {
        width: 70px;
    }
}
// #enterpriseCenter .sucaizy .title::after {
//     width: 42px;
// }
</style>


