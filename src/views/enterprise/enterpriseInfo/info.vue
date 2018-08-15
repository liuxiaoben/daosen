<template>
  <div id="Uncertified">
    <div class="title">
      <span>企业信息</span>
    </div>
    <div class="logo_count">
      <div class="logo_count_img">
        <!-- <img src="../../../assets/images/qiyezhongxin_logo.png" alt="logo" width="100%"> -->
        <img :src="logo" alt="logo" width="100%">
      </div>
      <div class="logo_count_rightcount">
        <p>{{ename}}
          <span style="color:red" v-if="type==4"><img src="../../../assets/images/qiyezhongxin_icon.png" alt="" style="vertical-align:middle"></span>
        </p>
        <p>{{instruction}}</p>
        <p>经营范围：互联网产品设计、UI设计等等
          <span>公司地址：{{address}}</span>
        </p>
        <p>
          <ul>
            <li>
              <span style="color:#999999;font-size:12px">余额：</span>
              <span style="font-size:12px;">{{balance}}</span>
            </li>
            <li class="logo_count_rightcount_li">
              <span style="color:#999999;">积分：</span> {{credits}} </li>
            <li class="logo_count_rightcount_li">
              <span style="color:#999999;">星级：</span> {{level}} </li>
            <li class="logo_count_rightcount_li">
              <span style="color:#999999;">行业：</span> 1 </li>
          </ul>
        </p>
        <p>
          <ul>
            <li v-if="type=='审核中'">资质认证：
              <span style="color:#7ace4c">{{statusName}}</span>
            </li>
            <li v-else-if="type==2">资质认证：
              <span style="color:green">{{statusName}}</span>
            </li>
            <li v-else-if="type==3">资质认证：
              <span style="color:red">{{statusName}}</span>
            </li>
            <li v-else-if="type==4">资质认证：
              <span style="color:#41b3f9">{{statusName}}</span>
            </li>
            <li v-if="type==1">
              <el-button type="danger" @click="look" size="small">点击认证</el-button>
              <!-- <button class="primary" style="cursor:pointer;margin-left:10%" @click="look">点击认证</button> -->
            </li>
            <!-- 此处做出相应的变化，两个按钮都添加@click方法 -->
            <li v-else>
              <el-button type="danger" @click="look" size="small">查看</el-button>
              <!-- <button class="primary" style="cursor:pointer;margin-left:10%" @click="look">查看</button> -->
            </li>
          </ul>
        </p>

      </div>
      <div class="clear"></div>
    </div>
    <!-- 子账号 -->
    <div class="Subaccount">
      <p>
        <span>子账号</span>
        <span class="add">
          <el-button type="text" @click="add_son">
            <i class="el-icon-plus"></i>新增子账号
          </el-button>
        </span>
      </p>
      <ul>
        <li v-for="list in subUserlist" style="padding-right:50px" :key="list">
          <div class="avatar" style="background-image:url(http://img.hb.aicdn.com/f5645dcc8f78d642803ae0ff232f0e36c9ef4362195ac-SQeC5w_fw658)"></div>
          <div class="Subaccount_li_div">
            <p style="margin-bottom:5px;">{{list.phone}}</p>
            <p style="font-size:12px;color:#999999">角色：{{list.roleName}}</p>
          </div>
          <div class="clear"></div>
        </li>
      </ul>
    </div>

    <div class="bankTable">
      <el-table :data="banklist" stripe style="width: 100%">
        <el-table-column prop="bankId" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="name" label="银行">
        </el-table-column>
        <el-table-column prop="card" label="账号">
        </el-table-column>
        <el-table-column prop="accout" label="账号姓名">
        </el-table-column>
        <el-table-column prop="createBank" label="开户银行">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="dialogFormVisible = true,edit(scope.$index)" style="text-align:left;">编辑</el-button>
            <el-button size="small" type="text" style="text-align:left;" @click="dele(scope.$index,scope.row.bankId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="add">
        <el-button type="text" @click="dialogFormVisiblexz = true">
          <i class="el-icon-plus"></i>新增银行卡
        </el-button>
      </div>
    </div>

    <el-dialog class="bjyhk" title="编辑银行卡" :visible.sync="dialogFormVisible">
      <el-form :model="banklistinfo" label-position="top">
        <el-row>
          <el-col :span="12" class="left">
            <h3>标题文字</h3>
            <p>具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容</p>
          </el-col>
          <el-col :span="12" class="right">
            <el-form-item label="序号">
              <el-input :disabled="true" v-model="newBankList.bankId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="银行">
              <el-input v-model="newBankList.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="newBankList.card" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="账号姓名">
              <el-input v-model="newBankList.accout" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="开户银行">
              <el-input v-model="newBankList.createBank" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>

        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="editBanka">确 定</el-button>
        <el-button type="info" @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog class="xzyhk" title="新增银行卡" :visible.sync="dialogFormVisiblexz" top="7.6vh" style="margin-bottom:20px">
      <el-form :model="banklistxz" label-position="top">
        <el-row>
          <el-col :span="12" class="left">
            <h3>标题文字</h3>
            <p>具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容具体内容</p>
          </el-col>
          <el-col :span="12" class="right">
            <el-form-item label="银行">
              <el-input v-model="banklistxz.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="banklistxz.card" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="账号姓名">
              <el-input v-model="banklistxz.accout" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="开户银行">
              <el-input v-model="banklistxz.createBank" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogFormVisiblexz = false,addBanka('banklistxz')">确 定</el-button>
        <el-button type="info" @click="dialogFormVisiblexz = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { enterpriseinformation } from "@/api/enterprise";
