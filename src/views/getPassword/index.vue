<template>
   <div id="register">
       <el-container>
           <!-- nav -->
         <el-header style="height:77px;">
           <div class="register_nav">
             <div class="register_logo"><img src="../../assets/images/login_logo.png" alt="login_logo" style="vertical-align:middle">  全媒体广告平台</div>
             <!-- <div class="register_nav_button">
               <a href="#">首页</a>
               <a href="#" class="register_nav_button_a">菜单1</a>
               <a href="#" class="register_nav_button_a">菜单1</a>
               <a href="#" class="register_nav_button_a">菜单1</a>
               <a href="#" class="register_nav_button_a">菜单1</a>
             </div> -->
             <div class="login_register"><a href="#" @click="goto_login">登录</a>&nbsp;&nbsp; <a href="#" @click="zhuce">注册</a></div>
             <div class="clear"></div>
           </div>
         </el-header>
            <!-- count -->
            <el-main>
              <div action="" class="flex-form" style="margin-left:30%;">
                 <p>
                   <img src="../../assets/images/find-password_icon.png" alt="" style="vertical-align:middle">
                   <span>我是广告主</span>
                   <span>通过手机找回密码</span>  
                </p>
                <div class="from_count">
                  <el-steps :active="active" finish-status="success">
                    <el-step title="输入手机号" icon="el-icon-edit"></el-step>
                    <el-step title="重置密码" icon="el-icon-upload"></el-step>
                    <el-step title="完成" icon="el-icon-picture"></el-step>
                  </el-steps>
                <!-- 1 -->
                  <div class="from_show_1" v-if="active==1">
                    <el-form :model="form1" :rules="rules1" ref="form1">
                      <el-row>
                        <el-col :span="24">
                          <el-form-item prop="phone">
                              <el-input v-model="form1.phone" placeholder="请输入手机号"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="18">
                          <el-form-item prop="codes">
                              <el-input v-model="form1.codes" placeholder="请输入验证码"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6" align="right">
                          <el-button type="danger" @click="getData()" v-if="flag">获取验证码</el-button>
                          <el-button type="danger" v-if="!flag">{{seconds}}s后重新获取</el-button>

                          <!-- <button class="primary"  @click="getData()" v-if="flag">获取验证码</button>
                          <button class="primary" hollow v-if="!flag">{{seconds}}s后重新获取</button> -->
                        </el-col>
                      </el-row>
                      <el-button type="danger" @click="next('form1')" style="width:100%">下一步</el-button>
                      <!-- <button class="primary"   @click="next('form1')" style="width:100%">下一步</button> -->
                      <p class="from_show_1_p">如有疑问，请联系客服 ：<span style="color:#41b3f9">400-123-456</span>  </p>
                    </el-form>
                  </div>



                  <!-- 2 -->
                  <div class="from_show_1" v-else-if="active==2">
                    <el-form :model="form2" :rules="rules2" ref="form2">
                      <el-row>
                        <el-col :span="24">
                          <el-form-item prop="psw">
                              <el-input v-model="form2.psw" placeholder="请输入登录密码" type="password"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item prop="repsw">
                              <el-input v-model="form2.repsw" placeholder="请确认密码" type="password"></el-input>
                          </el-form-item>
                        </el-col>
                        
                      </el-row>
                      <el-button type="danger" @click="next('form2')" style="width:100%">完成</el-button>
                      <!-- <button class="primary"   @click="next('form2')" style="width:100%">完成</button> -->
                      <p class="from_show_1_p">如有疑问，请联系客服 ：<span style="color:#41b3f9">400-123-456</span>  </p>
                    </el-form>
                  </div>

                  <!-- 成功 -->
                  <div class="from_show_3" v-else-if="active==3">
                      <img src="../../assets/images/successPassword-img.png" alt="">
                      <p>密码重置成功</p>
                      <!-- <p>验证码已过期，请<a href="#">重新发送</a>手机或<a href="#">重新注册</a></p> -->
                  </div>
                  <!-- 失败 -->
                  <div class="from_show_3" v-else-if="active==4">
                      <img src="../../assets/images/find_password_fail_icon.png" alt="">
                      <p>验证失败</p>
                      <p>验证码已过期，请<a href="#">重新发送</a>手机或<a href="#">重新注册</a></p>
                  </div>
                  
                </div>
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
import {getCodes,getPwd} from '../../api/getPassword'
let _this;
export default {
  data() {
      var checkRepwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form2.psw) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        active: 1,
        flag:true,
        seconds:60,
        form1:{},
        form2:{},  
        rules1:{
          phone:[
            {required:true,message:'请输入手机号',trigger:'blur'},
            {pattern:'^1[34578][0-9]{9}$',message:'请正确填写手机号',trigger:'blur'}
          ],
          codes:[{required:true,message:'请输入验证码',trigger:'blur'}]
        },
        rules2:{
          psw:[{required:true,message:'请输入登录密码',trigger:'blur'},{ min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }],
          repsw:[{required:true,message:'请确认密码',validate:checkRepwd,trigger:'blur'}]
        },
      };
    },
    created(){
        _this = this;
    },
    methods: {
      next(formName) {
        this.$refs[formName].validate(valid =>{
          if(valid){
            if(formName == 'form1'){
              if(_this.form1.codes != _this.form1.phoneCode){
                this.$message.error('验证码错误')
                return
              }
            }else if(formName == 'form2'){
              var obj = {
                token:_this.$store.getters.token,
                checkCode:_this.form1.codes,
                password:_this.form2.psw,
                password2:_this.form2.repsw,
                phone:_this.form1.phone
              };
              console.log(obj,'传参');
              getPwd(obj).then(res=>{
                if(res.success){
                    _this.$message.success("修改"+res.msg);
                }
                //密码重置成功后，跳转到login
                this.$router.push('/login')
              }).catch(err=>{
                console.log(err);
              });
            }
            this.active++;
          }else{
            this.$message.error("请正确填写手机号或验证码")
          }
        })
      },
      getData(){
        if(this.form1.phone){
          var phoneObj = {'phone':this.form1.phone};
          getCodes(phoneObj).then(res=>{
            if(res.success){
                _this.$message.success(res.data);
                _this.form1.phoneCode = res.data.replace(/[^0-9]/ig,"")
               // _this.form1.codes = res.data.replace(/[^0-9]/ig,"");
                _this.flag = false;
                var i = setInterval(function(){
                  if(_this.seconds>0){
                    _this.seconds--;
                  }else{
                    clearInterval(i);
                    _this.seconds = 60;
                    _this.flag = true;
                  }
                },1000)
            }
          }).catch(err=>{
            console.log(err);
          })
        }else{
          this.$message.error("请先填写手机号!");
        }
          
      },

      
      goto_login(){
        this.$router.push('/login')
      },
      zhuce: function () {
        this.$router.push({path: '/register'})
      },
      //重新注册
      registration: function (){
        this.$router.push({path: '/register/Adegister'})
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
    #register .from_show_1_p{
      margin: 40px;
      text-align: center;
      color: #999999;
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
    /* footer */
   #register .el-footer{
     padding:0 10%;
     background-color: #f4f8fb;
     border-top: 1px solid #e4e7ea;
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
 </style>
