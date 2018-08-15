// 鼠标绘制工具
export const drawingManager = function (map) {
    var styleOptions = {
		strokeColor: "#E70012", // 边线颜色。
		fillColor: "#E70012", // 填充颜色。当参数为空时，圆形将没有填充效果。
		strokeWeight: 3, // 边线的宽度，以像素为单位。
		strokeOpacity: 0.8, // 边线透明度，取值范围0 - 1。
		fillOpacity: 0.2, // 填充的透明度，取值范围0 - 1。
		strokeStyle: 'solid' // 边线的样式，solid或dashed。
	}
	//实例化鼠标绘制工具
	var drawingManager = new BMapLib.DrawingManager(map, {
		isOpen: false, //是否开启绘制模式
		enableDrawingTool: false, //是否显示工具栏
		drawingToolOptions: {
			anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
			offset: new BMap.Size(5, 5), //偏离值
		},
		//enableCalculate: true,
		circleOptions: styleOptions, //圆的样式
		polylineOptions: styleOptions, //线的样式
		polygonOptions: styleOptions, //多边形的样式
		rectangleOptions: styleOptions //矩形的样式
	});

	return drawingManager
}

//缩放marker
export const scaleMarker = function (opts) {
	var config = {
		map: null,
		name: "",
		num: 0,
		selNum: 0,
		point: null,
		id: null,
		clickFun: null
	}
	config = Object.assign(config, opts)
	var html =
		`<div id="${config.id ? config.id : ''}" class="scale-commu-info">
			<div class="txt1">${config.name}</div>
			<div class="txt2">社区总数:${config.num}</div>
			<div class="txt2">已选社区:${config.selNum}</div>
		</div>`
	var options = {
		position: config.point, // 指定文本标注所在的地理位置
		//offset: new BMap.Size(-20, -35) //设置文本偏移量
	};
	var markLabel = new BMap.Label(html, options); // 创建文本标注对象
	var marker = new BMap.Marker(config.point, {
		icon: markerIcon("none")
	});
	markLabel.setStyle({
		border: 'none',
		backgroundColor: '#FD4C5A',
		opacity: 0.8,
		borderRadius: '50%',
		width: "90px",
		height: "90px",
		cursor: 'pointer',
		textAlign: "center",
		color: "#fff",
	})
	marker.setLabel(markLabel);
	//鼠标移上监听
	markLabel.addEventListener('onmouseover', function (e) {
		marker.setTop(true);
		this.setStyle({
			backgroundColor: '#41B3F9',
		})
	});

	//鼠标移除监听
	markLabel.addEventListener('onmouseout', function (e) {
		marker.setTop(false);
		this.setStyle({
			backgroundColor: '#FD4C5A',
		})
	});

	//点击监听
	markLabel.addEventListener('click', function (e) {
		e.domEvent.stopPropagation();
		var scale = config.map.getZoom();
		if(scale <= 10){
			config.map.setZoom(12);
			config.map.panTo(config.point);
		}else{
			config.map.setZoom(14);
		}
		
	});

	return marker
}

//标注
export const mapLabel = function (opts) {
	var config = {
		map: null,
		point: null,
		id: null,
		elid: null,
		type: null, //点的样式
		nullNum: 0,
		selNum: 0,
		isLabel: false, //是否显示标注
		clickFun: null,
		isShop: false,
	}
	config = Object.assign(config, opts)
	var html = ""
	if(config.type == "ploat"){
		html = `<div id="${config.elid ? config.elid : ''}" class="ol-commu-info ${config.isShop ? 'shopOn' : ''}">
			<span class="ol-commu-name" ${config.name.length > 8 ? 'title="'+config.name+'"' : ''}"><em>${config.name}</em></span>
			<span class="ol-commu-null">空位:${config.nullNum}</span>
			<span class="ol-commu-sel">已选:${config.selNum}</span>
			<i class="i-arr-down"></i>
		</div>`
	}else{
		html = `<div id="${config.elid ? config.elid : ''}" class="ol-commu-info only">
			<span class="ol-commu-name only" ${config.name.length > 8 ? 'title="'+config.name+'"' : ''}"><em>${config.name}</em></span>
			<i class="i-arr-down"></i>
		</div>`
	}
		
	
	var options = {
		position: config.point, // 指定文本标注所在的地理位置
		offset: new BMap.Size(-20, -35) //设置文本偏移量
	};
	var markLabel = new BMap.Label(html, options); // 创建文本标注对象
	markLabel.setStyle({
		border: 'none',
		backgroundColor: 'transparent',
		cursor: 'pointer'
	})

	//鼠标移上监听
	markLabel.addEventListener('onmouseover', function (e) {
		changeLabelStyle(true, config.elid)
		config.marker.setTop(true);
		config.marker.setIcon(markerIcon(config.type+"-on"));
	});

	//鼠标移除监听
	markLabel.addEventListener('onmouseout', function (e) {
		changeLabelStyle(false, config.elid)
		var dom = document.getElementById(config.elid);
		if (!dom.classList.contains('active')) {
			config.marker.setTop(false);
			config.marker.setIcon(markerIcon(config.type));
		}
	});

	//点击监听
	markLabel.addEventListener('click', function (e) {
		e.domEvent.stopPropagation();
		labelActive(config.elid);
		config.map.panTo(config.point);
		if(config.clickFun){
			config.clickFun(config.id)
		}
	});

	return markLabel
}

//打点marker
export const dotMarker = function (point) {
	var imagePng = "static/img/marker.png";
	var myIcon = new BMap.Icon(imagePng, new BMap.Size(29, 41));
	var marker = new BMap.Marker(point, {
		icon: myIcon
	});
	return marker
}

