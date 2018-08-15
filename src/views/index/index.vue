<template style="color:#ffffff">
  <div class="home_container">

    <div class="home_nav_echarts">
      <div class="home_nav_echarts_box clearfix">
          <div class="pull-left">
            <h6>￥<span>1,535,682</span></h6>
            <p>团队数据</p>
          </div>
          <mix-chart class="pull-right" height='100%' width='45%'></mix-chart>
      </div>
      <div class="home_nav_echarts_box home_nav_echarts_add clearfix">
        <div class="pull-left">
          <h6>￥<span>1,535,682</span></h6>
          <p>投放预算</p>
        </div>
        <chart class="pull-right" height='100%' width='45%'></chart>
      </div>
      <div class="home_nav_echarts_box home_nav_echarts_add clearfix">
        <div class="pull-left">
          <h6>￥<span>1,535,682</span></h6>
          <p>投放消费</p>
        </div>
        <board  class="pull-right" height='100%' width='45%'></board>
        <div  class="pull-right" id="ct-extra" style="height:70px"></div>
      </div>
      <div class="clear"></div>
    </div>

    <div class="home_count">

      <div class="home_count_left">
        <div class="home_count_left_img">
          <el-carousel :interval="5000" class="carousel1">
            <el-carousel-item >
              <img src="../../assets/images/home-banner.png" alt="banner" width="100%" style="height:336px">
            </el-carousel-item>
            <el-carousel-item >
              <img src="../../assets/images/banner1.png" alt="banner" width="100%" style="height:336px">
            </el-carousel-item>
            <el-carousel-item >
              <img src="../../assets/images/banner2.png" alt="banner" width="100%" style="height:336px">
            </el-carousel-item>
          </el-carousel>
        </div>
        <!--left_count-->
        <div class="home_count_left_text">
          <div class="home_count_left_text_left">
            <div class="user" style="height: 243px;border-radius: 6px;background-color: #fff;padding:33px 16px;">
              <div class="clearfix userInfo">
                <div class="pull-left img">
                  <!-- <img src="../../assets/images/user.png" alt=""> -->
                  <img src="../../assets/images/u=140501417,1089325335&fm=27&gp=0.jpg" alt="">
                </div>
                <div class="pull-left text text1">
                 <h4>武汉蒲公英股份有限公司</h4>
                  <span>湖北省武汉市</span>
                  <el-progress :percentage="40" color="#7ace4c"></el-progress>
                  <p>资料完善度<span>40%</span></p>
                </div>
              </div>
              <p>专业广告投放100年专业广告投放100年,专业广告投放100年专业广告专业广告投放100年专业广告</p>
            </div>
            <div style="height: 243px;border-radius: 6px;background-color: #fff;margin-top: 30px">
              <el-carousel :interval="5000" class="carousel2">
                <!-- <el-carousel-item v-for="item in 3" :key="item">
                  <img src="../../assets/images/timg4.jpg" alt="" width="100%" style="height:210px">
                  <h6>行业发展趋势及市场规模预测</h6>
                </el-carousel-item> -->
                <el-carousel-item>
                  <img src="../../assets/images/timg4.jpg" alt="" width="100%" style="height:210px">
                  <h6>行业发展趋势及市场规模预测</h6>
                </el-carousel-item>
                <el-carousel-item>
                  <img src="../../assets/images/sbanner.png" alt="" width="100%" style="height:210px">
                  <h6>行业发展趋势及市场规模预测</h6>
                </el-carousel-item>
                <el-carousel-item>
                  <img src="../../assets/images/sbanner2.png" alt="" width="100%" style="height:210px">
                  <h6>行业发展趋势及市场规模预测</h6>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <div class="home_count_left_text_right zhtbs">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="交易记录/" name="first">
                <div class="xzxzzt">
                  <!-- <label class="inx-echwx inx-active">按年</label><label class="inx-echwx">按服务公司</label> -->
                </div>
                <index-chart ref="first" height='100%' width='100%' v-if="'first' === activeName"></index-chart>
              </el-tab-pane>
              <el-tab-pane label="应付款" name="second">
                <div class="xzxzzt">
                  <!-- <label class="inx-echwx inx-active">按年</label><label class="inx-echwx">按服务公司</label> -->
                </div>
                <index-charty ref="second" height='100%' width='100%' v-if="'second' === activeName"></index-charty>
              </el-tab-pane>
            </el-tabs>
            
          </div>
          <div class="clear"></div>
        </div>

      </div>

      <div class="home_count_right">
        <div class="home_count_right_1">
          <h6>公告</h6>
          <ul>
            <li class="clearfix">
              <p class="pull-left"> 道森2018年引进高层次人才公告 </p> 
              <span class="pull-right">2017-10-15</span>
            </li>
            <li class="clearfix">
              <p class="pull-left"> 道森2017年度工艺美术系列（高、中级）评审通过人员名单公示 </p> 
              <span class="pull-right">2017-10-15</span>
            </li>
            <li class="clearfix">
              <p class="pull-left"> 2017年道森实习生考察公告 </p> 
              <span class="pull-right">2017-10-15</span>
            </li>
            <li class="clearfix active">
              <p class="pull-left"> 道森技术岗位专项公开招聘专栏 </p> 
              <span class="pull-right">2017-10-15</span>
            </li>
          </ul>
        </div>
        <div class="home_count_right_2">
          <h6>媒体应用排行榜</h6>
          <ul>
            <li v-for="(item , key) in player" :key="key" class="clearfix">
              <p class="pull-left">
                <span>{{ item.id }}</span>
                <img :src="item.img">
                <span>{{ item.title }}</span>
              </p>
              <p class="pull-right month_growth">环比增幅：<span>{{ item.growth }}</span></p>
            </li>
          </ul>
        </div>
      </div>
      <div class="clear"></div>
    </div>

    <!--media-->
    <div class="home_fixImg">
      <p style="font-size: 14px;font-weight: bold;text-align: left;padding: 30px 3% 27px 3%;">推荐媒体</p>
      <div class="home_fixImg_count">
        <ul>
          <li class="home_fixImg_count_li"><img src="../../assets/images/home-mediaImg1.png" alt="" width="100%">
            <p>保利新语电梯LED广告</p>
          </li>
          <li class="home_fixImg_count_li home_fixImg_count_li_add"><img src="../../assets/images/home-mediaImg2.png" alt="" width="100%">
           <p>常青藤名苑车库广告</p>
          </li>
          <li class="home_fixImg_count_li home_fixImg_count_li_add"><img src="../../assets/images/home-mediaImg3.png" alt="" width="100%">
            <p>光谷广场电梯传媒</p>
          </li>
          <li class="home_fixImg_count_li home_fixImg_count_li_add"><img src="../../assets/images/home-mediaImg4.png" alt="" width="100%">
            <p>同济医院直升飞机机身广告</p>
          </li>
        </ul>
        <ul style="margin-top: 30px">
          <li class="home_fixImg_count_li"><img src="../../assets/images/home-mediaImg6.png" alt="" width="100%">
            <p>洪山区出租车led广告</p>
          </li>
          <li class="home_fixImg_count_li home_fixImg_count_li_add"><img src="../../assets/images/home-mediaImg7.png" alt="" width="100%" >
           <p>地铁二号线地铁广告</p>
          </li>
          <li class="home_fixImg_count_li home_fixImg_count_li_add"><img src="../../assets/images/home-mediaImg8.png" alt="" width="100%">
            <p>武昌区公交站广告</p>
          </li>
          <li class="home_fixImg_count_li home_fixImg_count_li_add"><img src="../../assets/images/home-mediaImg9.png" alt="" width="100%">
            <p>地铁四号线地铁广告</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- <div class="home_button_count">
      <el-button type="text"><i class="icon iconfont icon-jiahao"></i>
        添加更多应用</el-button>
    </div> -->

  </div>
