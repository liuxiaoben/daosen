<template>
    <div id="login">
    <el-container>
      <!-- nav -->
      <el-header style="height: 77px;line-height: 77px;padding: 0 10%;background-color: #f4f8fb">
        <div class="login_nav">

          <div class="login_logo"><img src="../../assets/images/login_logo.png" alt="login_logo" style="vertical-align:middle">  全媒体广告平台</div>
          <div class="login_nav_button">
            <a href="#/media">媒体展示厅</a>
            <!-- <a href="#" class="login_nav_button_a">菜单1</a>
            <a href="#" class="login_nav_button_a">菜单1</a>
            <a href="#" class="login_nav_button_a">菜单1</a>
            <a href="#" class="login_nav_button_a">菜单1</a> -->
          </div>
          
          <div class="clear"></div>
        </div>
      </el-header>
      <!-- count -->
      <el-main class="login_main" v-bind:class="{'new_bg' : activeName == 'second'}">
        <!-- 表单 -->
        <div class="login_form">
          <el-menu class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1" @click="See('http://localhost:9528/#/login')">广告主登录</el-menu-item>
            <el-menu-item index="1" @click="See('http://47.97.171.192:9528/login#/login')">资源主登录</el-menu-item>
          </el-menu>
             <!-- 广告主 -->

          <el-form ref="loginForm" :model="loginForm"   autoComplete="on" >
          <el-form-item prop="phone">
                <el-input placeholder="请输入手机号" type="text"  v-model="loginForm.phone" autoComplete="on"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="请输入密码" type="password"  @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"></el-input>
              </el-form-item>
              <div class="check">
                <el-checkbox v-model="checked">
               <span style="font-size:12px;">7天内自动登录</span> 
              </el-checkbox>
              <a href="#" style="color:#999999;font-size:12px;float: right;" @click="wangji">忘记密码</a>
              <div class="clear"></div>
              </div>
              
              <el-button type="danger" :loading="loading" @click.native.prevent="handleLogin" >立即登录</el-button>  
              
              
          </el-form>
          
          
            <a href="#" class="login_register_new"  @click="zhuce">注册新账号</a>
          

            <!-- 资源主 -->
            <!-- <el-tab-pane label="">
              <el-form ref="form" :model="form" >
                  <el-form-item prop="account">
                    <el-input placeholder="请输入手机号" type="text" v-model="phone"></el-input>
                  </el-form-item>
                  <el-form-item prop="checkPass">
                    <el-input placeholder="请输入密码" type="password" v-model="password"></el-input>
                  </el-form-item>
                  <div class="check">
                    <el-checkbox v-model="checked">
                   <span style="font-size:12px;">7天内自动登录</span> 
                  </el-checkbox>
                  <a href="#" style="color:#999999;font-size:12px;float: right;" @click="wangji">忘记密码</a>
                  <div class="clear"></div>
                  </div>
                  
                  <el-button type="danger" @click.native.prevent="handleLogin" :loading="logining">立即登录</el-button>
                  
              </el-form>
              <a href="#" class="login_register_new"  @click="zhuce">注册新账号</a>
            </el-tab-pane> -->
          
          </div>     
        

      </el-main>

      <!-- footer -->
         <el-footer style="height:84px;">
           <div class="login_footer">
             <ul class="login_footer_ul1">
               <li><a href="#">关于我们</a></li>
               <li class="login_footer_ul1_li"><a href="#">商务合作</a> </li>
               <li class="login_footer_ul1_li"><a href="#">动态中心</a> </li>
               <li class="login_footer_ul1_li"><a href="#">联系我们</a> </li>
               <li class="login_footer_ul1_li"><a href="#">加入我们</a> </li>
               <li class="login_footer_ul1_li"><a href="#">常见问题</a> </li>
             </ul>
             <ul class="login_footer_ul2">
               <li><i class="icon iconfont icon-dianhua"></i></li>
               <li class="login_footer_ul2_num">400-840-8772</li>
               <li>周一至周五 9:00-18:00</li>
             </ul>
             <div class="clear"></div>
             <div class="login_footer_ICP">
               Copyright © 2013 道森媒体股份 版权所有 鄂ICP备13016394号-1
             </div>
           </div>
         </el-footer>
    </el-container>
  </div>
</template>

