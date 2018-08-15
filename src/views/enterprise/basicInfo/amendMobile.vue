<template>
  <div id="Modifynum">
    <!-- title -->
    <div class="title">
      <span>修改手机号</span>
    </div>
    <!-- 进度条 -->
    <el-steps :active="active" finish-status="success">
        <el-step  title="身份验证"></el-step>
        <el-step  title="修改手机号"></el-step>
        <el-step  title="完成"></el-step>
    </el-steps>
    <!-- 1 -->
    <div v-if="active==1" class="Modifynum_active_1">
        <ul class="Modifynum_active_ul_1">
          <li>当前手机号</li>
          <li>13129948435</li>
        </ul>
        <form >
        <ul class="Modifynum_active_ul_2">
          <li>请输入验证码</li>
          <li>
            <div class="form-item" >
						<input v-model="oldPhonecheckCode" type="text" placeholder="输入验证码" style="width:100%">
					</div>
          </li>
          <li>
            <!-- <button class="primary" hollow style="cursor:pointer" @click="hqyzm">获取验证码</button>
             -->
             <button style="cursor:pointer" class="primary" v-show ="sendAuthCode"  @click="getAuthCode">获取验证码</button>
    <button v-show="!sendAuthCode" class="primary"> <span class="auth_text_blue">{{auth_time}} </span> 秒之后可重新发送验证码</button>
          </li>
        </ul>
        <ul class="Modifynum_active_ul_3">
          <button :disabled="!oldPhonecheckCode" class="primary" style="margin-left:8.4%;cursor:pointer" @click="next">下一步</button>
        </ul>
        </form>
    </div>
    <!-- 2 -->
    <div v-else-if="active==2" class="Modifynum_active_1">
        <ul class="Modifynum_active_ul_1">
          <li>请输入新手机号</li>
          <li style="width:22.2%">
              <div class="form-item" >
						    <input v-model="newPhone" type="text" placeholder="输入内容" style="width:100%">

					    </div>
          </li>
        </ul>
        <ul class="Modifynum_active_ul_2">
          <li>请输入验证码</li>
          <li>
            <div class="form-item" >
						  <input v-model="newPhoneCheckCode" type="text" placeholder="输入内容" style="width:100%">
					  </div>
          </li>
          <li>
            <button style="cursor:pointer" class="primary" v-show ="sendAuthCode1"  @click="getAuthCode1">获取验证码</button>
    <button v-show="!sendAuthCode1" class="primary"> <span class="auth_text_blue">{{auth_time1}} </span> 秒之后可重新发送验证码</button>
          </li>
        </ul>
        <ul class="Modifynum_active_ul_3">
          <button :disabled="!newPhone || !newPhoneCheckCode" class="primary" style="margin-left:8.4%;cursor:pointer" @click="next1">提交</button>
        </ul>
    </div>

    <!-- 3 -->
    <div v-else-if="active==3" class="Modifynum_active_3">
        <ul >
          <li><img src="../../../assets/images/renzheng_Success.png" alt="" style="vertical-align:middle"></li>
          <li>
            <p>恭喜你</p>
            <p>你已成功修改手机号</p>
          </li>
          <div class="clear"></div>
        </ul>
    </div>


  </div>
</template>

<script>
export default {
    data() {

      return {
          sendAuthCode:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
          sendAuthCode1:true,/*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
          auth_time:0, /*倒计时 计数器*/
          auth_time1:0, /*倒计时 计数器*/
          active: 1,
          formInline: {},

        oldPhonecheckCode:"",
        newPhone:"",
        newPhoneCheckCode:""
      }

  },
  // data:{

  // },
    methods: {
        next() {
            this.active++
        },
        next1() {
            this.active++
        },
        getAuthCode:function () {

            this.sendAuthCode = false;

            this.auth_time = 60;
            var auth_timetimer =  setInterval(()=>{
                this.auth_time--;
                if(this.auth_time<=0){
                    this.sendAuthCode = true;
                    clearInterval(auth_timetimer);
                }
            }, 1000);
        },
        getAuthCode1:function () {

            this.sendAuthCode1 = false;

            this.auth_time1 = 60;
            var auth_timetimer1 =  setInterval(()=>{
                this.auth_time1--;
                if(this.auth_time1<=0){
                    this.sendAuthCode1 = true;
                    clearInterval(auth_timetimer1);
                }
            }, 1000);
        }
    }
  }
</script>

<style>
  .clear{
    clear: both;
  }
  /* #Modifynum>.title{
    height: 53px;
    line-height: 53px;
    text-align: left;

    border-bottom: 1px solid #dee0e3;
  }
  #Modifynum>.title>span{
    margin-left: 1.5%;
    color: #8e9eaa;
  } */
  #Modifynum .el-steps {
    width: 30%;
    margin-left: 1.5%;
    margin-top: 40px;
  }
  #Modifynum .el-step__icon{
    width: 30px;
    height: 30px;
  }
  #Modifynum .el-step__head.is-success{
    color: #e60012;
    border-color: #e60012
  }
  #Modifynum .el-step__title.is-success{
    color: #e60012;
    font-size: 14px;
  }
  #Modifynum .el-step__title.is-process{
    font-size: 14px;
  }
  #Modifynum .el-step__title.is-wait{
    font-size: 14px;
  }
  /* 结构样式 */
  #Modifynum .Modifynum_active_1{
    margin-left: 1.5%;
    margin-bottom: 2%;
  }
  #Modifynum .Modifynum_active_ul_1>li{
     display: inline-block;

  }
  #Modifynum .Modifynum_active_ul_1>li:nth-child(1),#Modifynum .Modifynum_active_ul_2>li:nth-child(1){
    width: 8%;
  }
  #Modifynum .Modifynum_active_ul_2>li{
     display: inline-block;
  }
  #Modifynum .Modifynum_active_ul_2>li:nth-child(2){
    width: 15.5%;
  }
  #Modifynum .Modifynum_active_ul_1{
    margin-top: 90px;
  }
  #Modifynum .Modifynum_active_ul_2{
    margin-top: 30px;
  }
  #Modifynum .Modifynum_active_ul_3{
    margin-top: 40px;
  }
  /* 2 */
  #Modifynum .Modifynum_active_2{
    margin-left: 1.5%;
    margin-bottom: 2%;
  }
  /* 3 */
  #Modifynum .Modifynum_active_3{
    margin-left: 1.5%;

  }
  #Modifynum .Modifynum_active_3>ul>li{
    float: left;
  }
  #Modifynum .Modifynum_active_3>ul>li:nth-child(2)>p:nth-child(1){
    font-size: 20px;
    font-weight: bold;

  }
  #Modifynum .Modifynum_active_3>ul>li:nth-child(2)>p:nth-child(2){
    color: #999999;
    margin-top: 5px;
  }
  #Modifynum .Modifynum_active_3>ul>li:nth-child(2){
    margin-top: 35px;
    margin-left: 2%;
  }
  #Modifynum .Modifynum_active_3>ul{
    margin-top: 65px;
    margin-left: 3%;
    margin-bottom:2%;
  }



</style>
