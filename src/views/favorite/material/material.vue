<template>
	<div class="sucaizy">
		<p class="title">
			<span>我的素材库</span>
      <span class="rightButton">
			<el-button type="danger" @click="new_sucai" size="small">新增素材</el-button>
      </span>
			<!-- <button class="primary" style="margin-top:8px;cursor:pointer"  @click="new_sucai">新增素材</button> -->

		</p>
		<div class="clear"></div>
		<div class="sucai-body">
			<form>
				<p class="clear sucai-bdss">
					<span>素材名称</span>
					<el-input placeholder="请输入内容" v-model="input10" clearable>
					</el-input>
					<span>添加时间</span>
					<el-date-picker v-model="value2" :editable="false" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
					</el-date-picker>
					<el-button type="danger"  @click="search" size="small">搜索</el-button>
					<!-- <button class="sucai-ss" @click="search" type="button">
						搜索
					</button> -->
				</p>
			</form>
		</div>

		<div class="sucai-body1">
			<el-row :gutter="15">
				<el-col :span="6" v-for="list in materialList" :key="list.materialId">
					<div class="grid-content bg-purple sucai-k">
						<img class="sctp" v-bind:src="list.url" @error="imgError(list)" width="100%" height="206px" />
						<div>
							<h3>
								<!-- {{list.name}} -->

							</h3>
							<p>
								<span>{{list.createTime}}</span>
								<span>
									<a @click="edit($event,list.materialId)" style="cursor:pointer">
										<img src="../../../assets/images/yzqbj.png" />
									</a>
									&nbsp;
									<a @click="del($event,list.materialId)" style="cursor:pointer">
										<img src="../../../assets/images/yzqljx.png" />
									</a>
								</span>
							</p>
							<p>
								使用次数：
								<span>{{list.useTimes}}</span>
							</p>
							<p style="word-wrap: break-word;overflow: hidden;">
								<label style="float:left;display:block;">地址：
									<span>{{list.url}}</span>
								</label>
								<a v-bind:data-material="list.materialId" @click="details($event)" style="cursor:pointer">查看详情</a>
							</p>
						</div>
					</div>
				</el-col>

			</el-row>
		</div>

		<div class="page-wrap" align="right" style="padding-right: 33px;">
			<div class="inner">
				<a @click="setPage(pageNum-1)" v-if="pageNum>1" style="cursor:pointer">
					<i class="el-icon-arrow-left"></i> </a>
				<a @click="setPage(page)" v-for="page in pageShow" :class="{active:page==pageNum}" style="cursor:pointer" :key="page">{{page}}</a>
				<a @click="setPage(pageNum+1)" v-if="pages > pageNum" style="cursor:pointer">
					<i class="el-icon-arrow-right"></i>
				</a>
			</div>
		</div>

	</div>
</template>
<script>
import { mlibList } from "../../../api/material";
import { mlibDel } from "../../../api/material";
export default {
    data() {
        return {
            input10: "",
            materialList: [],
            pageNum: 1,
            pageSize: 8,
            pageShow: [], //显示页码
            pages: 1, //总页数
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [
                    {
                        text: "今天",
                        onClick(picker) {
                            picker.$emit("pick", new Date());
                        }
                    },
                    {
                        text: "昨天",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit("pick", date);
                        }
                    },
                    {
                        text: "一周前",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", date);
                        }
                    }
                ]
            },
            value1: "",
            value2: "",
            mlibList: null
        };
    },
    created() {
        this.comList(this.pageNum, this.pageSize);
    },
    methods: {
        new_sucai() {
            this.$router.push("/favorite/addMaterial");
        },
        edit(e, materialId) {
            this.$router.push("/favorite/editMaterial/" + materialId);
        },
        details(e) {
            var materialId = e.target.getAttribute("data-material");
            this.$router.push("/favorite/materialDetail/" + materialId);
        },
        //获取列表公共方法
        comList(pageNum, pageSize, name, beginTime) {
            mlibList(
                this.$store.getters.token,
                pageNum,
                pageSize,
                name,
                beginTime
            ).then(response => {
                this.materialList = [];
                if (response.msgCode == "1000" && response.data) {
                    this.materialList = response.data.list;
                    if (
                        response.data.pageNum + 2 < response.data.pages &&
                        response.data.pageNum > 3
                    ) {
                        this.pageShow = [
                            response.data.pageNum - 2,
                            response.data.pageNum - 1,
                            response.data.pageNum,
                            response.data.pageNum + 1,
                            response.data.pageNum + 2
                        ];
                    } else if (response.data.navigatepageNums.length < 5) {
                        this.pageShow = response.data.navigatepageNums;
                    } else if (
                        response.data.pageNum + 2 >= response.data.pages &&
                        response.data.navigatepageNums.length > 4
                    ) {
                        this.pageShow = [
                            response.data.pages - 4,
                            response.data.pages - 3,
                            response.data.pages - 2,
                            response.data.pages - 1,
                            response.data.pages
                        ];
                    } else if (
                        response.data.pageNum < 4 &&
                        response.data.navigatepageNums.length > 5
                    ) {
                        this.pageShow = [1, 2, 3, 4, 5];
                    }

                    this.pageNum = response.data.pageNum;
                    this.pages = response.data.pages;
                }
            });
        },
        search: function() {
            var name = this.input10;
            if (this.value2 != null) {
                var d = new Date(this.value2);
                var beginTime =
                    d.getFullYear() +
                    "-" +
                    (d.getMonth() + 1) +
                    "-" +
                    d.getDate() +
                    " " +
                    d.getHours() +
                    ":" +
                    d.getMinutes() +
                    ":" +
                    d.getSeconds();
            } else {
                var beginTime = "";
            }
            this.comList(this.pageNum, this.pageSize, name, beginTime);
        },
        //删除
        del: function(e, materialId) {
            mlibDel(this.$store.getters.token, materialId).then(response => {
                if (response.msgCode == "1000") {
                    this.$router.go("/favorite/material");
                } else {
                    alert("删除失败");
                }
            });
        },
        //点击分页
        setPage: function(page) {
            var name = this.input10;
            if (!name) {
                name = "";
            }
            if (this.value2 != null) {
                var d = new Date(this.value2);
                var beginTime =
                    d.getFullYear() +
                    "-" +
                    (d.getMonth() + 1) +
                    "-" +
                    d.getDate() +
                    " " +
                    d.getHours() +
                    ":" +
                    d.getMinutes() +
                    ":" +
                    d.getSeconds();
            } else {
                var beginTime = "";
            }
            if (name == "") {
                this.comList(page, this.pageSize);
            } else {
                this.comList(page, this.pageSize, name, beginTime);
            }
        },
        imgError(url) {
            url.url = require("../../../assets/images/home-mediaImg2.png");
        }
    }
};
</script>
<style >
.clear {
    clear: both;
}
.sucaizy > .title .rightButton {
    float: right;
    /* margin-right: 30px; */
}

