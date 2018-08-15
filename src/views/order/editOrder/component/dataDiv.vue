<template>
	<div id='dataDiv'>
		<transition name="slide-fade">
			<div class="ploat-list" v-show="listIsopen">
				<el-tabs v-model="tabActiveName" @tab-click="tabHandleClick">
					<el-tab-pane label="受众数据" name="first">
						<div v-if="ploatList.length <=0" style="text-align: center; padding: 20px 0">没有数据</div>
						<audience v-else ref="audience" :commData="ploatList"></audience>
					</el-tab-pane>
					<el-tab-pane label="小区列表" name="second">
						<div v-if="ploatList.length <=0" style="text-align: center; padding: 20px 0">没有数据</div>
						<div v-else class="ploat-conent">
							<div class="ploat-item" 
								v-for="item in ploatList" 
								:key="item.commId"
								:class="selPloatIndex == item.commId ? 'active' : ''" 
								@click="openDetail(item.commId)">
								<div class="left">
									<img class="img" :src="item.eurl"/>
								</div>
								<div class="right">
									<div class="txt1">{{item.commName}}</div>
									<div class="txt2">
										空位数：<span class="txt-red">{{item.tatolSpaceNum}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										已选：<span class="txt-red">{{item.selTatolNum}}</span>
									</div>
									<div class="txt2">
										<i class="el-icon-location"></i> {{item.address}}
									</div>
								</div>
							</div>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</transition>
		<transition name="slide-fade">
			<div class="ploat-detail" v-show="detailIsopen">
				<div class="detail-con">
					<div class="img-list">
						<el-carousel height="150px" indicator-position="none">
							<el-carousel-item v-for="(item,index) in resourceInfo.commImage" :key="index">
								<img :src="item+'pg'">
							</el-carousel-item>
						</el-carousel>
					</div>
					<div class="media-con">
						<div class="title">资源信息</div>
						<ul class="item-con">
							<li>社区类型: {{resourceInfo.commTypeName}}</li>
							<li>楼栋数: {{resourceInfo.siteNum}}</li>
							<li>单元数: {{resourceInfo.unitNum}}</li>
							<li>总户数: {{resourceInfo.roomNum}}</li>
						</ul>
					</div>
					<div class="media-con">
						<el-row style="margin-bottom:10px;">
							<el-col :span="9">已选: <span class="txt-red">{{shopCartList[resourceInfo.cycle] && shopCartList[resourceInfo.cycle][resourceInfo.commId] ? shopCartList[resourceInfo.cycle][resourceInfo.commId].selTatol : 0}}</span></el-col>
							<el-col :span="15">金额: <span class="txt-red">{{shopCartList[resourceInfo.cycle] && shopCartList[resourceInfo.cycle][resourceInfo.commId] ? shopCartList[resourceInfo.cycle][resourceInfo.commId].priceTatol : 0}}元</span></el-col>
						</el-row>
						<div class="cycle">{{resourceInfo.cycle}}</div>
						<div class="item-con" v-for="item in resourceInfo.children" :key="item.mtypeId">
							<div class="item">
								<span>{{item.mtypeName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									数量：<span class="txt-red">{{item.spaceNum}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
									价格：<span class="txt-red">{{item.saleMoney}}</span>元
								</span>
								<el-input-number 
									v-model="mediaListModel[item.commId+''+item.mtypeId]" 
									@change="handleChange(resourceInfo.cycle, item.commId, item.mtypeId)" 
									:min="0" 
									:max="item.spaceNum" 
									size="mini" 
									style="width:100px"></el-input-number>
							</div>
						</div>
					</div>
				</div>
				<div class="next-btn" @click="openChartDiv">周边数据 <i class="el-icon-arrow-right"></i></div>
			</div>
		</transition>
		<transition name="slide-fade">
			<div class="ploat-data"  v-show="dataIsopen">
				<div class="data-con">
					<!-- <div class="title">周边数据</div> -->
					<div class="business-data">
						<div class="sub-title">行业分析</div>
						<chart-industry ref="chartInudstry" id="chartInudstry" :data="inudstryData" height='180px' width='340px'></chart-industry>
					</div>
					<div class="people-data">
						<div class="sub-title">人群分析</div>
						<!-- 性别 -->
						<div @click="sexDialog = true"><chart-sex ref="chartSex" id="chartSex" :data="sexData" height='180px' width='340px'></chart-sex></div>
						<el-dialog :visible.sync="sexDialog" :modal="false" top="40vh" width="429px" style="margin-left:60wh;">
							<el-table :data="sexData"  style="border-radius:6px;">
								<el-table-column property="name" label="性别" width=""  align="center"></el-table-column>
								<el-table-column property="num" label="用户数" width="" align="center"></el-table-column>
								<el-table-column property="proportion" label="占比" :formatter="tableFormatter" align="center"></el-table-column>
								<el-table-column property="tgi" label="TGI" align="center"></el-table-column>
							</el-table>
						</el-dialog>
						<!-- 年龄 -->
						<div @click="ageDialog = true"><chart-age ref="chartAge" id="chartAge" :data="ageData" height='200px' width='340px'></chart-age></div>
						<el-dialog :visible.sync="ageDialog" :modal="false" top="40vh" width="429px" style="margin-left:60wh;">
							<el-table :data="ageData"  style="border-radius:6px;">
								<el-table-column property="name" label="年龄" width=""  align="center"></el-table-column>
								<el-table-column property="num" label="用户数" width="" align="center"></el-table-column>
								<el-table-column property="proportion" label="占比" :formatter="tableFormatter" align="center"></el-table-column>
								<el-table-column property="tgi" label="TGI" align="center"></el-table-column>
							</el-table>
						</el-dialog>
						<!-- 学历 -->
						<div @click="eduDialog = true"><chart-education ref="chartEdu" id="chartEdu" :data="eduData" height='220px' width='340px'></chart-education></div>
						<el-dialog :visible.sync="eduDialog" :modal="false" top="40vh" width="429px" style="margin-left:60wh;">
							<el-table :data="eduData"  style="border-radius:6px;">
								<el-table-column property="name" label="学历" width=""  align="center"></el-table-column>
								<el-table-column property="num" label="用户数" width="" align="center"></el-table-column>
								<el-table-column property="proportion" label="占比" :formatter="tableFormatter" align="center"></el-table-column>
								<el-table-column property="tgi" label="TGI" align="center"></el-table-column>
							</el-table>
						</el-dialog>
					</div>
				</div>
				<div class="next-btn" @click="preferenceDialog=true">偏好 <i class="el-icon-arrow-right"></i></div>
			</div>
		</transition>
		<div class="close-btn" @click="closePanel()">
			<i :class="listIsopen ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"></i>
		</div>

		<el-dialog class="prefer-dialog" title="偏好" :append-to-body="true" :visible.sync="preferenceDialog">
			<el-table :data="preferList" stripe style="width:100%">
				<el-table-column property="industryName" label="频道" width=""  align="center"></el-table-column>
				<el-table-column property="num" label="用户数" width="" align="center"></el-table-column>
				<el-table-column property="wProportion" label="VV占比" :formatter="tableFormatter" align="center"></el-table-column>
				<el-table-column property="uvProportion" label="UV占比" :formatter="tableFormatter" align="center"></el-table-column>
				<el-table-column property="wTgi" label="VV占比TGI" align="center"></el-table-column>
				<el-table-column property="uvTgi" label="UV占比TGI" align="center"></el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>

<script>
	import {testData, commData} from './testdata.js'
	// 引入echars
	import ChartIndustry from "./echarts/industry";
	import ChartSex from "./echarts/sex";
	import ChartAge from "./echarts/age";
	import ChartEducation from "./echarts/education";
	import audience from './audience'
	import { getShopCartData } from './dataDeal';
	import { aroundData, aroundDataByArea, businessData} from '@/api/putMap/comApi'
	import { Projdetail } from '@/api/putMap/pushadvertising.js';
	var setArr = new Set();
	export default {
		components: {
			ChartIndustry,
			ChartSex,
			ChartAge,
			ChartEducation,
			audience
		},
		props: {
			ploatList:{
				type: Array,
				default: [],
			}
		},
		data() {
			return {
				preferenceDialog: false,
				listIsopen: false,
				detailIsopen: false,
				dataIsopen: false,
				sexDialog: false,
				ageDialog: false,
				eduDialog: false,
				selPloatIndex: "",
				tabActiveName: "first", //默认显示小区列表
				resourceInfo: {}, //当前小区信息
				imgList: [], //小区图片
				mediaList: [], //
				mediaListModel:{}, //加减数量model
				inudstryData:[], //行业分析数据
				sexData: [],
				ageData: [],
				eduData: [],
				preferList: [],
				shopCartList: {}, //购物车未拼装前数据
				shopCartData: [], //拼装后的数据
				shopMapItem: null,
			}
		},
		computed: {
           
        },
		methods: {
			//打开小区详细面板并获取详细信息
			openDetail(commId){
				this.detailIsopen = true;
				this.selPloatIndex = commId;
				this.getResourceInfo(commId);

				//初始化选中的值
				//this.mediaListModel = {}
				let cycle = this.resourceInfo.cycle;
				if(this.shopCartList[cycle]){
					let list = this.shopCartList[cycle].mediaList;
					for(let i in list){
						this.mediaListModel[list[i].modelId] = list[i].selNum;
					}
				}
				this.$nextTick(() =>{
					for(let i in this.mediaListModel){
						if(!this.mediaListModel[i]){
							this.mediaListModel[i] = 0
						}
					}
				})
				if(this.dataIsopen){
					this.openChartDiv()
				}
			},

			//点击数量加减按钮是触发
			handleChange(cycle, commId, id){
				var num = this.mediaListModel[commId+''+id];
				this.changeMediaNum(cycle, commId, id, num);
				var maplabel = document.getElementById('ploat'+ commId);
				var html = maplabel.getElementsByClassName("ol-commu-sel")[0];
				html.innerHTML = "已选:" + num;
				maplabel.classList.add("shopOn");
				var commObj = this.resourceInfo;
				this.shopMapItem = setArr.add(commObj);
			},

			//点击tab切换触发
			tabHandleClick(tab, event){
				
			},

			//通过订单数据回显购物车
			showShopDataByOrder(){
				let list = this.ploatList;
				list.forEach(item =>{
					this.changeMediaNum(item.cycle, item.commId, item.mtypeId, item.num, item);
					this.mediaListModel[item.commId+''+item.mtypeId] = item.num;
				})
			},

			//选择数量改变将数据加入购物车
			changeMediaNum(cycle, commId, id, num, item){
				
				let cart = this.shopCartList;
				let mediaList = this.resourceInfo.children || item.children;
				if(!cart[cycle] || !cart[cycle][commId]){//判断购物车是否已经存在该小区媒体
					
					let mediaItem = null;
					for (let i in mediaList){
						if(mediaList[i].mtypeId == id){
							mediaItem = mediaList[i];
							break;
						}
					}
					//不存在 新建数据
					let obj = {}
					obj[commId] = {
						cycle: this.resourceInfo.cycle || item.cycle,
						commId: this.resourceInfo.commId || item.commId,
						areaId: this.resourceInfo.area || item.area,
						cityId: this.resourceInfo.city || item.city,
						provinceId: this.resourceInfo.province || item.province,
						province: this.resourceInfo.provinceName || item.provinceName,
						city: this.resourceInfo.cityName || item.cityName,
						area: this.resourceInfo.areaName || item.areaName,
						name: this.resourceInfo.commName || item.commName,
						selTatol: 1,
						priceTatol: 0,
						mediaList: {},
					};
					
					obj[commId].mediaList[id] = {
						id: id,
						modelId: commId+''+id,
						commId: commId,
						selNum: item.num || 1,
						cycle: this.resourceInfo.cycle || item.cycle,
						maxNum: mediaItem.spaceNum,
						price: mediaItem.saleMoney,
						name: mediaItem.mtypeName
					}
					if(cart[cycle]){
						cart[cycle][commId] = obj[commId];
					}else{
						cart[cycle] = obj;
					}
					
				}else{
					if(this.shopCartList[cycle][commId].mediaList[id]){
						this.shopCartList[cycle][commId].mediaList[id].selNum = num;
					}else{
						let mediaItem = null;
						for (let i in mediaList){
							if(mediaList[i].mtypeId == id){
								mediaItem = mediaList[i]
								break;
							}
						}
						this.shopCartList[cycle][commId].mediaList[id] = {
							id: id,
							modelId: commId+''+id,
							commId: commId,
							selNum: num,
							cycle: this.resourceInfo.cycle,
							maxNum: mediaItem.spaceNum,
							price: mediaItem.saleMoney,
							name: mediaItem.mtypeName
						}
					}
				}

				this.shopCartList = cart;
				this.getTatol(cycle, commId);
				let result = []
				for(let i in cart){
					let temp = getShopCartData(cart[i], "cycle"); //拼装购物车数据
					result.push(temp[0]);
				}
				this.$emit("getShopCartData", result); //执行父组件方法，将数据发送到购物车组件
				this.shopCartData = result; //保存购物数据
			},

			//计算选中的总数
			getTatol(cycle,commId){
				let list = Object.assign({},this.shopCartList[cycle][commId].mediaList)
				let selTatol = 0
				let priceTatol = 0
				for(let i in list){
					selTatol += list[i].selNum
					priceTatol += (list[i].price * list[i].selNum)
				}
				this.shopCartList[cycle][commId].selTatol = selTatol;
				this.shopCartList[cycle][commId].priceTatol = priceTatol;
				this.$emit('selPloatToatl', commId, selTatol);
			},

			//面板的开关
			closePanel(val){
				var regPos = /^\d+$/;
				if(regPos.test(val)){
					this.selPloatIndex = val;
				}
				if(val){
					this.listIsopen = true
					this.detailIsopen = false
					this.dataIsopen = false
					this.$nextTick(()=>{
						this.$refs.audience.init();
					})
					return false;
				}else if(this.dataIsopen){
					this.dataIsopen = false;
					return false;
				}else if(this.detailIsopen){
					this.detailIsopen =  false;
					return false;
				}else if(this.listIsopen){
					this.listIsopen = false;
					return false;
				}else{
					this.listIsopen = true
				}
			},

			closeAllPanel(){
				this.dataIsopen = false;
				this.detailIsopen =  false;
				this.listIsopen = false;
			},

			//根据id获取小区信息
			getResourceInfo(id){
				var list = this.ploatList;
				for(let i in list){
					if(list[i].commId == id){
						this.resourceInfo = list[i];
						break;
					}
				}
			},

			//获取数据图信息
			openChartDiv(){
				//if(!this.dataIsopen){
					let point = {
						lat: this.resourceInfo.lat,
						lng: this.resourceInfo.lng
					}
					this.dataIsopen = true;

					//行业分析数据
					businessData(point).then(res => {
						this.inudstryData = res.data;
						this.$nextTick(()=>{
							this.$refs.chartInudstry.initChart();
						})
					});

					//人群分析数据
					aroundData({areaStr: this.resourceInfo.area}).then(res =>{
						this.sexData = res.data.sex;
						this.ageData = res.data.age;
						this.eduData = res.data.edu;
						this.$nextTick(()=>{
							this.$refs.chartSex.initChart();
							this.$refs.chartAge.initChart();
							this.$refs.chartEdu.initChart();
						})
					})

					//偏好数据
					aroundDataByArea({areaStr: this.resourceInfo.area}).then(res=>{
						this.preferList = res.data
					})
				//}
			},

			//从购物车拿数据
			getDataFromCart(){
				this.mediaListModel = {}
				let list = this.shopCartData;
				this.arrGetVal(list);
				this.$nextTick(() =>{
					for(let i in this.mediaListModel){
						if(!this.mediaListModel[i]){
							this.mediaListModel[i] = 0 //没有数据的置为0
						}
					}
				})
			},
			
			//解析购物车数据获取选中的个数
			arrGetVal(arr){
				arr.forEach((item, index)=>{
					if(item.children){
						this.arrGetVal(item.children)
					}else{
						this.mediaListModel[item.modelId] = item.selNum;
						var maplabel = document.getElementById('ploat'+ item.commId);
						var html = maplabel.getElementsByClassName("ol-commu-sel")[0];
						html.innerHTML = "已选:" + item.selNum;
						this.getTatol(item.cycle, item.commId);
					}
				})
			},

			//列表字段重定义
			tableFormatter(row, column, cellValue, index){
				return cellValue+"%";
			},
			
			//把记数model置0
			resetMediaListModel(){
				for(let i in this.mediaListModel){
					this.mediaListModel[i] = 0 //没有数据的置为0
				}
			},

			//清空购物车信息
			clearShopCart(){
				this.shopCartList = {};
				this.shopCartData = [];
				setArr.clear();
				this.resetMediaListModel();
			},

			//删除某个周期
			delCycle(index){
				delete this.shopCartList[this.shopCartData[index].id];
				this.shopCartData.splice(index, 1)
				this.resetMediaListModel();
			},

			//删除某个媒体
			delMedia(id){
				if(this.mediaListModel[id]){
					this.mediaListModel[id] = 0
				}
			}

		},
		created(){
			
		},
		mounted(){

		}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	#dataDiv{
		display: flex;
		justify-content: flex-start;
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		z-index: 999;
		.ploat-list{
			height: 100%;
			width: 380px;
			border-right: 1px solid #e3e3e3;
			background-color: #fff;
			box-sizing: border-box;
			.ploat-conent{
				height: 100%;
				box-sizing: border-box;
				overflow-y: auto;
				padding: 5px 20px;
			}
			.ploat-item{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				border-bottom: 1px dashed #ccc;
				padding: 15px 0;
				cursor: pointer;
				white-space: nowrap;
				.left{
					margin-right: 10px;
					height: 80px;
					width: 100px;
				}
				.right{
					flex: 1;
					font-size: 14px;
					align-self: flex-end;
				}
				.txt1{
					font-weight: bold;
				}
				.checked-box{
					.el-checkbox{
						font-size: 12px;
					}
					.el-checkbox__label{
						font-size: 12px;
						padding-left: 5px;
					}	
				}
				&:hover,
				&.active{
					.txt1{
						color: #E60012;
					}
				}
				.txt2{
					font-size: 12px;
					color: #999;
					margin-top: 10px;
				}
			}
			.el-tabs{
				height: 100%;
			}
			.el-tabs__header {
				height: 45px;
				line-height: 45px;
				margin: 0;
			}
			.el-tabs__nav {
				margin-left: 20px;
			}
			.el-tabs__item.is-active,
			.el-tabs__item:hover {
				color: #333;
			}
			.el-tabs__item {
				color: #989898;
			}
			.el-tabs__active-bar {
				width: 56px;
				height: 8px;
				background-position: 50% 0;
				background: url("/src/assets/images/help-dbl.png") no-repeat center;
				bottom: 2px;
			}
			.table-button {
				position: absolute;
				top: 18px;
				right: 30px;
			}
			// count
			.el-tabs__content {
				padding: 0;
				height: 94.5%;
    			box-sizing: border-box;
				.el-tab-pane{
					height: 100%;
				}
			}
			.img{
				height: 100%;
				width: 100%;
			}
		}
		.ploat-detail{
			position: relative;
			height: 100%;
			width: 380px;
			border-right: 1px solid #e3e3e3;
			background-color: #fff;
			.detail-con{
				height: 100%;
				overflow-y: auto;
				box-sizing: border-box;
				padding-bottom: 55px;
			}
			.img-list{
				border-bottom: 1px solid #e3e3e3;
				img{
					height: 100%;
					width: 100%;
				}
			}
			.media-con{
				padding: 0 20px;
				margin-top: 20px;
				.title{
					font-size: 14px;
					font-weight: bold;
					white-space: nowrap;
					margin-bottom: 15px;
					
				}
				.item-con{
					padding: 0;
					margin: 0 0 10px;
					font-size: 12px;
					border-bottom: 1px dashed #e3e3e3;
					li{
						display: inline-block;
						margin-right: 10px;
						margin-bottom: 10px;
					}
					.item, .cycle{
						margin: 5px 0 10px;
						white-space: nowrap;
					}
					.item{
						display: flex;
						justify-content: space-between;
						align-items: center;
					}
					.cycle:before{
						display: inline-block;
						content: "";
						width: 8px;
						height: 8px;
						border-radius: 50%;
						background-color: #E60012;
						margin-right: 5px;
					}
					.el-input-number{
						width: 100px;
					}
				}
				
				.cycle{
					margin: 0 0 20px;
					font-size: 14px;
					white-space: nowrap;
				}
				
			}
			
			.next-btn{
				position: absolute;
				bottom: 0;
				width: 100%;
				border-top: 1px solid #e3e3e3;
				text-align: center;
				padding: 10px 0;
				font-size: 14px;
				background-color: #f4f4f5;
				&:hover{
					background-color: #31ADEB;
					color: #fff;
				}
			}
			
			
			
		}

		.ploat-data{
			position: relative;
			height: 100%;
			width: 380px;
			border-right: 1px solid #e3e3e3;
			background-color: #fff;
			.data-con{
				height: 100%;
				padding: 0 20px;
				overflow-y: auto;
				box-sizing: border-box;
				padding-bottom: 55px;
			}
			.title{
				line-height: 40px;
				border-bottom: 1px dashed #ccc
			}
			
			.sub-title{
				border-left: 3px solid #E60012;
				padding-left: 10px;
				font-size: 14px;
				font-weight: bold;
				margin: 10px 0;
			}
			.business-data{
				padding-bottom: 10px;
				border-bottom: 1px dashed #ccc
			}
			.people-data{
				.el-table{
					border: 1px solid #e3e8e9;
        			border-radius: 6px;
				}
				.el-dialog{
					background: #edf1f5;
					box-shadow: 0px 3px 5px #888888;
					.el-dialog__header{
						background: #edf1f5;
						height: 0px;
						padding: 0px;
						position: relative;
					}
					.el-dialog__body{
						padding: 15px;
					}
					.el-dialog__headerbtn{
						position: absolute;
						width: 25px;
						height: 25px;
						text-align: center;
						line-height: 25px;
						background: #ffffff;
						right: -12.5px;
						top: -12.5px;
						border-radius: 13px;
						border: 1px solid #e3e8e9;
						box-shadow: 0px 3px 5px #888888;
					}
				}
			}
			.next-btn{
				position: absolute;
				bottom: 0;
				width: 100%;
				border-top: 1px solid #e3e3e3;
				text-align: center;
				padding: 10px 0;
				font-size: 14px;
				background-color: #f4f4f5;
				&:hover{
					background-color: #31ADEB;
					color: #fff;
				}
			}
		}
		.close-btn{
			position: absolute;
			top: 50%;
			right: -17px;
			width: 18px;
			height: 84px;
			margin-top: -42px;
			line-height: 84px;
			background-color: #fff;
			border: 1px solid #e3e3e3;
			border-left: none;
			cursor: pointer;
			&:hover{
				background-color: #E60012;
				color: #fff;
			}
		}
		.slide-fade-enter-active {
			width: 380px;
			transition: width .3s ease;
		}
		.slide-fade-leave-active {
			transition: width .3s ease;
		}
		.slide-fade-enter, 
		.slide-fade-leave-to{
			width: 0px;
		}

		.my-input-number{
			.el-input{
				width: 90px;
			}
			.el-input__inner{
				padding: 0;
				text-align: center;
			}
			.el-input-group__append,
			.el-input-group__prepend{
				padding: 0;
				cursor: pointer;
				i{
					padding: 0 8px;
				}
			}
			.el-input--mini .el-input__inner{
				height: 25px;
			}
		}
		.txt-red{
			color: #E60012;
		}
	}
	.prefer-dialog{
		width: 100%;
		top: 0;
		margin: 0 auto;
		bottom: 0;
		.el-dialog__title{
			font-weight: normal;
			font-size: 16px;
		}
		th{
			font-weight: normal
		}
		.el-dialog__header{
			padding: 15px 20px;
			background-color: #f9f9f9;
			border-bottom: 1px solid #e3e8e9;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
		}
		.el-dialog__body{
			text-align: center;
			padding: 0;
			max-height: 700px;
			overflow-y: auto;
			.btn-con{
				padding-top: 10px; 
			}
		}
		
	}
</style>