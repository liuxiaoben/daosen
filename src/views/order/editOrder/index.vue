<template>
    <div id="pushadvertising">
		<div class="header-filter">
			<el-form :inline="true" :model="fliterForm" class="header-form" label-width="60">
				<el-form-item size="small">
					<el-select v-model="strategyObj" value-key="id" clearable placeholder="请选择策略" style="width: 120px">
                        <el-option v-for="item in strategyList" :key="item.id" :label="item.name" :value="item"></el-option>
                    </el-select>
				</el-form-item>
				<el-form-item size="small">
					<el-select v-model="fliterForm.tenantId" placeholder="请选择服务公司" style="width: 150px" @change="serverComyChange">
                        <el-option v-for="item in serverComyList" :key="item.tenant_id" :label="item.name" :value="item.tenant_id"></el-option>
                    </el-select>
				</el-form-item>
				<el-form-item size="small">
					<el-cascader
						v-model="privinceCity"
						style="width: 150px" 
						:options="privinceList" 
						:props="cityProps"
						placeholder="城市选择"
						@active-item-change="handlePrivinceChange" 
						@change="privinceChange"></el-cascader>
				</el-form-item>
				<el-form-item size="small">
					<el-date-picker
						style="width: 250px"
						type="daterange"
						v-model="dataSE"
						range-separator="/"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						value-format="yyyy-MM-dd"
						:editable="false"
						@change="dateChange">
					</el-date-picker>
				</el-form-item>
				<el-form-item size="small">
					<el-cascader 
						v-model="business"
						style="width: 150px"
						:options="bussinessList" 
						:props="businessProps"
						placeholder="选择行业"
						@active-item-change="handleBusinessChange" 
						@change="businessChange"></el-cascader>
				</el-form-item>
				<el-form-item size="small" style="width: 120px">
                    <el-input v-model="fliterForm.brand" placeholder="请输入品牌"></el-input>
                </el-form-item>
                <el-form-item size="small" style="width: 120px">
                    <el-input placeholder="投放预算" v-model="fliterForm.input22"><i slot="suffix" style="margin-right: 5px">元</i></el-input>
                </el-form-item>
				<el-form-item size="small">
					<el-button type="danger" size="small" @click="searchProject()">搜索</el-button>
				</el-form-item>
				
				<!-- <el-form-item label="" size="small">
					<el-checkbox v-model="isSavedata">保留上一次查询数据</el-checkbox>
				</el-form-item> -->
				<el-form-item size="small" class="shopping-cart">
					<el-popover v-model="shopCartDialog" title="购物车信息" placement="bottom" width="400" trigger="click" popper-class="shop-cart-popover">
						<shop-cart 
						ref="shopCart"
						:shopCartData="shopCartData" 
						:strategyObj="strategyObj"
						:serverComyId="fliterForm.tenantId"
						:industryId="fliterForm.industry"
						:orderInfo="orderInfo"
						@closeShopCart="closeShopCart"
						@clearShopCart="clearShopCart"
						@delCycle="delCycle"
						@delMedia="delMedia"
						@shopCartChange="shopCartChange"></shop-cart>
						<el-button slot="reference"  type="primary" size="small">
						<img src="/src/assets/images/shopingcar.png" style="margin-bottom:-3px;"/> 购物车</el-button>
					</el-popover>
				</el-form-item>
			</el-form>
		</div>
		<!-- 地图部分 -->
		<div class="map-content">
			<el-row class="search-div">
				<el-col :span="24">
					<el-input v-model="searchMapVal" placeholder="输入地址或小区名" size="medium" clearable  @keyup.enter.native="searchAddres">
						<el-button type="danger" slot="append" icon="el-icon-search" @click="searchAddres"></el-button>
					</el-input>
				</el-col>
			</el-row>
			<div class="map-btn-bottom">
				<el-button icon="el-icon-rank" size="small" @click="bindRanging">测距</el-button>
				<el-button 
					icon="el-icon-delete" 
					size="small" 
					:type="isMouseDraw ? 'danger' : ''" 
					@click="bindMouseDraw">清除地图数据</el-button>
			</div>
			<div class="map-btn-right">
				<!-- <div class="mapbtn" >
					<img src="../../assets/images/launche.png"/><span>线上资源</span>
				</div> -->
				<!-- 位置弹窗 -->
				<el-popover v-model="selAddresDialog" title="位置信息" placement="left" width="300" trigger="click">
					<el-form :model="fliterForm">
						<el-form-item label="区域" size="small"  label-width="40px">
							<el-select v-model="areaMoedl" placeholder="区域" multiple no-data-text="请先在搜索栏选择城市" @change="areaChange"  style="width:100%">
								<el-option v-for="item in areaList" :key="item.id" :label="item.label" :value="item.id" ></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="商圈" size="small" label-width="40px">
							<el-select v-model="tradingMoedl" multiple placeholder="商圈" style="width:100%">
								<el-option-group
									v-for="group in tradingAreaList"
									:key="group.id"
									:label="group.label">
									<el-option
										v-for="item in group.options"
										:key="item.circleId"
										:label="item.circleName"
										:value="item.circleId">
									</el-option>
								</el-option-group>
								<!-- <el-option v-for="item in tradingAreaList" :key="item.circleId" :label="item.circleName" :value="item.circleId" ></el-option> -->
							</el-select>
						</el-form-item>
						<el-form-item label="地标" size="small" label-width="40px">
							<el-select v-model="landmarMoedl" multiple placeholder="地标" style="width:100%">
								<el-option-group
									v-for="group in landmarkList"
									:key="group.id"
									:label="group.label">
									<el-option
										v-for="item in group.options"
										:key="item.landId"
										:label="item.landName"
										:value="item.landId">
									</el-option>
								</el-option-group>
								<!-- <el-option v-for="item in landmarkList" :key="item.landId" :label="item.landName" :value="item.landId" ></el-option> -->
							</el-select>
						</el-form-item>
						<el-form-item size="small">
							<el-checkbox v-model="showThirdData" @change="isOpenDataSupport">数据支持</el-checkbox>
						</el-form-item>
						<el-form-item size="small">
							<el-row>
								<el-col :span="12">
									<el-select v-model="thirdBusiness" placeholder="行业" @change="thirdBusinessChange" :disabled="!showThirdData">
										<el-option v-for="item in thirdBusinessList" :key="item.tindustryId" :label="item.name" :value="item.tindustryId" ></el-option>
									</el-select>
								</el-col>
								<el-col :span="12" style="padding-left: 10px;">
									<el-select v-model="fliterForm.tindustryId" placeholder="类型" :disabled="!showThirdData">
										<el-option v-for="item in thirdBusinessTypeList" :key="item.tindustryId" :label="item.name" :value="item.tindustryId" ></el-option>
									</el-select>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item size="small">
							<el-input v-model="fliterForm.dataName" placeholder="请输入店名" :disabled="!showThirdData"></el-input>
						</el-form-item>
						<el-form-item size="small" style="margin-bottom: 0">
							<el-button type="danger" @click="queryThirdData();selAddresDialog = false">确定</el-button>
							<el-button type="info" @click="selAddresDialog = false">取消</el-button>
						</el-form-item>
					</el-form>
					<div class="mapbtn" slot="reference" :class="selAddresDialog ? 'active' : ''">
						<img src="/src/assets/images/Launchc.png"/><span>位置</span>
					</div>
				</el-popover>

				<!-- 媒体弹窗 -->
				<el-popover v-model="mediaTypeDialog" title="资源类型" placement="left" width="300" trigger="click" popper-class="meidia-type-sel">
					<div>
						<el-popover v-model="mediaTypeSelDialog" title="资源类型" placement="bottom" width="300" trigger="click" popper-class="meidia-type-sel">
							<el-tree
								ref="mediaTree"
								:props="mediaProps"
								:data="mediaTypeList"
								node-key="id"
								accordion
								show-checkbox
								@check="handleMediaCheckChange">
							</el-tree>
							<div slot="reference" class="add-media"><i class="el-icon-plus"></i> {{mediaTypeSelDialog ? "关闭" : "添加"}}</div>
						</el-popover>
						<div class="media-item-con">
							<div v-if="mediaTypeTag.length == 0">没有选择的媒体</div>
							<el-tag size="small" 
								type="info"
								closable 
								v-for="item in mediaTypeTag" 
								:key="item.id"
								@close="handleCloseMediaTag(item)"
								style="margin: 0 5px 5px 0">{{item.name}}</el-tag>
						</div>
						<div>
							<el-button type="danger" size="small" @click="mediaTypeDialog = false;mediaTypeSelDialog=false">确定</el-button>
							<el-button type="info" size="small" @click="mediaTypeDialog = false;mediaTypeSelDialog=false">取消</el-button>
						</div>
					</div>
					<div class="mapbtn" slot="reference" :class="mediaTypeDialog ? 'active' : ''">
						<img src="/src/assets/images/Launchcc.png"/><span>媒体</span>
					</div>
				</el-popover>
				
				<div class="mapbtn2" @click="bindOpenDots()">
					<img src="/src/assets/images/Launchd.png"/><span>{{isOpenDots ? '关闭' : '开启'}}选点</span>
				</div>
			</div>
			<data-div ref="dataDiv" :ploatList="allDataList" @getShopCartData="getShopCartData" @selPloatToatl="selPloatToatl"></data-div>
			<baidu-map ref="baiduMap" 
				@bindMouseDraw="bindMouseDraw" 
				@bindOpenDots="bindOpenDots" 
				@mapQuery="searchProject"
				@initCityInput="initCityInput"
				@clickMarkerOpenList="clickMarkerOpenList"
				:isSavedata="isSavedata"
				:shopNumData="shopNumData"></baidu-map>
		</div>
	</div>
