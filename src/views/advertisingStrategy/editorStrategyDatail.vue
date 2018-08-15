<template>
  <div id="newStrategy">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="14%" class="newAside">
        <el-row>
          <el-col :span="16" :offset="4">
            <!-- 1 -->
            <a href="#">
              <el-row class="aside-margin">
                <el-col :span="6" class="num1"></el-col>
                <el-col :span="16" :offset="2">
                  <el-row class="num1-text1">策略信息</el-row>
                  <el-row class="num1-text2">当地时间7日，俄罗斯总统普京</el-row>
                </el-col>
              </el-row>
            </a>

            <!-- 2 -->
            <a href="#">
              <el-row class="aside-margin">
                <el-col :span="6" class="num2"></el-col>
                <el-col :span="16" :offset="2">
                  <el-row class="num1-text1">受众</el-row>
                  <el-row class="num1-text2">当地时间7日，俄罗斯总统普京</el-row>
                </el-col>
              </el-row>
            </a>

            <!-- 3 -->
            <a href="#">
              <el-row class="aside-margin">
                <el-col :span="6" class="num3"></el-col>
                <el-col :span="16" :offset="2">
                  <el-row class="num1-text1">媒体偏好</el-row>
                  <el-row class="num1-text2">当地时间7日，俄罗斯总统普京</el-row>
                </el-col>
              </el-row>
            </a>

          </el-col>
        </el-row>
      </el-aside>
      <!-- main -->
      <el-main>
        <el-row class="strategyTitle">策略信息</el-row>
        <!-- 策略信息 -->
        <el-row class="strategyText">
          <el-row class="strategyTitle-nav">
            <div class="title-left">
              <span>
                <span style="margin-left:25px;">策略信息</span>
                <el-popover placement="top-start" width="200" trigger="click" content="这里是简短的文字说明">
                  <a href="javascript:void(0)" class="doubt" slot="reference"></a>
                </el-popover>
              </span>
            </div>
            <div class="title-right">
              <a href="jacascript:void(0)" @click="centerDialogVisible1 = true"></a>
              <!-- 策略信息弹窗 -->
              <el-dialog title="策略信息" :visible.sync="centerDialogVisible1" class="enterprise">
                <el-row>
                  <el-col :span="12" class="explainArea">
                    <el-row class="enterprise-title">策略信息</el-row>
                    <el-row>
                      德媒认为，普京与施罗德的握手释放了进一步信号，那就是俄罗斯政府仍将德国视为是在西方的关键对话者。不仅如此，在就职仪式结束的几分钟后，克林姆林宫也宣布德国总理默克尔将前往莫斯科展开正式访问。
                    </el-row>
                  </el-col>
                  <el-col :span="12" class="formArea">
                    <el-form :label-position="labelPosition" label-width="80px" ref="info" :model="info" :rules="strategyRules">
                      <el-form-item label="策略名称" prop="title">
                        <el-input v-model="info.title" placeholder="请输入策略名称"></el-input>
                      </el-form-item>
                      <el-form-item label="计划投放时间" class="time" required>
                        <el-col :span="11">
                          <el-form-item prop="beginDate">
                            <el-date-picker v-model="info.beginDate" :editable="false" value-format="yyyy-MM-dd" type="date" placeholder="选择投放开始日期">
                            </el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :span="2" style="text-align: center;">
                          -
                        </el-col>
                        <el-col :span="11">
                          <el-form-item prop="endDate">
                            <el-date-picker v-model="info.endDate" :editable="false" value-format="yyyy-MM-dd" type="date" placeholder="选择投放结束日期">
                            </el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="投放预算" class="budget" prop="budget">
                        <el-input v-model="info.budget" placeholder="选择投放预算"></el-input> 万元
                      </el-form-item>
                      <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" :rows="2" placeholder="请输入备注" v-model="info.remark">
                        </el-input>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                  <el-button type="danger" @click="strategyInfo('info')">确 定</el-button>
                  <el-button type="info" @click="centerDialogVisible1 = false">取 消</el-button>
                </span>
              </el-dialog>
              <!-- 策略信息弹窗 -->
            </div>
            <div class="clear"></div>
          </el-row>
          <el-row class="strategyTitle-text">
            <el-row>
              <el-col :span="12">
                <strong>策略名称：</strong>{{ info.title }}
              </el-col>
              <el-col :span="12">
                <strong>预算：</strong>{{ info.budget }}元</el-col>
            </el-row>
            <el-row class="strategyTitle-margin">
              <strong>投放时间：</strong>
              {{ info.beginDate }}
              <span v-show="info.endDate !== undefined"> -</span> {{ info.endDate }}
            </el-row>
            <el-row class="strategyTitle-margin">
              <strong>备注：</strong>{{ info.remark }}
            </el-row>
          </el-row>
        </el-row>
        <!-- 企业信息 -->
        <el-row class="strategyText">
          <el-row class="strategyTitle-nav">
            <div class="title-left">
              <span>
                <span style="margin-left:25px;">企业信息</span>
                <el-popover placement="top-start" width="200" trigger="click" content="这里是简短的文字说明">
                  <a href="javascript:void(0)" class="doubt" slot="reference"></a>
                </el-popover>
              </span>
            </div>
            <div class="title-right">
              <a href="javascript:void(0)" @click="centerDialogVisible = true"></a>
              <!-- 企业信息弹窗 -->
              <el-dialog title="企业基本信息" :visible.sync="centerDialogVisible" class="enterprise">
                <el-row>
                  <el-col :span="12" class="explainArea">
                    <el-row class="enterprise-title">企业基本信息</el-row>
                    <el-row>
                      德媒认为，普京与施罗德的握手释放了进一步信号，那就是俄罗斯政府仍将德国视为是在西方的关键对话者。不仅如此，在就职仪式结束的几分钟后，克林姆林宫也宣布德国总理默克尔将前往莫斯科展开正式访问。
                    </el-row>
                  </el-col>
                  <el-col :span="12" class="formArea">
                    <el-form :label-position="labelPosition" label-width="80px" :model="info" ref="info" :rules="strategyRules">
                      <el-form-item label="企业名称" prop="ename">
                        <el-input v-model="info.ename" placeholder="请输入企业名称"></el-input>
                      </el-form-item>
                      <el-form-item label="行业" prop="industry">
                        <el-select v-model="info.industry" clearable placeholder="请选择行业" style="width: 100%">
                          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="联系人" prop="linkman">
                        <el-input v-model="info.linkman" placeholder="请输入联系人"></el-input>
                      </el-form-item>
                      <el-form-item label="联系方式" prop="phone">
                        <el-input v-model="info.phone" placeholder="请输入联系方式"></el-input>
                      </el-form-item>
                      <el-form-item label="品牌" prop="brand">
                        <el-input v-model="info.brand" placeholder="请输入品牌"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                  <el-button type="danger" @click="enInfo('info')">确 定</el-button>
                  <el-button type="info" @click="centerDialogVisible = false">取 消</el-button>
                </span>
              </el-dialog>
              <!-- 企业信息弹窗 -->
            </div>
            <div class="clear"></div>
          </el-row>
          <el-row class="strategyTitle-text">
            <el-row>
              <el-col :span="12">
                <strong>企业名称：</strong>{{ info.ename }}
              </el-col>
              <el-col :span="12">
                <strong>行业：</strong>{{ info.industryName }}
              </el-col>
            </el-row>
            <el-row class="strategyTitle-margin">
              <el-col :span="12">
                <strong>联系人：</strong>{{ info.linkman }}
              </el-col>
              <el-col :span="12">
                <strong>联系方式：</strong>{{ info.phone }}
              </el-col>
            </el-row>
            <el-row class="strategyTitle-margin">
              <strong>品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌：</strong>{{ info.brand }}
            </el-row>
          </el-row>
        </el-row>
        <!-- 目的 -->
        <el-row class="strategyText">
          <el-row class="strategyTitle-nav">
            <div class="title-left">
              <span>
                <span style="margin-left:25px;">目的</span>
                <el-popover placement="top-start" width="200" trigger="click" content="这里是简短的文字说明">
                  <a href="javascript:void(0)" class="doubt" slot="reference"></a>
                </el-popover>
              </span>
            </div>
            <div class="title-right">
              <a href="#" @click="centerDialogVisible2 = true"></a>
              <!-- 目的弹窗 -->
              <el-dialog title="目的" :visible.sync="centerDialogVisible2" class="enterprise" width="900px">
                <el-row>
                  <el-col :span="12" class="explainArea">
                    <el-row class="enterprise-title">目的-自定义</el-row>
                    <el-row>
                      德媒认为，普京与施罗德的握手释放了进一步信号，那就是俄罗斯政府仍将德国视为是在西方的关键对话者。不仅如此，在就职仪式结束的几分钟后，克林姆林宫也宣布德国总理默克尔将前往莫斯科展开正式访问。
                    </el-row>
                  </el-col>
                  <el-col :span="12" class="formArea">
                    <el-tabs v-model="activeName" class="objective-table">
                      <el-tab-pane>
                        <el-button type="primary" plain slot="label" name="first" size="small">自定义</el-button>
                        <!-- <span slot="label">自定义</span> -->
                        <!-- 树形 -->
                        <el-tree :data="data2" show-checkbox node-key="id" :props="defaultProps">
                        </el-tree>
                        <br/>
                        <el-tree :data="data21" show-checkbox node-key="id" :props="defaultProps">
                        </el-tree>
                        <br/>
                        <el-tree :data="data22" show-checkbox node-key="id" :props="defaultProps">
                        </el-tree>
                      </el-tab-pane>
                      <el-tab-pane>
                        <el-button type="primary" plain slot="label" name="second" size="small">智能组合</el-button>
                        <!-- <span slot="label">智能组合</span> -->
                        <el-row>
                          <el-col :span="8">
                            <el-radio v-model="radio" label="1">智能组合1：</el-radio>
                          </el-col>
                          <el-col :span="16">产品发布/新品上市</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">
                            <el-radio v-model="radio" label="2">智能组合1：</el-radio>
                          </el-col>
                          <el-col :span="16">产品发布/新品上市</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">
                            <el-radio v-model="radio" label="3">智能组合1：</el-radio>
                          </el-col>
                          <el-col :span="16">产品发布/新品上市</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">
                            <el-radio v-model="radio" label="4">智能组合1：</el-radio>
                          </el-col>
                          <el-col :span="16">产品发布/新品上市</el-col>
                        </el-row>

                      </el-tab-pane>
                    </el-tabs>
                  </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                  <el-button type="danger" @click="centerDialogVisible2 = false">确 定</el-button>
                  <el-button type="info" @click="centerDialogVisible2 = false">取 消</el-button>
                </span>
              </el-dialog>
              <!-- 目的弹窗 -->
            </div>
            <div class="clear"></div>
          </el-row>
          <el-row class="strategyTitle-text">
            <el-row>
              <el-col :span="12">
                <strong>目的：</strong>自定义</el-col>
            </el-row>
            <el-row>
              <el-col v-for=" list1 in purposesData" :key="list1.id">
                <el-col v-for="list2 in list1.children" :key="list2.id">
                  <strong>{{ list2.name }}</strong>
                </el-col>
              </el-col>
            </el-row>
          </el-row>
        </el-row>
        <!-- 投放区域 -->
        <el-row class="strategyText">
          <el-row class="strategyTitle-nav">
            <div class="title-left">
              <span>
                <span style="margin-left:25px;">投放区域</span>
                <el-popover placement="top-start" width="200" trigger="click" content="这里是简短的文字说明">
                  <a href="javascript:void(0)" class="doubt" slot="reference"></a>
                </el-popover>
              </span>
            </div>
            <div class="title-right">
              <a href="#"></a>
            </div>
            <div class="clear"></div>
          </el-row>
          <el-row class="strategyTitle-text">
            <el-tree :data="cityTree" :props="defaultProps"></el-tree>
          </el-row>
        </el-row>
        <!-- 受众 -->
        <el-row class="strategyTitle audience">受众</el-row>
        <!-- 策略信息 -->
        <el-row class="strategyText">
          <el-row class="strategyTitle-nav">
            <div class="title-left">
              <span>
                <span style="margin-left:25px;">受众描述</span>
                <el-popover placement="top-start" width="200" trigger="click" content="这里是简短的文字说明">
                  <a href="javascript:void(0)" class="doubt" slot="reference"></a>
                </el-popover>
              </span>
            </div>
            <div class="title-right">
              <a href="#"></a>
            </div>
            <div class="clear"></div>
          </el-row>

          <el-row>
            <el-collapse-transition>
              <div v-show="show3" class="strategyTitle-text" style="padding:0">
                <div class="transition-box">

                  <el-row class="audience-title">基本属性</el-row>
                  <el-row>
                    <el-col v-for="list1 in tableData" :key="list1.id">
                      <div class="dataStyle strategyTitle-margin">
                        <strong>{{ list1.name }}</strong>
                      </div>
                      <div class="dataStyle">
                        <el-col v-for="list2 in list1.childs" :key="list2.id" class="strategyTitle-margin">
                          <div class="dataStyle">{{list2.name}} 等级：</div>
                          <div class="dataStyle">
                            <span style="color:red;">{{list2.value}}</span>
                          </div>
                        </el-col>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-collapse-transition>
          </el-row>

          <!-- 展开按钮 -->
          <el-row class="an">
            <el-button @click="show3 = !show3" size="mini">
              <div v-if="show3 == false">展开
                <i class="el-icon-caret-bottom"></i>
              </div>
              <div v-else>收起
                <i class="el-icon-caret-top"></i>
              </div>
            </el-button>
          </el-row>
        </el-row>

        <!-- 媒体偏好 -->
        <el-row class="strategyTitle media">媒体偏好</el-row>
        <!-- 策略信息 -->
        <el-row class="strategyText">
          <el-row class="strategyTitle-nav">
            <div class="title-left">
              <span>
                <span style="margin-left:25px;">媒体偏好</span>
              </span>
            </div>
            <div class="title-right">
              <a href="#"></a>
            </div>
            <div class="clear"></div>
          </el-row>
          <el-row class="strategyTitle-text add-margin">
            <el-row class="media-title">
              <el-col :span="3" :offset="1">
                <el-rate v-model="value5" disabled show-score text-color="#e60012;" score-template="{value}">
                </el-rate>
              </el-col>
              <el-col :span="20" class="media-text">
                温馨提示：红色填充的星星个数越多，喜好程度越高，最高5个。
              </el-col>
            </el-row>
            <!-- 线上 线下  非标 -->
            <!-- 线上 -->
            <el-row class="media-title-margin">
              <el-col v-for="likes in likesData" :key="likes.id">
                <div class="dataStyle">{{likes.label}}</div>
                <div class="dataStyle dataStyle1">
                  <el-col v-for="likes2 in likes.children" :key="likes2.id">
                    <div class="dataStyle">{{likes2.label}}</div>
                    <div class="dataStyle dataStyle2">
                      <el-col v-for="like3 in likes2.children" class="dataStyle3" :key="like3.id">
                        <div class="dataStyle">
                          {{like3.label}}
                        </div>
                        <div>
                          <el-rate v-model="like3.score" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
                        </div>
                      </el-col>
                    </div>
                  </el-col>
                </div>
              </el-col>

            </el-row>

          </el-row>
        </el-row>
        <!-- 确定 取消 -->
        <el-row class="newStrategy-button">
          <el-button type="danger" @click="editorList">确定</el-button>
          <el-button type="info">取消</el-button>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
