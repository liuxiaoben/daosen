<template>
    <div id="baiduMapCon">
		<!--画圈弹窗-->
        <el-dialog class="circle-dialog" top="0" :visible.sync="drawCircleDialog" :modal="false" :close-on-click-modal="false" :style="circleStyle">
            <div class="top-addres">
                <i class="el-icon-location"></i>
                <span style="font-weight: bold;color: #000;">{{addresComp.street+addresComp.streetNumber || addresComp.district}}</span>
                <i class="el-icon-delete" @click="deleteSelMarker"></i>
            </div>
            <div style="color: #999; font-size: 12px;">{{addresComp.city+addresComp.district+addresComp.street+addresComp.streetNumber}}</div>
            <el-form :model="dialogForm">
                <el-form-item size="small">
                    <el-slider v-model="circleRaduis" :step="0.1" :min="1" :max="5" @change="drawCircle" :format-tooltip="formatTooltip"></el-slider>
                </el-form-item>
                <el-form-item size="small">
                    <el-checkbox v-model="dialogForm.showData" @change="isOpenDataSupport">数据支持</el-checkbox>
                </el-form-item>
                <el-form-item size="small">
                    <el-row>
                        <el-col :span="12">
                            <el-select v-model="dialogForm.thirdBusiness" placeholder="行业" @change="thirdBusinessChange" :disabled="!dialogForm.showData">
                                <el-option v-for="item in thirdBusinessList" :key="item.tindustryId" :label="item.name" :value="item.tindustryId" ></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="12" style="padding-left: 10px;">
                            <el-select v-model="dialogForm.tindustryId" placeholder="类型" :disabled="!dialogForm.showData">
                                <el-option v-for="item in thirdBusinessTypeList" :key="item.tindustryId" :label="item.name" :value="item.tindustryId" ></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item size="small">
                    <el-input v-model="dialogForm.dataName" placeholder="请输入店名" :disabled="!dialogForm.showData"></el-input>
                </el-form-item>
                <el-form-item size="small" style="margin-bottom: 0">
                    <el-button type="danger" @click="mapQuery">确定</el-button>
                    <el-button type="info" @click="drawCircleDialog = false;cancel()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
		
		<!--清除数据弹窗-->
		<el-dialog class="mouse-dialog" :visible.sync="mosueDrawDialog" :close-on-click-modal="false">
			<el-form :model="clearForm">
				<el-form-item size="small">
					<el-checkbox v-model="clearForm.ploat">社区</el-checkbox>
					<el-checkbox v-model="clearForm.around">周边数据</el-checkbox>
				</el-form-item>
				<el-form-item size="small">
					<el-button type="danger" @click="clearOk">确定</el-button>
					<el-button type="info" @click="$emit('bindMouseDraw')">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

        <div class="show-ploat-num" v-show="isShowNum">
            <div class="title">
                <label class="label"></label>显示小区数
            </div>
            <el-select v-model="showNum" placeholder="请选择" @change="showPloatNum">
                <el-option  style="text-align: center"
                    v-for="item in showNumList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div id="baiduMap" style="width:100%; height:100%;"></div>
    </div>