</template>

<script>
	import {getPrivince, getCity, getDic, tradingArea, landmark, thirdBusiness, business, getMediaTypeList} from '@/api/putMap/comApi.js'
	import { filterQuery, thirdDataQuery, strategyList, myServerComy, orderData} from '@/api/putMap/pushadvertising.js'
	import {mergeKeyByPloat} from './component/dataDeal';
    import baiduMap from "@/components/baiduMap/baiduMap.vue"
	import dataDiv from "./component/dataDiv.vue"
	import shopCart from "./component/shopCart.vue"
    export default {
        components: {
			baiduMap,
			dataDiv,
			shopCart
        },
        data() {
            return {
				isSavedata: false, // 是否保存上次数据
				isOpenDots: false, //是否开启选点模式+
				isMouseDraw: false, //是否开启鼠标框选
				selAddresDialog: false, //位置信息弹窗
				mediaTypeDialog: false,
				mediaTypeSelDialog: false,
				shopCartDialog: false,
				showThirdData: false, //是否查询第三方数据
				searchMapVal: "", //地图内搜索位置的关键字
				nowDataList: [], //当前查询的数据
				allDataList:[],
				privinceCity:[], //初始化城市选择框的值
				oldPrivinceCity:[], //存放切换城市前的数据
				privinceList: [], //省市
				areaList: [], //区
				areaMoedl: [],
				cityList: {}, //用存放于切换城市时获取市的数据
				tradingAreaList: [], // 商圈
				tradingMoedl: [],
				landmarkList: [], //地标
				landmarMoedl: [],
				bussinessList: [], //行业一级
				
				bussinessTypeList: [], //行业二级
				thirdBusinessList: [], //第三方行业一级
				thirdBusinessTypeList: [], //第三方行业二级
				mediaTypeList: [], //媒体类型数据
				mediaTypeTag: [], //媒体标签数据
				shopCartCommyList: [], //购物车选中社区id集合
				strategyList: [], //策略公司
				serverComyList: [], //服务公司
				oldServerComy: null,
				shopCartData: [], //购物车数据
				business: [], //行业
				oldBussiness:[],
				thirdBusiness: "", //第三方行业
				dataSE: "", //开始结束时间选择数据
				strategyObj: {},
				cityProps: {
					value: 'id',
					label: "label"
				},
				businessProps: {
					value: 'industryId',
					label: "name"
				},
				mediaProps: {
					label: 'name',
					children: 'childs',
					isLeaf: 'leaf'
				},
				shopCartProps: {
					label: 'label',
					children: 'children'
				},
				fliterForm: {
					city: "",
					beginTime: "",
					endTime: "",
					areaStr: "",
					circleStr: "",
					landmarkStr: "",
					mtypeIdStr: "",
					industry: null,
					brand: "", //品牌
					tenantId: null, //服务公司
					centerLng:"",
					centerLat:"",
					distance:"",
					tindustryId:"",
					dataName: "",
					distance:"",
				},
				shopNumData:{},
				orderInfo: {},
            }
        },
		methods: {
			//获取订单信息显示
			getOrderInfo(){
				orderData({orderId: this.$route.query.orderId}).then(res=>{
					let list = res.data.mediumList;
					this.orderInfo = res.data.order;
					if(list){
						let ploatList  = mergeKeyByPloat(list);
						this.nowDataList = ploatList;
						this.$refs.baiduMap.nowDataList = ploatList;
						this.$refs.baiduMap.addPloatMarker(true, []);
						this.allDataList = this.$refs.baiduMap.allDataList;
						this.$refs.dataDiv.resetMediaListModel();
						this.openList(true);
						this.$nextTick(()=>{
							this.$refs.dataDiv.showShopDataByOrder();
						})
					}
				})
			},


			//点击搜索项目
			searchProject(sendData){
				this.fliterForm.areaStr =  this.areaMoedl.join(',');
				this.fliterForm.circleStr = this.tradingMoedl.join(',');
				this.fliterForm.landmarkStr = this.landmarMoedl.join(',');
				if(sendData){
					sendData = Object.assign({}, this.fliterForm, sendData)
					sendData.areaStr = "";
					this.queryThirdData(sendData)
				}else{
					sendData = Object.assign({}, this.fliterForm);
				}
				
				if(sendData.tenantId == "" || sendData.tenantId == null){
					this.$message.error("请选择服务公司！");
					return;
				}else if(sendData.city == "" || sendData.industry == null){
					this.$message.error("请选择城市！");
					return;
				}else if(sendData.beginTime == "" || sendData.industry == null){
					this.$message.error("请选择时间！");
					return;
				}else if(sendData.industry == "" || sendData.industry == null){
					this.$message.error("请选择行业！");
					return;
				}
				filterQuery(sendData).then(res => {
					let list = res.data.resultList;
					if(list){
						var shopMapItem = this.$refs.dataDiv.shopMapItem;
						var shopArr = [];
						if(shopMapItem){
							shopArr = Array.from(shopMapItem);
						}
						let ploatList  = mergeKeyByPloat(list);
						this.nowDataList = ploatList;
						this.$refs.baiduMap.nowDataList = ploatList;
						if(sendData.centerLng){//打点画圈时不清除数据
							this.$refs.baiduMap.addPloatMarker(false);
						}else{
							this.$refs.baiduMap.addPloatMarker(true, shopArr);
						}
						this.allDataList = this.$refs.baiduMap.allDataList;
						this.$refs.dataDiv.resetMediaListModel();
						this.openList(true);
					}else{
						this.$message.error("没有搜索到数据！");
					}
				})
			},

			//搜索第三方数据
			queryThirdData(sendData){
				let thirdDataForm = {}
				let showData = false;
				if(sendData){
					showData = sendData.showData
					thirdDataForm = {
						tindustryId: sendData.tindustryId,
						dataName: sendData.dataName,
						centerLng: sendData.centerLng,
						centerLat: sendData.centerLat,
						distance: sendData.distance
					}

				}else{
					this.fliterForm.areaStr =  this.areaMoedl.join(',');
					this.fliterForm.circleStr = this.tradingMoedl.join(',');
					this.fliterForm.landmarkStr = this.landmarMoedl.join(',');
					showData = this.showThirdData;
					thirdDataForm = {
						city:this.fliterForm.city,
						areaStr: this.fliterForm.areaStr,
						tindustryId: this.fliterForm.tindustryId,
						dataName: this.fliterForm.dataName,
					}
				}
				//查询第三方数据
				if(showData){
					thirdDataQuery(thirdDataForm).then(res => {
						var aroundList = res.data
						if(aroundList.length > 0){
							this.$refs.baiduMap.nowAroundDataList = aroundList;
							this.$refs.baiduMap.addAroundMarker("map-cy");
						}
					})
				}
			},

			//打开左侧列表面板
			openList(id){
				this.$refs.baiduMap.isShowNum = true; //显示小区个数选择
                this.$refs.baiduMap.drawCircleDialog = false; //关闭选点功能
				this.$refs.dataDiv.closePanel(id);
			},

			//点击地图的marker点时触发
			clickMarkerOpenList(id){
				this.$refs.baiduMap.drawCircleDialog = false;
				this.$refs.dataDiv.closePanel(id);
				/* let nowList = this.$refs.baiduMap.nowDataList;
				for(let i in nowList){
					if(id == nowList[i].commId){
						this.nowDataList = nowList
						return
					}
				}
				let allList = this.$refs.baiduMap.allDataList
				this.nowDataList = []
				for(let j in allList){
					if(id == allList[j].commId){
						this.nowDataList.push(allList[j]);
					}
				} */
			},
			
			//搜索地图位置
			searchAddres(){
				let queryVal = this.searchMapVal
				if(queryVal){
					this.$refs.baiduMap.searchAdd(queryVal)
				}
			},
			
			//开关选点模式
			bindOpenDots(val){
				if(val){
					this.isOpenDots = false;
					this.$refs.baiduMap.bindOpenDots(false)
				}else{
					this.isOpenDots = !this.isOpenDots;
					this.$refs.baiduMap.bindOpenDots(this.isOpenDots);
				}
			},
			
			//开关鼠标绘图模式
			bindMouseDraw(val){
				this.isMouseDraw = !this.isMouseDraw
				this.$refs.baiduMap.clearMapData(this.isMouseDraw)
			},

			//测距
			bindRanging(){
				this.$refs.baiduMap.bindRanging()
			},

			//获取策略公司
			getStrategy(){
				strategyList({token: this.$store.getters.token}).then(res =>{
					this.strategyList = res.data;
				})
			},

			//城市选择变化
			handlePrivinceChange(val){
				var length = val.length
				if(length == 1){
					this.updateCity(val);
				}else if(length == 2){
					//this.updateDic(val);
				}
			},

			//当用户切换城市提示用户将清除所有数据
			privinceChange(val){
				if(this.nowDataList.length > 0){
					this.$confirm('此操作将清空所有查询数据(包括购物), 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						center: true
					}).then(() => {
						this.oldPrivinceCity = val;
						if(val.length > 0){
							this.fliterForm.city = val[1];
							this.updateDic(val[1]);
						}
						this.fliterForm.areaStr = [];
						this.fliterForm.circleStr = [];
						this.fliterForm.landmarkStr = [];
						this.$refs.baiduMap.zoomMapByCity(this.cityList[val[1]].label);
						this.clearAllPageData();
					}).catch(() => {
						this.privinceCity = Object.assign([],this.oldPrivinceCity)
					});
				}else{
					this.oldPrivinceCity = val;
					if(val.length > 0){
						this.fliterForm.city = val[1];
						this.updateDic(val[1]);
					}
					this.fliterForm.areaStr = [];
					this.fliterForm.circleStr = [];
					this.fliterForm.landmarkStr = [];
					this.$refs.baiduMap.zoomMapByCity(this.cityList[val[1]].label);
					
				}	
				
			},


			//初始化城市选中 从地图组件触发
			initCityInput(val){
				this.updateCity(val);
				this.updateDic(val[1]);
				this.fliterForm.city = val[1];
				this.privinceCity = val;
				this.oldPrivinceCity = val;
			},

			
			//获取市
			updateCity(val) {
				var privinceId =  val[0]
				var index = this.arrIndex(val) //获取当地省的id所在的数组下标
				const sendData = {
					privinceId: privinceId,
					token: this.$store.getters.token
				}
				//根据省id获取市数据
				getCity(sendData).then(response => {
					var data = response.data
					data.forEach((item, index)=>{
						this.cityList[item.id] = item;
					})
					this.privinceList[index[0]].children = data //将市数据放到当前下标下
				})
			},
			
			//获取区
			updateDic(id) {
				const sendData = {
					cityId: id,
					token: this.$store.getters.token
				}
				//根据市id获取区数据
				getDic(sendData).then(response => {
					this.areaList = response.data
				})
			},
			
			//城市数组匹配找到下标
			arrIndex(val){
				var data = this.privinceList
				var temp = []
				for(let i in data){
					if(data[i].id == val[0]){
						temp.push(i)
						for(let j in data[i].children){
							if(data[i].children[j].id == val[1]){
								temp.push(j)
							}
						}
					}
				}
				return temp
			},

			//当选择区域后触发，获取商圈和地标
			areaChange(val){
				let index = val.length - 1
				this.tradingMoedl = [];
				this.landmarMoedl = [];
				this.gettradingArea(val[index], val);
				this.getLandMark(val[index], val);
			},
			
			
			//商圈
			gettradingArea(areaId, arrVal){
				const sendData = {
					areaId: areaId
				}
				let temp = [];
				arrVal.forEach(item => {
					let newArr = this.tradingAreaList.filter(d => {
						if(d.id == item){
							return d.id == item
						}
					})
					if(newArr.length > 0){
						temp.push(...newArr)
					}
				})
				if(this.tradingAreaList.length > temp.length){
					this.tradingAreaList = temp;
					return
				}else{
					this.tradingAreaList = temp;
				}
				tradingArea(sendData).then(response => {
					let obj = {}
					let item = this.areaList.find(d => d.id == areaId)
					obj.id = areaId
					obj.label = item.label
					obj.options = response.data;
					this.tradingAreaList.push(obj)
				})
			},
			
			//地标
			getLandMark(areaId, arrVal){
				const sendData = {
					areaId: areaId
				}
				let temp = [];
				arrVal.forEach(item => {
					let newArr = this.landmarkList.filter(d => {
						if(d.id == item){
							return d.id == item
						}
					})
					if(newArr.length > 0){
						temp.push(...newArr)
					}
				})
				if(this.landmarkList.length > temp.length){
					this.landmarkList = temp;
					return
				}else{
					this.landmarkList = temp;
				}
				landmark(sendData).then(response => {
					let obj = {}
					let item = this.areaList.find(d=> d.id == areaId)
					obj.id = areaId
					obj.label = item.label
					obj.options = response.data;
					this.landmarkList.push(obj)
				})
			},
			
			//第三方行业
			getThirdBusiness(){
				thirdBusiness({pId:0}).then(response => {
					this.thirdBusinessList = response.data
				})
			},

			//选中一级第三方行业变化
			thirdBusinessChange(val){
				this.fliterForm.tindustryId = '',
				this.getSubThirdBusiness(val)
			},

			//第三方子行业
			getSubThirdBusiness(pid){
				thirdBusiness({pId:pid}).then(response => {
					this.thirdBusinessTypeList = response.data
				})
			},

			//获取行业
			getBusiness(pid, level, val){
				business({pid:pid}).then(res =>{
					var data = res.data
					if(level == 1){
						for(let i in data){
							data[i].children = []
						}
						this.bussinessList = data
					}else{
						this.bussinessList[val[0]-1].children = data
					}
				})
			},
			//行业选择变化
			handleBusinessChange(val){
				var length = val.length
				if(length == 1){
					this.getBusiness(val[0], 2, val)
				}
			},
			//行选择后触发
			businessChange(val){
				if(this.nowDataList.length > 0 ){
					this.$confirm('此操作将清空所有查询数据(包括购物), 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						center: true
					}).then(() => {
						this.clearAllPageData();
						this.oldBussiness = val;
						this.fliterForm.industry = val[1];
					}).catch(() => {
						this.business = this.oldBussiness;
					});
				}else{
					this.oldBussiness = val;
					this.fliterForm.industry = val[1];	
				}
				
			},
			
			
			//是否开启数据支持
			isOpenDataSupport(val){
				if(this.thirdBusinessList.length <= 0){
					this.getThirdBusiness();
				}
			},

			//获取媒体类型
			getMediaType() {
				getMediaTypeList().then(res=>{
                    this.mediaTypeList = res.data.listTree
                })
			},
			//当点击复选框时触发
			handleMediaCheckChange(data) {
				this.getCheckedKeys();
			},
			//获取勾选媒体的数据
			getCheckedKeys(){
				var list = this.$refs.mediaTree.getCheckedNodes(true);
				var temp = [];
				var tempId = [];
				for(let i in list){
					if(list[i].leaf){
						temp.push(list[i]);
						tempId.push(list[i].id);
					}
				}
				this.fliterForm.mtypeIdStr = tempId.join(",")
				this.mediaTypeTag = temp
			},

			//点击媒体标签X时删除标签
			handleCloseMediaTag(tag){
				this.$refs.mediaTree.setChecked(tag.id, false); // 将标签对应的树节点变为不勾选状态
				this.getCheckedKeys();
			},

			//开始结束时间选择后触发
			dateChange(val){
				if(val){
					this.fliterForm.beginTime = val[0];
					this.fliterForm.endTime = val[1];
				}
			},

			//获取购物车数据 从dataDiv组件触发
			getShopCartData(list){
				this.shopCartData = list;
				this.$nextTick(()=>{
					this.$refs.shopCart.selAll(); //默认全部选中
					this.shopNumData = this.$refs.shopCart.shopNumData;
				})
			},
			
			//关闭购物车面板
			closeShopCart(){
				this.shopCartDialog = false;
			},
			
			//当服务公司选择改变时触发
			serverComyChange(val){
				if(this.nowDataList.length > 0){
					this.$confirm('此操作将清空所有查询数据(包括购物), 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						center: true
					}).then(() => {
						this.clearAllPageData();
						this.oldServerComy = val;
					}).catch(() => {
						if(val){
							this.fliterForm.tenantId = this.oldServerComy;
						}
					});
				}else{
					if(val){
						this.oldServerComy = val;
					}	
					
				}
			},

			//购物数量改变时同时改变详细面板选中的媒体数量  从shopCart组件触发
			shopCartChange(){
				this.$refs.dataDiv.getDataFromCart(); 
				this.shopNumData = this.$refs.shopCart.shopNumData;
			},

			//清空购物车
			clearShopCart(){
				this.shopCartData = [];
				this.$refs.dataDiv.clearShopCart();
			},

			//删除某个周期
			delCycle(index){
				this.$refs.dataDiv.delCycle(index);
			},

			//删除某个媒体
			delMedia(id){
				this.$refs.dataDiv.delMedia(id);
			},

			//清空页面所有数据
			clearAllPageData(){
				this.$refs.baiduMap.clearAllMarker("map");
				this.$refs.dataDiv.closeAllPanel();
				this.clearShopCart();
				this.nowDataList = [];
				this.allDataList = [];
				this.$message.success('清除成功!');
			},

			selPloatToatl(commid, selTatol){
				this.nowDataList.forEach((item) =>{
					if(item.commId == commid){
						item.selTatolNum = selTatol
					}
				})
			}
			
		},
		watch: {
			
		},
		created(){
			this.getOrderInfo();
			//获取省份
			getPrivince(this.$store.getters.token).then(response => {
				var data = response.data
				for(let i in data){
					data[i].children = []
				}
				this.privinceList = data
			})

			//获取我的服务公司
			myServerComy(1,100).then(res=>{
				this.serverComyList = res.data.list
			})
			//获取行业
			this.getBusiness(0,1);

			//获取策略
			this.getStrategy();
		},
		mounted(){
			this.getMediaType();
		}
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    @import './index.scss'
</style>
