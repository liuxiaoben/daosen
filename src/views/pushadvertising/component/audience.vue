<template>
    <div id="audience">
        <div class="data-con">
            <div class="area-sel">
                <el-checkbox-group v-model="selArea" @change="selAreaChange">
                    <el-checkbox v-for="item in areaList" :key="item.id" :label="item.id" :checked="true">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <!-- <div class="business-data">
                <div class="sub-title">行业分析</div>
                <chart-industry ref="chartInudstry" id="chartInudstry2" :data="inudstryData" height='200px' width='340px'></chart-industry>
            </div> -->
            <div class="people-data">
                <div class="sub-title">人群分析</div>
                <!-- 性别 -->
                <div @click="sexDialog = true"><chart-sex ref="chartSex" id="chartSex2" :data="sexData" height='180px' width='340px'></chart-sex></div>
                <el-dialog :visible.sync="sexDialog" :modal="false" top="40vh" width="429px" style="margin-left:60wh;">
                    <el-table :data="sexData"  style="border-radius:6px;">
                        <el-table-column property="name" label="性别" width=""  align="center"></el-table-column>
                        <el-table-column property="num" label="用户数" width="" align="center"></el-table-column>
                        <el-table-column property="proportion" label="占比" :formatter="tableFormatter" align="center"></el-table-column>
                        <el-table-column property="tgi" label="TGI" align="center"></el-table-column>
                    </el-table>
                </el-dialog>
                <!-- 年龄 -->
                <div @click="ageDialog = true"><chart-age ref="chartAge" id="chartAge2" :data="ageData" height='200px' width='340px'></chart-age></div>
                <el-dialog :visible.sync="ageDialog" :modal="false" top="40vh" width="429px" style="margin-left:60wh;">
                    <el-table :data="ageData"  style="border-radius:6px;">
                        <el-table-column property="name" label="年龄" width=""  align="center"></el-table-column>
                        <el-table-column property="num" label="用户数" width="" align="center"></el-table-column>
                        <el-table-column property="proportion" label="占比" :formatter="tableFormatter" align="center"></el-table-column>
                        <el-table-column property="tgi" label="TGI" align="center"></el-table-column>
                    </el-table>
                </el-dialog>
                <!-- 学历 -->
                <div @click="eduDialog = true"><chart-education ref="chartEdu" id="chartEdu2" :data="eduData" height='220px' width='340px'></chart-education></div>
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
    // 引入echars
	import ChartIndustry from "./echarts/industry";
	import ChartSex from "./echarts/sex";
	import ChartAge from "./echarts/age";
    import ChartEducation from "./echarts/education";
    import {audienceMergeKey, areafilterArr, mergeKeyByArea} from './dataDeal';
    import { aroundData, aroundDataByArea,businessData } from '@/api/putMap/comApi'
    export default {
        components: {
			ChartIndustry,
			ChartSex,
			ChartAge,
			ChartEducation,
        },
        props:{
            commData:{
                type: Array,
                default: ()=>{
                    return [];
                },
            }
        },
        data(){
            return {
                preferenceDialog: false,
                sexDialog: false,
				ageDialog: false,
                eduDialog: false,
                selArea: [],

                //图表数据
                sexData: [],
				ageData: [],
                eduData: [],
                preferList:[],

                //存放原始数据
                oSexData: [],
				oAgeData: [],
                oEduData: [],
                oPreferList:[],

                areaList:[],//区个数数据
            }
        },
        methods: {
            //初始化数据
            init(){
                if(this.commData.length <= 0)
                return;
                let arealist = mergeKeyByArea(this.commData);
                this.areaList = arealist
                this.$nextTick(()=>{
                    //获取人群分析数据
                    aroundData({areaStr: this.selArea.join(',')}).then(res =>{
                        //所有区的数据
                        this.sexData = audienceMergeKey(res.data.sex);
                        this.ageData = audienceMergeKey(res.data.age);
                        this.eduData = audienceMergeKey(res.data.edu);
                        //存放原始数据
                        this.oSexData = res.data.sex;
                        this.oAgeData = res.data.age;
                        this.oEduData = res.data.edu;
                        this.$nextTick(()=>{
                            this.$refs.chartSex.initChart();
                            this.$refs.chartAge.initChart();
                            this.$refs.chartEdu.initChart();
                        })
                    })

                    //获取偏好数据
                    aroundDataByArea({areaStr: this.selArea.join(',')}).then(res=>{
                        this.preferList = res.data
                        this.oPreferList = res.data
                    })
                })
            },

            //区的勾选改变是重新计算数据
            selAreaChange(val){
                let sexlist = areafilterArr(val,  this.oSexData);
                let agelist = areafilterArr(val,  this.oAgeData);
                let edulist = areafilterArr(val,  this.oEduData);
                this.sexData = audienceMergeKey(sexlist);
                this.ageData = audienceMergeKey(agelist);
                this.eduData = audienceMergeKey(edulist);
                this.$nextTick(()=>{
                    this.$refs.chartSex.initChart();
                    this.$refs.chartAge.initChart();
                    this.$refs.chartEdu.initChart();
                })
            },

            //列表字段重定义
            tableFormatter(row, column, cellValue, index){
				return cellValue+"%";
            },
        },
    }
</script>
<style lang="scss">
    #audience{
        height: 100%;
        .data-con{
            height: 100%;
            padding: 5px 20px 55px;
            overflow-y: auto;
        }
        .area-sel{
            line-height: 40px;
            border-bottom: 1px dashed #ccc;
            margin-bottom: 20px;
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
</style>


