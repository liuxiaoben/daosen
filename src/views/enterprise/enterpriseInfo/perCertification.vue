<template>
  <div id="personal">
    <form class="flex-form">
      <!-- 名称 -->
      <div class="name">
        <span class="personal_title">名称</span><input type="text" placeholder="请填写你的名称">
      </div>
      <!-- 联系方式 -->
      <div class="contact">
        <span class="personal_title">联系方式</span><input type="text" placeholder="请填写你的联系方式">
      </div>
      <!-- 地址 -->
      <div class="address">
        <span class="personal_title">地址</span>
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
      <!-- 详细地址 -->
      <div class="contact">
        <span class="personal_title">详细地址</span><input type="text" placeholder="请填写详细地址">
      </div>
      <!-- 证件上传 -->
      <div class="upload">
        <ul>
          <li class="personal_title" style="color:#555555;">证件上传</li>
          <li><el-upload list-type="picture-card" style="vertical-align:middle" ></el-upload></li>
          <li><el-upload list-type="picture-card" style="vertical-align:middle" ></el-upload></li>
          <li><el-upload list-type="picture-card" style="vertical-align:middle" ></el-upload></li>
        </ul>
     </div>
     <!-- 上传须知 -->
      <div class="Notice">
        <p class="personal_title">上传须知</p>
        <ul>
          <li>1.上传正面或反面身份证照片时候，必须看清证件信息，且证件信息不能被遮挡；</li>
          <li class="Notice_text">2.上传本人手持身份证照时候，必须包含正面头部上半身照片；</li>
          <li class="Notice_text">3.上传本人手持身份证照时候，必须看清证件信息，且证件信息不能被遮挡，持证人五官清晰可见；</li>
          <li class="Notice_text">4.上传正面或反面身份证照片时候，照片为免冠、未化妆的数码照片原始图片，<span class="Notice_text_color">请勿编辑修改；</span></li>
          <li class="Notice_text">5.你提供的照片信息道森将予以保护，<span class="Notice_text_color">不会用于其他用途</span> </li>
          <li class="Notice_text">6.仅支持.jpg.bmp.png.gif的图片格式，<span class="Notice_text_color">图片大小不超过3M</span> </li>
        </ul>
        <div class="clear"></div>
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
  #personal{
    margin-left: 1.5%;
    text-align: left;
    color: #555555;
  }
  #personal .name{
    margin-top: 34px;
    
  }
  #personal .name>input{
    width: 40%;
  }
  #personal .contact{
    margin-top: 21px;
  }
  #personal .contact>input{
    width: 40%;
  }
  /* 地址 */
  #personal .address{
    margin-top: 21px;
  }
  
  #personal #one,#personal #two,#personal #three{
    width: 13%;
  }
  
  /* 上传照片 */
  #personal .upload{
    margin-top: 22px;
  }
  #personal .el-upload{
    background-image: url("../../../assets/images/geren_shangchuan.png");
    background-repeat:no-repeat;
    
  }
  #personal .el-upload--picture-card{
    /* margin-left: 5.5%; */
    height: 97px;
  }
  #personal .upload>ul>li{
    display: inline-block;
  }
  
  #personal .upload>ul>li:nth-child(3),#personal .upload>ul>li:nth-child(4){
    margin-left: 32px;
  }
  /* 上传须知 */
  #personal .Notice{
    margin-top: 25px;
  }
  #personal .Notice>ul>li{
    font-size: 12px;
    color: #999999;
  }
  #personal .Notice>p{
    float: left;
  }
  #personal .Notice>ul{
    float: left;
    
  }
  #personal .Notice .Notice_text{
    margin-top: 15px;
  }
  #personal .Notice .Notice_text_color{
    color: #60686e;
  }
  /* 按钮 */
  #personal .grid-box{
    margin-left: 5.5%
  }
  #personal .grid-box>button:nth-child(2){
    margin-left: 10px;
  }
  
  /* span */
  #personal .personal_title{
    display: inline-block;
    width: 7%;
    
  }

   #personal select{
    padding: 0;
  }
  
  #personal .grid-box>button{
    cursor:pointer 
  }
  
</style>

