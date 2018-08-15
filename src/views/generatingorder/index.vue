<template>
    <div class="pushadvertising">
        <div class="formbox">
            <template>
                <el-select v-model="companyname" placeholder="靓靓蒸虾策略">
                    <el-option v-for="item in company" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </template>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="">
                    <el-select v-model="formInline.region" placeholder="道森媒体">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-col :span="11">
                        <el-date-picker v-model="formInline.value1" type="datetime" placeholder="开始时间" style="width:100%"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center;">-</el-col>
                    <el-col :span="11">
                        <el-date-picker v-model="formInline.value1" type="datetime" placeholder="结束时间" style="width:100%"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="formInline.name" placeholder="行业行业" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="formInline.name" placeholder="品牌品牌" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input placeholder="投放预算" v-model="formInline.input22"><i slot="suffix" class="">元</i></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" style="padding:9px 20px;" class="ssan">搜索</el-button>
                </el-form-item>
            </el-form>

            <el-button class="shoppingcart" type="primary" style="padding:9px 20px;" @click="dialogFormVisible = true"><img src="../../assets/images/shopingcar.png" style="margin-bottom:-3px;"/> 购物车</el-button>
            <!-- Form -->
            <el-dialog title="购物车" :visible.sync="dialogFormVisible" :modal="false" width="381px" top="8vh" style="padding-left:55%">
                <el-form :model="form">
                    <div>
                        <el-button type="text" class="shopcarss"  @click="showddxx = !showddxx"><img src="../../assets/images/sshd.png" style=""/>订单信息</el-button>
                        <transition name="el-zoom-in-top"> 
                            <div v-show="showddxx">
                                <p>订单金额：<a>1000.00元</a></p>
                                <p>品牌：鸡翅</p>
                                <p>投放时间：2018.05.01-2018.05.30</p>
                                <p>企业名称：武汉客客信息</p>
                                <p>企业联系人：曾阿牛</p>
                                <p>联系电话：13260658569</p>
                                <p>服务公司：道森媒体</p>
                                <p>备注</p>
                                <p>
                                    <el-input
                                        type="textarea"
                                        :rows="2"
                                        placeholder="请输入备注"
                                        v-model="form.desc">
                                    </el-input>
                                </p>
                            </div>
                        </transition>
                    </div>
                    <div>
                        <el-button type="text" class="shopcarss"  @click="showyxmt = !showyxmt"><img src="../../assets/images/sshd.png" style=""/>已选媒体</el-button>
                        <transition name="el-zoom-in-top"> 
                            <div v-show="showyxmt">
                                <p>社区数量：<a>1</a>    已选：<a>100</a>    总额：<a>20000</a></p>
                                <p>
                                    <template>
                                        <el-radio-group v-model="radiozs">
                                            <el-radio :label="1">按时间展示</el-radio>
                                            <el-radio :label="2">按资源展示</el-radio>
                                        </el-radio-group>
                                    </template>
                                </p>
                                <div v-show="radiozs == 1">
                                    <p>2018.05.01-2018.05.30    已选：<a>100</a>    总额：<a>10000</a></p>
                                    <p class="sxtjsl">
                                        <el-tree
                                            :data="data2"
                                            show-checkbox
                                            node-key="id"
                                            :default-expanded-keys="[2, 3]"
                                            :default-checked-keys="[5]"
                                            :props="defaultProps"
                                            :default-expand-all="true"
                                            >
                                        </el-tree>
                                        <el-input-number size="mini" v-model="num7" style="float:right;margin-top:-30px;margin-right:5px;"></el-input-number>
                                    </p>
                                </div>
                                <div v-show="radiozs == 2">
                                    <p>2018.05.01-2018.05.30    已选：<a>100</a>    总额：<a>20000</a></p>
                                    <p class="sxtjsl">
                                        <el-tree
                                            :data="data2"
                                            show-checkbox
                                            node-key="id"
                                            :default-expanded-keys="[2, 3]"
                                            :default-checked-keys="[5]"
                                            :props="defaultProps"
                                            :default-expand-all="true"
                                            >
                                        </el-tree>
                                        <el-input-number size="mini" v-model="num7" style="float:right;margin-top:-30px;margin-right:5px;"></el-input-number>
                                    </p>
                                </div>
                            </div>
                        </transition>
                    </div>
                    
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">提交</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="listbox">
            <el-row class="listbox1" style="">
                <el-col :span="4" class="elw" id="elw">
                    <div class="grid-content">
                        <ul class="residentialquarters">
                            <li v-for="n in 50"  @click="xses">
                                <div class="releft">
                                    <img src="../../assets/images/home-img1.png"/> 
                                </div>
                                <div class="reright">
                                    <p class="p1">
                                        万科保利心语
                                    </p> 
                                    <p class="p2">
                                        空位:<a>100</a>     已选:<a>10</a> 
                                    </p>
                                    <p class="p3">
                                        <i class="el-icon-location"></i> 湖北省武汉市洪山区南湖大道111号
                                    </p>
                                </div>
                            </li>
                        </ul>
                        
                    </div>
                </el-col>
                <div id="shrinkan" class="shrinkan" @click="shrink()">
                    <i id="zyshrinkan" class="el-icon-arrow-left"></i>
                </div>
            </el-row>
            <el-row id="listbox2" class="listbox2" style="">
                <div class="listbox22">
                    <div class="listbox221">
                        <div class="heard2">
                            资源信息    
                        </div>   
                        <div class="body2">
                            <div>
                                <div>
                                    <p>社区类型：小区</p>
                                    <p>单元数：<a>100</a></p>
                                    <p>社区类型：<a>100</a></p>
                                </div>
                                <div>
                                    <p>楼栋数：<a>100</a></p>
                                    <p>总户数：<a>100</a></p>
                                </div>
                            </div> 
                            <ul class="zyxxlistul">
                                <li v-for="n in 5">
                                    <p><a>•</a>2018.05.01—2018.05.10</p>
                                    <p>
                                        已选：10      金额：<a>12000000元</a>
                                    </p>
                                    <p>
                                        道闸  数量<a>10</a> <el-input-number size="mini" v-model="num7"></el-input-number>
                                    </p>
                                    <p>
                                        LED  数量<a>10</a> <el-input-number size="mini" v-model="num7"></el-input-number>
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div class="foote2">
                            已选：10 金额：<a>12000000元</a> <el-button>加入购物车</el-button>
                        </div> 
                    </div>
                    <div class="listbox222">
                        <div class="heard2">
                            周边数据    
                        </div> 
                        <div class="body3">
                            <div class="industry">
                                <p>
                                    行业分析
                                </p>
                                <chart class="" height='180px' width='100%' style="float-left"></chart>
                            </div>
                            <div class="crowd">
                                <p>
                                    人群分析
                                </p>
                                <ul>
                                    <li  @click="dialogVisible = true">
                                        <!-- <p>性别</p> -->
                                        <charsex class="" height='180px' width='100%' style="float-left"></charsex>
                                    </li>
                                    <el-dialog :visible.sync="dialogVisible" :modal="false" top="40vh" width="429px" style="margin-left:60wh;">
                                        <el-table :data="tableData"  style="border-radius:6px;">
                                            <el-table-column property="sex" label="性别" width=""  align="center"></el-table-column>
                                            <el-table-column property="number" label="用户款" width="" align="center"></el-table-column>
                                            <el-table-column property="bnumber" label="占比" align="center"></el-table-column>
                                            <el-table-column property="tgi" label="TGI" align="center"></el-table-column>
                                        </el-table>
                                    </el-dialog>
                                    <li @click="dialogVisible1 = true">
                                        <!-- <p>年龄</p> -->
                                        <charage class="" height='200px' width='100%' style="float-left"></charage>
                                    </li>
                                    <el-dialog :visible.sync="dialogVisible1" :modal="false" top="40vh" width="429px" style="margin-left:60wh;">
                                        <el-table :data="tableData"  style="border-radius:6px;">
                                            <el-table-column property="sex" label="性别" width=""  align="center"></el-table-column>
                                            <el-table-column property="number" label="用户款" width="" align="center"></el-table-column>
                                            <el-table-column property="bnumber" label="占比" align="center"></el-table-column>
                                            <el-table-column property="tgi" label="TGI" align="center"></el-table-column>
                                        </el-table>
                                    </el-dialog>
                                    <li @click="dialogVisible2 = true">
                                        <!-- <p>学历</p> -->
                                        <Chareducation class="" height='220px' width='100%' style="float-left"></Chareducation>
                                    </li>
                                    <el-dialog :visible.sync="dialogVisible2" :modal="false" top="40vh" width="429px" style="margin-left:60wh;">
                                        <el-table :data="tableData"  style="border-radius:6px;">
                                            <el-table-column property="sex" label="性别" width=""  align="center"></el-table-column>
                                            <el-table-column property="number" label="用户款" width="" align="center"></el-table-column>
                                            <el-table-column property="bnumber" label="占比" align="center"></el-table-column>
                                            <el-table-column property="tgi" label="TGI" align="center"></el-table-column>
                                        </el-table>
                                    </el-dialog>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="shrinkan1" class="shrinkan1" @click="shrink1()">
                    <i id="zyshrinkan1" class="el-icon-arrow-left"></i>
                </div>
            </el-row>
            <el-row id="listbox3" class="listbox3" style="">
                
            </el-row>
            <el-row id="listbox4" class="listbox4" style="">
                <div class="listbox41">
                    <div>
                        <label></label>显示小区数
                    </div>
                    <div>
                        <template>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </div>
                </div>
                <div class="listbox42">
                    <div class="xd1">
                        <img src="../../assets/images/launche.png"/><span>线上资源</span>
                    </div>
                    <div class="xd1">
                        <img src="../../assets/images/Launchc.png"/><span>位置</span>
                    </div>
                    <div class="xd1">
                        <img src="../../assets/images/Launchcc.png"/><span>媒体</span>
                    </div>
                    <div class="xd2">
                        <img src="../../assets/images/Launchd.png"/><span>选点</span>
                    </div>
                </div>
            </el-row>
            <div class="map1">
                <mapsq></mapsq>
            </div>
        </div>

        

    </div>
