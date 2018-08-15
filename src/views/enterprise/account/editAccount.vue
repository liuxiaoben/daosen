<template>
  <div id="son_modify">
    <!--title -->
    <div class="title">
      <span>修改子账号</span>
    </div>

    <!-- el-form -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="flex-form">

      <!-- 头像 -->
      <el-row>
        <el-form-item label="头像" prop="header" class="form-item">
          <el-upload
          class="upload-demo"
          action="http://47.97.171.192:8080/dsyun/file/ggzUpload"
          :show-file-list=false
          :http-request='subUserAtavarUpload'
          :limit="1">
          <div class="avatar son_modify_avatar" v-bind:style="{backgroundImage:'url(' + ruleForm.header + ')'}"></div>
          </el-upload>
        </el-form-item>
      </el-row>

      <!-- 昵称 -->
      <el-row>
        <el-form-item label="昵称" prop="nick" class="form-item">
          <el-input v-model="ruleForm.nick" style="width:300px;"></el-input>
        </el-form-item>
      </el-row>

      <!-- 手机号 -->
      <el-row>
        <el-form-item label="手机号" prop="oldPhone" class="form-item">
          <el-input v-model="oldPhone" style="width:300px;" :disabled="true"></el-input>
        </el-form-item>
      </el-row>

      <!-- 修改手机号 -->
      <el-row>
        <el-form-item label="修改手机号" prop="updatePhone" class="form-item">
          <el-radio v-model="ruleForm.updatePhone" label=true>是</el-radio>
          <el-radio v-model="ruleForm.updatePhone" label=false>否</el-radio>
          <el-row v-if="ruleForm.updatePhone == 'true'" style="margin-top:30px;">
            <el-form-item label="新手机号" prop="phone" class="form-item">
              <el-input type="text" placeholder="请输入新手机号" style="width:300px;" v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="checkCode" class="form-item">
              <el-input type="text" style="width:200px;" placeholder="请输入验证码" v-model="ruleForm.checkCode"></el-input>
              <el-button type="danger" plain v-show="sendAuthCode" @click="sendPhoneCode" size="small">获取验证码</el-button>
              <el-button type="danger" plain v-show="!sendAuthCode">{{auth_time}}秒之重新发送验证码</el-button>
            </el-form-item>
          </el-row>
        </el-form-item>
      </el-row>

      <!-- 修改密码 -->
      <el-row>
        <el-form-item label="修改密码" prop="updatePwd" class="form-item">
          <el-radio v-model="ruleForm.updatePwd" label=true>是</el-radio>
          <el-radio v-model="ruleForm.updatePwd" label=false>否</el-radio>
          <el-row v-if="ruleForm.updatePwd == 'true'" style="margin-top:30px;">
            <el-form-item label="新密码" prop="password" class="form-item">
              <el-input type="password" placeholder="请输入新密码" style="width:300px;" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2" class="form-item">
              <el-input type="password" placeholder="请确认新密码" style="width:300px;" v-model="ruleForm.password2"></el-input>
            </el-form-item>
          </el-row>
        </el-form-item>
      </el-row>

      <!-- 角色 -->
      <el-row>
        <el-form-item label="角色" prop="roleId" class="form-item">
          <el-select v-model="ruleForm.roleId" placeholder="请选择账号角色" style="width:300px;">
            <el-option v-for="role in Roles" :label="role.name" :value="role.id.toString()" :key="role.id" :selected="role.id.toString() == ruleForm.roleId"></el-option>
          </el-select>
        </el-form-item>
      </el-row>

      <el-form-item>
        <div class="grid-box" gap list>
          <el-button type="danger" @click="onSubmit('ruleForm')" size="small">提交</el-button>
          <el-button type="info" plain @click="backPage" size="small">取消</el-button>

          <!-- <button class="primary add_sure" @click="onSubmit('ruleForm')">提交</button> -->
          <!-- <button @click="backPage">取消</button> -->
        </div>
      </el-form-item>
      </el-form>
      <!-- <el-dialog title="修改手机号" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span slot="footer" class="dialog-footer">
              <div class="form-item">
                <input type="text"  style="width:100%" placeholder="请输入新手机号" v-model="newPhone">
              </div>
              <div class="form-item">
                <input type="text" style="width:63%" v-model="code">
                <button class="primary" hollow style="{margin-left:10%; cursor:pointer}" @click="sendPhoneCode">获取验证码</button>
              </div>
              <div class="grid-box grid-button" gap list>
                <button class="primary" @click="verifyNewPhone">确认</button>
                <button @click="done()">返回</button>
               </div>
            </span>
          </el-dialog> -->
  </div>
</template>
<script>
import { allRoles, detailSubUser, updateSubUser, updatePhoneCheckCode, ggzUpload } from '@/api/childAccount'
import { mapGetters } from 'vuex'
import { validateMobile } from '@/utils/validate.js'


