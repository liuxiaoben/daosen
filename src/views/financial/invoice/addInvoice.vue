<template>
	<div id="addInvoice">
		<el-row>
		  <el-col :span="24"><div class="grid-big-title">新增发票信息</div></el-col>
		</el-row>
		<el-form ref="invoiceForm" :model="invoiceForm" :rules="rules" status-icon label-width="140px" label-position="left">
			<el-form-item class="strong" label="开具类型" prop="cate">
				<el-radio-group v-model="invoiceForm.cate" @change="resetForm('invoiceForm')">
			      <el-radio label="1">个人</el-radio>
			      <el-radio label="2">企业</el-radio>
			    </el-radio-group>
			</el-form-item>
			<div v-show="invoiceForm.cate == '1'">				
				<el-form-item  class="strong" label="发票抬头">
					<div>个人</div>
				</el-form-item>
			</div>
			<div v-show="invoiceForm.cate == '2'">
				<el-form-item class="strong" label="发票抬头" prop="title">
					<el-input  placeholder="请填写您营业执照上的全称" v-model="invoiceForm.title"></el-input>
				</el-form-item>
				<el-form-item class="strong" label="发票类型" prop="type">
					<el-radio-group v-model="invoiceForm.type" @change="resetForm('invoiceForm')">
				      <el-radio label="1">增值税普通发票</el-radio>
				      <el-radio label="2">增值税专用发票</el-radio>
				    </el-radio-group>
				</el-form-item>
				
				<el-form-item :class="{strong:invoiceForm.type=='2'}" prop="affairNum" label="税务登记号">
					<el-input  placeholder="请填写您税务登记证上的编号" v-model="invoiceForm.affairNum"></el-input>
				</el-form-item>
				<el-form-item :class="{strong:invoiceForm.type=='2'}" prop="bankName" label="基本开户银行名称">
					<el-input  placeholder="请填写您开户许可证上的开户银行" v-model="invoiceForm.bankName"></el-input>
				</el-form-item>
				<el-form-item :class="{strong:invoiceForm.type=='2'}" prop="bankAccount" label="基本开户账号">
					<el-input  placeholder="请填写您开户许可证上的银行账号" v-model="invoiceForm.bankAccount"></el-input>
				</el-form-item>
				<el-form-item :class="{strong:invoiceForm.type=='2'}" prop="companyAddress" label="注册场所地址">
					<el-input  placeholder="请填写您营业执照上的注册地址" v-model="invoiceForm.companyAddress"></el-input>
				</el-form-item>
				<el-form-item :class="{strong:invoiceForm.type=='2'}" prop="companyPhone" label="注册固定电话">
					<el-input  placeholder="请填写您公司有效的联系电话" v-model="invoiceForm.companyPhone"></el-input>
				</el-form-item>
				
			</div>
			<el-row class="pad-top">
				<el-button type="danger" v-waves @click="rule()" size="small">保存</el-button>
				<el-button v-waves size="small">取消</el-button>
			</el-row>
		</el-form>
	</div>
</template>

<script>
	import { addInvoice } from '../../../api/invoice'
	import waves from '@/directive/waves/index.js'
	
	export default {
		name: 'tradingDetail',
		data() {
			return {
				invoiceForm: {
					 cate: '1',
					 title: '',
					 type: '1',
					 affairNum: '',
					 bankName: '',
					 bankAccount: '',
					 companyAddress: '',
					 companyPhone: ''
				},
				rules: {
					title: [
			            { required: true, message: '请填写您营业执照上的全称', trigger: 'blur' }
			        ],
			        affairNum: [
			            { required: true, message: '税务登记号', trigger: 'blur' }
			        ],
			        bankName: [
			            { required: true, message: '基本开户银行名称', trigger: 'blur' }
			        ],
			        bankAccount: [
			            { required: true, message: '基本开户账号', trigger: 'blur' }
			        ],
			        companyAddress: [
			            { required: true, message: '注册场所地址', trigger: 'blur' }
			        ],
			       	companyPhone: [
			            { required: true, message: '注册固定电话', trigger: 'blur' }
			        ]
				}
			}
		},
		methods: {
			rule() {
				if(this.invoiceForm.cate == '1'){
					this.$refs.invoiceForm.resetFields();
					this.invoiceForm.cate = 1
					this.invoiceForm.type = 1
					this.submitform()
				}else{
					if(this.invoiceForm.type=='2'){
						this.$refs.invoiceForm.validate((valid) => {
							if (valid) {
	          					this.submitform()
			          		} else {
			            		this.$message({
						          message: '添加失败',
						          type: 'error'
						        });
			            		return false;
			          		}
						})
					}else{
						this.$refs.invoiceForm.validateField('title', message => {
							if (!message) {
	          					this.submitform()
			          		} else {
			            		this.$message({
						          message: '添加失败',
						          type: 'error'
						        });
			            		return false;
			          		}
						})
					}
				}
	      	},
	      	resetForm(formName) {
	      		this.$refs[formName].clearValidate()
		    },
		    submitform() {
		    	const incoiceInfo = {
      				title: this.invoiceForm.title ==''?'个人':this.invoiceForm.title,
      				type: this.invoiceForm.type,
      				cate: this.invoiceForm.cate,
      				affairNum: this.invoiceForm.affairNum,
      				bankName: this.invoiceForm.bankName,
      				bankAccount: this.invoiceForm.bankAccount,
      				companyAddress:this.invoiceForm.companyAddress,
      				companyPhone:this.invoiceForm.companyPhone
      			}
        		addInvoice(incoiceInfo).then( response => {
        			this.$message({
			          message: '添加成功',
			          type: 'success'
			        });
        			this.$router.push({ path: '/invoice' });
        		})
		    }
		},
		directives: {
		    waves
		},
	};
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
		padding-left: 10px;
		background:url(../../../assets/images/star_icon.png)no-repeat left;
	}
	#addInvoice .pad-top{
		margin-top: 40px;
		margin-left: 160px;
	}
	#addInvoice .el-form .el-input{
		width:521px;
	}
	#addInvoice .el-form-item.is-required .el-form-item__label:before{
		content: '';
		margin-right: 0;
	}
	#addInvoice .el-form-item__error{
		left:24px;
	}
</style>