import { subUserlist } from "@/api/enterprise";
import { banklist } from "@/api/enterprise";
import { delbank } from "@/api/enterprise";
import { editBank } from "@/api/enterprise";
import { addBank } from "@/api/enterprise";

export default {
    data() {
        return {
            dialogFormVisible: false,
            dialogFormVisiblexz: false,
            type: "", //改变这个type的值（1,2,3,4），当前页面的状态会发生相应变化
            enterpriseinformation: null,
            subUserlist: "",
            banklist: [
              // {
              //   bankId: "001",
              //   name: "中心银行卡"
              // }
            ],
            banklistinfo: [],
            banklistxz: [],
            balance: "",
            credits: "",
            level: "",
            status: "",
            logo: "",
            ename: "",
            address: "",
            instruction: "",
            dialogVisible: false,
            newBankList: {
                bankId: null,
                name: null,
                card: null,
                accout: null,
                createBank: null
            }
        };
        // formLabelWidth: '120px'
    },
    methods: {
        look() {
            if (this.type == "未认证") {
                //此处做出判断，判断type值为多少，跳转相应页面，当type==1时，跳转到资格认证页面
                this.$router.push("/enterprise/clickCertification");
            } else {
                //当type的值不等于1 的时候，跳转到认证状态页面
                this.$router.push({
                    path: "/enterprise/certificationState",
                    query: { type: this.type }
                }); //此处在跳转页面的时候带参跳转，传递到下一页面当前认证状态
                console.log(this.type);
            }
        },
        add_son() {
            this.$router.push("/enterprise/addAccount");
        },
        getList() {
            banklist({
                token: this.$store.getters.token,
                eid: this.$store.getters.eid
            })
                .then(response => {
                    this.banklist = response.data;
                    console.log(this.banklist);
                    // console.log(response.data);
                    this.listLoading = false;
                })
                .catch(() => {
                    this.loading = false;
                });
        },
        //获取
        edit: function(index) {
            var arr = [];
            arr.splice(1, 0, this.banklist[index]);
            this.banklistinfo = arr[0];
            this.newBankList.bankId = this.banklistinfo.bankId;
            this.newBankList.name = this.banklistinfo.name;
            this.newBankList.card = this.banklistinfo.card;
            this.newBankList.accout = this.banklistinfo.accout;
            this.newBankList.createBank = this.banklistinfo.createBank;
        },
        //编辑
        editBanka() {
            editBank({
                token: this.$store.getters.token,
                eid: this.$store.getters.eid,
                bank_id: this.newBankList.bankId,
                name: this.newBankList.name,
                card: this.newBankList.card,
                accout: this.newBankList.accout,
                createBank: this.newBankList.createBank
            })
                .then(response => {
                    if (response.msgCode == "1000") {
                        this.$message({
                            message: "编辑成功",
                            type: "success"
                        });
                        this.banklistinfo.bankId = this.newBankList.bankId;
                        this.banklistinfo.name = this.newBankList.name;
                        this.banklistinfo.card = this.newBankList.card;
                        this.banklistinfo.accout = this.newBankList.accout;
                        this.banklistinfo.createBank = this.newBankList.createBank;
                        console.log(index);
                        this.banklist.splice(index, 1);
                    } else {
                        this.$message({
                            message: "编辑成功",
                            type: "success"
                        });
                    }
                })
                .catch(() => {
                    this.loading = false;
                });
        },
        //添加
        addBanka(formName) {
            const addBanka = {
                name: this.banklistxz.name,
                card: this.banklistxz.card,
                accout: this.banklistxz.accout,
                createBank: this.banklistxz.createBank,
                totoken: this.$store.getters.token,
                eid: this.$store.getters.eid
            };
            addBank(addBanka).then(response => {
                this.getList();
                this.$message({
                    message: "添加成功",
                    type: "success"
                });
            });

            this.$router.push({ path: "/enterprise/info" });
            // this.getList()
        },
        showDialog(user) {
            this.dialogVisible = true;
            this.selectedUser = user;
        },
        //删除
        // del: function(index, bankId) {
        //   delbank({ totoken: this.$store.getters.token, bankId: bankId }).then(
        //     response => {
        //       if (response.msgCode == "1000") {
        //        alert(1)
        //         this.$message({
        //           message: "删除成功",
        //           type: "success"
        //         });
        //         console.log(index);
        //         this.banklist.splice(index, 1);
        //       } else {
        //         this.$message.error("删除失败");
        //       }
        //     }
        //   );
        // },
        dele(index, id) {
            console.log(index);
            console.log(id);
            this.bankId = id;
            this.$confirm("请确认是否删除银行卡信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                delbank({
                    totoken: this.$store.getters.token,
                    bankId: this.bankId
                }).then(response => {
                    if (response.msgCode == "1000") {
                        this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        console.log(index);
                        this.banklist.splice(index, 1);
                    } else {
                        this.$message.error("删除失败");
                    }
                });
            });
        }
    },
    created() {
        enterpriseinformation({ eid: this.$store.getters.eid })
            .then(response => {
                let info = response.data;
                this.balance = info.balance;
                this.credits = info.credits;
                this.level = info.level;
                this.kind = info.kind;
                this.statusName = info.statusName;
                this.status = info.status;
                this.logo = info.logo;
                this.ename = info.ename;
                this.address = info.address;
                this.instruction = info.instruction;
                this.enterpriseinformation = response.data;
                this.listLoading = false;
                this.type = response.data.statusName;
                console.log(this.enterpriseinformation);
            })
            .catch(() => {
                this.loading = false;
            });
        subUserlist({
            token: this.$store.getters.token,
            eid: this.$store.getters.eid
        })
            .then(response => {
                //  this.subUserlist=[];
                this.subUserlist = response.data;
                // console.log(response.data);
                this.listLoading = false;
            })
            .catch(() => {
                this.loading = false;
            });
        this.getList();
    }
};
</script>
<style rel="stylesheet/scss" lang="scss">
/* 弹窗--编辑银行卡  新增银行卡*/
/* 公共样式 */
#Uncertified .el-dialog {
    width: 750px;
    border-radius: 5px;
}
/* .bjyhk .el-dialog__header .el-dialog__headerbtn {
    width: 25px;
    height: 25px;
    min-width: 25px;
    border-radius: 13px;
    margin-top: -25px;
    margin-right: -25px;
    background: #ffffff;
    -webkit-box-shadow: 0px 0px 5px #888888;
    box-shadow: 0px 0px 5px #888888;
} */
#Uncertified .el-dialog .el-dialog__header {
    background-color: #f9f9f9;
    padding: 20px 30px;
    font-weight: 800;
    border-bottom: 1px solid #e3e8e9;
}
#Uncertified .el-dialog__body {
    padding: 10px 30px;
}
#Uncertified .el-dialog__body .left {
    padding-right: 15px;
}
#Uncertified .el-dialog__body .right {
    padding-left: 15px;
    padding-top: 15px;
}
#Uncertified .el-dialog__body .left h3 {
    font-weight: 800;
    line-height: 40px;
}
#Uncertified .el-dialog__body .left p {
    font-size: 12px;
}
#Uncertified .el-dialog__footer {
    border-top: 1px solid #ecf1f2;
    margin-left: 0;
    text-align: left;
    padding: 11px 30px;
}
#Uncertified .dialog-footer button:nth-child(1) {
    border-color: #e60012;
}
#Uncertified .dialog-footer button:nth-child(2) {
    background: #c1cad7;
    border-color: #c1cad7;
    color: #fff;
}
#Uncertified .el-dialog__body .el-form-item {
    margin-bottom: 16px;
}
#Uncertified .el-dialog__body .el-form-item__label {
    line-height: 20px;
}

