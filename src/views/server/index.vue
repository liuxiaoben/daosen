<template>
  <div class="fuwugs">

    <!-- title2 -->
    <div v-show="more">
      <div class="fuwu_title  add">
        <ul>
          <li class="fuwu_title_1">已绑定服务公司</li>
          <li class="fuwu_title_2" @click="moreYes()">更多>></li>
          <div class="clear"></div>
        </ul>
      </div>

      <!-- content -->
      <div class="fuwu_logocount">
        <!-- <router-link to:"fuwu/fuwu_end"></router-link> -->
        <div class="fuwu_logocount_logo1" v-for="(item,key,index) in tenantBindList" :key="key">
          <router-link :to="'server/serverDetail/' + item.tenant_id">
            <div class="fuwu_logobox">
              <div class="fuwu_logo_img"><img :src="item.logo" alt="logo1" width="100%"></div>
              <div class="fuwu_logo_count">
                <p class="fuwu_p1">{{ item.name }}</p>
                <p class="fuwu_p2">
                  <i class="icon iconfont icon-mine"></i> 联系人：{{ item.createor }}</p>
                <p>
                  <i class="icon iconfont icon-31dingwei"></i> 公司地址：{{ item.address }}</p>
              </div>
              <div class="clear"></div>
            </div>
          </router-link>
        </div>
        <!-- <div class="fuwu_logocount_logo1 add2">
              <div class="fuwu_logobox">
                <div class="fuwu_logo_img"><img src="../../assets/images/fuwu-logo2.png" alt="logo1" width="100%"></div>
                <div class="fuwu_logo_count">
                  <p class="fuwu_p1">武汉道森媒体股份有限公司</p>
                  <p class="fuwu_p2"><i class="icon iconfont icon-mine"></i>  联系人：曾阿牛</p>
                  <p><i class="icon iconfont icon-31dingwei"></i>  公司地址：武汉市南湖大道保利心语</p>
                </div>
                <div class="clear"></div>
              </div>
            </div>
            <div class="fuwu_logocount_logo1 add2">
              <div class="fuwu_logobox">
                <div class="fuwu_logo_img"><img src="../../assets/images/fuwu-logo3.png" alt="logo1" width="100%"></div>
                <div class="fuwu_logo_count">
                  <p class="fuwu_p1">武汉道森媒体股份有限公司</p>
                  <p class="fuwu_p2"><i class="icon iconfont icon-mine"></i>  联系人：曾阿牛</p>
                  <p><i class="icon iconfont icon-31dingwei"></i>  公司地址：武汉市南湖大道保利心语</p>
                </div>
                <div class="clear"></div>
              </div>
            </div>
            <div class="clear"></div> -->
      </div>
    </div>
    <!-- title -->
    <div v-show="noMore">
      <div class="fuwu_title">
        <ul>
          <li class="fuwu_title_1">推荐服务公司</li>
          <li class="fuwu_title_2" @click="moreNo()">更多>></li>
          <div class="clear"></div>
        </ul>
      </div>
      <!-- banner -->
      <div class="fuwu_title_banner">
        <div class="fuwu_banner1" v-for="(item,key,index) in tenantList" :key="key">
          <router-link :to="'server/serverDetail/' + item.tenant_id">
            <!-- <img :src="item.logo" alt="banner1" width="100%"> -->
            <div class="fuwu_logobox">
              <div class="fuwu_logo_img"><img :src="item.logo" alt="logo1" width="100%"></div>
              <div class="fuwu_logo_count">
                <p class="fuwu_p1">{{ item.name }}</p>
                <p class="fuwu_p2">
                  <i class="icon iconfont icon-mine"></i> 联系人：{{ item.createor }}</p>
                <p class="fuwu_p2">
                  <i class="icon iconfont icon-31dingwei"></i> 公司地址：{{ item.address }}</p>
              </div>
              <div class="clear"></div>
            </div>
          </router-link>
          <div class="clear"></div>
        </div>
        <!-- <div class="fuwu_banner2"><img src="../../assets/images/fuwu-banner2.png" alt="banner2" width="100%"></div>
          <div class="fuwu_banner3"><img src="../../assets/images/fuwu-banner3.png" alt="banner3" width="100%"></div> -->
        <div class="clear"></div>
      </div>
    </div>
    <!-- <div class="fuwu_logocount add3">
          <div class="fuwu_logocount_logo1">
            <div class="fuwu_logobox">
              <div class="fuwu_logo_img"><img src="../../assets/images/fuwu-logo4.png" alt="logo1" width="100%"></div>
              <div class="fuwu_logo_count">
                <p class="fuwu_p1">武汉道森媒体股份有限公司</p>
                <p class="fuwu_p2"><i class="icon iconfont icon-mine"></i>  联系人：曾阿牛</p>
                <p><i class="icon iconfont icon-31dingwei"></i>  公司地址：武汉市南湖大道保利心语</p>
              </div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="fuwu_logocount_logo1 add2">
            <div class="fuwu_logobox">
              <div class="fuwu_logo_img"><img src="../../assets/images/fuwu-logo5.png" alt="logo1" width="100%"></div>
              <div class="fuwu_logo_count">
                <p class="fuwu_p1">武汉道森媒体股份有限公司</p>
                <p class="fuwu_p2"><i class="icon iconfont icon-mine"></i>  联系人：曾阿牛</p>
                <p><i class="icon iconfont icon-31dingwei"></i>  公司地址：武汉市南湖大道保利心语</p>
              </div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="fuwu_logocount_logo1 add2">
            <div class="fuwu_logobox">
              <div class="fuwu_logo_img"><img src="../../assets/images/fuwu-logo6.png" alt="logo1" width="100%"></div>
              <div class="fuwu_logo_count">
                <p class="fuwu_p1">武汉道森媒体股份有限公司</p>
                <p class="fuwu_p2"><i class="icon iconfont icon-mine"></i>  联系人：曾阿牛</p>
                <p><i class="icon iconfont icon-31dingwei"></i>  公司地址：武汉市南湖大道保利心语</p>
              </div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="clear"></div>
      </div>
      <div class="fuwu_logocount add3 add4">
          <div class="fuwu_logocount_logo1">
            <div class="fuwu_logobox">
              <div class="fuwu_logo_img"><img src="../../assets/images/fuwu-logo7.png" alt="logo1" width="100%"></div>
              <div class="fuwu_logo_count">
                <p class="fuwu_p1">武汉道森媒体股份有限公司</p>
                <p class="fuwu_p2"><i class="icon iconfont icon-mine"></i>  联系人：曾阿牛</p>
                <p><i class="icon iconfont icon-31dingwei"></i>  公司地址：武汉市南湖大道保利心语</p>
              </div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="fuwu_logocount_logo1 add2">
            <div class="fuwu_logobox">
              <div class="fuwu_logo_img"><img src="../../assets/images/fuwu-logo8.png" alt="logo1" width="100%"></div>
              <div class="fuwu_logo_count">
                <p class="fuwu_p1">武汉道森媒体股份有限公司</p>
                <p class="fuwu_p2"><i class="icon iconfont icon-mine"></i>  联系人：曾阿牛</p>
                <p><i class="icon iconfont icon-31dingwei"></i>  公司地址：武汉市南湖大道保利心语</p>
              </div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="fuwu_logocount_logo1 add2">
            <div class="fuwu_logobox">
              <div class="fuwu_logo_img"><img src="../../assets/images/fuwu-logo9.png" alt="logo1" width="100%"></div>
              <div class="fuwu_logo_count">
                <p class="fuwu_p1">武汉道森媒体股份有限公司</p>
                <p class="fuwu_p2"><i class="icon iconfont icon-mine"></i>  联系人：曾阿牛</p>
                <p><i class="icon iconfont icon-31dingwei"></i>  公司地址：武汉市南湖大道保利心语</p>
              </div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="clear"></div>
      </div> -->
  </div>
