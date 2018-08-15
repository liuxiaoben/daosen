<template>
  <div id="newStrategy">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="14%" class="newAside" id="asideTitle">
        <ul>
          <li @click="jump1" :class="{'active':act1}">
            <p class="num1-text1">策略信息</p>
            <p class="num1-text2">当地时间7日，俄罗斯总统普京俄罗斯总统普京俄罗斯总统普京</p>
          </li>
          <li @click="jump2" :class="{'active':act2}">
            <p class="num1-text1">受众</p>
            <p class="num1-text2">当地时间7日，俄罗斯总统普京俄罗斯总统普京俄罗斯总统普京</p>
          </li>
          <li @click="jump3" :class="{'active':act3}">
            <p class="num1-text1">媒体偏好</p>
            <p class="num1-text2">当地时间7日，俄罗斯总统普京俄罗斯总统普京俄罗斯总统普京</p>
          </li>
        </ul>

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
                    <el-form :label-position="labelPosition" label-width="80px" ref="formLabelAlign" :model="formLabelAlign" :rules="strategyRules">
                      <el-form-item label="策略名称" prop="title">
                        <el-input v-model="formLabelAlign.title" placeholder="请输入策略名称"></el-input>
                      </el-form-item>
                      <el-form-item label="计划投放时间" class="time" required>
                        <el-col :span="11">
                          <el-form-item prop="beginDate">
                            <el-date-picker v-model="formLabelAlign.beginDate" :editable="false" value-format="yyyy-MM-dd" type="date" placeholder="选择开始日期">
                            </el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :span="2" style="text-align: center;">
                          -
                        </el-col>
                        <el-col :span="11">
                          <el-form-item prop="endDate">
                            <el-date-picker v-model="formLabelAlign.endDate" :editable="false" value-format="yyyy-MM-dd" type="date" placeholder="选择结束日期">
                            </el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-form-item>
                      <el-form-item label="投放预算" class="budget" prop="budget">
                        <el-input v-model="formLabelAlign.budget" placeholder="请输入投放预算"></el-input> 万元
                      </el-form-item>
                      <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" :rows="3" placeholder="请输入备注信息" v-model="formLabelAlign.remark">
                        </el-input>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                  <el-button type="danger" @click="strategyInfo('formLabelAlign')">确 定</el-button>
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
                <strong>策略名称：{{ showStrategy.title }}</strong>
              </el-col>
              <el-col :span="12">
                <strong>预算：{{ showStrategy.budget }}</strong>元</el-col>
            </el-row>
            <el-row class="strategyTitle-margin">
              <strong>投放时间：{{ showStrategy.beginDate }}
                <span v-show="showStrategy.endDate !== undefined">-</span> {{ showStrategy.endDate }} </strong>
            </el-row>
            <el-row class="strategyTitle-margin">
              <strong>备注：{{ showStrategy.remark }}</strong>
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
                    <el-form :label-position="labelPosition" label-width="80px" :model="enInformation" ref="enInformation" :rules="strategyRules">
                      <el-form-item label="企业名称" prop="ename">
                        <el-input v-model="enInformation.ename" placeholder="请输入企业名称"></el-input>
                      </el-form-item>
                      <el-form-item label="行业" prop="industry">
                        <el-select v-model="enInformation.industry" clearable placeholder="请选择行业" style="width: 100%">
                          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="联系人" prop="linkman">
                        <el-input v-model="enInformation.linkman" placeholder="请输入联系人"></el-input>
                      </el-form-item>
                      <el-form-item label="联系方式" prop="phone">
                        <el-input v-model="enInformation.phone" placeholder="请输入联系方式"></el-input>
                      </el-form-item>
                      <el-form-item label="品牌" prop="brand">
                        <el-input v-model="enInformation.brand" placeholder="请输入品牌"></el-input>
                      </el-form-item>
                    </el-form>
                  </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                  <el-button type="danger" @click="enInfo('enInformation')">确 定</el-button>
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
                <strong>企业名称：{{ showEn.ename }}</strong>
              </el-col>
              <el-col :span="12">
                <strong>行业：{{ industry }}</strong>
              </el-col>
            </el-row>
            <el-row class="strategyTitle-margin">
              <el-col :span="12">
                <strong>联系人：{{ showEn.linkman }}</strong>
              </el-col>
              <el-col :span="12">
                <strong>联系方式：{{ showEn.phone }}</strong>
              </el-col>
            </el-row>
            <el-row class="strategyTitle-margin">
              <strong>品牌：{{ showEn.brand }}</strong>
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
              <a href="javascript:void(0)" @click="openPurpose()"></a>
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
                        <el-button type="primary" plain slot="label" name="first" size="small" @click="purposeType('1','自定义')">自定义</el-button>
                        <!-- <span slot="label">自定义</span> -->
                        <!-- 树形 -->
                        <el-tree :data="data2" show-checkbox node-key="id" ref="tree" accordion :props="defaultProps">
                        </el-tree>
                      </el-tab-pane>
                      <el-tab-pane>
                        <el-button type="primary" plain slot="label" name="second" size="small" @click="purposeType('2','智能组合')">智能组合</el-button>
                        <!-- <span slot="label">智能组合</span> -->
                        <el-row v-for="(item,key) in data3" :key="key">
                          <el-col :span="8">
                            <el-radio v-model="radio" :label="item.id">{{ item.name }}</el-radio>
                          </el-col>
                        </el-row>
                      </el-tab-pane>
                    </el-tabs>
                  </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                  <el-button type="danger" @click="purposeInfo()">确 定</el-button>
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
                <strong>目的：</strong>{{ purposeName }}</el-col>
            </el-row>
            <el-row class="strategyTitle-margin">
              <span v-for="(item,key) in purposeList" :key="key" v-if="purpose[0].id == 1">
                <strong v-if="item.leaf == false"><br/>{{ item.name }}：</strong>
                <span v-if="item.leaf == true">{{ item.name }}&nbsp;&nbsp;</span>
              </span>
              <span v-if="znList.name !== ''">{{ znList.name }}</span>
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
              <a href="javascript:void(0)" @click="openArea()"></a>
              <el-dialog title="投放区域" :visible.sync="areaBox" class="areaBox" width="1115px">
                <el-row>
                  <el-col :span="14">
                    <el-tree :props="props" :load="loadNode" lazy accordion ref="areaTree" show-checkbox node-key="id" @check-change="handleCheckChange" class="tree"></el-tree>
                  </el-col>
                  <el-col :span="10">
                    <span v-for="(item,key) in area" :key="key">{{ item.label }}
                      <span v-if="key !== areaLength-1">,</span>
                    </span>
                  </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                  <el-button type="danger" @click="purposeInfo()">确 定</el-button>
                  <el-button type="info" @click="areaBox = false">取 消</el-button>
                </span>
              </el-dialog>
            </div>
            <div class="clear"></div>
          </el-row>
          <el-row class="strategyTitle-text">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" node-key="id" :default-expanded-keys="[1,2,3,4,5,6]"></el-tree>
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

          <!-- html部分 -->

          <el-row>
            <el-collapse-transition>

              <div class="strategyTitle-text" v-show="show3" style="padding:0">
                <div class="transition-box">

                  <!-- 这一部分部分没有修改 start-->

                  <el-row class="audience-title">基本属性</el-row>
                  <!-- 年龄 -->
                  <el-row>
                    <el-col class="audience-title-head" :span="2">年龄：</el-col>
                    <el-col class="audience-title-text" :span="22">
                      <el-row>
                        <el-col :span="4">童年(0-7岁) 等级：
                          <span class="audience-title-text-color">3</span>
                        </el-col>
                        <el-col :span="4">童年(0-7岁) 等级：
                          <span class="audience-title-text-color">3</span>
                        </el-col>
                        <el-col :span="4">童年(0-7岁) 等级：
                          <span class="audience-title-text-color">3</span>
                        </el-col>
                        <el-col :span="4">童年(0-7岁) 等级：
                          <span class="audience-title-text-color">3</span>
                        </el-col>
                        <el-col :span="4">童年(0-7岁) 等级：
                          <span class="audience-title-text-color">3</span>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                  <!-- 性别 -->
                  <el-row>
                    <el-col class="audience-title-head" :span="2">性别：</el-col>
                    <el-col class="audience-title-text" :span="22">
                      <el-row>男50%：女%</el-row>
                    </el-col>
                  </el-row>
                  <!-- 是否有房 -->
                  <el-row>
                    <el-col class="audience-title-head" :span="2">是否有房：</el-col>
                    <el-col class="audience-title-text" :span="22">
                      <el-row>是50%：否50%</el-row>
                    </el-col>
                  </el-row>
                  <!-- 是否有车 -->
                  <el-row>
                    <el-col class="audience-title-head" :span="2">是否有车：</el-col>
                    <el-col class="audience-title-text" :span="22">
                      <el-row>是50%：否50%</el-row>
                    </el-col>
                  </el-row>
                  <!-- 教育水平 -->
                  <!-- 小学50%      初中20%       高中10%        专科5%        本科1%        硕士5%       博士1% -->
                  <el-row>
                    <el-col class="audience-title-head" :span="2">教育水平：</el-col>
                    <el-col class="audience-title-text" :span="22">
                      <el-row>
                        <el-col :span="16">
                          <el-row>
                            <el-col :span="3">小学50%</el-col>
                            <el-col :span="3">初中20%</el-col>
                            <el-col :span="3">高中10%</el-col>
                            <el-col :span="3">专科5%</el-col>
                            <el-col :span="3">本科1%</el-col>
                            <el-col :span="3">硕士5%</el-col>
                            <el-col :span="3">博士1%</el-col>
                          </el-row>
                        </el-col>
                      </el-row>
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
              <a href="jacascript:void(0)" @click="openMedia"></a>
              <el-dialog title="媒体偏好" :visible.sync="mediaBox" class="mediaBox" width="750px">
                <el-row>
                  <el-col :span="14">
                    <el-tree :props="mediaProp" :load="mediaTree" lazy accordion ref="mediaTree" show-checkbox node-key="id" @check-change="checkMedia" class="tree"></el-tree>
                  </el-col>
                  <el-col :span="10">
                  </el-col>
                </el-row>
                <span slot="footer" class="dialog-footer">
                  <el-button type="danger" @click="purposeInfo()">确 定</el-button>
                  <el-button type="info" @click="areaBox = false">取 消</el-button>
                </span>
              </el-dialog>
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
              <el-col :span="1" class="media-line">线上</el-col>
              <el-col :span="2">二级分类></el-col>
              <el-col :span="21">
                <el-row>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                </el-row>
                <el-row class="media-margin">
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                </el-row>
                <el-row class="media-margin">
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 线下 -->
            <el-row class="media-title-margin">
              <el-col :span="1" class="media-line">线下</el-col>
              <el-col :span="2">二级分类></el-col>
              <el-col :span="21">
                <el-row>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                </el-row>
              </el-col>
            </el-row>
            <!-- 非标 -->
            <el-row class="media-title-margin">
              <el-col :span="1" class="media-line">非标</el-col>
              <el-col :span="2">二级分类></el-col>
              <el-col :span="21">
                <el-row>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                  <el-col :span="4">三级分类（
                    <span class="media-score">3.5 </span>
                    <span class="media-stars"></span>）</el-col>
                </el-row>
              </el-col>
            </el-row>

          </el-row>
        </el-row>
        <!-- 确定 取消 -->
        <el-row class="newStrategy-button">
          <el-button type="danger">确定</el-button>
          <el-button type="info">取消</el-button>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { newStrategy, listTree, findAll } from "../../api/newStrategy";