</template>

<script>
  // 引入echarts
  import Chart from '@/components/Charts/lineMarker'
  import board from '@/components/Charts/keyboard'
  import mixChart from '@/components/Charts/mixChart'
  import indexChart from '@/components/Charts/indexChart'
  import indexCharty from '@/components/Charts/indexCharty'

  export default {
    components: {
      Chart,
      board,
      mixChart,
      indexChart,
      indexCharty
    },
    data() {
      return {
        activeName: 'first',
        player: [
          {
            id: 1,
            title: '爱奇艺',
            img: '../../../static/img/player1.png',
            growth: '20%'
          },
          {
            id: 2,
            title: '芒果TV',
            img: '../../../static/img//player2.png',
            growth: '11.6%'
          },
          {
            id: 3,
            title: '乐视TV',
            img: '../../../static/img//player3.png',
            growth: '1.5%'
          },
          {
            id: 4,
            title: '土豆视频',
            img: '../../../static/img//player4.png',
            growth: '12.3%'
          },
          {
            id: 5,
            title: '搜狐视频',
            img: '../../../static/img//player5.png',
            growth: '20'
          },
          {
            id: 6,
            title: '爱奇艺',
            img: '../../../static/img//player1.png',
            growth: '20%'
          },
          {
            id: 7,
            title: '芒果TV',
            img: '../../../static/img//player2.png',
            growth: '11.6%'
          },
          {
            id: 8,
            title: '乐视TV',
            img: '../../../static/img//player3.png',
            growth: '1.5%'
          },
          {
            id: 9,
            title: '土豆视频',
            img: '../../../static/img//player4.png',
            growth: '12.3%'
          }
        ]
      }
    },
    created() {
    },
    methods: {
      handleClick(tab, event) {  
        console.log(tab, event)
      }
    }
  }
