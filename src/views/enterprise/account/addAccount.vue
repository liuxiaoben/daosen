<template>
  <div id="add_son">
    <!--title -->
    <!-- <div class="title">
      <span>添加子账号</span>
    </div> -->
    <div class="title">
      <span>添加子账号</span>
    </div>
    <!-- form -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="flex-form">
      <!-- 1 -->
      <el-row>
        <el-form-item label="手机号" prop="phone" class="form-item">
          <el-input v-model="ruleForm.phone" style="width:300px;"></el-input>
        </el-form-item>
      </el-row>
      <!-- 2 -->
      <el-row :span="24" style="width:500px;">
        <el-col :span="14">
          <el-form-item label="手机验证码" prop="checkCode" class="form-item">
            <el-input v-model="ruleForm.checkCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-button type="danger" plain v-show="sendAuthCode" @click="addSubAccoutCheckCode" size="small" style="margin-top:3px;">获取验证码</el-button>
          <el-button type="danger" plain v-show="!sendAuthCode" size="small" style="margin-top:3px;">{{auth_time}}秒之重新发送验证码</el-button>
        </el-col>
      </el-row>
      <!-- 3 -->
      <el-row>
        <el-form-item label="登录密码" prop="password" class="form-item">
          <el-input v-model="ruleForm.password" type="password" style="width:300px;"></el-input>
        </el-form-item>
      </el-row>
      <!-- 4 -->
      <el-row>
        <el-form-item label="确认密码" prop="password2" class="form-item">
          <el-input v-model="ruleForm.password2" type="password" style="width:300px;"></el-input>
        </el-form-item>
      </el-row>
      <!-- 5 -->
      <el-row>
        <el-form-item label="角色" prop="roleId" class="form-item">
          <el-select v-model="ruleForm.roleId" placeholder="请选择账号角色" style="width:300px;">
            <el-option v-for="role in Roles" :label="role.name" :value="role.id.toString()" :key="role.id"></el-option>
          </el-select>
        </el-form-item>
      </el-row>

      <el-form-item>
        <div class="grid-box" gap list>
          <el-button type="danger" @click="onSubmit('ruleForm')" size="small">确定</el-button>
          <el-button type="info" plain @click="cancelClick" size="small">取消</el-button>
          <!-- <button class="primary add_sure" @click="onSubmit('ruleForm')">确定</button> -->
          <!-- <button @click="cancelClick">取消</button> -->
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
    addSubUser,
    allRoles,
    addSubAccoutCheckCode
} from "@/api/childAccount";
import { mapGetters } from "vuex";
import { validateMobile } from "@/utils/validate.js";

export default {
    data() {
        return {
            sendAuthCode: true,
            /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
            auth_time: 0,
            /*倒计时 计数器*/

            ruleForm: {
                phone: "",
                checkCode: "",
                password: "",
                password2: "",
                roleId: ""
            },
            rules: {
                phone: [
                    {
                        required: true,
                        message: "请输入手机号码",
                        trigger: "blur"
                    },
                    {
                        validator: function(rule, value, callback) {
                            if (validateMobile(value) == false) {
                                callback(new Error("请输入正确的手机号"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur"
                    }
                ],
                checkCode: [
                    {
                        required: true,
                        message: "请输入手机验证码",
                        trigger: "blur"
                    },
                    {
                        validator: function(rule, value, callback) {
                            if (value.length != 6) {
                                callback(new Error("手机验证码格式有误"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 30,
                        message: "长度在 6 到 30 个字符"
                    },
                    {
                        pattern: /^(\w){6,20}$/,
                        message: "只能输入6-20个字母、数字、下划线"
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (this.ruleForm.password2 !== "") {
                                this.$refs.ruleForm.validateField("password2");
                            }
                            callback();
                        },
                        trigger: "blur"
                    }
                ],
                password2: [
                    {
                        required: true,
                        message: "请输入确认密码",
                        trigger: "blur"
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value === "") {
                                callback(new Error("请再次输入密码"));
                            } else if (value !== this.ruleForm.password) {
                                callback(new Error("两次输入密码不一致!"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur"
                    }
                ],
                roleId: [
                    {
                        required: true,
                        message: "请选择账号角色",
                        trigger: "blur"
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (this.ruleForm.roleId == "") {
                                callback(new Error("请选择账号角色"));
                            } else {
                                callback();
                            }
                        },
                        trigger: "blur"
                    }
                ]
            },
            Roles: []
        };
    },
    created() {
        var params = { token: this.token };
        allRoles(params)
            .then(response => {
                this.Roles = response.data;
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

        // sessionStorage.setItem('token', this.token);
    },
    computed: {
        ...mapGetters({
            token: "token"
        })
    },
    methods: {
        addSubAccoutCheckCode() {
            // 验证手机号
            this.ref;
            if (!validateMobile(this.ruleForm.phone)) {
                this.$message.error("请输入正确的手机号");
                return false;
            }
            // 发送获取验证码请求
            var params = { phone: this.ruleForm.phone, token: this.token };
            addSubAccoutCheckCode(params)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
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
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.ruleForm["token"] = this.token;
                    addSubUser(this.ruleForm)
                        .then(response => {
                            this.$message.success("添加子账号成功");
                            this.$refs[formName].resetFields();
                            // console.log(response);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        cancelClick() {
            this.$router.back();
        }
    }
};
</script>
<style>
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

/* title标题 */
/* #add_son > .title {
    height: 53px;
    font-size: 14px;
    line-height: 53px;
    text-align: left;
    padding-left: 40px;
    padding-right: 40px;
    border-bottom: 1px solid #dee0e3;
}

#add_son > .title span {
    color: #8e9eaa;
} */
#add_son .el-form-item {
    margin-bottom: 28px;
}
#add_son .flex-form .form-item > label {
    min-width: 9rem;
    text-align: left;
}

#add_son .add_son_input {
    margin-left: 3%;
    width: 40%;
}

#add_son .flex-form {
    padding: 30px 40px;
}

#add_son .add_son_input_num {
    width: 40%;
}

#add_son .grid-box {
    text-align: left;
    margin-left: 85px;
}

#add_son .grid-box > button {
    cursor: pointer;
    padding-left: 25px;
    padding-right: 25px;
}
</style>