.clear {
    clear: both;
}
#Uncertified .grid-box[gap] {
    --innergap: 1.5rem 33px;
}

#Uncertified .el-main {
    padding: 0;
    border-radius: 6px;
}
/* #Uncertified > .title {
    height: 53px;
    line-height: 53px;
    text-align: left;
    border-bottom: 1px solid #dee0e3;
}

#Uncertified > .title > span {
    margin-left: 33px;
    color: #8e9eaa;
} */
#Uncertified .logo_count {
    margin: 30px 1.5% 0 33px;
    height: 200px;
}
#Uncertified .logo_count_img {
    width: 21%;
    height: 200px;
    float: left;
}
#Uncertified .logo_count_rightcount {
    width: 76%;
    height: 200px;
    float: left;
    margin-left: 3%;
}
#Uncertified .logo_count_rightcount > p {
    text-align: left;
}
#Uncertified .logo_count_rightcount > p:nth-child(1) {
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
}
#Uncertified .logo_count_rightcount > p:nth-child(2),
#Uncertified .logo_count_rightcount > p:nth-child(3) {
    margin-top: 20px;
    font-size: 12px;
}
#Uncertified .logo_count_rightcount > p:nth-child(3) > span {
    margin-left: 50px;
}
#Uncertified .logo_count_rightcount > p:nth-child(4) {
    margin-top: 40px;
}
#Uncertified .logo_count_rightcount > p:nth-child(4) > ul > li,
#Uncertified .logo_count_rightcount > p:nth-child(5) > ul > li {
    display: inline-block;
    margin-right: 20px;
}
#Uncertified .logo_count_rightcount_li {
    margin-left: 40px;
    font-size: 12px;
}
#Uncertified .logo_count_rightcount > p:nth-child(5) {
    margin-top: 30px;
}
/* 子账号 */
#Uncertified .Subaccount {
    // height: 110px;
    margin: 70px 20px 0 40px;
}
#Uncertified .Subaccount > p,
#Uncertified .Subaccount > ul > li {
    text-align: left;
    margin-top: 20px;
}
#Uncertified .Subaccount > ul {
    text-align: left;
}
#Uncertified .Subaccount > ul > li {
    display: inline-block;
}
#Uncertified .Subaccount > p:nth-child(1) {
    font-weight: bold;
}
#Uncertified .Subaccount_li_div {
    display: inline-block;
}
#Uncertified .avatar #Uncertified.Subaccount_li_div {
    float: left;
}
#Uncertified .Subaccount_li_div {
    vertical-align: middle;
}
#Uncertified .table {
    font-size: 12px;
}

/* table */
#Uncertified .el-table__header .has-gutter tr th {
    background: #edf1f5;
}

#Uncertified .add {
    margin-left: 60px;
    .el-button--text {
        color: #666;
        // font-weight: bold;
        font-size: 14px;
        i {
            margin-right: 10px;
            display: inline-block;
            text-align: center;
            font-weight: bolder;
            color: #fff;
            width: 20px;
            height: 20px;
            padding: 3px;
            border-radius: 50%;
            background-color: #409eff;
        }
    }
    .el-button--text:hover,
    .el-button--text:active,
    .el-button--text:focus {
        color: #e60012;
    }
}
#Uncertified .bankTable {
    padding: 40px;
    .add {
        margin: 20px 0 0 0;
    }
}
</style>
