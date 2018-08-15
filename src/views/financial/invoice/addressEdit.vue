
<template>
	<div id="addInvoice">
		<el-row>
		  <el-col :span="24"><div class="grid-big-title">新增地址</div></el-col>
		</el-row>
		<el-form ref="form" :model="form"  :rules="rules" status-icon label-width="140px" label-position="left">
				<el-form-item class="strong" label="收件人姓名" prop="name">
					<el-input placeholder="请填写您收件人姓名" v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item class="strong" label="所在地区" required>
					<el-col :span="6">
						<el-form-item prop="privince">
							<el-select v-model="form.privince" placeholder="选择省份" v-on:change="updateCity()">
						      	<el-option v-for="(value, key) in privinceList" :label="value" :value="key" :key="key">{{ value }}</el-option>
						    </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="city">
						    <el-select v-model="form.city" placeholder="选择城市" v-on:change="updateDic()">
						      	<el-option v-for="(value, key) in cityList" :label="value" :value="key" :key="key">{{ value }}</el-option>
						    </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="district">
						    <el-select v-model="form.district" placeholder="选择区域">
						      	<el-option v-for="(value, key) in dicList" :label="value" :value="key" :key="key">{{ value }}</el-option>
						    </el-select>
						</el-form-item>
					</el-col>
				</el-form-item>
				<el-form-item class="strong" label="街道地址" prop="street">
					<el-input  placeholder="请填写您街道地址" v-model="form.street"></el-input>
				</el-form-item>
				<el-form-item class="strong" label="邮政编码">
					<el-input  placeholder="请填写您邮政编码" v-model="form.zipcode"></el-input>
				</el-form-item>
				<el-form-item class="strong" label="手机号" prop="phone">
					<el-input  placeholder="请填写您手机号" v-model="form.phone"></el-input>
				</el-form-item>
			<el-row class="pad-top">
				<el-button type="danger" @click="submitForm('form')">保存</el-button>
				<el-button>取消</el-button>
			</el-row>
		</el-form>
	</div>
</template>

<script>
	import { getPrivince,getCity,getDic,addressEdit,addressDetail } from '../../../api/invoice'
	
	import { Message } from 'element-ui'


	export default {
		name: 'tradingDetail',
		data() {
			return {
				form: {
					 name: '',
					 privince: '',
					 city: '',
					 district: '',
					 street: '',
					 zipcode: '',
					 phone: ''
				},
				privinceList: null,
				cityList: null,
				dicList: null,
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
			        street: [
			            { required: true, message: '请填写街道地址', trigger: 'blur' }
			        ],
			       	phone: [
			            { required: true, message: '请填写联系方式', trigger: 'blur' }
			        ]
		        }		
			}
		},
		created() {
	  		getPrivince(this.$store.getters.token).then(response => {
	  			this.privinceList = response.data
	  			console.log(this.privinceList)
	  		})
	  		this.getDetail()
	  	},
	  	methods: {
	  		getDetail() {
	  			addressDetail({addressId:this.$route.params.addressId,token:this.$store.getters.token}).then(response => {
	  				this.form = response.data
	  			})
	  		},
	  		updateCity() {
	  			this.form.city =''
	  			this.form.district =''
	  			const privinceId = this.form.privince
	  			console.log(privinceId)
	  			const privinceName = {privinceId:privinceId,token:this.$store.getters.token}
	  			getCity(privinceName).then(response => {
	  				this.cityList =  response.data
	  				console.log(this.cityList)
	  			})
	  		},
	  		updateDic() {
	  			this.form.district =''
	  			const cityId = this.form.city;
	  			console.log(cityId)
	  			const cityName = {cityId:cityId,token:this.$store.getters.token}
	  			getDic(cityName).then(response => {
	  				this.dicList =  response.data
	  				console.log(this.cityList)
	  			})
	  		},
	  		submitForm(formName) {
	        	this.$refs[formName].validate((valid) => {
	          		if (valid) {
	          			const addressInfo = {
	          				invoAddId: this.$route.params.addressId,
	          				name: this.form.name,
	          				province: this.form.privince,
	          				city: this.form.city,
	          				district: this.form.district,
	          				street: this.form.street,
	          				phone: this.form.phone,
	          				zipcode:this.form.zipcode,
	          				token:this.$store.getters.token
	          			}
	            		addressEdit(addressInfo).then( response => {
	            			Message.success('修改成功')
	            			this.$router.push({ path: '/invoice' });
	            		})
	          		} else {
	            		console.log('error submit!!');
	            		return false;
	          		}
	        	});
	      	}
	  	}
	}
</script>

<style type="text/css">
	#addInvoice .el-form{
		padding: 20px 37px 80px 33px;
	}
	#addInvoice .el-form .el-radio__input.is-checked .el-radio__inner{
		border-color: #e60012;
    	background: #e60012;
	}
	#addInvoice .el-form .el-radio__input.is-checked+.el-radio__label{
		color:#e60012;
	}
	#addInvoice .el-form .el-button{
		line-height: 9px;
	}
	#addInvoice .el-form .el-form-item .el-form-item__label{
		margin-right: 20px;
	}
	#addInvoice .el-form .el-form-item.strong .el-form-item__label{
		/*padding-left: 10px;
		background:url(../../../assets/images/star_icon.png)no-repeat left;*/
	}
	#addInvoice .pad-top{
		margin-top: 40px;
		margin-left: 160px;
	}
	#addInvoice .el-form .el-input{
		width:521px;
	}
	#addInvoice .el-form .el-select{
		width:157px;
	}
	#addInvoice .el-form .el-select .el-input{
		width:100%;
	}
	#addInvoice .el-form .el-select:last-child .el-input{
		margin-right: 0;
	}
	#addInvoice .el-form .el-form-item__error{
		left: 18px;
		color:#e60012;
	}
	#addInvoice .el-form-item.is-required .el-form-item__label:before{
		color:#e60012;
	}
	#addInvoice .strong>.el-form-item__content{
		width:725px;
	}
</style>