<script>
import { login } from "../../api/login";
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      logining: false,
      loginForm: {
        phone: "15623917310",
        password: "123456"
      },
      loginRules: {
        phone: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false,
      pwdType: "password",
      msg: "Hello login",
      phone: "",
      password: "",
      checked: true,
      activeName: "first",
      form: {},
      formPath: ''
    };
  },
  methods: {
    See (e) {
      window.location.href = e
    },
    zhuce: function() {
      this.$router.push({ path: "/register" });
    },
    wangji: function() {
      this.$router.push({ path: "/getPassword" });
    },
    
    handleLogin() {
      //验证
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;  
      if (this.loginForm.phone == "") {
        this.$message.error("用户名不能为空");
        return false;
      }
      if(!myreg.test(this.loginForm.phone)){
        this.$message.error("请输入正确的手机号");
        return false;
      }
      if (this.loginForm.password == "") {
        this.$message.error("密码不能为空");
        return false;
      }
      if(this.loginForm.password.length<5){
        this.$message.error("密码不能少于5位数");
        return false;
      } else {(this.loading = true),
          this.$store.dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              if(this.formPath != "/"){
                this.$router.push(this.formPath)
              }else{
                this.$router.push({ path: "/" });
              }
            })
            .catch(() => {
              this.loading = false;
            });
        //登录成功后提示弹窗
        this.$message({
          message: "恭喜你，登录成功",
          type: "success"
        });
      }
    }
  },

  beforeMount: function() {
    //钩子函数，数据挂在之前，判断数据缓存里是不是有账号密码的缓存数据存在，如果有，
    //那么当前input里绑定的账号，就是缓存中的账号，密码就是缓存中的密码，如果没有缓存数据存在，不用执行任何操作
    if (localStorage.getItem("phone") && localStorage.getItem("password")) {
      this.phone = localStorage.getItem("phone");
      this.password = localStorage.getItem("password");
    } else {
      //没有数据缓存，不执行任何绑定操作
    }
    console.log(this.checked);
  },
  beforeRouteEnter (to, from, next) { 
    next(vm => {
       vm.formPath = from.path   
     })
  }
};
</script>

<style>
.clear {
  clear: both;
  
}
#login .el-menu--horizontal{
    background-color: #edeff0;
    border-radius: 6px;
    height: 59px;
    line-height: 63px;
    text-align: center;
    padding-left: 15%;
}
#login,
#login .el-container {
  height: 100%;
}
#login a {
  color: #2f323e;
}

#login .login_logo {
  width: 177px;
  float: left;
  text-align: left;
  color: #2f323e;
}
#login .login_nav_button {
  width: 35%;
  margin-left: 5%;
  float: left;
  text-align: left;
}
#login .login_register {
  float: right;
  text-align: center;
}
#login .login_register > a {
  color: #41b3f9;
}
#login .login_nav_button > a {
  color: #2f323e;
}
#login .login_nav_button_a {
  margin-left: 8%;
}
#login .check {
  width: 80%;
  margin-left: 10%;
  height: 20px;
  line-height: 20px;
}

/* footer */
#login .el-footer {
  padding: 0 10%;
  background-color: #f4f8fb;
  border-top: 1px solid #e4e7ea;
}

#login .login_footer {
  margin-top: 20px;
  color: #2f323e;
}

#login .login_footer ul li {
  display: inline-block;
}
#login .login_footer_ul1 {
  float: left;
  width: 55%;
  text-align: left;
}
#login .login_footer_ul2 {
  float: left;
  width: 35%;
  margin-left: 10%;
  text-align: right;
}
#login .login_footer_ul1_li {
  margin-left: 5%;
}
#login .login_footer_ul2_num {
  margin-right: 5%;
  font-size: 16px;
}

#login .login_footer_ICP {
  font-size: 12px;
  color: #999999;
  margin-top: 15px;
  text-align: left;
}

#login .login_main {
  padding: 0;
  overflow: hidden;
  background-image: url("../../assets/images/bj2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
#login .login_main.new_bg {
  background-image: url("../../assets/images/bj1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  /* background-size:cover;  */
}

#login .login_main {
  height: 569px;
}

/* 表单 */
#login .login_form {
  width: 330px;
  height: 350px;
  background-color: #fff;
  border-radius: 6px;
  position: absolute;
  right: 10%;
  top: 20%;
}
#login .el-tabs__nav-wrap::after {
  background-color: #fff;
}
#login .el-tabs__nav-scroll {
  background-color: #edeff0;
  border-radius: 6px;
  height: 63px;
  line-height: 63px;
  text-align: center;
}
#login .el-tabs__nav {
  margin-left: 25%;
}
#login .el-tabs__active-bar {
  background-color: #e60012;
}
#login .el-tabs__item.is-active,
#login .el-tabs__item:hover {
  color: #e60012;
}
#login .el-tabs__item {
  color: #999999;
}

#login .el-form-item__content {
  margin: 0;
  width: 80%;
  margin-left: 10%;
}
#login .el-form {
  margin-top: 6%;
}
#login .el-menu--horizontal .el-menu-item{
  margin-bottom: -3px;
}
#login .el-menu--horizontal .el-menu-item:hover{
  background: none;
  color: #e60012;
}
#login .el-menu--horizontal>.el-menu-item:nth-child(1){
  color: #e60012;
  border-bottom: 2px solid #e60012 !important;
  position: relative;
  z-index: 999;
}
#login .el-checkbox {
  color: #999999;
  float: left;
}

#login .el-button {
  width: 80%;
  margin-left: 10%;
}
#login .el-button--danger {
  background-color: #e60012;
  border-color: #e60012;
  margin-top: 5%;
}

#login .login_register_new{
  width:20%;
  font-size:12px;
  display: block;
  margin: 30px auto 0 auto;
  color: #41b3f9;
}
#login .el-form-item {
  margin-bottom: 15px;
}
#login .login_span {
  margin-left: 24%;
}
#login .login_span > a {
  color: #999999;
}
#login #span1 {
  margin-left: 35%;
  color: #999999;
}
</style>