//带类型marker
export const typeMarker = function (opts) {
	var config = {
		map: null,
		point: null,
		id: null,
		elid: null,
		type: null, //点的样式
		isLabel: false, //是否显示标注
		clickFun: null, // 点击回调方法
		isAround: false, //是否是周边数据
	}
	config = Object.assign(config, opts)

	//配置图标样式
	var marker = null
	if(config.type){ // 自定义marker样式
		marker = new BMap.Marker(config.point, {
			icon: markerIcon(config.type)
		});
	}else{
		marker = new BMap.Marker(config.point); // 地图默认marker样式
	}
	
	//设置标注label
	config.marker = marker;
	var label = mapLabel(config);
	
	//是否显示label
	if(!config.isLabel){
		label.setStyle({ display: 'none' })
	}

	marker.setLabel(label);

	//鼠标移上监听
	marker.addEventListener('onmouseover', function (e) {
		changeLabelStyle(true, config.elid)
		if(!config.isLabel){
			label.setStyle({ display: 'block'});
		}
		marker.setIcon(markerIcon(config.type+"-on"));
		marker.setTop(true);
	});

	//鼠标移除监听
	marker.addEventListener('onmouseout', function (e) {
		changeLabelStyle(false, config.elid)
		var dom = document.getElementById(config.elid);
		if (!dom.classList.contains('active')) {
			if(!config.isLabel){
				label.setStyle({ display: 'none'})
			}
			marker.setTop(false);
			marker.setIcon(markerIcon(config.type));
		}
		
		
	});

	marker.addEventListener("click", function(e) {
		e.domEvent.stopPropagation();
		if(!config.isAround){
			labelActive(config.elid);
			label.setStyle({ display: 'block'});
			config.map.panTo(config.point);
			marker.setIcon(markerIcon(config.type+"-on"));
			marker.setTop(true);
		}
		if(config.clickFun){
			config.clickFun(config.id)
		}
	})

	return marker
}


//配置图标样式
function markerIcon(type){
	var myIcon = null;
	var imagePng = null;
	switch (type) {
		case 'none':
			imagePng = "static/img/ploat.png";
			myIcon = new BMap.Icon(imagePng, new BMap.Size(1, 1));
			break;
		case 'ploat':
			imagePng = "static/img/ploat.png";
			myIcon = new BMap.Icon(imagePng, new BMap.Size(21, 21));
			break;
		case 'ploat-on':
			imagePng = "static/img/ploat-on.png";
			myIcon = new BMap.Icon(imagePng, new BMap.Size(21, 21));
			break;
		case 'map-cy':
			imagePng = "static/img/map-cy.png";
			myIcon = new BMap.Icon(imagePng, new BMap.Size(21, 21));
			break;
		case 'map-cy-on':
			imagePng = "static/img/map-cy-on.png";
			myIcon = new BMap.Icon(imagePng, new BMap.Size(21, 21));
			break;
		default: myIcon = null;
	}
	return myIcon
}

//返回俩个数组不同的数据
export function queryDifKey(arry1, arry2, key){
	var result = [];
	for(var i in arry1){
		var flag = true;
		for(var j in arry2){
			if(key == 'ploat'){
				if(arry1[i].commId == arry2[j].commId){
					flag = false;
					break;
				}
			}else{
				if(arry1[i].id == arry2[j].id){
					flag = false;
					break;
				}
			}
		}
		if(flag){
			result.push(arry1[i]);
		}
	}
	return result
}

//将相同城市的数据放在一起
export function querySameKey(arry,key){
	var result = [];
	for(let i in arry){
		var flag = true;
		var obj = {
			name: "" ,
			lng: "",
			lat: "",
			children: []
		}
		for(let j in result){
			if(key == "city" ? arry[i].cityName : arry[i].areaName == result[j].name){
				result[j].selNum += arry[i].selTatolNum
				result[j].children.push(arry[i])
				flag = false;
				break;
			}
		}
		if(flag){
			if(key == "city"){
				obj.name = arry[i].cityName
				obj.lng = arry[i].cityCorrdinate.split("##")[0]
				obj.lat = arry[i].cityCorrdinate.split("##")[1]
				obj.selNum = arry[i].selTatolNum
			}else{
				obj.name = arry[i].areaName
				obj.lng = arry[i].areaCorrdinate.split("##")[0]
				obj.lat = arry[i].areaCorrdinate.split("##")[1]
				obj.selNum = arry[i].selTatolNum
			}
			obj.children.push(arry[i])
			result.push(obj)
		}
	}
	return result
}

//数据去重
export function uniqueData(arry1, arry2){
	var list = arry1.concat(arry2); //合并成一个数组
	var temp = {}; //用于id判断重复
	var result = []; //最后的新数组
	//遍历list数组，将每个item.id在temp中是否存在值做判断， 
	list.map((item, index) => {
		if(!temp[item.id]) {
			result.push(item);
			temp[item.id] = true
		}
	})
	return result
}



//改变标注背景颜色
function changeLabelStyle(isOn, id){
	if(id){
		var dom = document.getElementById(id);
		if(isOn){
			dom.classList.add("on");
		}
		else{
			dom.classList.remove("on");
		}
	}
}

function labelActive(id){
	if(id){
		var dom = document.getElementById(id);
		var allDom = document.getElementsByClassName("ol-commu-info");
		for (var i = 0; i < allDom.length; i++) {
			if(allDom[i].classList.contains("shopOn")){
				allDom[i].setAttribute('class', 'ol-commu-info shopOn');
			}else{
				allDom[i].setAttribute('class', 'ol-commu-info');
			}
		}
		dom.classList.add("active");
	}
}


 //浏览器定位
/* var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function(r) {
	if (this.getStatus() == BMAP_STATUS_SUCCESS) {
		map.panTo(r.point);
	} else {
		console.log('failed' + this.getStatus());
	}
}); */