</template>
<script>
import { tenantList, tenantBindList } from "../../api/server";
export default {
    data() {
        return {
            tenantList: null,
            tenantBindList: null,
            pageNum: "1",
            pageSize: "3",
            pageSize2: "9",
            noMore: true,
            more: true
        };
    },
    created() {
        this.getNotBind();
        this.getBind();
    },
    methods: {
        //获取未绑定服务公司
        getNotBind() {
            const tenantInfo = { token: this.$store.getters.token };
            tenantList(this.pageNum, this.pageSize, tenantInfo)
                .then(response => {
                    this.tenantList = response.data.list;
                    this.listLoading = false;
                })
                .catch(() => {
                    this.loading = false;
                });
        },
        //获取绑定服务公司
        getBind() {
            const tenantInfo = {
                token: this.$store.getters.token,
                uid: this.$store.getters.id
            };
            tenantBindList(this.pageNum, this.pageSize2, tenantInfo).then(
                response => {
                    this.tenantBindList = response.data.list;
                    console.log(this.tenantBindList);
                    this.listLoading = false;
                }
            );
        },
        //更多未绑定的服务公司
        moreNo() {
            this.more = false;
            this.pageSize = "100";
            this.getNotBind();
        },
        //绑定的服务公司
        moreYes() {
            this.noMore = false;
            this.pageSize2 = "100";
            this.getBind();
        }
    }
};
</script>
<style>
.clear {
    clear: both;
}
.fuwu_title {
    width: 100%;
    height: 45px;
    background-color: #fff;
    border-radius: 6px;
    /*margin-top: 33px;*/
    line-height: 45px;
}

