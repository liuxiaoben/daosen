<template>
  <div id="sonNum">
    <!-- title -->
    <div class="title">
      <span>子账号管理</span>
      <el-button type="danger" @click="add_son" size="small" style="float:right;margin-top:10px;">添加子账号</el-button>
      <!-- <button class="primary" @click="add_son">添加子账号</button> -->
    </div>
    <!-- table -->
    <div class="grid-box" gap list>
      <div v-if="tableData.length">
        <table class="table tableson" cellspacing="0" cellpadding="0">
          <thead>
            <tr>
              <th>序号</th>
              <th style="padding-left:0;">昵称</th>
              <th style="padding-left:0;">手机号</th>
              <th style="padding-left:0;">角色</th>
              <th width="140px" style="padding-left:0;">服务公司</th>
              <th width="280px" style="padding-left:0;">操作</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" :key="item.uid">
            <tr>
              <td>{{ (currentPage-1)*pagesize + index + 1 }}</td>
              <td style="padding-left:0;">{{ item.nick }}</td>
              <td style="padding-left:0;">{{ item.phone }}</td>
              <td style="padding-left:0;">{{ item.roleName }}</td>
              <td style="padding-left:0;">
                <el-button type="text" @click="seeServeCompanyInfo(item.uid, index)" style="text-align:left;padding-left:0;font-size:12px;">{{ selectedIndex == index?"收起" : "查看"}}</el-button>
              </td>
              <td style="padding-left:0;">
                <el-button class="op-button" type="text" @click="details(item)">详情</el-button>
                <el-button class="op-button" type="text" @click="son_modify(item)">修改</el-button>
                <el-button class="op-button" type="text" @click="disableSubuser(item)" v-show="item.status == 1">禁用</el-button>
                <el-button class="op-button" type="text" @click="enableSubUser(item)" v-show="item.status == 2">启用</el-button>
                <el-button class="op-button" type="text" @click="deleteSubUser(item)">删除</el-button>
              </td>
            </tr>


            <tr v-if="selectedIndex == index">
              <td colspan=6 height="120" v-if="companies.length != 0">
                <div class="text_logo" v-for="company in companies" :key="company.id">
                  <div class="text_logo_count">
                    <div class="text_logo_images">
                      <img src="../../../assets/images/son_details_logo.png" alt="logo">
                    </div>
                    <div class="text_logo_into">
                      <strong><p>{{ company.name }}</p></strong>
                      <p>{{ company.instruction }}</p>
                      <p><span>联系人：曾阿牛</span> <span>电话：{{ company.phone }}</span> <span>绑定时间：2018.04.19</span> <span>公司地址：{{company.address}}</span> </p>
                    </div>
                    <div class="clear"></div>
                  </div>
                </div>
              </td>
              <td colspan=6 height="120" v-else>
                未绑定服务公司
              </td>
            </tr>
          </tbody>
        </table>
        <div class="page-wrap" align="right">
          <div class="fystyle">
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="current_change">
            </el-pagination>
          </div>
        </div>
      </div>
      <div v-else>暂无数据</div>
    </div>
  </div>
</template>

<script>
import { accountSubUsers, tenantInfo, deleteSubUser, disableSubUser, enableSubUser } from '@/api/childAccount'
import { mapGetters } from 'vuex'