</template>
<script>
// 引入echars
import Chart from "@/components/Charts/industry";
import Charsex from "@/components/Charts/sex";
import Charage from "@/components/Charts/age";
import Chareducation from "@/components/Charts/education";
// 引入地图
import mapsq from '@/components/maps/Communitymap'
// 接口
// import { listselect } from "../../api/order"
var show2 = true;
var show3 = false;
var n = 380;
var n1 = 0;
export default {
    components: {
         mapsq,
         Chart,
         Charsex,
         Charage,
         Chareducation
    },
    data() {
        return {
            company: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            companyname: '',
            formInline: {
                user: '',
                region: ''
            },
            num7:1,
            tableData: [{
                sex:"女",
                number:"5000",
                bnumber:"33%",
                tgi:"99" 
            }, {
                sex:"男",
                number:"5000",
                bnumber:"33%",
                tgi:"99" 
            }, {
                sex:"有争议",
                number:"5000",
                bnumber:"33%",
                tgi:"99" 
            }],
            dialogVisible:false,
            dialogVisible1:false,
            dialogVisible2:false,
            dialogFormVisible:false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px',
            radiozs:1,
            data2: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1',
                        children: [{
                            id: 9,
                            label: '四级 1-1-1'
                        }]
                    }]
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            num7: 1,
            showddxx:false,
            showyxmt:false,
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: ''
        }
    },
    methods: {
        
        onSubmit() {
            console.log('submit!');
        },
        shrink(){
            var elw = document.getElementById("elw")
            var zyshrinkan = document.getElementById("zyshrinkan")
            var shrinkan = document.getElementById("shrinkan")
            var timer
            if(show2){
                clearInterval(timer);
                timer = setInterval(function(){
                    n -= 10
                    elw.style.width= n+"px";
                    shrinkan.style.left= n+"px";
                    if(n == 0){
                        clearInterval(timer);
                        zyshrinkan.setAttribute("class", "el-icon-arrow-right"); 
                        show2 = false;
                        return false
                    }
                },5)
            }else{
                clearInterval(timer);
                timer = setInterval(function(){
                    n += 10
                    elw.style.width= n+"px";
                    shrinkan.style.left= n+"px";
                    if(n == 380){
                        clearInterval(timer);
                        zyshrinkan.setAttribute("class", "el-icon-arrow-left"); 
                        show2 = true;
                        return false
                    }
                },5)
            }
        },
        xses(){
            var listbox3 = document.getElementById("listbox3")
            var listbox2 = document.getElementById("listbox2")
            var zyshrinkan1 = document.getElementById("zyshrinkan1")
            var shrinkan1 = document.getElementById("shrinkan1")
            var timer2
            if(!show3){
                clearInterval(timer2);
                timer2 = setInterval(function(){
                    n1 += 10
                    listbox2.style.width= n1+"px";
                    shrinkan1.style.left= n1+"px";
                    // console.log(n1)
                    if(n1 == 750){

                        clearInterval(timer2);
                        listbox3.style.display='block'
                        shrinkan1.style.display='block'
                        show3 = true;
                        return false
                    }
                },5)
            }
        },
        shrink1(){
            var listbox3 = document.getElementById("listbox3")
            var listbox2 = document.getElementById("listbox2")
            var zyshrinkan1 = document.getElementById("zyshrinkan1")
            var shrinkan1 = document.getElementById("shrinkan1")
            var timer1
            if(show3){
                clearInterval(timer1);
                timer1 = setInterval(function(){
                    n1 -= 10
                    listbox2.style.width= n1+"px";
                    shrinkan1.style.left= n1+"px";
                    if(n1 == 0){
                        clearInterval(timer1);
                        listbox3.style.display='none'
                        shrinkan1.style.display='none'
                        show3 = false;
                        return false
                    }
                },5)
            }
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        }
    },
    created() {
        
    }
}
</script>
<style>
    .pushadvertising{
        width: 100vw;
        max-width: 100vw;
        min-width: 1200px;
        height: 100vh;
        position: fixed;
        left: 0;
    }
    .pushadvertising .formbox{
        height: 66px;
        line-height: 66px;
        width: 100%;
        background: #ffffff;
        padding: 0 2rem;
        border-bottom:1px solid #e3e3e3;
    }
    .pushadvertising .formbox .demo-form-inline{
        float: left;
        height: 100%;
        line-height: 100%;
    }
    .pushadvertising .formbox .demo-form-inline .el-form-item{
        margin-bottom: 0;
        width: 110px;
        margin-right: 10px;
        margin-top: 13px;
    }
    .pushadvertising .formbox .demo-form-inline>.el-form-item:nth-child(1){
        width: 19%;

    }
    .pushadvertising .formbox .demo-form-inline>.el-form-item:nth-child(2){
        width: 260px;
    }
    .pushadvertising .formbox .demo-form-inline>.el-form-item:nth-child(3) input{
        text-align: center;
    }
    .pushadvertising .formbox .demo-form-inline>.el-form-item:nth-child(4) input{
        text-align: center;
    }
    .pushadvertising .formbox>.el-select{
        float: left;
        margin-right: 3%;
        width: 135px;
    }
    .pushadvertising .formbox>.el-select .el-input--suffix .el-input__inner{
        border: none;
        color: #555555 !important;
        font-size: 16px;
        font-weight: 600
    }
    .pushadvertising .formbox .shoppingcart{
        float: right;
        margin-top: 15px;
    }
    .pushadvertising .formbox .ssan{
        background: #e60012;
        border: #e60012;
    }
    .pushadvertising .formbox .el-input__suffix span i{
        font-style:normal;
        color: #555555;
        font-size: 12px;
    }
    .pushadvertising .listbox {
        height: 100%;
        position: relative;
    }
    .pushadvertising .listbox .listbox1{
        height: 100%;
        /* overflow: hidden; */
        width:380px;
        position: relative;
        z-index: 999;
    }
    .pushadvertising .listbox .listbox1 .el-col{
        background: #ffffff;
        height: 100%;
        width: 380px;
        border-right:1px solid #e3e3e3; 
        position: relative;
        
    }
    .pushadvertising .listbox .listbox1 .el-col .grid-content{
        overflow:auto;
        width: 100%;
        height: 740px;
    }
    .pushadvertising .listbox .listbox1 .el-col .grid-content .residentialquarters{
        width: 370px;
        height: auto;
    }
    .pushadvertising .listbox .listbox1 .el-col .grid-content .residentialquarters li{
        width: 340px;
        height: 126px;
        border-bottom: 1px dotted #eeeeee;
        padding: 23px 0;
        margin: 0 5px 0 25px;
        cursor: pointer; 
    }
    .pushadvertising .listbox .listbox1 .el-col .grid-content .residentialquarters li:hover{
        background: #eeeeee;
    }
    .pushadvertising .listbox .listbox1 .el-col .grid-content .residentialquarters li .releft{
        width: 100px;
        height: 80px;
        float: left;
        margin-right: 11px;
    }
    .pushadvertising .listbox .listbox1 .el-col .grid-content .residentialquarters li .releft img{
        width: 100px;
        height: 80px;
        border-radius: 0;
    }
    .pushadvertising .listbox .listbox1 .el-col .grid-content .residentialquarters li .reright{
        width: 220px;
        height: 80px;
        float: left;
    }
    .pushadvertising .listbox .listbox1 .el-col .grid-content .residentialquarters li .reright .p1{
        font-weight: 600;
        color: #333333;
        font-size: 14px;
        margin-bottom: 20px;
    }
    .pushadvertising .listbox .listbox1 .el-col .grid-content .residentialquarters li .reright .p2{
        font-size: 12px;
        font-weight: 400;
        color: #999999;
        margin-bottom: 15px;
    }
    .pushadvertising .listbox .listbox1 .el-col .grid-content .residentialquarters li .reright .p2 a{
        color: #e60012;
    }
    .pushadvertising .listbox .listbox1 .el-col .grid-content .residentialquarters li .reright .p3{
        font-size: 14px;
        font-weight: 400;
        color: #999999;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .pushadvertising .listbox .listbox1 .shrinkan{
        width: 17px;
        height: 84px;
        float: left;
        text-align: center;
        line-height: 84px;
        position: absolute;
        left: 380px;
        top: 50%;
        margin-top: -130px;
        margin-left: -1px;
        z-index: 999;
        border: 1px solid #eeeeee;
        border-left: none;
        background: #ffffff;
        cursor: pointer; 
    }
    .pushadvertising .listbox .listbox1 .shrinkan:hover{
         color: #e60012;
    }
    .pushadvertising .listbox .map1{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
    }
    .pushadvertising .listbox .map1>div{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .pushadvertising .listbox .m-t-10{
        position: absolute;
        z-index: 1;
        left: 390px;
        top: 20px;
    }
    .pushadvertising .listbox .map1 #allmap{
        width: 100%;
        height: 87% !important;
        border: none !important;
    }
    .pushadvertising .listbox .m-t-10 .mint-cell-value{
        width: 378px;
        height: 38px;
        box-shadow: 0px 3px 5px #888888;
        border-radius: 5px 5px 5px 5px;
    }
    .pushadvertising .listbox .m-t-10 .mint-cell-value input{
        width: 321px;
        height: 38px;
        border-radius: 5px 0 0 5px;
        border: none;
    }
    .pushadvertising .listbox .m-t-10 .mint-cell-value button{
        width: 57px;
        margin-left: -7px;
        height: 38px;
        border-radius:0 5px 5px 0;
        background: #e60012;
        border-color: #e60012; 
        font-weight: 600;
    }
    .pushadvertising .listbox .listbox2{
        position: absolute;
        left: 379px;
        top: -1px;
        background: #ffffff;
        width: 0px;
        height: 100%;
        z-index: 999;
        
    }
    .pushadvertising .listbox .listbox3{
        width: 100%;
        height: 100%;
        background: #000000;
        opacity: 0.5;
        z-index: 888;
        position: absolute;
        left: 0;
        top: 0;
        display: none;
    }
    .pushadvertising .listbox .listbox2 .listbox22{
        width: 100%;
        height: 100%; 
        overflow: hidden;
        border:1px solid #e3e3e3;
    }
    .pushadvertising .listbox .listbox2 .listbox22 .listbox221{
        width: 356px;
        height: 100%;
        float: left;
        padding: 0 30px;
        border-right: 1px solid #e3e3e3;
        position: relative;
    }
    .pushadvertising .listbox .listbox2 .listbox22 .listbox222{
        width: 392px;
        height: 100%;
        float: left;
        padding: 0 30px;
    }
    .pushadvertising .listbox .listbox2 #shrinkan1{
        width: 17px;
        height: 84px;
        float: left;
        text-align: center;
        line-height: 84px;
        position: absolute;
        left: 750px;
        top: 50%;
        margin-top: -130px;
        margin-left: -1px;
        z-index: 999;
        border: 1px solid #eeeeee;
        border-left: none;
        background: #ffffff;
        cursor: pointer; 
        display: none;
    }
    .pushadvertising .listbox .listbox2 #shrinkan1:hover{
        color: #e60012;
    }
    .pushadvertising .listbox .listbox2 .heard2{
        font-size: 18px;
        color: #333333;
        height: 66px;
        border-bottom: 1px dotted #e3e3e3;
        line-height: 66px;
    }
    .pushadvertising .listbox .listbox2 .body2>div{
        height: 112px;
        background: #f8f8f8;
        width: 355px;
        margin-left: -30px;
        padding:25px 30px;
    }
    .pushadvertising .listbox .listbox2 .body2>div>div{
        width: 140px;
        float: left;
    }
    .pushadvertising .listbox .listbox2 .body2>div>div>p{
        font-size: 12px;
        margin-bottom: 10px;
        color: #333333;
    }
    .pushadvertising .listbox .listbox2 .body2>div>div>p>a{
        color: #e60012;
    }
    .pushadvertising .listbox .listbox2 .zyxxlistul{
        height: 540px;
        overflow-y: auto;
        padding: 0 30px;
        width: 355px;
        margin-left: -30px;
    }
    .pushadvertising .listbox .listbox2 .zyxxlistul li{
        height: 180px;
        border-bottom: 1px dotted #e3e3e3;
        padding: 30px 0;
    }
    .pushadvertising .listbox .listbox2 .zyxxlistul li>p:nth-child(1){
        
        margin-bottom: 10px;
        font-size: 12px;
        color: #333333;
        line-height: 20px;
    }
    .pushadvertising .listbox .listbox2 .zyxxlistul li>p:nth-child(1)>a{
        font-size: 32px;
        color: #e60012;
        display: inline-block;
        margin-right: 5px;
        margin-left: -20px;
    }
    .pushadvertising .listbox .listbox2 .zyxxlistul li>p:nth-child(2){
        font-size: 12px;
        color: #333333;
        line-height: 20px;
        margin-bottom: 20px;
    }
    .pushadvertising .listbox .listbox2 .zyxxlistul li>p:nth-child(2)>a{
        color: #e60012;
    }
    .pushadvertising .listbox .listbox2 .zyxxlistul li>p:nth-child(3){
        font-size: 12px;
        color: #333333;
        line-height: 20px;
        margin-bottom: 20px;
    }
    .pushadvertising .listbox .listbox2 .zyxxlistul li>p:nth-child(3)>a{
        color: #e60012;
    }
    .pushadvertising .listbox .listbox2 .zyxxlistul li>p:nth-child(3) .el-input-number--mini{
        float: right;
        
    }
    
    .pushadvertising .listbox .listbox2 .zyxxlistul li>p:nth-child(4){
        font-size: 12px;
        color: #333333;
        line-height: 20px;
    }
    .pushadvertising .listbox .listbox2 .zyxxlistul li>p:nth-child(4)>a{
        color: #e60012;
    }
    .pushadvertising .listbox .listbox2 .zyxxlistul li>p:nth-child(4) .el-input-number--mini{
        float: right;
        height: 20px;
    }
    .pushadvertising .listbox .listbox2 .foote2{
        position: absolute;
        left: 0;
        bottom: 13%;
        width: 355px;
        height: 75px;
        border-top: 1px dotted #e3e3e3;
        line-height: 75px;
        padding-left: 30px;
        font-size: 14px;
        color: #333333;

    }
    .pushadvertising .listbox .listbox2 .foote2 a{
        color: #e60012;
    }
    .pushadvertising .listbox .listbox2 .foote2 .el-button{
        color: #ffffff;
        background: #e60012;
        border-color: #e60012;
    }
    .pushadvertising .listbox .listbox2 .body3 .industry p{
        color: #2f323e;
        font-size: 14px;
        font-weight: 600;
        border-left: 3px solid #e60012;
        padding-left: 10px;
    }
    .pushadvertising .listbox .listbox2 .body3 .industry{
        padding: 20px 0 0 0;
        border-bottom:1px dotted #e3e3e3; 
        height: 221px;
    }
    .pushadvertising .listbox .listbox2 .body3 .crowd>p{
        color: #2f323e;
        font-size: 14px;
        font-weight: 600;
        border-left: 3px solid #e60012;
        padding-left: 10px;
    }
    .pushadvertising .listbox .listbox2 .body3 .crowd{
        padding: 20px 0 0 0;
        border-bottom:1px dotted #e3e3e3; 
        height: 400px;
        overflow-y: auto
    }
    .pushadvertising .listbox .listbox2 .body3 .crowd ul{
        width: 98%;
    }
    .pushadvertising .listbox .listbox2 .body3 .crowd ul li{
        border-bottom:1px dotted #e3e3e3;
        padding-top: 15px;
        position: relative;
    }
    .pushadvertising .listbox .listbox2 .body3 .crowd ul .el-table{
        border: 1px solid #e3e8e9;
        border-radius: 6px;
    }
    .pushadvertising .listbox .listbox2 .body3 .crowd ul .el-dialog__body{
        padding: 20px 18px;
    }
    .pushadvertising .listbox .listbox2 .body3 .crowd ul .el-dialog{
        background: #edf1f5;
        box-shadow: 0px 3px 5px #888888;
    }
    .pushadvertising .listbox .listbox2 .body3 .crowd ul .el-dialog .el-dialog__header{
        background: #edf1f5;
        /* border-bottom: none; */
        height: 0px;
        padding: 0px;
        position: relative;
    }
    .pushadvertising .listbox .listbox2 .body3 .crowd ul .el-dialog .el-dialog__headerbtn{
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
    .pushadvertising .formbox .el-dialog__header{
        height: 50px;
        font-size: 18px;
        color: #2f323e;
        background: #ffffff;
        border-bottom: none;
        padding: 10px 30px;
    }
    .pushadvertising .formbox .el-dialog__footer{
        /* border-top: none; */
    }
    .pushadvertising .formbox .el-dialog__header .el-dialog__title{
        font-size: 18px;
        color: #2f323e;
        float: left;
    }
    .pushadvertising .formbox .shopcarss{
        font-size: 16px;
        color: #2f323e;
    }
    .pushadvertising .formbox .shopcarss img{
        margin-right: 5px;
    }
    .pushadvertising .formbox .el-form p a{
        color: #e60012;
    }
    .pushadvertising .formbox .el-form p{
        margin-bottom: 10px;
        color: #2f323e;
    }
    .pushadvertising .formbox .el-form .sxtjsl{
        padding-bottom: 10px;
        background: #edf1f5;
    }
    .pushadvertising .formbox .el-form p .el-tree{
        background: #edf1f5;
    }
    .pushadvertising .formbox .el-form p .el-radio-group .is-checked .el-radio__label{
        color: #2f323e;
    }
    .pushadvertising .formbox .el-form p .el-radio-group .is-checked .el-radio__input .el-radio__inner{
        background: #ffffff;
        border-color: #e60012;
    }
    .pushadvertising .formbox .el-form p .el-radio-group .is-checked .el-radio__input .el-radio__inner::after{
        background-color: #e60012;
        width: 6px;
        height: 6px;
    }
    .pushadvertising .formbox .dialog-footer .el-button:nth-child(1){
        background-color: #e60012;
        border-color: #e60012;
    }
    .pushadvertising .listbox .listbox4{
        position: absolute;
        width: 120px;
        top: 0;
        right: 30px;
        z-index: 777;
    }
    .pushadvertising .listbox .listbox4 .listbox41{
        background: #ffffff;
        width: 120px;
        height: 81px;
        margin-top: 40px;
        border-radius: 4px;
        box-shadow: 0px 3px 5px #888888;
    }
    .pushadvertising .listbox .listbox4 .listbox41 div{
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 12px;
        color: #333333;
    }
    .pushadvertising .listbox .listbox4 .listbox41>div:nth-child(1){
        border-bottom: 1px solid #efefef;
    }
    .pushadvertising .listbox .listbox4 .listbox41 div:nth-child(1) label{
        width: 12px;
        height: 12px;
        background: #e60012;
        display: inline-block;
        border-radius: 6px;
        margin-bottom: -2px;
        margin-right: 5px;
    }
    .pushadvertising .listbox .listbox4 .listbox41>div:nth-child(2) .el-input__inner{
        border: none;
    }
    .pushadvertising .listbox .listbox4 .listbox42{
        margin-top: 100px;
        width: 120px;
        height: 170px;
    }
    .pushadvertising .listbox .listbox4 .listbox42 .xd1{
        width: 120px;
        height: 35px;
        margin-bottom: 10px;
        background: #e60012;
        line-height: 35px;
        padding: 3px;
        box-shadow: 0px 3px 5px #888888;
        cursor:pointer;
    }
    
    .pushadvertising .listbox .listbox4 .listbox42 .xd1 span{
        display: inline-block;
        background: #ffffff;
        float: right;
        width: 75px;
        height: 29px;
        padding: 0 6px;
        font-size: 12px;
        color: #333333;
    }
    .pushadvertising .listbox .listbox4 .listbox42 .xd1 img{
        margin-bottom: -2px;
        margin-left: 5px;
    }
    .pushadvertising .listbox .listbox4 .listbox42 .xd1:hover span{
        background: #e60012;
        color: #ffffff;
    }
    .pushadvertising .listbox .listbox4 .listbox42 .active span{
        background: #e60012;
        color: #ffffff;
    }
    .pushadvertising .listbox .listbox4 .listbox42 .xd2{
        width: 120px;
        height: 35px;
        background: #e60012;
        line-height: 30px;
        padding: 3px;
        box-shadow: 0px 3px 5px #888888;
        text-align: center;
        color: #ffffff;
        cursor:pointer;
    }
    .pushadvertising .listbox .listbox4 .listbox42 .xd2 img{
        margin-bottom: -4px;
        margin-right: 10px;
    }
</style>