//引入策略详情 ，策略编辑接口
import { details, editor } from "../../api/advertisingStrategy";

export default {
    data() {
        return {
            //定义返回数据
            strId: "",
            title: "",
            budget: "",
            beginDate: "",
            endDate: "",
            ename: "",
            linkman: "",
            phone: "",
            industry: "",
            industryName: "",
            brand: "",
            audiences: "",
            purposes: "",
            remark: "",
            purposeType: 1,
            //策略信息
            info: [],
            showStrategy: [],

            //受众
            tableData: [],
            //树形
            cityTree: [],
            //评分
            likesData: [],
            //目的
            purposesData: [],
            banklistinfo: [],
            showEn: [],
            industry: "",
            enInformation: {
                ename: "",
                linkman: "",
                phone: "",
                industry: "",
                brand: ""
            },
            //策略信息
            formLabelAlign: {
                title: "", //标题
                budget: "", //预算
                beginDate: "", //开始时间
                endDate: "", //结束时间
                remark: "" //备注
            },
            showStrategy: {
                title: "", //标题
                budget: "", //预算
                beginDate: "", //开始时间
                endDate: "", //结束时间
                remark: "" //备注
            },
            strategyRules: {
                title: [
                    {
                        required: true,
                        message: "请输入策略名称",
                        trigger: "blur"
                    }
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                beginDate: [
                    {
                        type: "string",
                        required: true,
                        message: "选择投放开始日期",
                        trigger: "change"
                    }
                ],
                endDate: [
                    {
                        type: "string",
                        required: true,
                        message: "选择投放开始日期",
                        trigger: "change"
                    }
                ],
                budget: [
                    { required: true, message: "选择投放预算", trigger: "blur" }
                ],
                remark: [
                    { required: true, message: "请输入备注", trigger: "blur" }
                ],
                ename: [
                    {
                        required: true,
                        message: "请输入企业名称",
                        trigger: "blur"
                    }
                ],
                industry: [
                    { required: true, message: "请选择行业", trigger: "change" }
                ],
                linkman: [
                    { required: true, message: "请输入联系人", trigger: "blur" }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入联系方式",
                        trigger: "blur"
                    }
                ],
                brand: [
                    { required: true, message: "请输入品牌", trigger: "blur" }
                ]
            },

            //弹窗
            centerDialogVisible: false,
            centerDialogVisible1: false,
            centerDialogVisible2: false,
            //绑定时间
            value1: "",
            value2: "",
            //文本域
            textarea: "",
            //目的选项卡
            activeName: "first",
            labelPosition: "top",
            //智能组合
            radio: "1",
            radio: "2",
            radio: "3",
            radio: "4",
            //树形
            data2: [
                {
                    id: 1,
                    label: "告知",
                    children: [
                        {
                            id: 4,
                            label: "新品上市"
                        }
                    ]
                }
            ],
            data21: [
                {
                    id: 2,
                    label: "说服",
                    children: [
                        {
                            id: 5,
                            label: "产品发布"
                        },
                        {
                            id: 6,
                            label: "产品发布"
                        }
                    ]
                }
            ],
            data22: [
                {
                    id: 3,
                    label: "提醒",
                    children: [
                        {
                            id: 7,
                            label: "产品发布"
                        },
                        {
                            id: 8,
                            label: "产品发布"
                        }
                    ]
                }
            ],
            defaultProps: {
                children: "children",
                label: "label"
            },
            options: [
                {
                    value: "选项1",
                    label: "黄金糕"
                },
                {
                    value: "选项2",
                    label: "双皮奶"
                },
                {
                    value: "选项3",
                    label: "蚵仔煎"
                },
                {
                    value: "选项4",
                    label: "龙须面"
                },
                {
                    value: "选项5",
                    label: "北京烤鸭"
                }
            ],
            value4: "",

            show3: true,
            value5: 3.7,
            data: [
                {
                    id: 1,
                    label: "湖北省",
                    children: [
                        {
                            id: 2,
                            label: "武汉市",
                            children: [
                                {
                                    id: 3,
                                    label: "洪山区/江夏区/东湖高新技术开发区"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 4,
                    label: "湖南省",
                    children: [
                        {
                            id: 5,
                            label: "洪湖市",
                            children: [
                                {
                                    id: 6,
                                    label: "洪山区/江夏区/东湖高新技术开发区"
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: "children",
                label: "label"
            }
        };
    },

    //业务逻辑

    methods: {
        //策略信息
        strategyInfo(formName) {
            console.log(123);
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // this.showStrategy = this.formLabelAlign;
                    this.centerDialogVisible1 = false;
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        //企业信息
        enInfo(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // this.showEn = this.enInformation;
                    // this.changeLocationValue(this.showEn.industry);
                    this.centerDialogVisible = false;
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        //调用编辑API
        // editorList() {
        //     let strId = this.$route.query.strId;
        //     const editorListToken = {
        //         token: this.$store.getters.token,
        //         strId, //这个时候直接写入这个变量，因为ID已经拿到了
        //         title: this.title,
        //         budget: this.budget,
        //         beginDate: this.beginDate,
        //         endDate: this.endDate,
        //         ename: this.ename,
        //         linkman: this.linkman,
        //         phone: this.phone,
        //         industry: this.industry,
        //         brand: this.brand,
        //         purposeType: this.purposeType
        //     };
        //     console.log(editorListToken);
        //     editor(editorListToken)
        //         .then(response => {
        //             this.loading = false;
        //         })
        //         .catch(() => {
        //             this.loading = false;
        //         });
        // },
        editorList() {
            let strId = this.$route.query.strId;
            const editorListToken = {
                token: this.$store.getters.token,
                strId, //这个时候直接写入这个变量，因为ID已经拿到了
                title: this.title,
                budget: this.budget,
                beginDate: this.beginDate,
                endDate: this.endDate,
                ename: this.ename,
                linkman: this.linkman,
                phone: this.phone,
                industry: this.industry,
                brand: this.brand,
                purposeType: this.purposeType
            };
            this.$confirm("请确认是否编辑策略信息, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                editor(editorListToken).then(response => {
                    if (response.msgCode == "1000") {
                        this.$message({
                            message: "编辑成功",
                            type: "success"
                        });
                    } else {
                        this.$message.error("编辑失败");
                    }
                });
            });
        }
    },
    //钩子函数
    created() {
        //接收从广告策略带过来的ID
        let strId = this.$route.query.strId;
        console.log(strId);
        const detailsToken = {
            token: this.$store.getters.token,
            strId //这个时候直接写入这个变量，因为ID已经拿到
        };
        details(detailsToken)
            .then(response => {
                // this.detailsList = response.data;
                let info = response.data;
                console.log(info);
                this.info = [];
                this.info = response.data;
                console.log(this.info);

                this.strId = info.strId;
                this.title = info.title;
                this.budget = info.budget;
                this.beginDate = info.beginDate;
                this.endDate = info.endDate;
                this.ename = info.ename;
                this.linkman = info.linkman;
                this.phone = info.phone;
                this.industry = info.industry;
                this.industryName = info.industryName;
                this.brand = info.brand;
                this.audiences = info.audiences;
                //备注
                this.remark = info.remark;
                //目的
                this.purposesData = [];
                this.purposesData = response.data.purposes;
                //受众
                this.tableData = [];
                this.tableData = response.data.audiences;
                //树形
                this.cityTree = [response.data.areas];
                //评分
                this.likesData = [];
                this.likesData = response.data.likes;
            })
            .catch(() => {
                this.loading = false;
            });
    }
};
</script>
<style>
#newStrategy .el-tree-node__expand-icon {
    color: #e60012;
}
#newStrategy .el-container {
    margin-top: 30px;
}
#newStrategy .newAside {
    min-height: 500px;
    background-color: #fff;
    border-radius: 5px;
    margin-right: 1%;
}
#newStrategy .el-main {
    width: 85%;
    min-height: 500px;
    background-color: #fff;
    border-radius: 5px;
    padding: 45px 50px 75px 50px;
}
.clear {
    clear: both;
}
/* 侧边栏 */
.aside-margin {
    margin-top: 50px;
}
.num1 {
    width: 32px;
    height: 36px;
    background-image: url(../../assets/images/num1.png);
    background-size: cover;
    background-repeat: no-repeat;
}
.num2 {
    width: 32px;
    height: 36px;
    background-image: url(../../assets/images/num2.png);
    background-size: cover;
    background-repeat: no-repeat;
}
.num3 {
    width: 32px;
    height: 36px;
    background-image: url(../../assets/images/num3.png);
    background-size: cover;
    background-repeat: no-repeat;
}
.num1-text1 {
    font-size: 16px;
    font-weight: 600;
    color: #e60012;
    line-height: 32px;
}
.num1-text2 {
    font-size: 12px;
    line-height: 20px;
    color: #999;
}
/* 策略信息 */
.strategyTitle {
    font-size: 24px;
    color: #333;
    font-weight: 600;
}
.strategyText {
    margin-top: 25px;
}
.strategyTitle-nav {
    width: 100%;
    height: 57px;
    line-height: 57px;
    background-color: #fafafa;
    border: 1px solid #edf1f5;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
.strategyTitle-text {
    width: 100%;
    font-size: 14px;
    color: #333;
    padding: 25px 25px 30px 25px;
    border: 1px solid #edf1f5;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}
.strategyTitle-margin {
    margin-top: 20px;
}
.title-left {
    width: 150px;
    font-size: 16px;
    color: #333;
    float: left;
}
.title-left > span {
    font-weight: 600;
    border-left: 3px solid #e60012;
}
.doubt {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-image: url(../../assets/images/doubt-icon.png);
    background-repeat: no-repeat;
    background-size: cover;
    margin-left: 10px;
}
.title-right {
    float: right;
    margin-right: 30px;
}
.title-right > a {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-image: url(../../assets/images/editor-333-icon.png);
    background-repeat: no-repeat;
    background-size: cover;
}
.title-right > a:hover {
    background-image: url(../../assets/images/editor-red-icon.png);
    background-repeat: no-repeat;
    background-size: cover;
}
.strategyTitle-text .el-tree-node__expand-icon.expanded {
    color: #e60012;
}
/* 受众 */
.audience {
    margin-top: 100px;
}
.audience-title {
    font-size: 14px;
    color: #333;
    font-weight: 600;
}
.audience-title-head {
    margin-top: 25px;
    font-size: 14px;
    color: #333;
    font-weight: 600;
}
.audience-title-text {
    margin-top: 25px;
    font-size: 14px;
    color: #333;
}
.audience-title-text-color {
    color: #e60012;
}

/* 媒体偏好 */
.media {
    margin-top: 100px;
}
.media-title {
    height: 30px;
    line-height: 30px;
    border: 1px solid #c1e7ff;
    border-radius: 5px;
    background-color: #fafdff;
}
.media-title .el-rate {
    margin-top: 5px;
}
.media-title .el-rate__text {
    display: none;
}
.media-title-margin {
    margin-top: 30px;
}
.media-text {
    color: #67c4fe;
}
.media-line {
    font-weight: 600;
}
.media-stars {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-image: url(../../assets/images/media-stars.png);
    background-size: cover;
    background-repeat: no-repeat;
}
.media-score {
    color: #e60012;
}
.media-margin {
    margin-top: 20px;
}
.add-margin {
    padding-bottom: 60px;
}
/* 确定-取消按钮 */
.newStrategy-button {
    margin-top: 30px;
}
/* 企业信息弹窗 */
.enterprise .el-dialog {
    width: 750px;
}
/* 目的弹窗 */
 .goal .el-dialog{
    width: 900px;
}
.enterprise .el-dialog__header {
    padding: 0;
    height: 60px;
    line-height: 60px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #e3e7ea;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
.enterprise .el-dialog__title {
    margin-left: 30px;
}
.enterprise .el-dialog__body {
    padding: 40px 30px;
}
.enterprise .el-dialog__footer {
    text-align: left;
    padding: 12px 30px;
    border-top: 1px solid #e3e7ea;
}
.enterprise-title {
    font-weight: 600;
    margin-bottom: 30px;
}
.enterprise .el-form-item__label {
    line-height: 0;
    font-weight: 600;
}
.enterprise .el-input--suffix .el-input__inner {
    padding-right: 155px;
}
/* 计划投放时间 */
.time .el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 150px;
}
.time .el-input--suffix .el-input__inner {
    padding-right: 30px;
}
/* 投放预算 */
.budget .el-input {
    width: 89%;
}
/* 自定义选项卡 */
.objective-table .el-tabs__active-bar {
    display: none;
}
.objective-table .el-tabs__nav-wrap::after {
    display: none;
}
.objective-table .el-tabs__item {
    padding: 0;
}
.objective-table .el-tree {
    width: 100%;
    height: 25px;
}
.objective-table .el-tree-node {
    display: block;
    width: 100%;
}
.objective-table .el-tree-node__content {
    float: left;
}
/* addStyle */
.dataStyle {
    float: left;
    padding-right: 20px;
    min-width: 75px;
    /* min-width: 70px;
    text-align: right; */
}
.media-title-margin .dataStyle1 {
    width: 90%;
}
.media-title-margin .dataStyle2 {
    width: 90%;
}
.media-title-margin .dataStyle3 {
    width: 22%;
    padding-right: 10px;
}

/* 展开按钮 */
#newStrategy .an {
    text-align: center;
}
#newStrategy .an .el-button {
    margin-top: -1px;
    width: 80px;
    background-color: #fff;
    border-color: #dfdfdf;
    border-top: none;
    color: #666;
}
#newStrategy .an .el-button:hover {
    color: red;
}
#newStrategy .an .el-button i {
    font-weight: bold;
}
#newStrategy .transition-box {
    padding: 25px 25px 30px 25px;
}

/* 弹窗内部样式 */
#newStrategy .enterprise .explainArea{
  padding-right: 15px;
}
#newStrategy .enterprise .formArea{
  padding-left: 15px;
}

   /* 单选框样式 */
#newStrategy .el-radio__input.is-checked .el-radio__inner {
      border-color: #e60111;
      background-color: #fff;
}
#newStrategy .el-radio__input.is-checked + .el-radio__label {
      color: #e60111;
}
#newStrategy .el-radio__inner:hover {
      border-color: #e60111;
}
#newStrategy .el-radio__inner::after {
      width: 8px;
      height: 8px;
      background-color: #e60111;
}

#newStrategy .enterprise .el-tree-node > .el-tree-node__children{
  left: 80px;
}
</style>
