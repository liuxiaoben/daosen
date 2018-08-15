<template>
  <div id="Uncertified">
      <!-- <h1>信息</h1>

      <router-link to="/qiye/Accountsuccess">Accountsuccess</router-link> -->
      <div class="title">企业信息</div>
      <!-- logo and count -->
      <div class="logo_count">
        <div class="logo_count_img">
          <!-- <img src="../../assets/images/qiyezhongxin_logo.png" alt="logo" width="100%"> -->
        </div>
        <div class="logo_count_rightcount">
          <p>武汉道森媒体股份有限公司</p>
          <p>专业广告投放100年专业广告投放100年专业广告投放100年专业广告投放100年专业广告投放100年专业广告投放100年专业广告投放100年专业广告投放100年</p>
          <p>经营范围：互联网产品设计、UI设计等等             <span>公司地址：湖北省武汉市南湖大道</span></p>
          <p>
            <ul>
              <li><span style="color:#999999;">余额：</span> 1，543.00  </li>
              <li class="logo_count_rightcount_li"><span style="color:#999999;">积分：</span> 4120  </li>
              <li class="logo_count_rightcount_li"><span style="color:#999999;">星级：</span> 一星  </li>
              <li class="logo_count_rightcount_li"><span style="color:#999999;">行业：</span> 互联网 </li>
            </ul>
          </p>
          <p>
            <ul>
              <li>资质认证：未认证</li>
              <li>
                <button class="primary" style="cursor:pointer;margin-left:10%">点击认证</button>
              </li>
            </ul>
          </p>

        </div>
        <div class="clear"></div>
      </div>
      <!-- 子账号 -->
      <!-- <div class="Subaccount">
        <p>子账号</p>
        <ul>
          <li>
            <div class="avatar" style="background-image:url(http://img.hb.aicdn.com/f5645dcc8f78d642803ae0ff232f0e36c9ef4362195ac-SQeC5w_fw658)"></div>
            <div class="Subaccount_li_div">
              <p>曾阿牛</p>
              <p>角色：业务员</p>
            </div>
          </li>
          <li style="margin-left:5%">
            <div class="avatar" style="background-image:url(http://img.hb.aicdn.com/f5645dcc8f78d642803ae0ff232f0e36c9ef4362195ac-SQeC5w_fw658)"></div>
            <div class="Subaccount_li_div">
              <p>曾阿牛</p>
              <p>角色：业务员</p>
            </div>
          </li>
          <li style="margin-left:5%">
            <div class="avatar" style="background-image:url(http://img.hb.aicdn.com/f5645dcc8f78d642803ae0ff232f0e36c9ef4362195ac-SQeC5w_fw658)"></div>
            <div class="Subaccount_li_div">
              <p>曾阿牛</p>
              <p>角色：业务员</p>
            </div>
          </li>
          <li style="margin-left:5%">
            <div class="grid-box" gap>
                <a href="#" class="block-link"><i class="fa fa-plus-circle"></i>添加子账号</a>
            </div>
          </li>
         </ul>
      </div> -->



      <!-- 表格 -->
      <!-- <div class="grid-box" gap list>
				<h3 class="box_title" style="text-align:left;">表格</h3>
				<table class="table" cellspacing="0" cellpadding="0">
		          <thead>
		            <tr>
		              <th>序号</th>
		              <th>银行</th>
		              <th>账号</th>
		              <th>账号姓名</th>
		              <th>开户银行</th>
		              <th>创建时间</th>
		              <th>操作</th>
		            </tr>
		          </thead>
		          <tbody>
		            <tr>
		              <td>01</td>
		              <td>招商银行</td>
		              <td>6235  4867  5695  4756</td>
		              <td>曾阿牛</td>
		              <td>招商银行</td>
		              <td>2018-01-19</td>
		              <td>
		              	<a href="#">编辑</a>
		              	<a href="#">删除</a>
		              </td>
		             </tr>
                 <tr>
		              <td>01</td>
		              <td>招商银行</td>
		              <td>6235  4867  5695  4756</td>
		              <td>曾阿牛</td>
		              <td>招商银行</td>
		              <td>2018-01-19</td>
		              <td>
		              	<a href="#">编辑</a>
		              	<a href="#">删除</a>
		              </td>
		             </tr>
		          </tbody>
		        </table>


			</div> -->
      <!-- 按钮 -->
      <!-- <div class="grid-box" gap style="float:left;">
          <a href="#" class="block-link"><i class="fa fa-plus-circle"></i>添加子账号</a>
      </div>
      <div class="clear"></div> -->



  </div>
</template>
<script>
export default {

}
</script>
<style>
  .clear{
    clear: both;
  }
  #Uncertified .el-main{
    padding: 0;
  }

  #Uncertified .logo_count{
    margin: 30px 1.5% 0 1.5%;
    /* background-color: red; */
    height: 200px;
  }
  #Uncertified .logo_count_img{
    width: 21%;
    /* background-color: aqua; */
    height: 200px;
    float: left;
  }
  #Uncertified .logo_count_rightcount{
    width: 76%;
    /* background-color:#dee0e3; */
    height: 200px;
    float: left;
    margin-left: 3%;
  }
  #Uncertified .logo_count_rightcount>p{
    text-align: left;
  }
  #Uncertified .logo_count_rightcount>p:nth-child(1){
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;
  }
  #Uncertified .logo_count_rightcount>p:nth-child(2),#Uncertified .logo_count_rightcount>p:nth-child(3){
    margin-top: 20px;
  }
  #Uncertified .logo_count_rightcount>p:nth-child(3)>span{
    margin-left: 10%;
  }
  #Uncertified .logo_count_rightcount>p:nth-child(4){
    margin-top: 40px;
  }
  #Uncertified .logo_count_rightcount>p:nth-child(4)>ul>li,#Uncertified .logo_count_rightcount>p:nth-child(5)>ul>li{
    display: inline-block;
  }
  #Uncertified .logo_count_rightcount_li{
    margin-left: 5%;
  }
  #Uncertified .logo_count_rightcount>p:nth-child(5){
    margin-top: 30px;
  }
  /* 子账号 */
  /* #Uncertified .Subaccount{
    height: 110px;
    margin: 80px 1.5% 20px 1.5%;
  }
  #Uncertified .Subaccount>p, #Uncertified .Subaccount>ul>li{
    text-align: left;
    margin-top: 20px;
  }
  #Uncertified .Subaccount>ul{
    text-align: left;
  }
  #Uncertified .Subaccount>ul>li{
    display: inline-block;
  } */
  /* #Uncertified .Subaccount>p, #Uncertified .Subaccount>ul>li>div{
    display: inline-block;
  } */
  #Uncertified .Subaccount>p:nth-child(1){
    font-weight: bold;

  }
  #Uncertified .Subaccount_li_div{
    display: inline-block;

  }
  /* #Uncertified .Subaccount_li_div>p:nth-child(2){
    padding-top: 20px;
  } */

</style>


