<template>
    <div id="putAdShopCart">
        <el-form :model="orderForm">
            <div>
                <el-button type="text" class="shop-title"  @click="orderInfoShow = !orderInfoShow"><img src="../../../assets/images/sshd.png" style=""/>订单信息</el-button>
                <transition name="el-zoom-in-top"> 
                    <div v-show="orderInfoShow" class="info-con">
                        <div style="margin: 5px 0 10px">订单金额：<span class="txt-red">{{shopNumData.tatolPrice}}元</span></div>
                        <el-form ref="orderForm" :model="orderForm" :rules="orderFormRule">
                            <el-form-item label="标题" prop="title">
                                <el-input v-model="orderForm.title"></el-input>
                            </el-form-item>
                            <el-form-item label="品牌" prop="brand">
                                <el-input v-model="orderForm.brand"></el-input>
                            </el-form-item>
                            <el-form-item label="预算" prop="budget">
                                <el-input v-model.number="orderForm.budget"></el-input>
                            </el-form-item>
                            <el-form-item label="投放时间" prop="beginDate">
                                <el-date-picker
                                    style="width: 100%;"
                                    type="daterange"
                                    v-model="dataSE"
                                    range-separator="/"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :editable="false"
                                    @change="dateChange">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="订单类型" prop="orderType">
                                <el-select v-model="orderForm.orderType" placeholder="请选择订单类型" style="width:100%">
                                    <el-option v-for="item in orderTypeList" :key="item.id" :label="item.label" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <!-- <el-form-item label="企业名称">
                                <el-input v-model="orderForm.name"></el-input>
                            </el-form-item> -->
                            <el-form-item label="企业联系人" prop="linkman">
                                <el-input v-model="orderForm.linkman"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话" prop="phone">
                                <el-input v-model.number="orderForm.phone"></el-input>
                            </el-form-item>
                            <!-- <div>服务公司：道森媒体</div> -->
                            <el-form-item label="备注" prop="remark">
                                <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入备注"
                                    v-model="orderForm.remark">
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </transition>
            </div>
            <div>
                <el-button type="text" class="shop-title"  @click="meidiaInfoShow = !meidiaInfoShow"><img src="../../../assets/images/sshd.png" style=""/>已选媒体</el-button>
                <transition name="el-zoom-in-top"> 
                    <div v-show="meidiaInfoShow"  class="info-con">
                        <div class="item-row">
                            社区数量：<span class="txt-red">{{shopNumData.commNum}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            已选：<span class="txt-red">{{shopNumData.selNum}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            总额：<span class="txt-red">{{shopNumData.tatolPrice}}</span>
                        </div>
                        <div v-for="(item,index) in shopCartData" :key="item.id">
                            <div class="date-item">
                                <span class="cycle">{{item.name}}</span>
                                <el-button type="text" circle size="mini" icon="el-icon-error" @click="removeCycle(index)"></el-button>
                            </div>
                            <div class="item-row tree-div">
                                <el-tree
                                    ref="shopCartTree"
                                    :data="item.children"
                                    :props="resourceProps"
                                    show-checkbox
                                    node-key="id"
                                    @check="getShopCheck"
                                    default-expand-all>
                                    <span class="custom-tree-node" slot-scope="{ node, data }">
                                        <span>{{node.label}}</span>
                                        <el-input-number v-if="node.level == 5" size="mini" :min="0" :max="data.maxNum" v-model="data.selNum" @change="shopCartChange"></el-input-number>
                                        <el-button type="text" circle size="mini" icon="el-icon-error" @click="removeShopCartData(node, data, index)"></el-button>
                                    </span>
                                </el-tree>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </el-form>
        <div style="margin: 10px 0 0 ">
            <el-button type="danger" size="small" @click="submitShopCart">确定</el-button>
            <el-button type="info" size="small" @click="$emit('closeShopCart')">取消</el-button>
        </div>
    </div>
</template>
<script>
import { addShopCart, getOrderType } from '@/api/putMap/pushadvertising.js'
export default {
    props: {
        shopCartData:{
            type: Array,
            default: []
        },
        strategyObj: {
            type: Object,
        },
        serverComyId:{
            type: Number,
        },
        industryId:{
            type: Number,
        }
    },
    data() {
        return {
            orderInfoShow: false,
            meidiaInfoShow: false,
            dataSE: [],
            orderTypeList: [],
            shopNumData:{
                commNum: 0,
                selNum:0,
                tatolPrice: 0
            },
            orderForm:{
                strId: "", //策略id
                strApplyId: "",
                tenantId: "",
                title: "",
                budget: "",
                beginDate: "",
                endDate: "",
                linkman: "",
                phone: "",
                industry: "",
                brand: "",
                purposeType: "",
                orderType: "1",
                money: "",
                remark: "",
                cycleListJson: "",
                factMoney: "",
                couponMoney: "",
                derateMoney: "",
                lastMoney: "",
                payMoney: "",
                invoiceMoney: "",
            },
            orderFormRule:{
                title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
                brand: [{ required: true, message: '请填写品牌', trigger: 'blur' } ],
                budget: [{ required: true, message: '请填写预算', trigger: 'blur' },{ type: 'number', message: '预算必须为数字值'} ],
                beginDate: [{ required: true, message: '请选择时间段', trigger: 'change' } ],
                orderType: [{ required: true, message: '请选择订单类型', trigger: 'change' }],
                linkman: [{ required: true, message: '请填写企业联系人', trigger: 'blur' }],
                phone: [{ required: true, message: '请填写联系电话', trigger: 'blur' },{ type: 'number', message: '手机格式不正确'}  ],
                remark: [{ required: true, message: '请填写备注', trigger: 'blur' } ],
            },
            resourceProps: {
                children: 'children',
                label: 'name',
                id: "id"
            },
            treeId: "",
            treeIndex: ""
        };
    },
    methods: {
        //加减数量是触发
        shopCartChange(){
            this.$emit("shopCartChange");
        },

        //开始结束时间选择触发
        dateChange(val){
            if(val){
                this.orderForm.beginDate = val[0];
                this.orderForm.endDate = val[1];
            }
        },

        //获取选中是的数据
        getShopCheck() {
            let tempArr = [];
            if(this.$refs.shopCartTree){
                this.$refs.shopCartTree.forEach((item,index)=>{
                    tempArr.push(...item.getCheckedNodes(true));
                })
                this.getTatol(tempArr)
            }
        },

        //计算选中总数
        getTatol(arr){
            let temp = {
                commNum: 0,
                selNum:0,
                tatolPrice: 0
            }
            arr.forEach((item, index)=>{
                if(item.price){
                    temp.selNum += item.selNum;
                    temp.tatolPrice += (item.price * item.selNum);
                }
               
            })
            temp.commNum = arr.length;
            this.shopNumData = temp;
        },
        
        //点击删除时
        removeShopCartData(node, data, index){
            let parent = node.parent
            if(index != undefined){
                this.treeIndex = index;
            }
            if(parent){
                if(parent.childNodes.length == 1){
                    this.treeId = parent.data.id;
                    this.removeShopCartData(parent)
                }else{
                    if(data){
                        this.treeId = data.id
                    }
                    const children = parent.data.children || parent.data;
                    const index = children.findIndex(d => d.id === this.treeId);
                    let delArr = children.splice(index, 1);
                    this.delMedia(delArr);
                }
            }else{
                if(this.shopCartData.length == 1){
                    this.$emit("delCycle", 0); 
                }else{
                    this.$emit("delCycle", this.treeIndex); 
                }
            }
        },
        
        //获取媒体id删除对应数量
        delMedia(data){
            for(let i in data){
                if(data[i].children && data[i].children.length > 0){
                    this.delMedia(data[i].children);
                }else{
                    this.$emit("delMedia", data[i].modelId);
                }
            }
        },

        //点击周期删除时触发
        removeCycle(index){
            this.$emit("delCycle", index);
        },

        //默认全部选中
        selAll(){
            this.shopCartData.forEach((item, index)=>{
                var key = item.children[0].id
                this.$refs.shopCartTree[index].setChecked(key, true, true);
            })
        },

        //提交数据
        submitShopCart(){
            this.$refs['orderForm'].validate((valid) => {
                if (valid) {
                    let tempArr = [];
                    this.$refs.shopCartTree.forEach((item,index)=>{
                        tempArr.push(...item.getCheckedNodes(true));
                    })
                    if(tempArr.length <= 0){
                        this.$message.error("没有可提交的媒体");
                        return;
                    }
                    let cycleData = this.getSubData(tempArr);
                    this.orderForm.cycleListJson = JSON.stringify(cycleData)
                    this.orderForm.money = this.shopNumData.tatolPrice
                    this.orderForm.tenantId = this.serverComyId;
                    this.orderForm.industry = this.industryId;
                    this.orderForm.strId = this.strategyObj.id;
                    this.orderForm.purposeType = this.strategyObj.purposeType;
                    let sendData = this.orderForm
                    addShopCart(sendData).then(res=>{
                        if(res.success){
                            this.$message.success("订单提交成功！");
                            //清空购物车
                            this.$refs['orderForm'].resetFields();
                            this.$emit("clearShopCart");
                        }else{
                            this.$message.error("订单提交失败！");
                        }
                    })
                }else{
                    this.$message.error("请填写订单信息！");
                }
            })
            
        },

        //提交数据拼装
        getSubData(arr){
            let result = [];
            let temp = {}
            arr.forEach((item, index)=>{
                let key = item.cycle;
                if(temp[key]){
                    let commList = temp[key].communityList
                    
                    for(let n in commList){
                        //console.log(commList[n].commId, item.commId)
                        if(commList[n].commId == item.commId){
                            commList[n].num += item.selNum;
                            commList[n].money += (item.price * item.selNum);
                            break;
                        }else{
                            let commObj = {
                                commId:item.commId,
                                num: item.selNum,
                                money: item.price * item.selNum
                            }
                            temp[key].communityList.push(commObj)
                            break;
                        }
                    }

                    let mediaObj = {
                        commId:item.commId,
                        mtypeId: item.id,
                        price: item.price,
                        num: item.selNum,
                        money: item.price * item.selNum
                    }
                    temp[key].num += item.selNum
                    temp[key].money += (item.price * item.selNum)
                    temp[key].mediumList.push(mediaObj)
                }else{
                    let preObj = {
                        beginDate: item.cycle.split("/")[0] + ' 00:00:00',
                        endDate: item.cycle.split("/")[1]+ ' 00:00:00',
                        num: item.selNum,
                        money: item.price * item.selNum,
                        communityList:[],
                        mediumList:[],
                    }

                    let commObj = {
                        commId:item.commId,
                        num: item.selNum,
                        money: item.price * item.selNum
                    }

                    let mediaObj = {
                        commId:item.commId,
                        mtypeId: item.id,
                        price: item.price,
                        num: item.selNum,
                        money: item.price * item.selNum
                    }

                    preObj.communityList.push(commObj);
                    preObj.mediumList.push(mediaObj);

                    temp[key] = preObj
                    result.push(preObj); 
                }
            })
            return result;
        }
    },
    watch:{
        shopCartData: {
            handler(){
                 this.$nextTick(()=>{
                    this.getShopCheck();
                })
            },
            deep: true
        }
    },
    created(){
        getOrderType().then(res=>{
            this.orderTypeList = res.data;
        })
    }
    
};
</script>

<style rel="stylesheet/scss" lang="scss">
    #putAdShopCart{
        max-height: 600px;
        padding: 0 25px;
        overflow-y: auto;
        .shop-title{
            font-size: 15px;
            color: #2f323e;
            img{
                margin-right: 8px;
                vertical-align: middle;
            }
        }
        .info-con{
            padding-left: 15px;
            .item-row{
                margin-bottom: 15px
            }
            .tree-div .el-tree{
                background-color: #edf1f5;
            }
            .el-input-number{
                width: 80px;
                .el-input--mini .el-input__inner{
                    height: 20px;
                    border-radius: 2px;
                    padding: 0 25px;
                }
            }
            .el-input-number--mini{
                line-height: 18px;
            }
            .el-input-number__increase{
                width: 25px;
                border-radius: 0;
            }
            .el-input-number__decrease{
                width: 25px;
                border-radius: 0;
            }
        }
        
        .txt-red{
            color: #e60012;
        }
        .date-item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-right: 8px;
            .cycle{
                border-left: 3px solid #e60012;
                padding-left: 10px;
                line-height: 15px
            }
        }
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>