/* ====================== */
.el-container > .el-main {
    background: #ffffff;
    border-radius: 6px;
    padding: 0px;
}

/* .sucai-title {
    height: 53px;
    line-height: 54px;
    padding: 0px 33px;
    font-size: 14px;
    color: #666666;
    border-bottom: 1px solid #eeeeee;
    text-align: left;
} */

.sucai-body {
    padding: 33px;
}

.sucai-body1 {
    padding: 33px;
    padding-top: 0px;
}

.sucai-bdss {
    height: 38px;
}

.sucai-bdss > span {
    display: inline-block;
    float: left;
    height: 38px;
    line-height: 38px;
    margin-right: 20px;
    color: #555555;
}

.sucai-bdss > .el-input {
    display: inline-block;
    float: left;
    margin-right: 20px;
}

.sucai-bdss > .el-input:nth-child(2) {
    width: 200px;
    height: 35px;
}

.sucai-ss {
    float: left;
    width: 70px;
    height: 35px;
    border: none;
    color: #ffffff;
    background: #e60012;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
}

.sucai-k {
    border: 1px solid #edf1f5;
    border-radius: 6px 6px 6px 6px !important;
    margin-bottom: 30px;
}

.sucai-k > img {
    border-radius: 6px 6px 0px 0px !important;
}

.sucai-k > div {
    text-align: left;
    padding: 25px 20px;
}

.sucai-k > div > h3 {
    color: #2f323e !important;
    height: 16px;
    line-height: 16px;
    font-weight: 400;
    margin-bottom: 15px;
}

.sucai-k > div > p:nth-child(2) {
    font-size: 12px;
    color: #8e9eaa;
    height: 14px;
    line-height: 14px;
    padding-bottom: 20px;
    border-bottom: 1px solid #edf1f5;
}

.sucai-k > div > p:nth-child(2) > span:nth-child(2) {
    float: right;
}

.sucai-k > div > p:nth-child(3) {
    font-size: 12px;
    margin-top: 20px;
    margin-bottom: 15px;
    color: #2f323e !important;
}

.sucai-k > div > p > span {
    color: #8e9eaa;
}

.sucai-k > div > p:nth-child(4) > a {
    float: right;
    display: inline-block;
    width: 74px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #e60012;
    color: #ffffff;
    border-radius: 6px;
    /* margin-top: -15px; */
    font-size: 12px;
}

.sucai-k > div > p:nth-child(4) > label {
    height: 30px;
}

.sucaizy {
    margin-bottom: 50px;
}

.sucaizy > .el-pagination {
    text-align: right;
    padding-right: 30px;
}

.sucaizy .btn-prev {
    margin: 0px !important;
}

.sucaizy .btn-next {
    margin: 0px !important;
}

.sucaizy .number {
    margin: 0px !important;
}

.sucaizy .more {
    margin: 0px !important;
}
.sctp {
    width: 100%;
    height: 206px;
    /* background:url(../../../assets/images/home-mediaImg2.png) no-repeat; */
}
</style>


