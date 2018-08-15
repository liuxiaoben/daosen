<template>
  <div id="Password_change">
    <!-- title -->
      <div class="title">密码修改</div>
    <!-- 表单 -->
      <div class="form">
        <el-form label-width="100px" :model="passwordForm" ref="passwordForm"  :rules="rules" status-icon>
          <!-- 当前密码 -->
          <el-form-item label="当前密码" prop="oPassword">
            <el-input style="width:300px;" type="" v-model="passwordForm.oPassword"></el-input> <span class="Password_span">请输入6-18个字符，支持英文数字</span>
          </el-form-item>
          <!--  新密码 -->
          <el-form-item label="新密码" prop="password">
            <el-input style="width:300px" type="password" v-model="passwordForm.password" @input="p_len" auto-complete="off"></el-input> <span class="Password_span">安全等级</span>
          <div class="lnu_container">
                <p v-bind:class="{ lovercase_valid: contains_lovercase }">弱</p>
                <p v-bind:class="{ number_valid: contains_number }">中</p>
                <p v-bind:class="{ uppercase_valid: contains_uppercase }">强</p>
          </div>
          <div class="clear"></div>
          </el-form-item>
          <!--  确认新密码 -->
          <el-form-item label="确认新密码" prop="rePassword"  >
            <el-input style="width:300px" type="password" v-model="passwordForm.rePassword" auto-complete="off"></el-input> <span class="Password_span">请再次输入你的新密码</span>
          </el-form-item>

          <el-button type="danger" style="margin-left:100px;" @click="clickme('passwordForm')" size="small">保存</el-button>
          </el-form>
      </div>
    </div>
</template>
<script>
//引入api下面的amendPassword里面的modifyPassword方法
import { modifyPassword } from "../../api/amendPassword";

export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passwordForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      passwordForm: {
        oPassword: "",
        password: "",
        rePassword: ""
      },

      //demo
      password: null,
      password_length: 0,
      typed: false,
      contains_lovercase: false,
      contains_number: false,
      contains_uppercase: false,
      valid_password_length: false,
      valid_password: false,

      //rules
      rules: {
        oPassword: [
          { required: true, message: "请输入当前密码 ", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        //输入密码
        password: [
          { required: true, message: "请输入密码 ", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        //再次输入密码
        rePassword: [
           { required: true, message: "请再次输入密码 ", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    clickme(formName) {
      modifyPassword({
        uid: this.$store.getters.uid,
        oPassword: this.passwordForm.oPassword,
        password: this.passwordForm.password,
        rePassword: this.passwordForm.rePassword,
        token: this.$store.getters.token
      })
        .then(response => {
          this.loading = false;
          this.$message({
          message: '恭喜你，密码修改成功',
          type: 'success'
        });
        //清空input框内容
        this.$refs[formName].resetFields();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    //demo
    p_len: function() {
      this.contains_lovercase = /[a-z]/.test(this.passwordForm.password);
      this.contains_number = /\d/.test(this.passwordForm.password);
      this.contains_uppercase = /[A-Z]/.test(this.passwordForm.password);

      // Check if the password is valid
      if (this.contains_lovercase == true && this.contains_number == true) {
        this.valid_password = false;
        if (
          this.contains_uppercase == true &&
          this.valid_password_length == true
        )
          this.valid_password = true;
      } else {
        this.valid_password = false;
      }
    }
  }
};
</script>
<style>
#Password_change .el-form-item__label {
  text-align: left;
  font-size: 14px;
  color: #555555;
}
#Password_change .Password_span {
  margin-left: 20px;
  font-size: 12px;
  color: #c1cad7;
  float: left;
}
#Password_change .el-input {
  float: left;
}

#Password_change .form {
  margin-left: 33px;
  margin-top: 30px;
}

.clear {
  clear: both;
}

/* more */

/* #Password_change > .title {
  height: 53px;
  line-height: 53px;
  text-align: left;

  border-bottom: 1px solid #dee0e3;
}
#Password_change > .title > span {
  margin-left: 33px;
  color: #8e9eaa;
} */
#Password_change .form_label {
  min-width: 7.5rem;
}
#Password_change .form_input {
  width: 35%;
}
#Password_change .form_labe2 {
  margin-left: 1%;
  color: #999999;
  font-size: 12px;
}
#Password_change .form_one {
  margin-top: 33px;
}
#Password_change .form_ul > li {
  display: inline-block;
}

#Password_change .progress {
  top: -20px;
  left: 55%;
}
#Password_change .grid-box {
  text-align: left;
  margin-left: 66px;
}
#Password_change .Password_change_span {
  display: inline-block;
  width: 70px;
  height: 30px;
  line-height: 30px;
  background: #ddd;
  text-align: center;
  margin: 4px 2px;
}

/* demo */

.lnu_container {
  display: inline-block;
  margin: 12px 0 12px 10px;
  height: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  float: left;
}
.lnu_container p {
  width: 50px;
  height: auto;
  font-size: 12px;
  line-height: 1.2;
  text-align: center;
  border-radius: 2px;
  color: rgba(71, 87, 98, 0.8);
  background: -webkit-linear-gradient(left, #ff7676 50%, #eee 50%);
  background: linear-gradient(to right, #ff7676 50%, #eee 50%);

  background-size: 202% 100%;
  background-position: right;
  -webkit-transition: background 0.3s;
  transition: background 0.3s;
}

.lovercase_valid,
.number_valid,
.uppercase_valid {
  background-position: left !important;
  color: rgba(255, 255, 255, 0.9) !important;
}
</style>


