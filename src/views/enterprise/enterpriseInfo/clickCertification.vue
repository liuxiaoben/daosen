<template>
  <div id="atc">
    <div class="title">
     <span>资质认证</span>
    </div>


  <el-form ref="form" :model="form" label-width="140px" label-position="left">
			<el-form-item class="strong" label="认证类型">
				<el-radio-group v-model="form.lxlx">
			      <el-radio label="个人"></el-radio>
			      <el-radio label="企业"></el-radio>
			    </el-radio-group>
			</el-form-item>
			<div v-if="form.lxlx == '个人'">				
        <div id="personal">

            <!--个人头像 -->
             <div class="name" prop="linker">
              <span class="personal_title" style="float:left;">真事照片</span>

              <el-upload
                class="avatar-uploader zszp"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccessgrlogo"
                :before-upload="beforeAvatarUpload" style="display:inline-block">
                <img v-if="logoUrl" :src="logoUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

              <span class="personal_title" style="width:40%;">
                <p>请上传真实照片</p>
                <p>仅支持.jpg.bmp.png.gif的图片格式，<span class="Notice_text_color">图片大小不超过3M</span> </p>
              </span>
            </div>

            <!-- 名称 -->
            <div class="name" prop="linker">
              <span class="personal_title">名称</span><input v-model="form.linker" type="text" placeholder="请填写你的名称">
            </div>
            <!-- 联系方式 -->
            <div class="contact" prop="phone">
              <span class="personal_title">联系方式</span><input v-model="form.phone" type="text" placeholder="请填写你的联系方式">
            </div>
            <!-- 地址 -->
            <div class="address">
              <!-- <span class="personal_title">地址</span>
              <select id="one" v-model="provinceId">
                <option>省</option>
              </select>
              <select id="two">
                <option>市</option>
              </select>
              <select id="three">
                <option>区</option>
              </select> -->
              <el-form-item class="strong" label="所在地区"  :gutter="30">
                <el-col :span="3">
                  <el-form-item prop="privince">
                    <el-select v-model="form.privince" placeholder="选择省份" v-on:change="updateCity()">
                          <el-option v-for="(value, key) in privinceList" :label="value" :value="key" :key="key">{{ value }}</el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item prop="city">
                      <el-select v-model="form.city" placeholder="选择城市" v-on:change="updateDic()">
                          <el-option v-for="(value, key) in cityList" :label="value" :value="key" :key="key">{{ value }}</el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item prop="district">
                      <el-select v-model="form.district" placeholder="选择区域">
                          <el-option v-for="(value, key) in dicList" :label="value" :value="key" :key="key">{{ value }}</el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </div>
            <!-- 详细地址 -->
            <div class="contact">
              <span class="personal_title">详细地址</span><input  prop="address" v-model="form.address" type="text" placeholder="请填写详细地址">
            </div>
            <!-- 证件上传 -->
            <div class="upload" >
              <ul>
                <li class="personal_title" style="color:#555555;float:left;">证件上传</li>
                 <!-- <li><el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" style="vertical-align:middle" ></el-upload></li> -->
               <!-- <li><el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" style="vertical-align:middle" ></el-upload></li>
                <li><el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" style="vertical-align:middle" ></el-upload></li> -->

                <li>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccesszm"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="idcardFront" :src="idcardFront" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </li>
                <li>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccessbm"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="idcardBack" :src="idcardBack" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </li>
                <li>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccesssc"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="idcardHandup" :src="idcardHandup" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </li>
                <!-- <li><el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" style="vertical-align:middle" ></el-upload></li>
                <li><el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" style="vertical-align:middle" ></el-upload></li>
                <li><el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" style="vertical-align:middle" ></el-upload></li> -->
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
              <button class="primary"  @click="submitForm('form')">提交</button>
              <button>取消</button>
            </div>
            
            
        </div>
			</div>
			<div v-if="form.lxlx == '企业'">
        <div id="enterprise">

          <!--企业头像 -->
             <div class="name">
              <span class="enterprise_title" style="float:left;">企业LOGO</span>

              <el-upload
                class="avatar-uploader qylogo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccessgrlogo"
                :before-upload="beforeAvatarUpload" style="display:inline-block">
                <img v-if="logoUrl" :src="logoUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>

              <span class="enterprise_title" style="width:40%;">
                <p>请上传真实照片</p>
                <p>仅支持.jpg.bmp.png.gif的图片格式，<span class="Notice_text_color">图片大小不超过3M</span> </p>
              </span>
            </div>
      
      <!-- 名称 -->
      <div class="name">
        <span class="enterprise_title" >企业名称</span><input type="text" v-model="form.name" placeholder="请填写你的企业名称" >
      </div>
      <!-- 联系方式 -->
      <div class="contact">
        <span class="enterprise_title">企业联系人</span><input type="text" v-model="form.linker" placeholder="请填写企业联系人" >
      </div>
      
      <!-- 详细地址 -->
      <div class="contact">
        <span class="enterprise_title">联系方式</span><input type="text" v-model="form.phone" placeholder="请填写企联系方式">
      </div>
      <div class="contact">
        <span class="enterprise_title">营业执照号</span><input type="text" v-model="form.businessLicense" placeholder="请填写营业执照号">
      </div>
      <!-- 地址 -->
      <div class="address">
        <!-- <span class="enterprise_title">公司所在地址</span>
        <select id="one">
          <option>省</option>
        </select>
        <select id="two">
          <option>市</option>
        </select>
        <select id="three">
          <option>区</option>
        </select> -->
        <el-form-item class="strong" label="所在地区"  :gutter="30">
                <el-col :span="3">
                  <el-form-item prop="privince">
                    <el-select v-model="form.privince" placeholder="选择省份" v-on:change="updateCity()">
                          <el-option v-for="(value, key) in privinceList" :label="value" :value="key" :key="key">{{ value }}</el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item prop="city">
                      <el-select v-model="form.city" placeholder="选择城市" v-on:change="updateDic()">
                          <el-option v-for="(value, key) in cityList" :label="value" :value="key" :key="key">{{ value }}</el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item prop="district">
                      <el-select v-model="form.district" placeholder="选择区域">
                          <el-option v-for="(value, key) in dicList" :label="value" :value="key" :key="key">{{ value }}</el-option>
                      </el-select>
                  </el-form-item>
                </el-col>
              </el-form-item>
      </div>
      <div class="contact">
        <span class="enterprise_title">详细地址</span><input v-model="form.address" type="text" placeholder="请填写详细地址">
      </div>
      <!-- 证件上传 -->
      <div class="upload">
        <ul class="qyzjsc">
          <li class="enterprise_title" style="float:left;">附件</li>

          <li>
            <p>营业执照附件</P>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccessyyzz"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="businessLicenseUrl" :src="businessLicenseUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </li>
                <li>
                  <p>税务登记证</P>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccesszzjgdm"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="organizationCodeUrl" :src="organizationCodeUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </li>
                <li>
                  <p>组织机构代码</P>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccesssudjz"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="taxPicUrl" :src="taxPicUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </li>
          <!-- <li><span>营业执照附件</span><el-upload list-type="picture-card" style="vertical-align:middle;margin-top:10px;" ></el-upload></li>
          <li><span>营业执照附件</span><el-upload list-type="picture-card" style="vertical-align:middle;margin-top:10px;" ></el-upload></li>
          <li><span>营业执照附件</span><el-upload list-type="picture-card" style="vertical-align:middle;margin-top:10px;" ></el-upload></li> -->



        </ul>
     </div>
     
      <!-- 上传按钮 -->
      <div class="grid-box" gap list>
				<button class="primary"  @click="submitForm1('form')">提交</button>
				<button>取消</button>
		  </div>
       
    
  </div>

			</div>
		</el-form>

    

  </div>
 
