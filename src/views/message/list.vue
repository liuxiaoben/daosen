<template>
  <div class="qbxx" id="allMessages">
    <p class="title">
      全部消息
    </p>
    <div class="qbxx-body">

      <!-- 无数据展现提示页面 -->
      <div class="bgimg">
        <p>不好意思，暂时没有数据</p>
      </div>

      <div>
        <ul class="qbxx-ul1">
          <li v-for="(item,index) in whole" :id="item.id">
            <div>
              <img src="../../assets/images/xxrq.png" />
              <p>{{item.month}}</p>
              <p>{{item.day}}</p>
            </div>
            <div>
              <p>
                <!-- <el-checkbox v-model="checked">
	      								{{item.title}}
	      							</el-checkbox>&nbsp; -->
                <input type='checkbox' :checked="messageIds.indexOf(item.id)>=0" name='checkboxinput' class='input-checkbox' @click='checkedOne(item.id)'>{{item.title}}&nbsp;
                <i :class="item.status == 1?'the-icon':''" type="message" size="i3"></i>&nbsp;
                <span>{{item.time}}</span>
                <a @click="deleteOne(item.id)">
                  <img src="../../assets/images/yzqljx.png" />
                </a>
              </p>
              <p @click="readOne(item.id)">
                尊敬的{{username}}:
              </p>
              <div :class="index == isAdded?[widthChange]:'no_auto'">
                {{item.content}}
              </div>
              <div>
                <a @click="clickme(index)" href="#">︾</a>
              </div>

            </div>
            <div style="clear:both"></div>
          </li>
        </ul>
      </div>
      <!-- <el-checkbox v-model="checked">
	      			全选
	      		</el-checkbox>&nbsp; -->

      <input v-if="total" type='checkbox' class='input-checkbox' @click='checkedAll()'>
      <span v-if="total">全选</span>

      <el-button v-if="total" @click="readMessage()" type="text" size="small">
        <span v-if="total">已读</span>
      </el-button>
      <el-button v-if="total" type="text" @click="deleteMessage()" size="small">
        <span v-if="total">删除</span>
      </el-button>

      <div v-if="total" class="page-wrap" align="right" style="margin-top: 30px;">

        <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="pageNum" :prev-text="prevText" :next-text="nextText" @current-change="handleCurrentChange">
        </el-pagination>
      </div>

    </div>

  </div>
</template>

<script>
import { messageList } from "../../api/message";
import { messageStatusChange } from "../../api/message";
import { messageDelete } from "../../api/message";
export default {
    data() {
        return {
            username: this.$store.getters.name,
            activeName: "1",
            widthChange: "",
            checked: "",
            isAdded: 0,
            whole: [],
            pageNum: 1,
            pageSize: 5,
            total: 0,
            prevText: "<上一页",
            nextText: "下一页>",
            pre: false,
            next: false,
            status: null,
            mids: null,
            messageIds: [],
            isCheckedAll: false // 初始化全选按钮, 默认不选
        };
    },
    created() {
        this.getList();
    },
    methods: {
        handleChange(val) {
            console.log(val);
        },
        clickme(index) {
            if (index !== this.isAdded) {
                this.isAdded = index;
                this.widthChange = "no_auto";
            }
            if (this.widthChange == "no_auto") {
                this.widthChange = "auto";
            } else {
                this.widthChange = "no_auto";
            }
        },
        getList() {
            messageList(
                this.pageNum,
                this.pageSize,
                this.$store.getters.token,
                this.status
            ).then(response => {
                this.whole = response.data.list;
                this.total = response.data.total;
                this.pageNum = response.data.pageNum;
                this.pageSize = response.data.pageSize;
                this.pre = response.data.hasPreviousPage;
                this.next = response.data.hasNextPage;
                /* this.messageIds = []
				 if(response.data.list.length >0){
					for(var i = 0;i < response.data.list.length; i++) {
						this.messageIds.push(parseInt(response.data.list[i]['id']))
					}
				}
				console.log(this.messageIds)*/
            });
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getList();
        },
        messageStatusChange(mids) {
            messageStatusChange(this.$store.getters.token, this.mids).then(
                response => {
                    this.getList();
                }
            );
        },
        messageDelete(mids) {
            messageDelete(this.$store.getters.token, this.mids).then(
                response => {
                    this.getList();
                }
            );
        },

        checkedOne(messageId) {
            let idIndex = this.messageIds.indexOf(messageId);
            if (idIndex >= 0) {
                // 如果已经包含了该id, 则去除(单选按钮由选中变为非选中状态)
                this.messageIds.splice(idIndex, 1);
            } else {
                // 选中该checkbox
                this.messageIds.push(messageId);
            }
        },
        checkedAll() {
            this.isCheckedAll = !this.isCheckedAll;
            if (this.isCheckedAll) {
                // 全选时
                this.messageIds = [];
                this.whole.forEach(function(whole) {
                    this.messageIds.push(whole.id);
                }, this);
            } else {
                this.messageIds = [];
            }
        },
        readMessage() {
            this.mids = this.messageIds.join(",");
            this.messageStatusChange(this.messageIds);
            this.messageIds = [];
        },
        deleteMessage() {
            this.mids = this.messageIds.join(",");
            this.messageDelete(this.messageIds);
            this.messageIds = [];
        },
        deleteOne(id) {
            this.messageDelete(id);
            this.messageIds = [];
        },
        readOne(id) {
            this.messageStatusChange(id);
            this.messageIds = [];
        }
    }
};
</script>

