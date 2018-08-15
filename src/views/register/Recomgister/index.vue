<template>
   <div id="Adegister">
       <el-container>
         <el-header style="height:77px;">
           <div class="Adegister_nav">
             <div class="Adegister_logo"><img src="../../../assets/images/login_logo.png" alt="login_logo" style="vertical-align:middle">  全媒体广告平台</div>
             <!-- <div class="Adegister_nav_button">
               <a href="#">首页</a>
               <a href="#" class="Adegister_nav_button_a">菜单1</a>
               <a href="#" class="Adegister_nav_button_a">菜单1</a>
               <a href="#" class="Adegister_nav_button_a">菜单1</a>
               <a href="#" class="Adegister_nav_button_a">菜单1</a>
             </div> -->
             <div class="login_register"><a href="#" @click="goto_login">登录</a>&nbsp;&nbsp;<a href="#" @click="goto_register">注册</a></div>
             <div class="clear"></div>
           </div>
         </el-header>

        <!-- count -->
            <el-main>
                <el-form  class="Advertiser_count" :model="registerForm" ref="registerForm"  :rules="rules" status-icon>
                  <el-row :span="24" >
                      <!-- 广告主 -->
                      <el-col :span="12"  :offset="1" class="Advertiser_count_left">
                        <p>广告主  手机注册</p>
                        <!-- 昵称 -->
                        <el-form-item prop="nick">
                          <el-input v-model="registerForm.nick" placeholder="请输入你的昵称" class="nickname"></el-input>
                        </el-form-item>
                        <!-- 极验 -->
                        <el-form-item prop="extext">
                          <el-input v-model="registerForm.extext"  placeholder="极验" class="input_public_style"></el-input>
                        </el-form-item>
                        <!-- 请输入手机号 -->
                        <el-form-item prop="phone">
                          <el-input v-model="registerForm.phone" placeholder="请输入你的手机号" class="input_public_style"></el-input>
                        </el-form-item>
                        <!-- 验证码 -->
                        <el-row :span=24 class="input_public_style">
                          <el-col :span=16>
                            <el-form-item prop="regCheckCode">
                              <el-input v-model="registerForm.regCheckCode"  placeholder="请输入验证码" type="password"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span=4 :offset="2" >
                            <el-button type="danger" plain @click="getCode()" :disabled="this.timer"><span v-if="this.showtime">{{this.timeCount}}</span>{{this.text}}</el-button>
                          </el-col>
                        </el-row>
                        <!-- 登录密码 -->
                        <el-form-item prop="password">
                          <el-input v-model="registerForm.password" placeholder="请登录密码" type="password" class="input_public_style"></el-input>
                        </el-form-item>
                        
                        
                        <!-- `checked` 为 true 或 false -->
                        <el-checkbox v-model="checked" class="checked">我已同意并阅读《平台注册协议》</el-checkbox>
                        <!-- 完成注册 -->
                        <el-row><el-button type="danger" @click="registerAde('registerForm')" class="complete_register">完成注册</el-button></el-row>
                      </el-col>


                      <!-- 广告主微信扫一扫 -->
                      <el-col :span="10"  :offset="1" class="Advertiser_count_right">
                        <el-row :span="24">
                            <el-col :offset="4" style="font-size:30px;margin-top:85px"><span style="font-weight: 600">{{ msg }}</span>&nbsp;&nbsp;<span style="font-size:24px">欢迎你!</span></el-col>
                        </el-row>
                        <el-row :span=24>
                            <el-col :offset="4" style="font-size:22px;margin-top:30px;">请完成账号注册</el-col>
                        </el-row>
                        <el-row :span=24>
                            <el-col :offset="4" style="font-size:18px;margin-top:110px;">客客信息推荐你加入</el-col>
                        </el-row>
                        <el-row :span=24>
                            <el-col :offset="4" style="font-size:18px;margin-top:20px;padding-bottom:145px;">道森广告主大家庭</el-col>
                        </el-row>
                      </el-col>
                  </el-row>
                </el-form >
                <!-- 立即登录 -->
                <p class="Adegister_dengli">已有帐号，<span>立即  <a href="#" @click="goto_login">登录</a></span></p>
			      </el-main>   
         <!-- footer -->
         <el-footer style="height:84px;">
           <div class="Adegister_footer">
             <ul class="Adegister_footer_ul1">
               <li><a href="#">关于我们</a></li>
               <li class="Adegister_footer_ul1_li"><a href="#">商务合作</a> </li>
               <li class="Adegister_footer_ul1_li"><a href="#">动态中心</a> </li>
               <li class="Adegister_footer_ul1_li"><a href="#">联系我们</a> </li>
               <li class="Adegister_footer_ul1_li"><a href="#">加入我们</a> </li>
               <li class="Adegister_footer_ul1_li"><a href="#">常见问题</a> </li>
             </ul>
             <ul class="Adegister_footer_ul2">
               <li><i class="icon iconfont icon-dianhua"></i></li>
               <li class="Adegister_footer_ul2_num">400-840-8772</li>
               <li>周一至周五 9:00-18:00</li>
             </ul>
             <div class="clear"></div>

             <div class="Adegister_footer_ICP">
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.rePassword !== "") {
          this.$refs.registerForm.validateField("rePassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      registerForm: {
        nick: "",
        extext: "",
        phone: "",
        password: "",
        rePassword: "",
        regCheckCode:""
      },
      loading: false,
      checked: true,
      timer: false,
      showtime: false,
      timecount: 60000,
      text: "获取验证码",
      timeCount: null,

      msg:"曾阿牛",

      //格式
      rules: {
        //required：是否必填
        //trigger: 'blur'  事件

        //昵称
        nick: [
          { required: true, message: "请输入你的昵称", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        //极验
        extext: [
          { required: true, message: "请完成极验验证", trigger: "blur" }
        ],
        //电话号码
        phone: [
          { required: true, message: "请输入你的手机号", trigger: "blur" },
          {
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: "目前只支持中国大陆的手机号码"
          }
        ],
        //验证码
        vercode: [
          { required: true, message: "请输入你的验证码", trigger: "blur" }
        ],
        //输入密码
        password: [
          { validator: validatePass, trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        //再次输入密码
        rePassword: [
          { validator: validatePass2, trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    goto_login() {
      this.$router.push("/login");
    },
    goto_register() {
      this.$router.push("/register");
    },
    //从状态管理里面拿数据，上面不用引入API文件里的方法
    registerAde(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true; //这个是页面加载的动画效果，是element.ui里面的
          this.$store
            .dispatch("Register", this.registerForm)
            .then(() => {
              this.loading = false;
              this.$router.push({ path: "/" });
            })
            .catch(() => {
              this.loading = false;
            });
          //登录成功后提示弹窗
          this.$message({
            message: "恭喜你，注册成功",
            type: "success"
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //验证码
    getCode() {
      if (this.registerForm.phone) {
        let userPhone = { phone: this.registerForm.phone };
        this.showtime = true;
        this.timer = true;
        this.timeCount = this.timecount / 1000;
        this.text = "秒后重新获取";
        this.$store
          .dispatch("RegCheckCode", userPhone)
          .then(() => {})
          .catch(() => {});
        var count = setInterval(() => {
          this.timeCount--;
        }, 1000);
        let set = setTimeout(() => {
          this.text = "获取验证码";
          this.timer = false;
          clearInterval(count);
          this.showtime = false;
          this.timeCount = this.timecount / 1000;
        }, 60000);
      } else {
        this.$message.error("请先填写手机号!");
      }
    }
  }
};
</script>


 <style>
#Adegister .Advertiser_count_left > p:nth-child(1) {
  font-size: 16px;
  margin-top: 25px;
  font-weight: bold;
  
}
/* 昵称 */
#Adegister .nickname {
  margin-top: 30px;
}
#Adegister .el-form-item {
  margin-bottom: 20px;
}
#Adegister .complete_register {
  margin: 20px 0 40px 0;
  background-color: #e60012;
  width: 100%;
}
/* 广告主微信扫一扫 */
#Adegister .Advertiser_count_right{
    background-color: #fafafa;
    
}


/* header-register */
#Adegister .login_register {
  float: right;
  text-align: center;
}
#Adegister .login_register > a {
  color: #41b3f9;
}
/* //////////////////////////// 公共样式 */
.clear {
  clear: both;
}
#Adegister {
  height: 100%;
}
#Adegister .el-container {
  height: 100%;
}
#Adegister .el-header {
  line-height: 77px;
  padding: 0 10%;
  background-color: #f4f8fb;
  border-bottom: 1px solid #e4e7ea;
}
#Adegister .el-main {
  padding: 0 10%;
  background-color: #edf1f5;
  height: 100%;
}
#Adegister .el-footer {
  padding: 0 10%;
  background-color: #f4f8fb;
  border-top: 1px solid #e4e7ea;
}