</template>
<script>
    import { thirdBusiness, userEnterpriseInfo } from '@/api/putMap/comApi.js'
    import {mapClass, mapLabel, dotMarker, typeMarker, drawingManager, querySameKey, uniqueData, queryDifKey, scaleMarker } from './mapConfig.js';
    let map = null;
    let selMarker = null; // 当前选中的marker
    let selCircle = null; // 当前选中的circle
	let mouseDraw = null; // 清除点鼠标操作
    let geoc = new BMap.Geocoder(); //地址解析
    let isdel = true; // 是否可以删除
    let isCil = false; // 上次点击的点是新打点还是点击已经打的点
    let isSelf = true; //是否点击的是自己
    let citymarker = null;
    export default {
        props: {
            isSavedata: {
	        	type: Boolean,
	            default: false
            },
            shopNumData:{
                type: Object,
                default: {}
            }
        },
        data() {
            return {
				mosueDrawDialog: false,
                drawCircleDialog: false,
                isShowNum: false,
                userInfo:{},
                allDataList: [], // 所有小区数据集合
                allAroundDataList: [], // 所有周边数据集合
                allPloatMarker: [], //  所有小区marker
                allAroundMarker: [], //  所有周边marker
                scaleMarkerList: [], // 所有缩放marker

                nowDataList: [], // 当前查询的数据
                nowAroundDataList: [], //当前查询的周边数据

                circleList: [], //圈数据
				thirdBusinessList: [], //行业一级
                thirdBusinessTypeList: [], //行业二级
                clearOverlay: null, //鼠标画框生成的覆盖物
                showNum: "all", //显示个数
                circleRaduis: 1,
                circleStyle:{
                    left: 'auto',
                    top: '35%',
                },
                showNumList: [ {'label':'20个', 'value': 20}, {'label':'40个', 'value': 40},{'label':'60个', 'value': 60},{'label':'全部', 'value': "all"}],
                dialogForm: {
                    centerLat : "",
                    centerLng: "",
                    distance: 1,
                    showData: false,
					thirdBusiness: "",
                    tindustryId: "",
                    dataName: ""
                },
				addresComp: {}, //地址解析数据
				clearForm:{
					ploat: false,
					around: false
				},
                nowPoint: null,
            };
        },
        computed: {
            
        },
        methods: {
            //画圈弹窗确定方法
            mapQuery(){
                var sendData = {}
                isdel = false;
                selCircle = null;
                selMarker = null;
                this.dialogForm.distance = this.circleRaduis * 1000;
                if(!this.dialogForm.showData){
                    sendData = {
                        centerLat: this.dialogForm.centerLat,
                        centerLng : this.dialogForm.centerLng,
                        distance: this.dialogForm.distance,
                    }
                }else{
                    sendData = this.dialogForm
                }
                this.$emit('mapQuery', sendData);
            },

            initMap(city) {
                var that = this;
                var mapx = 114.3162001;
                var mapy = 30.58108413;
                var scale = 13;
                var point = new BMap.Point(mapx, mapy); //定义一个中心点坐标
                map = new BMap.Map('baiduMap');

                map.enableDragging(); // 启用地图拖拽事件，默认启用(可不写)
                map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
                map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
                map.enableKeyboard(); //启用键盘上下左右键移动地图
                map.centerAndZoom(city, scale);

                var myGeo = new BMap.Geocoder();
                // 将地址解析结果显示在地图上,并调整地图视野
                myGeo.getPoint(city, function(point){
                    if (point) {
                        map.centerAndZoom(point, scale);
                        //that.testData()
                    }else{
                        alert("您选择地址没有解析到结果!");
                    }
                }, city);
                //map.setCurrentCity(city);

                //地图拖拽事件
                map.addEventListener("dragend", function(e) {
                    if (selMarker) {
                        that.drawCircleDialog = false;
                    }
                })
                
                //地图缩放事件
                map.addEventListener("zoomend", function(e){
                    that.drawCircleDialog = false
                    var scale = map.getZoom();
                    if(that.allDataList.length > 0){
                        if(scale <= 12 && scale > 10){// 显示区
                            that.isShowNum = false
                            that.clearAllMarker();
                            var list = querySameKey(that.allDataList);
                            for (let i in list) {
                                that.scaleMarker(list[i], i)
                            }
                        }else if(scale <= 10 && scale > 5){ // 显示市
                            that.clearAllMarker();
                            that.isShowNum = false
                            var list = querySameKey(that.allDataList, "city");
                            for (let i in list) {
                                that.scaleMarker(list[i], i)
                            }
                        }else if(scale == 14 && (that.scaleMarkerList).length > 0){
                            that.isShowNum = true
                            that.clearAllMarker();
                            that.resetMarker();
                        }
                    }
                })
                mouseDraw = drawingManager(map); //初始化鼠标绘制工具
                
            },

            //根据城市定位地图
            zoomMapByCity(city){
                map.centerAndZoom(city);
            },


/* ------------ 打点画圈功能 -------------------- */
            //是否开启打点模式
            bindOpenDots(isopen) {
                if (isopen) {
                    map.addEventListener("click", this.setMark);
                    this.$message.success('选点模式已开启!');
                } else {
                    map.removeEventListener("click", this.setMark);
                    this.$message.success('选点模式已关闭！');
                }
            },

            //地图打点
            setMark(e) {
                var that = this;
                if(selMarker != null){
                    if(isSelf){
                        map.removeOverlay(selMarker);
                    }
                }
                if(selCircle != null){
                    if(isSelf){
                        map.removeOverlay(selCircle);
                    }                 
                }
                isSelf = true;
                isCil = false; 
                isdel = true;
                
                //初始化值
                var npoint = e.point;
                var pixel = map.pointToPixel(map.getCenter());
                var nowMarker = dotMarker(npoint);
                that.circleRaduis = 1;
                that.drawCircleDialog = true
                that.nowPoint = npoint;
                that.dialogForm.centerLat = npoint.lat;
                that.dialogForm.centerLng = npoint.lng;
                that.circleStyle.left = pixel.x + 'px';
                that.circleStyle.top = pixel.y + 'px';

                map.addOverlay(nowMarker);
                map.panTo(npoint);
				
                //画圈
                that.drawCircle(this.circleRaduis);
                that.pointToAddres(npoint)
                selMarker = nowMarker;
                nowMarker.addEventListener("click", function(e) {
                    e.domEvent.stopPropagation();
                    that.drawCircleDialog = true;
                    if(!isCil ){   
                        if(selMarker == nowMarker){
                            that.drawCircleDialog = false;
                        }                   
                        map.removeOverlay(selMarker);
                        map.removeOverlay(selCircle);
                        selMarker = null;
                        selCircle = null;                      
                    }
                    
                    selMarker = nowMarker;
                    that.nowPoint = npoint;
                    that.pointToAddres(npoint);
                    map.panTo(npoint);
                    var pixel = map.pointToPixel(map.getCenter());
                    that.circleStyle.left = pixel.x + 'px';
                    that.circleStyle.top = pixel.y + 'px';
                    that.dialogForm.lat = npoint.lat;
                    that.dialogForm.lng = npoint.lng;
                    selCircle = null;
                    var circleList = that.circleList;
                    for(var i in circleList){
                        var po = circleList[i].point;
                         if(po == npoint){
                            selCircle = circleList[i];
                            var radius = circleList[i].getRadius();
                            that.circleRaduis = radius/1000;
                            break;
                        }
                    } 
                    isSelf = false;
                    isdel = true;
                    isCil = true;
                })
            },

            //画圈弹窗取消
            cancel(){
                if(isCil){
                    this.drawCircleDialog = false;   
                }else{
                    if(isdel){
                        map.removeOverlay(selMarker);
                        map.removeOverlay(selCircle);    
                    }
                }
            },

            //删除打点
            deleteSelMarker(){
                map.removeOverlay(selMarker);
                map.removeOverlay(selCircle);   
                selMarker = null;
                selCircle = null;
                this.drawCircleDialog = false;  
            },

            //地图画圈
            drawCircle(val) {
                var circleList = this.circleList;
                for(var index in circleList){
                    var point = circleList[index].point;
                    if(point == this.nowPoint){
                        map.removeOverlay(circleList[index]);
                        this.circleList.splice(index,1);
                        break;
                    }
                }
               
                let circleRaduis = val * 1000;
                var circle = new BMap.Circle(this.nowPoint, circleRaduis, {
                    strokeColor: "#E70012",
                    strokeWeight: 2,
                    strokeOpacity: 0.5,
                    fillColor: 'rgba(231,0,18, 0.2)'
                });
                map.addOverlay(circle);
                this.circleList.push(circle);
                selCircle = circle;
            },
			
			//坐标转地址
			pointToAddres(point){
				var that = this;
				geoc.getLocation(point, function(rs){
					that.addresComp = rs.addressComponents;
				});        
            },
            

/* ------------ 添加Marker功能 -------------------- */
            //添加周边marker
            addAroundMarker(type) {
                var list = queryDifKey(this.nowAroundDataList, this.allAroundDataList)
                this.allAroundDataList = this.allAroundDataList.concat(list);
                for (let i in list) {
                    this.aroundMarker(list[i], "map-cy")
                }
            },
			
            //添加社区marker
			addPloatMarker(isClear, arr) {
                if(isClear){
                    this.clearAllMarker("map");
                    if(arr.length > 0){
                        this.allDataList = arr;
                        this.addPloatMarkerByShop(arr)
                    }
                }
                
                var  list = queryDifKey(this.nowDataList, this.allDataList, "ploat");
                this.allDataList = this.allDataList.concat(list);
                for (let i in list) {
                    this.ploatMarker(list[i], true)
                }
            },

            addPloatMarkerByShop(arr) {
                for (let i in arr) {
                    this.ploatMarker(arr[i], true, true)
                }
            },


            //社区marker
            ploatMarker(item, isLabel, isShop = false){
                var point = new BMap.Point(item.lng, item.lat);
                var markers = typeMarker({
                    map,
                    point,
                    type: "ploat",
                    id: item.commId,
                    elid: 'ploat' + item.commId,
                    name: item.commName,
                    nullNum: item.tatolSpaceNum,
                    selNum: item.selTatolNum,
                    isLabel: isLabel,
                    isShop: isShop,
                    clickFun: this.openList
                });
                var obj = {
                    id: item.commId,
                    isLabel: isLabel,
                    marker: markers
                }
                this.allPloatMarker.push(obj);
                map.addOverlay(markers);
            },
            
            //周边marker
            aroundMarker(item, type){
                var point = new BMap.Point(item.maplng, item.maplat);
                var markers = typeMarker({
                    map,
                    point,
                    isAround: true,
                    type: type,
                    id: item.id,
                    elid: 'thid' + item.id,
                    name: item.name,
                    isLabel: false,
                });
                var obj = {
                    id: item.id,
                    marker: markers
                }
                this.allAroundMarker.push(obj)
                map.addOverlay(markers);
            },

             //缩放marker
            scaleMarker(item, id){
                var point = new BMap.Point(item.lng, item.lat);
                var citymarker = scaleMarker({
                    map,
                    name: item.name,
                    num: item.children.length,
                    selNum: item.selNum,
                    point,
                    id: 'scale' + id
                })
                this.scaleMarkerList.push(citymarker)
                map.addOverlay(citymarker);
            },

            //放大缩小后重新打点
            resetMarker(){
                let list = this.allDataList
                let allPloatMarker = Object.assign([], this.allPloatMarker);
                this.allPloatMarker = [];
                for (let i in list) {
                    if(list[i].selTatolNum != 0){
                        this.ploatMarker(list[i], true, true);
                    }else{
                        this.ploatMarker(list[i], true);
                    }
                   
                }
                map.setCenter(new BMap.Point(list[0].lng, list[0].lat))
                
                let list2 = this.allAroundDataList
                this.allAroundMarker = [];
                for (let i in list2) {
                    this.aroundMarker(list2[i], true);
                }
            },
            
/* ------------ 删除marker功能 -------------------- */
            //开关鼠标框选模式
            clearMapData(isopen) {
				if (isopen) {
                    var that = this;
                    this.$emit("bindOpenDots", true)
					mouseDraw.open();
					mouseDraw.setDrawingMode(BMAP_DRAWING_RECTANGLE);
					mouseDraw.addEventListener('overlaycomplete', function(e){
                        that.clearOverlay = e.overlay;
                        that.mosueDrawDialog = true;
                        return false;
					});
				}else{
					mouseDraw.close();
					mouseDraw.removeEventListener('overlaycomplete');
					this.mosueDrawDialog = false;
					map.removeOverlay(this.clearOverlay)
				}
            },
			
			//框选弹窗确定
			clearOk(){
                var allPloat = Object.assign([],this.allPloatMarker);
                var allAround = Object.assign([],this.allAroundMarker);
                if(this.clearForm.around && this.clearForm.ploat){//清除周边和小区数据
                    this.clearMarkers(allPloat, 'ploat');  
                    this.clearMarkers(allAround);   
				}else if(this.clearForm.around){ //清除周边数据
                    this.clearMarkers(allAround);            
				}else if(this.clearForm.ploat){ //清除小区数据
                    this.clearMarkers(allPloat, 'ploat');  
                }
                this.$emit('bindMouseDraw');
				this.mosueDrawDialog = false;
			},
            
            
            //框选后清除操作
            clearMarkers(markers, type){
                var bounds = this.clearOverlay.getBounds();
                for(let i in markers){
                    if(markers[i].marker.point){
                        var point = markers[i].marker.getPosition();   
                        if(bounds.containsPoint(point)) {
                            map.removeOverlay(markers[i].marker);
                            if(type == 'ploat'){
                                this.allPloatMarker.splice(i, 1);
                                this.clearPloatList(markers[i].id)
                            }else{
                                this.allAroundMarker.splice(i, 1);
                                this.clearAroundList(markers[i].id);
                            }
                        }
                    }
                }
            },

            //把选中的点的小区数据清掉
            clearPloatList(id){
                var list  = Object.assign([],this.allDataList);
                for(let i in list){
                    if(list[i].commId == id){
                        this.allDataList.splice(i,1);
                        break;
                    }
                }
                var list2 = Object.assign([],this.nowDataList);
                for(let i in list2){
                    if(list2[i].commId == id){
                        this.nowDataList.splice(i,1);
                    }
                }
            },

            //把选中的点的周边本地数据清掉
            clearAroundList(id){
                var list = Object.assign([],this.allAroundDataList);
                for(let i in list){
                    if(list[i].id == id){
                        this.allAroundDataList.splice(i,1);
                    }
                }
                var list2 = Object.assign([],this.nowAroundDataList);
                for(let i in list2){
                    if(list2[i].id == id){
                        this.nowAroundDataList.splice(i,1);
                    }
                }
            },


            //清除所有社区点
            clearPloatMarker(){
                var list = Object.assign([],this.allPloatMarker);
                this.allPloatMarker = [];
                for(let i in list){
                    map.removeOverlay(list[i].marker);
                }
            },

            //根据id删除marker
            clearPloatMarkerById(setArr){
                this.allPloatMarker.forEach((item)=>{
                    if(!setArr.has(item.id)){
                        map.removeOverlay(item.marker);
                    }
                })
            },

            //清除所有周边点
            clearAroundMarker(){
                var list = Object.assign([],this.allAroundMarker);
                this.allAroundMarker = [];
                for(let i in list){
                    map.removeOverlay(list[i].marker);
                }
            },

            //清除缩放生成的点
            clearScaleMarker(){
                var list = Object.assign([],this.scaleMarkerList);
                this.scaleMarkerList = [];
                for(let i in list){
                    map.removeOverlay(list[i]);
                }
            },

            //清除所有覆盖物
            clearAllMarker(type){
                if(type == "map"){
                    this.clearAllData();
                    map.clearOverlays();
                }else{
                    this.clearAroundMarker();
                    this.clearPloatMarker();
                    this.clearScaleMarker();
                }
            },

            //清空所有数据
            clearAllData(){
                this.allDataList = [];
                this.allAroundDataList = [];
                this.allPloatMarker = [];
                this.allAroundMarker = [];
                this.scaleMarkerList = [];
            },


/* ------------ 其他功能 -------------------- */
            //地图地址搜索
            searchAdd(query) {
                var options = {
                    renderOptions: {
                        map: map,
                        autoViewport: true,
                        selectFirstResult: false
                    }
                };
                var local = new BMap.LocalSearch(map, options);
                local.search(query);
            },

            //测距
            bindRanging(isopen) {
                var disTool = new BMapLib.DistanceTool(map);
                disTool.open();
            },

			//行业
			getThirdBusiness(){
				thirdBusiness({pId:0}).then(response => {
					this.thirdBusinessList = response.data
				})
			},
			//选中一级行业变化
			thirdBusinessChange(val){
				this.dialogForm.tindustryId = ''
				this.getSubThirdBusiness(val)
			},
			//子行业
			getSubThirdBusiness(pid){
				thirdBusiness({pId:pid}).then(response => {
					this.thirdBusinessTypeList = response.data
				})
			},
			
			//是否开启数据支持
			isOpenDataSupport(val){
				if(this.thirdBusinessList.length <=0){
					this.getThirdBusiness();
				}
            },

            //修改滑动条样式
            formatTooltip(val) {
                return val + "KM";
            },

            //显示个数
            showPloatNum(val){
                let allList = this.allDataList;
                let nowList = this.nowDataList;
                let allLength = allList.length;
                let nowLength = nowList.length;
                
                if(allLength >= this.showNumList[0].value){
                    this.clearPloatMarker();
                    if(val < nowLength){
                        for(let i in nowList){
                            this.ploatMarker(nowList[i], true);
                        }
                        let list = queryDifKey(allList, nowList, "ploat");
                        
                        for(let j in list){
                            this.ploatMarker(list[j], false);
                        }
                    }else if(val >= nowLength && val <= allLength){
                        for(let i in nowList){
                            this.ploatMarker(nowList[i], true);
                        }
                        let list = queryDifKey(allList, nowList, "ploat");
                        for(let j in list){
                            if(parseInt(j) < val-nowLength){
                                this.ploatMarker(list[j], true);
                            }else{
                                this.ploatMarker(list[j], false);
                            }
                        }
                    }else if(val > allLength || val == "all"){
                        for(let i in allList){
                            this.ploatMarker(allList[i], true);
                        }
                    }
                }
            },

            //打开左侧列表信息
            openList(id){
                this.$emit("clickMarkerOpenList", id);
            },

            testData(){
                var bounds = map.getBounds();
                var sw = bounds.getSouthWest();
                var ne = bounds.getNorthEast();
                var lngSpan = Math.abs(sw.lng - ne.lng);
                var latSpan = Math.abs(ne.lat - sw.lat);
                for (var i = 0; i < 25; i ++) {
                    var point = new BMap.Point(sw.lng + lngSpan * (Math.random() * 0.7), ne.lat - latSpan * (Math.random() * 0.7));
                    var markers = typeMarker({
                        map,
                        point,
                        type: "ploat",
                        id: i,
                        elid: 'ploat' + i,
                        nullNum: 100+i,
                        selNum: 50+i,
                        name: "测试数据测试数据测试数据测试数据",
                        isLabel: true,
                        ///clickFun: this.openList
                    });
                    var obj = {
                        id: i,
                        isLabel: true,
                        marker: markers
                    }
                    this.allPloatMarker.push(obj);
                    map.addOverlay(markers);
                }
            }
        },
        mounted() {
            userEnterpriseInfo({eid: this.$store.getters.eid}).then(res =>{
                this.userInfo = res.data.authentication;
                this.initMap(this.userInfo.cityName);
                this.$emit('initCityInput', [this.userInfo.provinceId, this.userInfo.cityId])
            })
            
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    #baiduMapCon {
        position: relative;
        height: 100%;
        width: 100%;
        .search-map {
            position: absolute;
            top: 5px;
            left: 5px;
            z-index: 99;
        }
        .circle-dialog {
            position: absolute;
            width: 300px;
            right: 0;
            left: auto;
            top: 35%;
            bottom: auto;
            z-index: 998 !important;
            .el-dialog__body {
                padding-top: 10px;
            }
            .el-dialog {
                width: auto;
            }
            .top-addres {
                .el-icon-location {
                    color: #E50110;
                }
                .el-icon-delete {
                    margin-left: 20px;
                    cursor: pointer;
                }
            }
        }
		.mouse-dialog{
			width: 400px;
			top: 30%;
			margin: 0 auto;
            bottom: auto;
            .el-dialog{
                width: auto;
            }
			.el-dialog__header{
				padding: 25px 30px;
				background-color: #f9f9f9;
				border-bottom: 1px solid #e3e8e9;
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
			}
			.el-dialog__body{
				text-align: center;
			}
		}
        .ol-commu-info {
            height: 25px;
            font-size: 0;
            white-space: nowrap;
            box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
            border-radius: 4px;
            border: 1px solid #FD4C5A;
            overflow: hidden;
            background-color: #fff;
            padding-right: 5px;
            &.only{
                padding-right: 0;
            }
            .ol-commu-name {
                color: #fff;
                min-width: 31px;
                text-align: center;
                background-color: #FD4C5A;
                max-width: 70px;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-right: 6px;
                &.only{
                    padding-right: 0;
                    min-width: 70px;
                    max-width: 120px;
                }
            }
            
            .ol-commu-null {
                color: #fff;
                max-width: 70px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                padding: 0 2px;
                background-color:#F3828A;
            }
            .ol-commu-sel{
                padding: 0 2px;
            }
            .i-arr-down {
                display: inline-block;
                width: 0;
                height: 0;
                position: absolute;
                top: 26px;
                left: 21px;
                border-top: 9px solid #FD4C5A;
                border-left: 9px dashed transparent;
                border-right: 9px dashed transparent;
            }
            span {
                font-size: 12px;
                display: inline-block;
                height: 25px;
                line-height: 25px;
                vertical-align: middle;
            }
            &.on,
            &.active{
                border-color: #41B3F9;
                .ol-commu-name {
                    background-color: #41B3F9;
                }
                .ol-commu-null{
                    background-color: rgb(133, 204, 248);
                }
                .i-arr-down {
                    border-top-color: #41B3F9;
                }
            }
            &.shopOn{
                border-color: #62ab00;
                .ol-commu-name {
                    background-color: #62ab00;
                }
                .ol-commu-null{
                    background-color: #D3FC9D;
                    color: #000
                }
                .i-arr-down {
                    border-top-color: #62ab00;
                }
            }
            &.repeat{
                border-color: #f60;
                .ol-commu-name {
                    background-color: #f60;
                }
                .ol-commu-null{
                    background-color: #FCB281;
                }
                .i-arr-down {
                    border-top-color: #f60;
                }
            }
        }
        .scale-commu-info{
            margin-top: 15px;
            .txt1{
                font-size: 14px;
            }
        }
        .show-ploat-num{
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 997;
            background: #ffffff;
            width: 120px;
            height: 81px;
            border-radius: 4px;
            -webkit-box-shadow: 0px 3px 5px #888888;
            box-shadow: 0px 3px 5px #888888;
            .title{
                border-bottom: 1px solid #efefef;
            }
            div{
                height: 40px;
                text-align: center;
                line-height: 40px;
                font-size: 12px;
                color: #333333;
            }
            .label{
                width: 12px;
                height: 12px;
                background: #e60012;
                display: inline-block;
                border-radius: 6px;
                margin-bottom: -2px;
                margin-right: 5px;
            }
            .el-input__inner{
                border: none;
                text-align: center;
            }
        }
    }
</style>
