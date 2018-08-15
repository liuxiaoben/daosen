<template>
  <div id="enterprise">
      <form class="flex-form">
      <!-- 名称 -->
      <div class="name">
        <span class="enterprise_title">企业名称</span><input type="text" placeholder="请填写你的企业名称" >
      </div>
      <!-- 联系方式 -->
      <div class="contact">
        <span class="enterprise_title">企业联系人</span><input type="text" placeholder="请填写企业联系人" >
      </div>

      <!-- 详细地址 -->
      <div class="contact">
        <span class="enterprise_title">联系方式</span><input type="text" placeholder="请填写企联系方式">
      </div>
      <div class="contact">
        <span class="enterprise_title">营业执照号</span><input type="text" placeholder="请填写营业执照号">
      </div>
      <!-- 地址 -->
      <div class="address">
        <span class="enterprise_title">公司所在地址</span>
        <select id="one">
          <option>省</option>
        </select>
        <select id="two">
          <option>市</option>
        </select>
        <select id="three">
          <option>区</option>
        </select>
      </div>
      <div class="contact">
        <span class="enterprise_title">详细地址</span><input type="text" placeholder="请填写详细地址">
      </div>
      <!-- 证件上传 -->
      <div class="upload">
        <ul>
          <li class="enterprise_title">附件</li>
          <li><span>营业执照附件</span><el-upload list-type="picture-card" style="vertical-align:middle;margin-top:10px;" ></el-upload></li>
          <li><span>营业执照附件</span><el-upload list-type="picture-card" style="vertical-align:middle;margin-top:10px;" ></el-upload></li>
          <li><span>营业执照附件</span><el-upload list-type="picture-card" style="vertical-align:middle;margin-top:10px;" ></el-upload></li>
        </ul>
     </div>

      <!-- 上传按钮 -->
      <div class="grid-box" gap list>
				<button class="primary">提交</button>
				<button>取消</button>
		  </div>

    </form>
  </div>
</template>

<script>
export default {
  // data() {
  //     return {
  //       cities: [{
  //         value: 'Beijing',
  //         label: '北京'
  //       }, {
  //         value: 'Shanghai',
  //         label: '上海'
  //       }, {
  //         value: 'Nanjing',
  //         label: '南京'
  //       }, {
  //         value: 'Chengdu',
  //         label: '成都'
  //       }, {
  //         value: 'Shenzhen',
  //         label: '深圳'
  //       }, {
  //         value: 'Guangzhou',
  //         label: '广州'
  //       }],
  //       value6: ''
  //     }
  //   }

}
</script>

<style>
.clear{
    clear: both;
  }
  #enterprise{
    margin-left: 1.5%;
    text-align: left;
    color: #555555;
  }
  #enterprise .name{
    margin-top: 34px;

  }
  #enterprise .name>input{

    width: 40%;
  }
  #enterprise .contact{
    margin-top: 21px;
  }
  #enterprise .contact>input{
    width: 40%;
  }
  /* 地址 */
  #enterprise .address{
    margin-top: 21px;
  }

  #enterprise #one,#enterprise #two,#enterprise #three{
    width: 13%;
  }
  /* 上传照片 */
  #enterprise .upload{
    margin-top: 22px;
  }
  #enterprise .el-upload{
    background-image: url("../../../assets/images/geren_shangchuan.png");
    background-repeat:no-repeat;

  }
  #enterprise .el-upload--picture-card{

    height: 97px;
  }
  #enterprise .upload>ul>li{
    display: inline-block;
  }

  #enterprise .upload>ul>li:nth-child(3),#enterprise .upload>ul>li:nth-child(4){
    margin-left: 32px;
  }
  /* 上传须知 */
  #enterprise .Notice{
    margin-top: 25px;
  }
  #enterprise .Notice>ul>li{
    font-size: 12px;
    color: #999999;
  }
  #enterprise .Notice>p{
    float: left;
  }
  #enterprise .Notice>ul{
    float: left;
    margin-left: 35px;
  }
  #enterprise .Notice .Notice_text{
    margin-top: 15px;
  }
  #enterprise .Notice .Notice_text_color{
    color: #60686e;
  }
  /* 按钮 */
  #enterprise .grid-box{
    margin-left: 5.7%
  }
  #enterprise .grid-box>button:nth-child(2){
    margin-left: 10px;
  }
  #enterprise .grid-box>button{
    cursor:pointer
  }
  /* 调整 */
  #enterprise .enterprise_title{
    width: 7%;
    display:inline-block;
  }
</style>