#Adegister .Adegister_logo {
  width: 30%;
  float: left;
  text-align: left;
  color: #2f323e;
}
#Adegister .Adegister_nav_button {
  width: 35%;
  margin-left: 5%;
  float: left;
  text-align: left;
}
#Adegister .Adegister_register {
  margin-left: 19%;
  width: 11%;
  float: left;
  text-align: right;
}
#Adegister .Adegister_register > a {
  color: #41b3f9;
}
#Adegister .Adegister_nav_button > a {
  color: #2f323e;
}
#Adegister .Adegister_nav_button_a {
  margin-left: 8%;
}

#Adegister .Adegister_footer {
  margin-top: 20px;
  color: #2f323e;
}

#Adegister .Adegister_footer ul li {
  display: inline-block;
}
#Adegister .Adegister_footer_ul1 {
  float: left;
  width: 55%;
  text-align: left;
}
#Adegister .Adegister_footer_ul2 {
  float: left;
  width: 35%;
  margin-left: 10%;
  text-align: right;
}
#Adegister .Adegister_footer_ul1_li {
  margin-left: 5%;
}
#Adegister .Adegister_footer_ul2_num {
  margin-right: 5%;
  font-size: 16px;
}

#Adegister .Adegister_footer_ICP {
  font-size: 12px;
  color: #999999;
  margin-top: 15px;
  text-align: left;
}
/* new */
#Adegister .el-main {
  background-image: url("../../../assets/images/find_password_img.png");
  background-repeat: no-repeat;
  background-size: cover;
}

/* Adegister_coun */
#Adegister .Advertiser_count {
  width: 60%;
  height: auto;
  margin-left: 20%;
  margin-top: 5%;
  background-color: #fff;
  border-radius: 6px;
  position: relative;
}
/* 已有帐号，立即登录 */
#Adegister .Adegister_dengli {
  margin-top: 2%;
  text-align: center;
  color: #fff;
}
#Adegister .Adegister_dengli > span > a {
  color: #e61e2d;
}
</style>
