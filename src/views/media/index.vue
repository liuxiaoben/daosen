<template>
  <div id="register">
    <el-container>
      <!-- nav -->
      <el-header style="height: 77px;line-height: 77px;padding: 0 10%;background-color: #f4f8fb">
        <div class="register_nav">

          <div class="register_logo"><img src="../../assets/images/login_logo.png" alt="login_logo" style="vertical-align:middle">  全媒体广告平台</div>
          <div class="register_nav_button">
            <a href="#/index">首页</a>
            <!-- <a href="#" class="login_nav_button_a">菜单1</a>
            <a href="#" class="login_nav_button_a">菜单1</a>
            <a href="#" class="login_nav_button_a">菜单1</a>
            <a href="#" class="login_nav_button_a">菜单1</a> -->
          </div>

          <!-- 登陆前  -->
          <div v-if="isLogin == 2" class="login_register"><a href="#" @click="goto_login">登录</a>&nbsp;&nbsp;<a href="#" @click="zhuce">注册</a></div>

          <!-- 登陆后 -->
          <div v-if="isLogin == 1" class="item user-menu" style="min-width:115px;line-height:80px;float:right;">
            <div class="avatar" style="background-image:url(http://img.hb.aicdn.com/f5645dcc8f78d642803ae0ff232f0e36c9ef4362195ac-SQeC5w_fw658)"></div>
            <el-dropdown  style="cursor:pointer">
              <span class="el-dropdown-link" style="color:#333;">
                {{username}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link  to="/index" style="color:#999999">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link  to="/set/system" style="color:#999999">系统设置</router-link>
                </el-dropdown-item>
                <el-dropdown-item  ><a href="#" @click="exit()" style="color:#999999">退出登录</a> </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="clear"></div>
        </div>
      </el-header>
      <el-main>
    <div class="media_title">
        <el-row :span="24" style="margin-bottom: 15px;border-bottom:1px solid #eee;padding-bottom:15px">
            <el-col :span="8" :offset="0"  style="">
                  <el-input v-model="input" placeholder="搜索媒体资源" ></el-input>
            </el-col>
            <el-col :span="2" :offset="1"  style=""><el-button class='ss' type="danger" @click="searchList()" style="padding:10px 20px;">搜索</el-button></el-col>

            <el-col :span="2" style="margin-left:42%;float:right;margin-right:12px;" >
                <el-button type="primary"  class='ck' style="padding:8px 20px;" v-if="isLogin == 1">
                  <router-link  to="/enterprise/enshrineMedia" style="color:#ffffff;">
                        查看我的收藏
                  </router-link>
                </el-button>
            </el-col>
        </el-row>

          <p class="ziyuan" style="float: left;font-size:12px;">资源大类</p>
          <ul class="" style="height: auto;margin-bottom: 10px;font-size:12px;overflow:auto;padding-top:5px;">
                <li   :class="{active:firstClass==item.mtype_id}"  v-for="(item,index) in resourceFirstCate" :key="index"   @click="changeChildCate(item.mtype_id,2)">
                  {{item.name}}
                </li>
          </ul>
          <p class="ziyuan" style="float: left;font-size:12px;">资源分类</p>
          <ul class="" style="height: auto;margin-bottom: 10px;font-size:12px;overflow:auto;padding-top:5px;">
                  <!-- <li :class="{active:secondClass==0}"   @click="changeChildCate(0,3)">
                    全部
                  </li> -->
                <li :class="{active:secondClass==item.mtype_id}"  v-for="(item,index) in resourceSecondCate" :key="index"  @click="changeChildCate(item.mtype_id,3)">
                  {{item.name}}
                </li>
          </ul>
          <p class="ziyuan" style="float: left;font-size:12px;">资源类型</p>
          <el-button  @click="clickme()" style="float:right;font-size:12px;background:#edf1f5;padding:0px 20px;height:23px;line-height:23px;border-radius:0px;border:0px;">展开  <img src="../../assets/images/opendown.png" style="margin-bottom: -3px;"/></el-button>
          <ul  :class="onoff?'auto':'no_auto'" style="height: 30px;font-size:12px;overflow:hidden;padding-top:5px;margin-right:0px;">
                  <li :class="{active:threeClass==0}"   @click="changeChildCate(0,4)">
                    全部
                  </li>
                  <li :class="{active:threeClass==item.mtype_id}"    v-for="(item,index) in resourceThirdCate" :key="index" tag="li" to="" @click="changeChildCate(item.mtype_id,4)">
                    {{item.name}}({{item.num}})
                  </li>
          </ul>
          
    </div>

    <div class="media_count" style="padding:0 0px;">

      <el-row :span="24">
        <el-col :span="24" :offset="0">
          <el-table :data="tableData" stripe style="width: 100%;border-top: 1px solid #ebeef5;border-bottom: 1px solid #ebeef5;border-radius: 6px;text-align: center;font-size:12px; ">
            <el-table-column prop="logo" label="媒体" width="100">
      	      <template slot-scope="scope">
                <img class="mttp xsxs" :src="scope.row.logo"  @error="imgError(scope.row)" width="50" height="50" @click="lookClick(scope.row.mtype_id)">
              </template>
            </el-table-column>
            <el-table-column prop="date" label="  " width="50"></el-table-column>
            <el-table-column prop="" label="名称" width="150">
              <template slot-scope="scope">
                <div class="xsxs"  @click="lookClick(scope.row.mtype_id)">
                  {{scope.row.name}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="mediaTypeName" label="类型" width="200"></el-table-column>
            <el-table-column prop="" label="描述">
              <template slot-scope="scope">
                <div class="ccc">
                  {{scope.row.content}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="caozuo" label="操作" width="150">
            	<template slot-scope="scope">
				        <el-button  v-if="scope.row.isFavorite == false"  class="cz" @click="collectMedia(scope.row.mtype_id)" type="text" size="small"><img src='../../assets/images/loveing.png'></el-button>
                <el-button  v-if="scope.row.isFavorite"  class="cz" @click="cancelCollectMedia(scope.row.fav_id)" type="text" size="small"><img src='../../assets/images/loveafter.png'></el-button>
				        <!-- <el-button class="cz" type="text" @click="lookClick(scope.row.mtype_id)"  size="small">+</el-button> -->
				      </template>
            </el-table-column>
          </el-table>
        </el-col>

      </el-row>
			
		<div v-if="total" class="page-wrap fystyle" align="right" style="margin-top: 30px;margin-right: 4%;padding-bottom: 30px;">
            <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="pageNum" :prev-text="prevText" :next-text="nextText"  @current-change="handleCurrentChange">
            </el-pagination>
		</div>
    </div>
    </el-main>
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
import { mediaShowList } from '../../api/media'
import { searchMediaShowList } from '../../api/media'
import { getType } from '../../api/media'
import { getTypeByPid } from '../../api/media'
import { mediaCollect } from '../../api/media'
import { mediaCancelCollect } from '../../api/media'
export default {
      data(){
          return {
              input:'',
              pageNum:1,
              pageSize:10,
              total:0,
              prevText:'<',
              nextText:'>',
              pre:false,
              next:false,
              resourceFirstCate:null,
              resourceSecondCate:null,
              resourceThirdCate:null,
              firstCateId:0,
              secondCateId:0,
              thirdCateId:0,
              firstCateActive:false,
              secondCateActive:false,
              thirdCateActive:false,
              tableData:null,
              firstClass:'',
              secondClass:'',
              threeClass:'',
              searchId:0,
              onoff: '',
              isLogin: '',
              username: ''
          }
      },
      created() {
          this.getType(this.$store.getters.uid,1)  
          if(this.$store.getters.token){
            this.isLogin = 1
            this.username = this.$store.getters.name
            console.log(this.username)
          }else{
            this.isLogin = 2
          }
      },
      methods: {
        goto_login(){
          this.$router.push('/login')
        },
        zhuce: function () {
          this.$router.push({path: '/register'})
        },
        handleCurrentChange(val) {
            this.pageNum = val
            if(this.input){
               this.getSearchList(this.input)
            }else{
                if(this.thirdCateId > 0){
                    this.getList(this.thirdCateId)
                }else if(this.secondCateId > 0){
                   this.getList(this.secondCateId)
                }else{
                  this.getList(this.firstCateId)
                }
            }
           
        },
        changeChildCate(pid,level){
              if(level == 2){
                    this.firstClass = pid
                    this.searchId = pid
              } else if(level == 3){
                    this.secondClass = pid
                    if(pid == 0){
                       this.searchId = this.secondCateId
                    }else{
                      this.searchId = pid
                    }
              } else if(level == 4){
                  this.threeClass = pid;
                  if(pid == 0){
                       this.searchId = this.thirdCateId
                    }else{
                      this.searchId = pid
                    }
              }
              this.getTypeByPid(this.searchId,level)
              this.getList(this.searchId);
        },
        getList(mtypeId) {
            mediaShowList(this.pageNum,this.pageSize,this.$store.getters.token,mtypeId).then(response => {
                    if(!this.$store.getters.token){
                        response.data.list.isFavorite = false;
                    }
                    this.tableData = response.data.list,
                    console.log(this.tableData)
                    this.total=response.data.total,
                    this.pageNum = response.data.pageNum,
                    this.pageSize = response.data.pageSize,
                    this.pre = response.data.hasPreviousPage,
                    this.next = response.data.hasNextPage
              })
        },
        getSearchList(keywords) {
            searchMediaShowList(this.pageNum,this.pageSize,this.$store.getters.token,keywords).then(response => {
                    this.tableData = response.data.list,
                    this.total=response.data.total,
                    this.pageNum = response.data.pageNum,
                    this.pageSize = response.data.pageSize,
                    this.pre = response.data.hasPreviousPage,
                    this.next = response.data.hasNextPage
              })
        },
        getType(uid,level){
              getTypeByPid(0,level).then(response=>{
                     this.resourceFirstCate = response.data
                     this.firstCateId = response.data[0].mtype_id
                     if(level == 1){
                          this.firstClass = response.data[0].mtype_id
                          this.firstCateId = response.data[0].mtype_id
                          this.getTypeByPid(this.firstCateId,2)
                          //this.getList(this.firstCateId)
                     }else if(level == 2){
                          this.secondClass = response.data[0].mtype_id
                          this.secondCateId = response.data[0].mtype_id
                     }        
              })
        },
        getTypeByPid(pid,level){
              getTypeByPid(pid,level).then(response=>{
                      //console.log(pid,response)
                      if(level == 2){
                          this.resourceSecondCate = response.data
                          this.secondCateId = response.data[0].mtype_id
                          this.secondClass = response.data[0].mtype_id
                          this.getTypeByPid(this.secondCateId,3)
                           this.getList(this.secondCateId)
                      }else if(level == 3){
                          this.resourceThirdCate = response.data
                          this.threeClass = 0
                      }
                      
              })
        },
        lookClick(mtype_id){
            this.$router.push({path: '/media/mediaDetail/'+mtype_id})
        },
        searchList(){
              if(this.input){
                this.getSearchList(this.input)
              }
        },
        mediaCollect(mtypeId,token) {
            mediaCollect(mtypeId,token).then(response => {
                  this.isCollect = response.success
                  this.chooseGetList();  
              })
        },
        collectMedia(mtypeId){
            this.mediaCollect(mtypeId,this.$store.getters.token) 
        },
        mediaCancelCollect(favId,token){
            mediaCancelCollect(favId,token).then(response => {
                  this.isCollect = response.success
                  this.chooseGetList();  
              })
        },
        cancelCollectMedia(favId){
          if(!this.$store.getters.token){
            this.$router.push('/login')
          }else{
            this.mediaCancelCollect(favId,this.$store.getters.token) 
          }
        },
        chooseGetList(){
              if(this.searchId > 0){
                  this.getList(this.searchId)
              }else if(this.thirdCateId > 0){
                  this.getList(this.thirdCateId)
              }else if(this.secondCateId > 0){
                  this.getList(this.secondCateId)
              }else{
                  this.getList(this.firstCateId)
              }
        },
        imgError(logo) {
          logo.logo = require('../../assets/images/mtzstxc.png');
        },
        clickme(){
          if(this.onoff){
            this.onoff = false
          }else{
            this.onoff = true
          }
        },
        //退出登录  LogOut在store里面定义的已经清除了token
      exit() {
        var _this = this;
        this.$store.dispatch("LogOut").then(() => {
            console.log("退出");
            this.$router.push({ path: "/login" });
          //登录成功后提示弹窗
          this.$message({
            message: "退出成功",
            type: "success"
          });
        }).catch(() => {
            console.log("error");
            this.loading = false;
        });
      }
    }

}
</script>
<style>
  /*element-style*/
   #register .register_nav_button{
     width: 35%;
     margin-left: 5%;
     float: left;
     text-align: left;
   }
  /*new-style*/
  .media_title{
    width: 100%;
    height: auto;
    background-color: #fff;
    margin-top: 30px;
    border-radius: 6px;
    font-size: 14px;
    padding: 30px;
    color: #555555;
  }
  .media_count{
    width: 100%;
    /*height: 1142px;*/
    background-color: #fff;
    margin-top: 32px;
    border-radius: 6px;
    margin-bottom: 31px;
  }
  .media_input{
    width: 30%;
    display:block;
  }
  .media_title>ul>li{
    float: left;
    margin: 0 1.5%;
    padding: 5px 10px;
    border-radius: 20px;
    margin-top: -5px;
    margin-bottom: 10px;
    cursor:pointer;
  }
  .media_title li:hover,
  .media_title .active{
    color: #FFFFFF;
    background: #ff7676;
    
  }
  .media_title .ziyuan{
    margin-right: 1%;
  }

	.media_count .el-table__header .has-gutter tr th{
		/*text-align: center;*/
		background: #fafafa;
	}
	
	.media_count .el-table__header thead tr th{
		/*text-align: center !important;*/
		background: #fafafa;
	}
	
	.media_count .el-table__body tr td{
		/*text-align: center;*/
	}
	
	.media_count .ss{
		line-height: 11px;
		background: #e60012;
		font-size: 14px;
		color: #FFFFFF;
	}
	
	.media_count .ck{
		line-height: 11px;
		background: #41b3f9;
		font-size: 14px;
		color: #FFFFFF;
	}
	
	.media_count .cell .cz{
		display: inline !important;
		width: 30px !important;
		min-width: 30px;
		font-size: 14px;
		font-weight: 600;
		color: #f33155;
		margin-left: 0px;
	}

  .media_count .cell{
    padding-left: 30px;
  }
  .ccc{
    overflow-y: auto;
    width: 90%;
    height: 40px;
    /* overflow: hidden; */
  }


  .mttp{
    /* background: url(../../assets/images/home-mediaImg2.png) no-repeat ; */
    background-size: 100% 100%;
    width: 50px;
    height: 50px;
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

  .auto{
    height: auto !important;
  }
  .xsxs{
    cursor:pointer;
  }
  



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
   #register .el-footer{
     padding:0 10%;
     background-color: #f4f8fb;
     border-top: 1px solid #e4e7ea;
   }
   #register .login_register {
    float: right;
    text-align: center;
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
</style>