import { country, privince, city, distinct, listByPid } from "@/api/underline";
export default {
    data() {
        return {
            formLabelAlign: {
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
            showStrategy: [],
            showEn: [],
            industry: "",
            enInformation: {
                ename: "",
                linkman: "",
                phone: "",
                industry: "",
                brand: ""
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
            radio: "",
            //树形
            data2: [],
            data3: [],
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
                children: "childs",
                label: "name"
            },
            purpose: [],
            purposeName: "",
            purposeList: [],
            purposeListId: [],
            znList: [],
            areaBox: false,
            props: {
                label: "label",
                children: "children",
                isLeaf: false
            },
            mediaProp: {
                label: "name",
                children: ""
            },
            openNode: [1, 18, 205],
            loading: false,
            area: [],
            mediaBox: false,
            areaLength: null,

            // 点击左边按钮，右边滚动
           act1: false,
           act2: false,
           act3: false
        };
    },
    //业务逻辑
    methods: {
        loadNode(node, resolve) {
            if (node.level === 0) {
                country({ token: this.$store.getters.token, id: 1 }).then(
                    response => {
                        return resolve(response.data);
                    }
                );
            }
            if (node.level === 1) {
                this.openNOde = [];
                privince({
                    token: this.$store.getters.token,
                    countryId: node.data.id
                }).then(response => {
                    return resolve(response.data);
                });
            }
            if (node.level === 2) {
                city({
                    token: this.$store.getters.token,
                    privinceId: node.data.id
                }).then(response => {
                    return resolve(response.data);
                });
            }
            if (node.level === 3) {
                distinct({
                    token: this.$store.getters.token,
                    cityId: node.data.id
                }).then(response => {
                    return resolve(response.data);
                });
            }
            if (node.level === 4) {
                this.loading = false;
            }
            // console.log(node)
            if (node.level > 3) return resolve([]);
        },
        mediaTree(node, resolve) {
            if (node.level == 0) {
                listByPid({ pid: 0 }).then(response => {
                    return resolve(response.data);
                });
            }
            if (node.level == 1) {
                listByPid({ pid: node.data.mtype_id }).then(response => {
                    return resolve(response.data);
                });
            }
            if (node.level == 2) {
                listByPid({ pid: node.data.mtype_id }).then(response => {
                    return resolve(response.data);
                });
            }
        },
        strategyInfo(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.showStrategy = this.formLabelAlign;
                    this.centerDialogVisible1 = false;
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        enInfo(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.showEn = this.enInformation;
                    this.changeLocationValue(this.showEn.industry);
                    this.centerDialogVisible = false;
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        //匹配label值
        changeLocationValue(val) {
            let obj = {};
            obj = this.options.find(item => {
                return item.value === val;
            });
            this.industry = obj.label;
        },
        //打开目的类型弹窗
        openPurpose() {
            this.centerDialogVisible2 = true;
            this.getpurpose();
            this.getFindAll();
        },
        //点击选择目的类型
        purposeType(id, name) {
            this.purpose = [];
            this.purpose.push({ id: id, name: name });
        },
        //目的选项
        getpurpose() {
            listTree().then(response => {
                this.data2 = response.data;
            });
        },
        //智能组合
        getFindAll() {
            findAll().then(response => {
                this.data3 = response.data;
            });
        },
        //回显目的
        purposeInfo() {
            this.purposeName = this.purpose[0].name;
            if (this.purpose[0].id == 1) {
                this.purposeList = this.$refs.tree.getCheckedAll();
                console.log(this.$refs.tree.getCheckedAll());
                this.$refs.tree.getCheckedNodes().forEach(s => {
                    this.purposeListId.push(s.id);
                });
            } else {
                this.znList = this.data3.find(s => {
                    return s.id == this.radio;
                });
            }
            this.centerDialogVisible2 = false;
        },
        //打开投放区域弹窗
        openArea() {
            this.areaBox = true;
        },
        //选择投放区域
        handleCheckChange(data, checked, indeterminate) {
            console.log(indeterminate);
            if (!indeterminate) {
                this.area = this.$refs.areaTree.getCheckedNodes();
            }
            this.areaLength = this.area.length;
        },
        checkMedia(data, checked, indeterminate) {},
        //获取媒体一级分类
        getListByPid() {
            listByPid().then(response => {});
        },
        openMedia() {
            this.mediaBox = true;
        },
        handleNodeClick() {},

        jump1(){
          this.act1 = true
          this.act2 = false
          this.act3 = false
        },
        jump2(){
          this.act1 = false
          this.act2 = true
          this.act3 = false
        },
        jump3(){
          this.act1 = false
          this.act2 = false
          this.act3 = true
        }


    },
    created() {}
};
</script>
<style rel="stylesheet/scss" lang="scss">
#newStrategy .tree {
    min-height: 368px;
    /* border: 1px solid #ebeef0; */
    border-radius: 5px;
}

#newStrategy .tree .el-tree-node__content {
    border-left: 1px solid #ebeef0;
}
#newStrategy .tree .el-tree-node__content > .el-tree-node__expand-icon {
    display: none;
}
#newStrategy .tree .el-tree-node__content {
    padding-right: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    /*background-image:url(../../assets/images/yjtyjt.png);*/
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: 43%;
}
#newStrategy .tree .el-checkbox__input.is-checked .el-checkbox__inner,
#newStrategy .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #e60012;
    border-color: #e60012;
}
#newStrategy .tree .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #e60012;
}
#newStrategy .tree .el-checkbox__inner:hover {
    border-color: #e60012;
}
#newStrategy .tree > .el-tree-node.is-focusable > .el-tree-node__children {
    position: relative;
    height: 100%;
}
#newStrategy .tree > .el-tree-node.is-focusable > .el-tree-node__children {
    height: 1240px;
}
#newStrategy
    .tree
    > .el-tree-node.is-focusable
    > .el-tree-node__children
    > .el-tree-node.is-focusable
    > .el-tree-node__children {
    position: absolute;
    left: 33.33%;
    width: 100%;
}
#newStrategy
    .tree
    > .el-tree-node.is-focusable
    > .el-tree-node__children
    > .el-tree-node.is-focusable
    > .el-tree-node__children
    > .el-tree-node.is-focusable
    > .el-tree-node__children {
    position: absolute;
    left: 33.33%;
    width: 33.33%;
}
#newStrategy .tree .el-tree-node__content {
    float: left;
    clear: both;
    width: 25%;
    padding-left: 20px !important;
}
#newStrategy .tree .el-tree-node__children .el-tree-node__content {
    width: 33.33%;
}
#newStrategy .objective-table .el-tree > .el-tree-node {
    height: 38px;
}
#newStrategy .el-tree-node > .el-tree-node__children {
    overflow: hidden;
    background-color: transparent;
    position: absolute;
    top: 0;
    width: 430px;
}
#newStrategy .el-container {
    margin-top: 30px;
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
#newStrategy .newAside {
    min-height: 500px;
    padding: 45px 20px;
    background-color: #fff;
    border-radius: 5px;
    margin-right: 1%;
}
.num1-text1 {
    padding-left: 52px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
}
.num1-text2 {
    padding-left: 52px;
    font-size: 12px;
    color: #999;
    line-height: 20px;
    height: 40px;
    overflow: hidden;
}
#newStrategy .newAside ul {
    list-style: none;
    li {
        background: url(../../assets/images/num1.png) no-repeat top left;
        background-size: 32px 36px;
        margin-bottom: 45px;
        cursor: pointer;
    }
    li.active .num1-text1 {
        color: #e60012;
    }
    & > li:nth-child(2) {
        background-image: url(../../assets/images/num2.png);
    }
    & > li:nth-child(3) {
        background-image: url(../../assets/images/num3.png);
        margin-bottom: 0;
    }
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

/* css 部分  原按钮部分已删除   另外添加.strategyTitle-text {
    width: 100%;}  */
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
#newStrategy .enterprise .explainArea {
    padding-right: 15px;
}
#newStrategy .enterprise .formArea {
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

#newStrategy .enterprise .el-tree-node > .el-tree-node__children {
    left: 80px;
}
</style>