</template>
<script>
import { getprivince } from '@/api/enterprise'
import { getcity } from '@/api/enterprise'
import { getdistinct } from '@/api/enterprise'
import { privateAuthen } from '@/api/enterprise'
import { authen } from '@/api/enterprise'
import { Message } from 'element-ui'

  export default {
		data() {
			return {
				form: {
          lxlx:'个人',
					name: '',
          linker: '',
          address: '',
          city: '',
          distinct:'',
          province:'',
          phone:'',
          businessLicense:'',
        },
        dialogImageUrl: '',
        dialogVisible: false,
        privinceList: null,
				cityList: null,
        dicList: null,
        idcardFront: '',
        idcardBack: '',
        idcardHandup: '',
        businessLicenseUrl: '',
        organizationCodeUrl: '',
        taxPicUrl: '',
        logoUrl:'',
        rules: {
			        name: [
			            { required: true, message: '请输入您的姓名', trigger: 'blur' }
			        ],
			        privince: [
			            { required: true, message: '请选择省份', trigger: 'change' }
			        ],
			        city: [
			            { required: true, message: '请选择城市', trigger: 'change' }
			        ],
			        district: [
			            { required: true, message: '请选择区域', trigger: 'change' }
			        ],
			        address: [
			            { required: true, message: '请填写街道地址', trigger: 'blur' }
			        ]
			       	
		    }
        
			}
		},
    
    
    methods: {
      handleAvatarSuccessgrlogo(res, file) {
        this.logoUrl = URL.createObjectURL(file.raw);
      },

      handleAvatarSuccesszm(res, file) {
        this.idcardFront = URL.createObjectURL(file.raw);
      },
      
      handleAvatarSuccessbm(res, file) {
        this.idcardBack = URL.createObjectURL(file.raw);
      },

      handleAvatarSuccesssc(res, file) {
        this.idcardHandup = URL.createObjectURL(file.raw);
      },


      handleAvatarSuccessyyzz(res, file) {
        this.businessLicenseUrl = URL.createObjectURL(file.raw);
      },

      handleAvatarSuccesszzjgdm(res, file) {
        this.organizationCodeUrl = URL.createObjectURL(file.raw);
      },
      
      handleAvatarSuccesssudjz(res, file) {
        this.taxPicUrl = URL.createObjectURL(file.raw);
      },

      handleAvatarSuccessgrlogo(res, file) {
        this.logoUrl = URL.createObjectURL(file.raw);
      },

      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isGIF && !isPNG && !isBMP) {
                this.common.errorTip('上传图片必须是JPG/GIF/PNG/BMP 格式!')
        }
        
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return (isJPG || isBMP || isGIF || isPNG) && isLt2M
      },
      
      updateCity() {
	  			this.form.city =''
	  			this.form.district =''
	  			const privinceId = this.form.privince
	  			console.log(privinceId)
	  			const privinceName = {token:this.$store.getters.token,privinceId:privinceId}
	  			getcity(privinceName).then(response => {
	  				this.cityList =  response.data
	  				console.log(this.cityList)
	  			})
	  	},
	  	updateDic() {
	  			this.form.district =''
	  			const cityId = this.form.city;
	  			console.log(cityId)
	  			const cityName = {token:this.$store.getters.token,cityId:cityId}
	  			getdistinct(cityName).then(response => {
	  				this.dicList =  response.data
	  				console.log(this.cityList)
	  			})
	  	},
	  		submitForm(formName) {
	        	this.$refs[formName].validate((valid) => {
	          		if (valid) {
	          			const privateAut = {
                    name: this.form.linker,
                    linker: this.form.linker,
	          				provinceId: this.form.privince,
	          				cityId: this.form.city,
	          				distinctId: this.form.district,
	          				address: this.form.address,
	          				phone: this.form.phone,
                    token: this.$store.getters.token,
                    eid:this.$store.getters.eid,
                    idcardBack:this.idcardBack,
                    idcardFront:this.idcardFront,
                    idcardHandup:this.idcardHandup
                  }
                  console.log(privateAut)
	            		privateAuthen(privateAut).then( response => {
	            			Message.success('提交成功')
	            			this.$router.push({ path: '/enterprise/info' });
	            		})
	          		} else {
	            		console.log('error submit!!');
	            		return false;
	          		}
	        	});
	      },
	  		submitForm1(formName) {
	        	this.$refs[formName].validate((valid) => {
	          		if (valid) {
	          			const Aut = {
                    name: this.form.linker,
                    linker: this.form.linker,
	          				provinceId: this.form.privince,
	          				cityId: this.form.city,
	          				distinctId: this.form.district,
	          				address: this.form.address,
                    phone: this.form.phone,
                    businessLicense: this.form.businessLicense,
                    token: this.$store.getters.token,
                    eid:this.$store.getters.eid,
                    businessLicenseUrl:this.businessLicenseUrl,
                    organizationCodeUrl:this.organizationCodeUrl,
                    taxPicUrl:this.taxPicUrl
                  }
                  console.log(Aut)
	            		authen(Aut).then( response => {
	            			Message.success('提交成功')
	            			this.$router.push({ path: '/enterprise/info' });
	            		})
	          		} else {
	            		console.log('error submit!!');
	            		return false;
	          		}
	        	});
	      }
    },
    created (){
      getprivince({token:this.$store.getters.token}).then(response => {
        this.privinceList = response.data
          this.listLoading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
</script>

<style>
  #atc .el-main{
    background-color: #fff;
  }
  #atc>.title{
    height: 53px;
    line-height: 53px;
    text-align: left;

    border-bottom: 1px solid #dee0e3;
  }
  #atc>.title>span{
    margin-left: 1.5%;
    color: #8e9eaa;
  }
  #atc .form-item{
    text-align: left;
    margin-left: 1.5%;
    margin-top: 40px;
  }

  #personal{
    /* margin-left: 1.5%; */
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
  #personal .upload ul li:nth-child(2) .el-upload{
    background-image: url("../../../assets/images/geren_shangchuan.png");
    background-repeat:no-repeat;
    
  }

  #personal .upload ul li:nth-child(3) .el-upload{
    background-image: url("../../../assets/images/geren_shenfen.png");
    background-repeat:no-repeat;
    
  }

  #personal .upload ul li:nth-child(4) .el-upload{
    background-image: url("../../../assets/images/geren_shenfenAll.png");
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
    width: 10%;
    
  }

   #personal select{
    padding: 0;
  }
  
  #personal .grid-box>button{
    cursor:pointer 
  }

  #enterprise{
    /* margin-left: 1.5%; */
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
    background-image: url("../../../assets/images/qyfjsc.png");
    background-repeat:no-repeat;
    background-size:100% 100%; 
    
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
    width: 10%;
    display:inline-block;
  }
  #atc .el-form{
		padding: 20px 37px 80px 33px;
	}
	#atc .el-form .el-radio__input.is-checked .el-radio__inner{
		border-color: #e60012 !important;
    	background: #e60012 !important;
	}
	#atc .el-form .el-radio__input.is-checked+.el-radio__label{
		color:#e60012 !important;
	}
	#atc .el-form .el-button{
		line-height: 9px;
	}
	#atc .el-form .el-form-item .el-form-item__label{
		margin-right: 20px;
	}
	/*#addInvoice .el-form .el-form-item.strong .el-form-item__label{
		padding-left: 10px;
		background:url(../../../assets/images/star_icon.png)no-repeat left;
	}*/
	#atc .pad-top{
		margin-top: 40px;
		margin-left: 160px;
	}
	/* #atc .el-form .el-input{
		width:521px;
	} */

  #atc .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 97px;
  }
  #atc .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  #atc .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 97px;
    line-height: 178px;
    text-align: center;
  }
  #atc .avatar {
    width: 148px;
    height: 97px;
    display: block;
    border-radius: 0px;
  }
  #atc .el-icon-plus:before{
    display: none;
  }

  #atc .el-select{
    width: 100%;
  }

  #atc .el-input{
    width: 100% !important;
  }

  .zszp>div>.avatar-uploader-icon{
    width: 82px !important;
    height: 82px !important;
    border-radius: 50% !important;
  }

  .zszp>div{
    width: 82px !important;
    height: 82px !important;
    border-radius: 50% !important;
  }

  .qylogo>div{
    width: 173px !important;
    height: 113px !important;
    border-radius: 0px !important;
    background-image:none !important;
    border: 1px solid #d9d9d9 !important;
  }

  .qylogo>div>.avatar-uploader-icon{
    width: 173px !important;
    height: 113px !important;
    border-radius: 0px !important;
  }

  .qyzjsc{

  }

  .qyzjsc p{
    margin-bottom: 13px;
    color: #555555;
    font-size: 14px;
  }
</style>