export default {
  data() {
    return {
      sendAuthCode: true, /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 0, /*倒计时 计数器*/
      Roles: [],  // 角色信息
      accountId: '',
      oldPhone: '',

      ruleForm: {
        header: '',
        nick: '',
        roleId: '',
        updatePwd: 'false',
        updatePhone: 'false',
        password: '',
        password2: '',
        phone: '',
        checkCode: '',
      },
      rules: {
          // header: [{
          //   required: true,
          //   message: '请上传头像',
          //   trigger: 'blur'
          // }],
          nick: [{
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }],
          updatePhone: [{
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }],
          phone: [{
            required: true,
            message: '请输入手机号码',
            trigger: 'blur'
          },
          {
            validator: function(rule, value, callback) {
              if (validateMobile(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }],
          checkCode: [{
            validator: function(rule, value, callback) {
              if (value.length != 6) {
                callback(new Error("验证码格式有误"));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }],
          updatePwd: [{
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }],
          password: [{
            min: 6,
            max: 30,
            message: '长度在 6 到 30 个字符',
            trigger: 'blur, change'
          }, {
            pattern: /^(\w){6,20}$/,
            message: '只能输入6-20个字母、数字、下划线',
            trigger: 'blur, change'
          }, {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'));
              }else if (this.ruleForm.password2 !== '') {
                this.$refs.ruleForm.validateField('password2');
              }
              callback();
            },
            trigger: 'blur'
          }],
          password2: [{
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.ruleForm.password) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }],
          roleId: [{
            required: true,
            message: '请选择账号角色',
            trigger: 'blur'
          }, {
            validator: (rule, value, callback) => {
              if (this.ruleForm.roleId == '') {
                callback(new Error('请选择账号角色'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }]
      }
    };
  },
  created() {
    // 获取全部角色信息
    var params = { token: this.token }
    allRoles(params).then(response => {
      this.Roles = response.data;
    }).catch(error => {
      console.log(error);
    });

    if (this.$route.params.user) {
      this.oldPhone = this.$route.params.user.phone;
      this.accountId = this.$route.params.user.uid;

      this.ruleForm.roleId = this.$route.params.user.role_id.toString();
      this.ruleForm.nick = this.$route.params.user.nick;
      params['uid'] = this.$route.params.user.uid;

      // 获取子账号详情
      detailSubUser(params).then(response => {
        console.log('detailSubUser', response);

        this.ruleForm.header = response.data.header;
        this.ruleForm.nick = response.data.nick;
        if (response.data.phone) {
          this.oldPhone = response.data.phone;
        }
      }).catch(error => {});
    }
  },
  computed: {
    ...mapGetters(['token']),
  },
  methods: {

    // 自定义图片上传方法
    subUserAtavarUpload(content) {
        console.log(content);
        // 判断文件类型及大小

        // 上传头像
        var params = {kind: 1};
        var data = new FormData();
        data.append('formfile',content.file, content.file.name);
        ggzUpload(params, data).then(response => {

          this.header = 'http://47.97.171.192:8080'+response.data;
        }).catch(error => {});

    },

    sendPhoneCode() {
      console.log('获取验证吗');
      if (!validateMobile(this.ruleForm.phone)) {
        this.$message.error("请输入正确的手机号");
        return false;
      }
      var parmas = { phone: this.ruleForm.phone };
      updatePhoneCheckCode(parmas).then(response => {}).catch(error => {});

      // 调整UI
      this.sendAuthCode = false;
      this.auth_time = 6;
      var auth_timetimer = setInterval(() => {
        this.auth_time--;
        if (this.auth_time <= 0) {
          this.sendAuthCode = true;
          clearInterval(auth_timetimer);
        }
      }, 1000);
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm['token'] = this.token;
          this.ruleForm['accountId'] = this.accountId;

          if (this.ruleForm.updatePwd == 'false') {
            delete this.ruleForm.password;
            delete this.ruleForm.password2;
          }
          if (this.ruleForm.updatePhone == 'false') {
            delete this.ruleForm.phone;
            delete this.ruleForm.checkCode;
          }

          console.log('onSubmit', this.ruleForm);
          updateSubUser(this.ruleForm).then(response => {
            this.$message.success("修改成功");
            this.$refs[formName].resetFields();
          }).catch(error => {});
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    backPage() {
      // 1.如修改信息提示是否确定退出

      // 2.直接退出
      this.$router.back();
    }
  }
};

</script>
<style>
/* #son_modify>.title {
  height: 53px;
  line-height: 53px;
  text-align: left;
  padding-left: 40px;
  border-bottom: 1px solid #dee0e3;
}

#son_modify>.title>span {
  color: #8e9eaa;
  font-size: 14px;
} */

#son_modify .flex-form .form-item>label {
  min-width: 9rem;
  text-align: left;
}

#son_modify .add_son_input {
  margin-left: 2%;
  width: 40%;
}

#son_modify .flex-form .add_son_input {
  margin-left: 2%;
  width: 40%;
}

#son_modify .flex-form {
 padding: 30px 40px;
}

#son_modify .add_son_input_num {
  width: 20%;
}

#son_modify .add_num {
  margin-left: 1.65%;
}


/* button  */

/* #son_modify .grid-box {
  text-align: left;
  /* --innergap: 1.5rem 8rem;
} */

#son_modify .grid-box {
    text-align: left;
    margin-left: 85px;
}

#son_modify .grid-box > button {
    cursor: pointer;
    padding-left: 25px;
    padding-right: 25px;
}
#son_modify .add_sure {
  margin-left: 73px;
  margin-top: 22px;
  margin-right: 20px;
}


/* 头像 */

#son_modify .son_modify_head {
  padding-top: 5px;
}

#son_modify .son_modify_avatar {
  --size: 60px;
}


/* 弹窗遮罩 */

#son_modify .el-dialog__header {
  border-bottom: 1px solid #dee0e3;
}

#son_modify .el-dialog__title {
  font-size: 16px;
}

#son_modify .el-dialog__body {
  padding: 0;
}

#son_modify .el-dialog__headerbtn {
  right: 0;
  top: 0;
}

#son_modify .el-dialog__footer {
  padding: 40px 20px 20px;
}

#son_modify .grid-button {
  --innergap: 0;
  margin-top: 40px;
}

/* 单选按钮选中颜色变化 */
#son_modify .el-radio__input.is-checked .el-radio__inner {
    border-color: #e60012;
    background-color: #fff;
}
#son_modify .el-radio__input.is-checked+.el-radio__label{
  color: #e60012;
}
#son_modify .el-radio__inner::after{
  width: 8px;
  height: 8px;
  background-color: #e60012;
}
</style>
