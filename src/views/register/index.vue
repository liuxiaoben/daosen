<template>
   <div id="register">
       <el-container>
           <!-- nav -->
         <el-header style="height:77px;">
           <div class="register_nav">
             <div class="register_logo"><img src="../../assets/images/login_logo.png" alt="login_logo" style="vertical-align:middle">  全媒体广告平台</div>
             <div class="register_nav_button">
               <a href="#/media">首页</a>
               <!-- <a href="#" class="register_nav_button_a">菜单1</a>
               <a href="#" class="register_nav_button_a">菜单1</a>
               <a href="#" class="register_nav_button_a">菜单1</a>
               <a href="#" class="register_nav_button_a">菜单1</a> -->
             </div>
             <div class="login_register"><a href="#" @click="goto_login">登录</a>&nbsp;&nbsp;<a href="#" @click="zhuce">注册</a></div>
             <div class="clear"></div>
           </div>
         </el-header>
            <!-- count -->
            <el-main>
              <div class="register_count" >
                
                <div class="register_count_left" @mouseenter="changeCss(1)" @mouseleave="changeCss(2)" :class="isOk?'register_count_right':''">
                  <img :src="picPathL">
                  <p>我是广告主</p>
                  <p><span>有营销需求的企业或个人</span>   &nbsp;&nbsp;<span><a href="#">了解更多详情</a></span> </p>
                  <el-button type="danger" @click="Adegister">立即注册</el-button>
                  <!-- <button class="primary" @click="Adegister">立即注册</button> -->
                </div>


                <div class="register_count_right" @mouseenter="changeCss(2)" @mouseleave="changeCss(1)" :class="isOk?'register_count_rightNB':''">
                  <img :src="picPathR">
                  <p>我是资源主</p>
                  <p><span>有媒体资源的个人和组织</span>   &nbsp;&nbsp;<span><a href="#">了解更多详情</a></span> </p>
                  <el-button type="danger" @click="Adegister1">立即注册</el-button>
                  <!-- <button class="primary" @click="Adegister1">立即注册</button> -->
                </div>
                <div class="clear"></div>
                <!-- 立即登录 -->
                <p class="register_dengli">已有帐号，<span>立即  <a href="#" @click="goto_login">登录</a></span></p>
              </div>
				    </el-main>     
                      
        <!-- footer -->
         <el-footer style="height:84px;">
           <div class="register_footer">
             <ul class="register_footer_ul1">
               <li><a href="#">关于我们</a></li>
               <li class="register_footer_ul1_li"><a href="#">商务合作</a> </li>
               <li class="register_footer_ul1_li"><a href="#">动态中心</a> </li>
               <li class="register_footer_ul1_li"><a href="#">联系我们</a> </li>
               <li class="register_footer_ul1_li"><a href="#">加入我们</a> </li>
               <li class="register_footer_ul1_li"><a href="#">常见问题</a> </li>
             </ul>
             <ul class="register_footer_ul2">
               <li><i class="icon iconfont icon-dianhua"></i></li>
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
export default {
  data() {
      return {
        active: 1,
        isOk:false,
        picPathL:'./src/assets/images/select_role_logo1.jpg',
        picPathR:'./src/assets/images/select_role_logo2.png'
      };
    },

    methods: {
      next() {
        this.active++;
      },
      changeCss(i){
          switch(i){
            case 1:
                this.isOk = true;
                this.picPathL = './src/assets/images/select_role_logo2.png';
                this.picPathR = './src/assets/images/select_role_logo1.jpg';
                break;
            case 2:
                this.isOk = false;
                this.picPathL = './src/assets/images/select_role_logo1.jpg';
                this.picPathR = './src/assets/images/select_role_logo2.png';
                break;
          }
      },
      goto_login(){
        this.$router.push('/login')
      },
      zhuce: function () {
        this.$router.push({path: '/register'})
      },
      Adegister:function(){
        this.$router.push('/Adegister')
      },
      Adegister1:function(){
        // this.$router.push('www.baidu.com')
        window.location.href = "http://47.97.171.192:9528/login#/Adegister"
      }
    }
}
</script>


 <style>
 /* 表单 */
   #register .flex-form{
      width:40%;
      height: 525px;
      background-color: #fff;
      border-radius: 6px;
      margin-top: 8%;
   }
   #register .flex-form>p>span:nth-child(2){
     font-size: 16px;
     font-weight: bold;
     color: #555555;
     margin-right: 25px
   }
    #register .flex-form>p>span:nth-child(3){
      font-size: 16px;
      color: #555555;
    }
    #register .flex-form>p{
      margin-left: 8%;
      margin-top: 43px;
    }
    #register .el-step__title{
      font-size: 14px;
    }
    #register .el-step__title.is-success{
      color: #4c4c4c;
    }
    #register .from_count{
      padding: 0 10%;
      margin-top: 60px;
    }
    /* input1 */
    #register .from_show_1{
      margin-top: 60px;
    }
    #register .from_show_1>input:nth-child(1){
      display:block;
      width: 100%;
    }
    #register .from_show_1>input:nth-child(2){
      width: 70%;
    }
    #register .from_show_1>button:nth-child(3){
      cursor:pointer;
      margin-left:3%;
      width:25%
    }
    #register .from_show_1>button:nth-child(4){
      width:100%;
      margin-top:24px;
      cursor:pointer;
    }
    #register .from_show_1>p:nth-child(5){
      margin-top:38px;
      text-align:center;
    }
    /* input2 */
    #register .from_show_2>input:nth-child(2){
      width: 100%;
    }
    #register .from_show_2>p:nth-child(4){
      margin-top:38px;
      text-align:center;
    }
    #register .from_show_2>button:nth-child(3){
      width:100%;
      margin-top:24px;
      cursor:pointer;
      margin-left: 0;
    }
    /* input3 */
    #register .from_show_3>img:nth-child(1){
      display: block;
      margin: 0  auto;
      margin-top: 70px;
    }
    #register .from_show_3>p:nth-child(2){
      font-size: 22px;
      text-align: center;
      margin-top: 30px;
    }
    #register .from_show_3>p:nth-child(3){
      text-align: center;
      margin-top: 30px;
    }
    #register .from_show_3>p:nth-child(3)>a{
      color: #e60012;
    }
    
    
 /* ////////////////////////// */
  #register .login_register{
    float: right;
    text-align: center;
  }
   #register .login_register>a{
    color: #41b3f9;
  }
 /* //////////////////////////// 公共样式 */
   .clear{
     clear: both;
   }
   #register{
     height: 100%;
   }
   #register .el-container {
     height: 100%;
   }
   #register .el-header{
     line-height: 77px;
     padding: 0 10%;
     background-color: #f4f8fb;
     border-bottom: 1px solid #e4e7ea;
   }
   #register .el-main{
     padding:0 10%;
     background-color:#edf1f5;
     height:100%;
   }
   #register .el-footer{
     padding:0 10%;
     background-color: #f4f8fb;
     border-top: 1px solid #e4e7ea;
   }

   #register .register_logo{
     width: 177px;
     float: left;
     text-align: left;
     color:#2f323e;
   }
   #register .register_nav_button{
     width: 35%;
     margin-left: 5%;
     float: left;
     text-align: left;
   }
   #register .register_register{
     margin-left: 19%;
     width: 11%;
     float: left;
     text-align: right;
   }
   #register .register_register>a{
     color: #41b3f9;
   }
   #register .register_nav_button>a{
     color:#2f323e;

   }
   #register .register_nav_button_a{
     margin-left: 8%;
   }

   #register .register_footer{
     margin-top: 20px;
     color:#2f323e;
   }

   #register .register_footer ul li{
     display: inline-block;
   }
   #register .register_footer_ul1{
     float: left;
     width: 55%;
     text-align: left;
   }
   #register .register_footer_ul2{
     float: left;
     width: 35%;
     margin-left: 10%;
     text-align: right;
   }
   #register .register_footer_ul1_li{
    margin-left: 5%;
   } 
   #register .register_footer_ul2_num{
     margin-right: 5%;
     font-size: 16px;
   }

   #register .register_footer_ICP{
     font-size: 12px;
     color: #999999;
     margin-top: 15px;
     text-align: left;
   }
   /* ////////////////////////////////////// */
   /* main style */
   #register .register_main_left,#register .register_main_right{
     height: 460px;
     width: 50%;
     background-color: red;
     float: left;
     margin-top: 70px;
   }
   #register .register_main_left_count{
     height: 334px;
     background-color: #41b3f9;
     margin-top: 53px;
     border-right: 1px dashed #cfd6de
   }

   #register .register_main_right_count{
     height: 334px;
     background-color: #41b3f9;
     margin-top: 53px;
     
   }
   /* new */
   #register .el-main{
     background-image: url("../../assets/images/find_password_img.png");
     background-repeat:no-repeat;
     background-size:cover;  
     
   }

   /* register_count */
    #register .register_count{
      width: 90%;
      height:460px;
      /* background-color: #fff; */
      margin-left: 5%;
      margin-top: 5%;
    }
    #register .register_count_left,#register .register_count_right{
      float: left;
      width: 50%;
      height: 460px;
      border-radius: 6px;
    }
    #register .register_count_left{
      background-color: #fff;
    }
    
    #register .register_count_right{
      background-color: #cd0b1a
    }

    #register .register_count_rightNB{
      background-color: #fff
    }
   
    /* left */
    #register .register_count_left>img:nth-child(1){
      display: block;
      margin: 0 auto;
      margin-top: 108px;
    }
    #register .register_count_left>p:nth-child(2){
      font-size: 24px;
      text-align: center;
      margin-top: 34px;
    }
    #register .register_count_left>p:nth-child(3){
      text-align: center;
      margin-top: 20px;
    }
    #register .register_count_left>p:nth-child(3)>span:nth-child(1){
      color: #999999;
    }
    #register .register_count_left>p:nth-child(3)>span:nth-child(2)>a{
      color: #41b3f9;
    }
    #register .register_count_left>button:nth-child(4){
      display: block;
      margin: 0 auto;
      margin-top: 35px;
      cursor:pointer;
    }
    /* bind */
    
    
    /* right */
    #register .register_count_right>img:nth-child(1){
      display: block;
      margin: 0 auto;
      margin-top: 108px;
    }
    #register .register_count_right>p:nth-child(2){
      font-size: 24px;
      text-align: center;
      margin-top: 34px;
      color: #fff;
    }
    #register .register_count_right>p:nth-child(3){
      text-align: center;
      margin-top: 20px;
    }
    #register .register_count_right>p:nth-child(3)>span:nth-child(1){
      color: #fff;
    }
    #register .register_count_right>p:nth-child(3)>span:nth-child(2)>a{
      color: #fff;
    }
    #register .register_count_right>button:nth-child(4){
      display: block;
      margin: 0 auto;
      margin-top: 35px;
      cursor:pointer;
      color: #cd0b1a;
      background-color: #fff;
    }

     /* rightNew */
    #register .register_count_rightNB>img:nth-child(1){
      display: block;
      margin: 0 auto;
      margin-top: 108px;
    }
    #register .register_count_rightNB>p:nth-child(2){
      font-size: 24px;
      text-align: center;
      margin-top: 34px;
      color: #333333;
    }
    #register .register_count_rightNB>p:nth-child(3){
      text-align: center;
      margin-top: 20px;
    }
    #register .register_count_rightNB>p:nth-child(3)>span:nth-child(1){
      color: #999999;
    }
    #register .register_count_rightNB>p:nth-child(3)>span:nth-child(2)>a{
      color: #41b3f9;
    }
    #register .register_count_rightNB>button:nth-child(4){
      display: block;
      margin: 0 auto;
      margin-top: 35px;
      cursor:pointer;
    }
    /* 已有帐号，立即登录 */
    #register .register_dengli{
      margin-top: 70px;
      text-align: center;
      color: #fff;
    }
    #register .register_dengli>span>a{
      color: #e61e2d;
    }
 </style>