<style>
#allMessages {
    min-height: 820px;
}
.qbxx-body {
    padding: 40px;
}

/* .qbxx-title {
    height: 53px;
    line-height: 54px;
    padding: 0px 33px;
    font-size: 14px;
    color: #666666 !important;
    border-bottom: 1px solid #eeeeee;
    text-align: left;
} */

#allMessages .title {
    line-height: 55px;
    padding-left: 30px;
    font-size: 14px;
    color: #e60012;
    position: relative;
    border-bottom: 2px solid #e4e7ed;
}
/* 添加伪类，做出下划线 */
#allMessages .title::after {
    content: " ";
    display: block;
    width: 55px;
    height: 9px;
    background: url(../../assets/images/help-dbl.png) repeat-x center;
    position: absolute;
    bottom: 0;
}

.qbxx-ul1 > li {
    height: auto;
    clear: both;
    padding: 30px 0px 0px 0px;
    /*overflow: hidden;*/
    /*border-bottom: 1px dashed #d0d0d0;*/
}

.qbxx-ul1 > li > div:nth-child(1) {
    float: left;
    width: 71px;
    height: 66px;
    text-align: center;
}

.qbxx-ul1 > li > div:nth-child(1) > p:nth-child(2) {
    margin-top: -58px;
    margin-bottom: 20px;
    color: #ffffff;
    font-size: 14px;
}

.qbxx-ul1 > li > div:nth-child(1) > p:nth-child(3) {
    color: #707070;
    font-size: 26px;
    font-weight: 600;
}

.qbxx-ul1 > li > div:nth-child(2) {
    margin-left: 10px;
    padding: 0px 30px;
    float: left;
    width: 88%;
    border-bottom: 1px dashed #d0d0d0;
    padding-bottom: 10px;
}

.qbxx-ul1 > li > div:nth-child(2) > p:nth-child(1) {
    margin-bottom: 19px;
    margin-left: -23px;
}

.qbxx-ul1 > li > div:nth-child(2) > p:nth-child(1) .el-checkbox__label {
    color: #666666;
    font-size: 14px;
}

.qbxx-ul1 > li > div:nth-child(2) > p:nth-child(1) span {
    color: #a6a6a6;
    font-size: 13px;
}

.qbxx-ul1 > li > div:nth-child(2) > p:nth-child(1) a {
    float: right;
}

.qbxx-ul1 > li > div:nth-child(2) > p:nth-child(2) {
    margin-bottom: 10px;
    color: #a2a2a2;
    font-size: 12px;
}

.qbxx-ul1 > li > div:nth-child(2) > div:nth-child(3) {
    color: #a2a2a2;
    font-size: 12px;
    line-height: 25px;
    height: 30px;
    overflow: hidden;
    margin-bottom: 10px;
}
.qbxx-ul1 > li > div:nth-child(2) > div:nth-child(3).auto {
    height: auto;
}
.qbxx-ul1 > li > div:nth-child(2) > div:nth-child(4) {
    height: 30px;
}

.qbxx-ul1 > li > div:nth-child(2) > div:nth-child(4) > a {
    display: block;
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #b6b6b6;
    line-height: 30px;
}
</style>