export default {

  data() {
    return {
      off: false,
      selectedIndex: null,
      pagesize: 10, //每页的数据条数
      currentPage: 1, //默认开始页面
      tableData: [{
        uid: '22',
        nick: '测试',
        phone: '123',
        roleName: '123',
        role_id: '1',
        status: 1,
      }],

      pagesize: 100,
      pageNum: 1,
      companies: [],
    }
  },
  created() {
    // 获取子账号列表
    var params = { eid: this.eid, token: this.token }
    accountSubUsers(params).then(response => {
      // 排序、赋值
      this.tableData = response.data.sort((item1, item2) => {
        return item2.uid - item1.uid;
      });
    }).catch(error => {});
  },
  computed: {
    ...mapGetters(['eid', 'token']),
    total() { //默认数据总数
      return this.tableData.length;
    },
  },
  methods: {
    current_change(currentPage) {
      this.currentPage = currentPage;
    },
    // 查看服务公司信息
    seeServeCompanyInfo(accountId, index) {

      if (index == this.selectedIndex) {
        this.selectedIndex = null;
      } else {
        this.selectedIndex = index;
        var params = { uid: accountId, token: this.token };
        tenantInfo(params, this.pageNum, this.pagesize).then(response => {
          this.companies = response.data.list;
          this.off = true;
        }).catch(error => {});
      }
    },
    // 详情
    details(item) {
      this.$router.push({ name: 'AccountDetail', params: { user: item } });
    },
    // 添加
    add_son() {
      this.$router.push('/enterprise/addAccount')
    },
    // 修改
    son_modify(item) {
      this.$router.push({ name: 'EditAccount', params: { user: item } });
    },
    // 禁用
    disableSubuser(user) {
      var params = { accountId: user.uid, token: this.token };
      disableSubUser(params).then(response => {
        user.status = 2;
        this.$message.success("禁用成功");
      }).catch(error => {});
    },
    // 启用
    enableSubUser(user) {
      var params = { accountId: user.uid, token: this.token };
      enableSubUser(params).then(response => {
        user.status = 1;
        this.$message.success("启用成功");
      }).catch(error => {});
    },
    // 删除
    deleteSubUser(user) {

      this.$confirm('您确定要删除该子账号吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = { accountId: user.uid, token: this.token };
        deleteSubUser(params).then(response => {
          this.tableData.forEach((item, index) => {
            if (item === user) {
              this.tableData.splice(index, 1);
              this.$message({
                message: "删除成功",
                type: "success"
              });
            }
          });
        }).catch(error => {});
      }).catch(() => {});
    },
  }
}

</script>

<style>
/* logo */
#son_details .paddingleft{
  padding-left: 0;
}


#son_details .text_logo {
  height: 200px;
  /* background-color: bisque; */
  border-bottom: 1px solid #e4e7ea;
}

#son_details .text_logo>p:nth-child(1) {
  font-size: 14px;
  font-weight: bold;
  padding-top: 38px;
}

#son_details .text_logo_images,
#son_details .text_logo_into {
  float: left;
}

#son_details .text_logo_into {
  margin-top: 10px;
  margin-left: 5%;
}

#son_details .text_logo_into>p:nth-child(1) {
  font-size: 14px;
  font-weight: bold;
}

#son_details .text_logo_into>p:nth-child(2) {
  font-size: 12px;
  margin-top: 14px;
}

#son_details .text_logo_into>p:nth-child(3) {
  font-size: 12px;
  margin-top: 30px;
}

#son_details .text_logo_into>p:nth-child(3)>span:nth-child(2) {
  margin-left: 5%;
}

#son_details .text_logo_count {
  margin-top: 20px;
}

/* title */
/* #sonNum>.title {
  height: 53px;
  line-height: 53px;
  font-size: 14px;
  text-align: left;
  padding-left: 40px;
  padding-right: 40px;
  border-bottom: 1px solid #dee0e3;
}
#sonNum>.title>span {
  color: #8e9eaa;
  float: left;
} */

#sonNum .grid-box[gap] {
  /* --innergap: 3rem 33px; */
  padding: 40px;
}

/* #sonNum .table th,
#sonNum .table td {
  padding-left: 5px;
} */

#sonNum .table {
  font-size: 12px;
}



/* 子账号管理 */

#sonNum .primary {
  float: right;
  margin-top: 8px;
  margin-right: 33px;
  cursor: pointer;
}

td>.op-button {
  font-size: 12px;
  min-width: 45px;
  text-align: left;
  /* margin-left: 5px !important; */
}

.fystyle .el-pagination button{
    width: 45px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    margin: 0px !important;
    background: #ffffff !important;
    border: 1px solid #edf1f5;
    border-radius: 0px !important;
  }

  .fystyle .el-pagination button span{
    display: block;
    height: 45px;
    line-height: 45px;
    color: #8e9eaa;
    font-size: 12px;
  }

  .fystyle .el-pagination .el-pager .number{
    width: 45px;
    height: 45px;
    line-height: 45px;
    background: #ffffff !important;
    color: #8e9eaa !important;
    font-size: 12px;
    border: 1px solid #edf1f5;
    margin: 0px;
    border-radius: 0px !important;
  }

  .fystyle .el-pagination .el-pager .active{
    background: #edf1f5 !important;
    color: #40b6ff;
  }

  .fystyle .el-pagination .el-pager .el-icon-more{
    margin: 7px 5px;
  }

  .fystyle{
    margin-top: 30px;
  }

  .tableson>tbody>tr:hover{
    background: #edf1f5 !important;
  }

</style>