</script>
<style>
  .home_container .el-carousel__container {
    position: relative;
    height: 337px;
  }
  .clear{
    clear: both;
  }
  .home_container{
    width: 100%;
  }
  .home_nav_echarts_box{
    width:32%;
    float: left;
    background-color: #fff;
    height: 129px;
    border-radius: 6px;
    margin-top: 30px;
    padding:37px 27px;
  }
  .home_nav_echarts_box h6{
    font-size:20px;
    color:#333333;
    font-weight: 700;
  }
  .home_nav_echarts_box span{
    font-size:24px;
    letter-spacing: 0.1em;
  }
  .home_nav_echarts_box p{
    font-size:12px;
    color:#8e9eaa;
    margin-top: 10px;
  }
  .home_nav_echarts_add{
    margin-left: 2%;
  }
  .home_count{
    width: 100%;
    margin-top: 30px;
  }
  .home_count_left{
    width: 66%;
    height: 882px;
    /*background-color: red;*/
    border-radius: 6px;
    float: left;
  }

  .home_count_left_text{
    height:516px;
    /*background-color: #fff;*/
    border-radius: 6px;
    margin-top: 30px;
  }
  .home_count_left_text .home_count_left_text_left .user{
    padding:34px 30px;
  }
  .home_count_left_text .home_count_left_text_left .user .userInfo{
    /* margin-right: 5px; */
    height:100px;
    margin-bottom: 30px;
  }
  .home_count_left_text .home_count_left_text_left .user .userInfo .img{
    margin-right: 5%;
    width:90px;
    height:90px;
  }
  .home_count_left_text .home_count_left_text_left .user .userInfo .text1{

  }
  .home_count_left_text .home_count_left_text_left .user .userInfo h4{
    font-size:16px;
    color:#333333;
    line-height:32px;
  }
  .home_count_left_text .home_count_left_text_left .user .userInfo span{
    font-size:12px;
    line-height:12px;
    color:#8e9eaa;
  }
  .home_count_left_text .home_count_left_text_left .user .userInfo .el-progress{
    margin:20px 0 5px;
  }
  .home_count_left_text .home_count_left_text_left .user .userInfo p{
    font-size:12px;
    color:#8e9eaa;
  }
  .home_count_left_text .home_count_left_text_left .user .userInfo p span{
    color:#333333;
  }
  .home_count_left_text .home_count_left_text_left .user p{
    font-size:14px;
    color:#8e9eaa;
    line-height:22px;
  }
  .home_count_right{
    width: 32%;
    height: 882px;
    margin-left: 2%;
    /*background-color: red;*/
    float: left;
    border-radius: 6px;
  }


  .home_count_right_1{
    height:200px;
    border-radius: 6px;
    background-color: #fff;
  }
  .home_count_right_2{
    margin-top: 30px;
    height:651px;
    border-radius: 6px;
    background-color: #fff;
    padding:13px 30px 22px;
  }

  .home_count_left_text_left,.home_count_left_text_right{
    width: 40%;
    float: left;
    /*background-color:blue;*/
    height:516px;
    border-radius: 6px;
  }
  .home_count_left_text_right{
    width: 57%;
    margin-left: 3%;
    background-color: #fff;

  }

  /*fixImg*/
  .home_fixImg{
    width: 100%;
    height: 670px;
    background-color: #fff;
    margin-top: 30px;
    border-radius: 6px;
  }
  .home_fixImg_count{
    padding:0 3%;
  }
  .home_fixImg_count_li{
    width:22%;
    display: inline-block;
    border-radius: 6px;
    text-align: left;
  }
  .home_fixImg_count_li p{
    font-size:14px;
    color:#313131;
    line-height:54px;
  }
  .home_fixImg_count_li_add{
    margin-left: 2%;
  }
  .home_fixImg_count_li_add p{
    font-size:14px;
    color:#313131;
    line-height:54px;
  }
  .home_button_count{
    width: 100%;
    height:55px;
    margin-top: 30px;
    background-color: #fff;
    border-radius: 6px;
    line-height: 55px;
    margin-bottom: 30px;
    text-align: center;
  }
  .home_count_right_2 h6{
    font-size:14px;
    color:#313131;
    font-weight: bold;
    line-height:54px;
  }
  .home_count_right_2 ul li{
    height:62px;
  }
  .home_count_right_2 ul li p{
    font-size:12px;
    color:#313131;
    line-height:62px;
  }
  .home_count_right_2 ul li img{
    vertical-align: middle;
    margin:0 15px;
  }
  .home_count_right_2 .month_growth{
    font-size:12px;
    color:#8e9eaa;
    line-height:62px;
  }
  .home_count_right_2 .month_growth span{
    display: inline-block;
    width:50px;
  }
  .carousel2 .el-carousel__arrow{
    opacity: 0!important;
  }
  .carousel2 .el-carousel__indicators .el-carousel__button{
    width:7px;
    height:7px;
    min-width: 7px;
    margin-right: 11px;
    background:#edeff0;
  }
  .carousel2 .el-carousel__indicators li:last-child{
    margin-right: 0px;
  }
  .carousel2 .el-carousel__indicators{
    bottom:95px;
    left:80%;
  }
  .el-carousel__indicator.is-active .el-carousel__button{
    background:#33adf8;
  }
  .carousel2 h6{
    font-size:14px;
    color:#100303;
    line-height:27px;
    padding-left: 30px;
  }
  .carousel1 .el-carousel__arrow{
    background:#33adf8;
    min-width: 36px;
  }
  .home_container .home_count_right_1{
    padding:14px 32px 20px;
  }
  .home_container .home_count_right_1 h6{
    font-size:14px;
    color:#313131;
    line-height:34px;
    font-weight: bold;
  }
  .home_container .home_count_right_1 ul li{
    height:31px;
    line-height:31px;
    padding-left: 35px;
  }
  .home_container .home_count_right_1 ul li.active{
    background:url(../../assets/images/new.png)no-repeat left;
  }
  .home_container .home_count_right_1 ul li img{
    vertical-align: middle;
    margin-top: -2px;
  }
  .home_container .home_count_right_1 ul li p{
    font-size:12px;
    color:#313131;
    width: 222px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .home_container .home_count_right_1 ul li span{
    font-size:12px;
    color:#8e9eaa;
  }
  .home_container .zhtbs{
    padding: 30px;
  }
  .home_container .zhtbs .el-tabs__header{
    margin: 0px;
    height: 20px;
    line-height: 20px;
  }
  .home_container .zhtbs .el-tabs__header .el-tabs__active-bar{
    display: none;
  }
  .home_container .zhtbs .el-tabs__item{
    padding: 0;
    font-size: 14px;
    font-weight: 600;
    color: #8e9eaa;
    height: 20px;
    line-height: 20px;
  }
  .home_container .zhtbs .is-active{
    color: #313131;
  }
  .home_container .zhtbs .el-tabs__nav-wrap::after{
    display: none;
  }
  .home_container .zhtbs .el-tab-pane{
    height: 440px;
    width: 100%;
  }
  .home_container .zhtbs .xzxzzt{
    text-align: right;
    margin-bottom: -20px;
    position: relative;
    z-index: 999;
    margin-top: 20px;
  }
  .home_container .zhtbs .xzxzzt .inx-echwx{
    display: inline-block;
    padding-left:25px;
    height: 20px;
    line-height: 20px;
    background: url(../../assets/images/index-wxz.png) no-repeat;
    background-position: 3px 3px;
    margin-left: 25px;
    font-size: 12px;
    color: #333333;
    cursor:pointer;
  }
  .home_container .zhtbs .inx-active{
    background: url(../../assets/images/index-xz.png) no-repeat !important;
    background-position: 3px 3px !important;
  }
</style>