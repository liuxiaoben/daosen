<template>
  <div id="data">
    <!-- title -->
    <div class="title">
      <span>基本资料</span>
    </div>
    <!-- 账号信息 -->
    <div class="baseData">
      <div class="account_data">
        <p>账号信息</p>
        <div class="data_count">
          <div class="data_count_images" style="padding-top:28px">
            <div class="avatar" style="background-image:url(http://img.hb.aicdn.com/f5645dcc8f78d642803ae0ff232f0e36c9ef4362195ac-SQeC5w_fw658)"></div>
          </div>
          <div class="data_count_text">
            <ul>
              <li>昵称</li>
              <li>
                <el-input v-model="nick" placeholder="请输入昵称"></el-input>
              </li>
              <!-- <li><img src="../../../assets/images/data_true.png" style="vertical-align:middle" ></li> -->
              <li>
                <!-- <img :src="nick != '' ? picT :picF" style="vertical-align:middle"> -->
                <label :class="nick != '' ? picT :picF">

                </label>
              </li>
              <li>
                <a href="#" style="color:#999999;" @click="nickxg">修改</a>
              </li>
            </ul>
            <!-- money=money>=500?total:money; -->
            <ul>
              <li>手机号码</li>
              <li>
                <el-input :disabled="true" v-model="phone" placeholder="请输入手机号"></el-input>

              </li>
              <li>
                <!-- <img :src="phone != '' ? picT :picF" style="vertical-align:middle"> -->
                <label :class="phone != '' ? picT :picF">

                </label>
              </li>
              <!-- <li><img src="../../../assets/images/data_true.png" style="vertical-align:middle"></li> -->
              <li>
                <a href="#" style="color:#999999;">修改</a>
              </li>

            </ul>
            <ul>
              <li>微信</li>
              <li>
                <el-input v-model="wet" placeholder="请输入微信号"></el-input>
              </li>
              <li>
                <!-- <img :src="wet != '' ? picT :picF" style="vertical-align:middle"> -->
                <label :class="wet != '' ? picT :picF">

                </label>
              </li>
              <!-- <li><img src="../../../assets/images/data_false.png" style="vertical-align:middle"></li> -->

              <li>
                <a href="#" style="color:#999999;">绑定</a>
              </li>
            </ul>
            <ul>
              <li>邮箱地址</li>
              <li>
                <el-input v-model="email" placeholder="请输入邮箱地址"></el-input>
              </li>
              <li>
                <!-- <img :src="email != '' ? picT :picF" style="vertical-align:middle"> -->
                <label :class="email != '' ? picT :picF">

                </label>
              </li>
              <!-- <li><img src="../../../assets/images/data_false.png" style="vertical-align:middle"></li> -->
              <li>
                <a href="#" style="color:#999999;" @click="emailxg">设置</a>
              </li>
            </ul>
          </div>
          <div class="clear"></div>
        </div>
      </div>
      <!-- 企业信息 -->
      <div class="account_data  Enterprise_data">
        <p>企业信息</p>
        <div class="data_count">
          <div class="data_count_images" style="padding-top:28px">
            <div class="avatar" style="background-image:url(http://img.hb.aicdn.com/f5645dcc8f78d642803ae0ff232f0e36c9ef4362195ac-SQeC5w_fw658)"></div>
          </div>
          <div class="data_count_text">
            <ul>
              <li>真实姓名</li>
              <li>
                <el-input v-model="name" placeholder="真实姓名"></el-input>
              </li>
              <!-- <li><img src="../../../assets/images/data_true.png" style="vertical-align:middle"></li> -->
              <li>
                <!-- <img :src="name != '' ? picT :picF" style="vertical-align:middle"> -->
                <label :class="name != '' ? picT :picF">

                </label>
              </li>
              <li>
                <a href="#" style="color:#999999;" @click="namexg">修改</a>
              </li>
            </ul>
            <ul>
              <li>QQ号码</li>
              <li>
                <el-input v-model="qq" placeholder="请输入QQ号码"></el-input>
              </li>
              <li>
                <!-- <img :src="qq != '' ? picT :picF" style="vertical-align:middle"> -->
                <label :class="qq != '' ? picT :picF">

                </label>
              </li>
              <!-- <li><img src="../../../assets/images/data_false.png" style="vertical-align:middle"></li> -->
              <li>
                <a href="#" style="color:#999999;" @click="qqxg">修改</a>
              </li>
            </ul>
            <ul>
              <li>生日</li>
              <li>
                <el-date-picker v-model="createTime" :editable="false" type="date" placeholder="选择日期" style="width:100%;">
                </el-date-picker>
              </li>
              <li>
                <!-- <img :src="createTime != '' ? picT :picF" style="vertical-align:middle"> -->
                <label :class="createTime != '' ? picT :picF">

                </label>
              </li>
              <!-- <li><img src="../../../assets/images/data_false.png" style="vertical-align:middle"></li> -->
              <li>
                <a href="#" style="color:#999999;" @click="createTimexg">设置</a>
              </li>
            </ul>
            <ul>
              <li>家庭住址</li>
              <li>
                <el-input v-model="add" placeholder="请输入家庭住址"></el-input>
              </li>
              <li>
                <!-- <img :src="add != '' ? picT :picF" style="vertical-align:middle"> -->
                <label :class="add != '' ? picT :picF">

                </label>
              </li>
              <!-- <li><img src="../../../assets/images/data_false.png" style="vertical-align:middle"></li> -->
              <li>
                <a href="#" style="color:#999999;">设置</a>
              </li>
            </ul>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { UserDetail } from "@/api/enterprise";
import { updateUserDetail } from "@/api/enterprise";
// import { phone } from '@/api/enterprise'

