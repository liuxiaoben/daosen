 //受众分析所有区的数据
 export function audienceMergeKey(arr){
    var temp = {};
    var result = [];
    var key = "";
    var tatol = 0;
    arr.forEach((item, index)=>{
        key = item.name
        tatol += item.num;
        if(temp[key]) {
            temp[key].num += item.num;
            temp[key].tgi = (temp[key].tgi + item.tgi) / 2
        }else{
            temp[key] = {
                name: key,
                tgi: item.tgi,
                proportion: item.proportion,
                num: item.num
            }
        }
    })
    
    for(let i in temp){
        temp[i].proportion = ((temp[i].num / tatol) * 100).toFixed(2);
        result.push(temp[i])
    }
    return result
}


//受众数据按区域拆开
export function areafilterArr(arr1, arr2){
    let result = []
    arr1.forEach((n, i) =>{
        arr2.forEach((m, j)=>{
            if(m.area == n){
                result.push(m)
            }
        })
    })
    return result
}

//获取购物车数据
export function getShopCartData(arr, type){
    var temp = {}; //用于判断重复
    var result = []; //最后的新数组
    var key = "";
    for(let i in arr) {
        if(type === 'cycle'){
            key = arr[i].cycle
        }else if(type === 'province'){
            key = arr[i].provinceId
        }else if(type === 'city'){
            key = arr[i].cityId
        }else if(type === 'area'){
            key = arr[i].areaId
        }
        else if(type === 'name'){
            key = arr[i].commId
        }
        
        if(temp[key]) {
            if(type === 'name'){
                let med = arr[i].mediaList;
                for(let j in med){
                    temp[key].children.push(med[j])
                }
            }else{
                temp[key].children.push(arr[i]);
            }
            
        }else{
            var	obj = {
                id: key,
                children: [],
            }
            if(type === 'cycle'){
                obj.name = arr[i].cycle;
                obj.children.push(arr[i]);
            }else if(type === 'province'){
                obj.name = arr[i].province;
                obj.children.push(arr[i]);
            }else if(type === 'city'){
                obj.name = arr[i].city;
                obj.children.push(arr[i]);
            }else if(type === 'area'){
                obj.name = arr[i].area;
                obj.children.push(arr[i]);
            }else if(type === 'name'){
                obj.name = arr[i].name;
                let med = arr[i].mediaList;
                for(let j in med){
                    obj.children.push(med[j]);
                }
            }
            
            temp[key] = obj;
            result.push(obj);
        }
    }

    result.forEach((item, index)=>{
        if(type === 'cycle'){
            item.children = getShopCartData(item.children, 'province');
        }else if(type === 'province'){
            item.children = getShopCartData(item.children, 'city');
        }else if(type === 'city'){
            item.children = getShopCartData(item.children, 'area');
        }else if(type === 'area'){
            item.children = getShopCartData(item.children, 'name');
        }else{
            return;
        }
    })
    return result
}

//按省份合并
export function mergeKeyByProvince(arr){
    var temp = {}; //用于判断重复
    var result = []; //最后的新数组
    for(let i in arr) {
        let key = arr[i].province
        if(temp[key]) {
            temp[key].children.push(arr[i]);
        }else{
            var	obj = {
                id: key,
                name: arr[i].provinceName,
                children: [],
            }
            obj.children.push(arr[i]);
            temp[key] = obj;
            result.push(obj);
        }
    }
    return result;
}

//按市合并
export function mergeKeyByCity(arr){
    var temp = {}; //用于判断重复
    var result = []; //最后的新数组
    for(let i in arr) {
        let key = arr[i].city
        if(temp[key]) {
            temp[key].children.push(arr[i]);
        }else{
            var	obj = {
                id: key,
                name: arr[i].cityName,
                children: [],
            }
            obj.children.push(arr[i]);
            temp[key] = obj;
            result.push(obj);
        }
    }
    return result;
}

//按区合并
export function mergeKeyByArea(arr){
    var temp = {}; //用于判断重复
    var result = []; //最后的新数组
    for(let i in arr) {
        let key = arr[i].area
        if(temp[key]) {
            temp[key].children.push(arr[i]);
        }else{
            var	obj = {
                id: key,
                name: arr[i].areaName,
                children: [],
            }
            obj.children.push(arr[i]);
            temp[key] = obj;
            result.push(obj);
        }
    }
    return result;
}


//按小区合并
export function mergeKeyByPloat(arr){
    
    var temp = {}; //用于判断重复
    var result = []; //最后的新数组
    for(let i in arr) {
        let key = arr[i].commId
        if(temp[key]) {
            arr[i].tatolSpaceNum += arr[i].spaceNum
            temp[key].children.push(arr[i]);
        }else{
            var	obj = {
                commId: arr[i].commId,
                mtypeId: arr[i].mtypeId,
                mtypeName: arr[i].mtypeName,
                spaceNum: arr[i].spaceNum,
                saleMoney: arr[i].price,
            }
            arr[i].cycle = arr[i].beginTime +'/'+ arr[i].endTime
            arr[i].tatolSpaceNum = arr[i].spaceNum
            arr[i].eurl = arr[i].commImage[0]+'pg';
            arr[i].selTatolNum = arr[i].num || 0;
            arr[i].children = [];
            arr[i].children.push(obj);
            temp[key] = arr[i]
            result.push(arr[i]);
        }
    }
    return result;
}

//按周期合并
export function mergeKeyByCycle(arr){
    var temp = {}; //用于判断重复
    var result = []; //最后的新数组
    for(let i in arr) {
        let key = arr[i].cycle
        if(temp[key]) {
            temp[key].children.push(arr[i]);
        }else{
            var	obj = {
                id: key,
                name: key,
                children: [],
            }
            obj.children.push(arr[i]);
            temp[key] = obj;
            result.push(obj);
        }
    }
    return result;
}