.fuwu_title_1 {
    float: left;
    margin-left: 1%;
    font-size: 14px;
    color: #2f323e;
    font-weight: bold;
}
.fuwu_title_2 {
    padding: 0 20px;
    float: right;
    margin-right: 2%;
    font-size: 12px;
    color: #2f323e;
    cursor: pointer;
}
.fuwu_title_banner {
    width: 100%;
    margin-top: 20px;
    background-color: #fff;
    /*display: flex;
    justify-content:space-between; */
}
.fuwu_banner1,
.fuwu_banner2,
.fuwu_banner3 {
    width: 32%;
    float: left;
    margin-right: 2%;
    /* height: 207px; */
    overflow: hidden;
    border-radius: 5px;
    margin-bottom: 20px;
    margin-top: 20px;
}
.fuwu_banner1:nth-child(3),
.fuwu_banner1:nth-child(6),
.fuwu_banner1:nth-child(9),
.fuwu_banner1:nth-child(12),
.fuwu_banner1:nth-child(15),
.fuwu_banner1:nth-child(18) {
    margin-right: 0;
}
.fuwu_banner1:first-child {
    margin-left: 0;
}
.fuwu_banner2,
.fuwu_banner3,
.add2 {
    margin-left: 2%;
}
.add {
    /*margin-top: 42px;*/
}

.fuwu_logocount {
    width: 100%;
    margin-top: 15px;
}
.fuwu_logocount_logo1 {
    float: left;
    width: 32%;
    /* height: 188px; */
    background-color: #fff;
    border-radius: 6px;
}
.add3 {
    margin-top: 30px;
}
.add4 {
    margin-bottom: 60px;
}
.fuwu_logobox {
    margin: 5%;
    width: 90%;
    height: 140px;
    overflow: hidden;
    /* background-color: #fff; */
}
.fuwu_logo_img {
    width: 45%;
    float: left;
}
.fuwu_logo_count {
    width: 50%;
    float: left;
    margin-left: 10px;
}
.fuwu_logo_count > p {
    text-align: left;
}
.fuwu_p1 {
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
}
.fuwu_p2 {
    line-height: 20px;
    font-size: 12px;
    color: #999;

}
.fuwu_p2 i{
  font-size: 12px;
  margin-right: 6px;
}
.fuwugs {
    margin: 30px 0px;
}
</style>