export default {
    data() {
        return {
            nick: "",
            phone: "",
            wet: "",
            email: "",
            header: "",
            name: "",
            qq: "",
            createTime: "",
            add: "",
            picT: "label1",
            picF: "label2"
        };
    },
    methods: {
        // num(){
        //   this.$router.push('/enterprise/amendMobile')
        // },

        nickxg() {
            if (this.name == "" || this.nick == "") {
                this.$message({
                    message: "请输入昵称和姓名",
                    type: "error"
                });
            } else {
                updateUserDetail({
                    uid: this.$store.getters.uid,
                    name: this.name,
                    nick: this.nick,
                    token: this.$store.getters.token
                })
                    .then(response => {
                        this.listLoading = false;
                    })
                    .catch(() => {
                        this.loading = false;
                    });
                this.$message({
                    message: "恭喜你修改成功",
                    type: "success"
                });
            }
        },

        namexg() {
            if (this.name == "" || this.nick == "") {
                this.$message({
                    message: "请输入昵称和姓名",
                    type: "error"
                });
            } else {
                updateUserDetail({
                    uid: this.$store.getters.uid,
                    name: this.name,
                    nick: this.nick,
                    token: this.$store.getters.token
                })
                    .then(response => {
                        this.listLoading = false;
                    })
                    .catch(() => {
                        this.loading = false;
                    });
                this.$message({
                    message: "恭喜你修改成功",
                    type: "success"
                });
            }
        },

        emailxg() {
            if (this.email == "") {
                this.$message({
                    message: "请输入新的邮箱",
                    type: "error"
                });
            } else {
                updateUserDetail({
                    uid: this.$store.getters.uid,
                    name: this.name,
                    nick: this.nick,
                    email: this.email,
                    token: this.$store.getters.token
                })
                    .then(response => {
                        this.listLoading = false;
                    })
                    .catch(() => {
                        this.loading = false;
                    });
                this.$message({
                    message: "恭喜你修改成功",
                    type: "success"
                });
            }
        },

        qqxg() {
            if (this.email == "") {
                this.$message({
                    message: "请输入新的QQ号",
                    type: "error"
                });
            } else {
                updateUserDetail({
                    uid: this.$store.getters.uid,
                    name: this.name,
                    nick: this.nick,
                    qq: this.qq,
                    token: this.$store.getters.token
                })
                    .then(response => {
                        this.listLoading = false;
                    })
                    .catch(() => {
                        this.loading = false;
                    });
                this.$message({
                    message: "恭喜你修改成功",
                    type: "success"
                });
            }
        },

        createTimexg() {
            if (this.email == "") {
                this.$message({
                    message: "请输入您的生日",
                    type: "error"
                });
            } else {
                updateUserDetail({
                    uid: this.$store.getters.uid,
                    name: this.name,
                    nick: this.nick,
                    createTime: this.createTime,
                    token: this.$store.getters.token
                })
                    .then(response => {
                        this.listLoading = false;
                    })
                    .catch(() => {
                        this.loading = false;
                    });
                this.$message({
                    message: "恭喜你修改成功",
                    type: "success"
                });
            }
        }
    },
    created() {
        UserDetail({
            uid: this.$store.getters.uid,
            token: this.$store.getters.token
        })
            .then(response => {
                let infos = response.data;
                this.nick = infos.nick;
                this.email = infos.email;
                this.header = infos.header;
                this.name = infos.name;
                this.qq = infos.qq;
                this.phone = this.$store.getters.phone;
                this.createTime = infos.createTime;
                // console.log(infos)
                this.listLoading = false;
            })
            .catch(() => {
                this.loading = false;
            });

        // phone({nick:this.$store.getters.nick,phone:this.$store.getters.phone,password:this.$store.getters.password,rePassword:this.$store.getters.rePassword}).then(response => {
        //       let infos = response.data;
        //       this.phone = infos.phone;
        //       console.log(infos)
        //    this.listLoading = false
        // }).catch(() => {
        //    this.loading = false
        // })
    }
};
</script>
<style>
.clear {
    clear: both;
}
/* #data > .title {
    height: 53px;
    line-height: 53px;
    text-align: left;
    border-bottom: 1px solid #dee0e3;
}
#data > .title > span {
    margin-left: 40px;
    color: #8e9eaa;
} */
#data .baseData {
    padding-left: 40px;
    padding-top: 30px;
}
#data .account_data > p {
    text-align: left;
    font-weight: bold;
}
#data .data_count_images,
#data .data_count_text {
    float: left;
}
#data .avatar {
    --size: 55px;
}
#data .data_count_text {
    width: 50%;
    text-align: left;
    margin-left: 5%;
}
#data .data_count_text > ul > li {
    display: inline-block;
}
#data .data_count_text > ul > li:nth-child(1) {
    width: 15%;
    color: #999999;
}
#data .data_count_text > ul > li:nth-child(2) {
    width: 30%;
    margin-top: 30px;
}
#data .data_count_text > ul > li:nth-child(3) {
    margin-left: 10%;
    margin-top: 30px;
}
#data .data_count_text > ul > li:nth-child(3) > .label1 {
    background: url(../../../assets/images/data_true.png);
    width: 15px;
    height: 15px;
    display: inline-block;
    vertical-align: middle;
}
#data .data_count_text > ul > li:nth-child(3) > .label2 {
    background: url(../../../assets/images/data_false.png);
    width: 15px;
    height: 15px;
    display: inline-block;
    vertical-align: middle;
}
#data .data_count_text > ul > li:nth-child(4) {
    margin-left: 5%;
    margin-top: 30px;
}
/* 企业信息 */
#data .Enterprise_data {
    padding: 90px 0;
}
</style>


