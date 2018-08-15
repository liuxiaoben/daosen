<template>
  <div id="renzhengType">
    <!-- 审核中 -->
    <h1 v-if='this.type=="审核中"'>
      <div class="title">
        <span>资质认证</span>
      </div>
      <div class="renzheng_img">
        <div class="renzheng_img_left"><img src="../../../assets/images/renzheng_loading.png" alt=""></div>
        <div class="renzheng_img_right">
          <p>请耐心等待</p>
          <p>你的个人资质认证正在审核中</p>
        </div>
        <div class="clear"></div>
      </div>
      <div class="renzheng_count">
        <p>认证信息</p>
        <ul>
          <li>姓名：{{linker}}</li>
          <li>联系方式：{{phone}}</li>
          <li>联系地址：{{address}}</li>
        </ul>
        <ul>
          <li style="padding-right:2%;width:150px;height:95px;"><img style="width:150px !important;height:95px !important;" :src="businessLicenseUrl" alt=""></li>
          <li style="padding-right:2%;width:150px;height:95px;"><img style="width:150px !important;height:95px !important;" :src="organizationCodeUrl" alt=""></li>
          <li style="padding-right:2%;width:150px;height:95px;"><img style="width:150px !important;height:95px !important;" :src="taxPicUrl" alt=""></li>
        </ul>
      </div>

    </h1>
    <!-- 审核失败 -->
    <h1 v-else-if='this.type=="审核失败"'>
      <div class="title">
        <span>资质认证</span>
      </div>
      <div class="renzheng_img">
        <div class="renzheng_img_left"><img src="../../../assets/images/renzheng_fail.png" alt=""></div>
        <div class="renzheng_img_right">
          <p>很遗憾</p>
          <p>你的个人资质认证未通过</p>
        </div>
        <div class="clear"></div>
      </div>
      <div class="renzheng_count">
        <p>认证信息</p>
        <ul>
          <li>姓名：{{linker}}</li>
          <li>联系方式：{{phone}}</li>
          <li>联系地址：{{address}}</li>
        </ul>
        <ul>
          <li style="padding-right:2%;width:150px;height:95px;"><img style="width:150px;height:95px;" :src="businessLicenseUrl" alt=""></li>
          <li style="padding-right:2%;width:150px;height:95px;"><img style="width:150px;height:95px;" :src="organizationCodeUrl" alt=""></li>
          <li style="padding-right:2%;width:150px;height:95px;"><img style="width:150px;height:95px;" :src="taxPicUrl" alt=""></li>
        </ul>
        <p>
          <button @click="cxrz">
            重新认证
          </button>
        </p>
      </div>
    </h1>

    <!-- 审核成功 -->
    <h1 v-else-if='type=="审核成功"'>
      <div class="title">
        <span>资质认证</span>
      </div>
      <div class="renzheng_img">
        <div class="renzheng_img_left"><img src="../../../assets/images/renzheng_Success.png" alt=""></div>
        <div class="renzheng_img_right">
          <p>恭喜你</p>
          <p>你的个人资质认证审核已通过</p>
        </div>
        <div class="clear"></div>
      </div>
      <div class="renzheng_count">
        <p>认证信息</p>
        <ul>
          <li>姓名：{{linker}}</li>
          <li>联系方式：{{phone}}</li>
          <li>联系地址：{{address}}</li>
        </ul>
        <ul>
          <li style="padding-right:2%;width:150px;height:95px;"><img style="width:150px;height:95px;" :src="businessLicenseUrl" alt=""></li>
          <li style="padding-right:2%;width:150px;height:95px;"><img style="width:150px;height:95px;" :src="organizationCodeUrl" alt=""></li>
          <li style="padding-right:2%;width:150px;height:95px;"><img style="width:150px;height:95px;" :src="taxPicUrl" alt=""></li>
        </ul>
        <p>
          <button @click="cxrz">
            重新认证
          </button>
        </p>
      </div>
    </h1>
    <!-- 根据type的值不同，显示不同的状态 -->
  </div>
</template>
<script>
import { enterpriseinformation } from "@/api/enterprise";
import { authorInfo } from "@/api/enterprise";

export default {
    data() {
        return {
            type: "", //定义当前页面type，用于接收传递过来的参数
            kind: "",
            linker: "",
            phone: "",
            address: "",
            businessLicenseUrl: "",
            organizationCodeUrl: "",
            taxPicUrl: ""
        };
    },
    created() {
        enterpriseinformation({ eid: this.$store.getters.eid })
            .then(response => {
                let info = response.data;
                this.kind = info.kind;
                this.type = response.data.statusName;
                console.log(this.type);
                this.enterpriseinformation = response.data;
                console.log(this.enterpriseinformation);
                this.getInfo();
                this.listLoading = false;
            })
            .catch(() => {
                this.loading = false;
            });
    },
    methods: {
        getInfo() {
            authorInfo({
                token: this.$store.getters.token,
                kind: this.kind,
                eid: this.$store.getters.eid
            })
                .then(response => {
                    let info = response.data;
                    this.linker = info.linker;
                    this.phone = info.phone;
                    this.address = info.address;
                    if (this.kind == 1) {
                        this.businessLicenseUrl = info.idcardFront;
                        this.organizationCodeUrl = info.idcardBack;
                        this.taxPicUrl = info.idcardHandup;
                    } else {
                        this.businessLicenseUrl = info.businessLicenseUrl;
                        this.organizationCodeUrl = info.organizationCodeUrl;
                        this.taxPicUrl = info.taxPicUrl;
                    }

                    this.listLoading = false;
                    this.authorInfo = response.data;
                    console.log(this.authorInfo);
                })
                .catch(() => {
                    this.loading = false;
                });
        },
        cxrz() {
            this.$router.push("/enterprise/clickCertification");
        }
    }
};
</script>
<style>
.clear {
    clear: both;
}
.el-main {
    border-radius: 6px;
}
#renzhengType {
    border-radius: 6px;
}
#renzhengType > h1 {
    border-radius: 6px;
}

#renzhengType > h1 > .title {
    height: 53px;
    line-height: 53px;
    text-align: left;
    border-bottom: 1px solid #dee0e3;
}
#renzhengType > h1 > .title > span {
    margin-left: 40px;
    font-size: 14px;
    color: #8e9eaa;
}
#renzhengType > h1 > .renzheng_img {
    margin-top: 40px;
    margin-left: 5%;
}
#renzhengType > h1 > .renzheng_img > .renzheng_img_left {
    float: left;
}
#renzhengType > h1 > .renzheng_img > .renzheng_img_right {
    float: left;
    margin-left: 3%;
}
#renzhengType > h1 > .renzheng_img > .renzheng_img_right > p:nth-child(1) {
    font-size: 20px;
    font-weight: bold;
    margin-top: 40px;
    text-align: left;
}
#renzhengType > h1 > .renzheng_img > .renzheng_img_right > p:nth-child(2) {
    font-size: 14px;
    color: #999999;
    margin-top: 20px;
    text-align: left;
}
#renzhengType > h1 > .renzheng_count {
    font-size: 12px;
    font-weight: bold;
    text-align: left;
    margin-left: 33px;
    margin-top: 60px;
    padding-bottom: 30px;
}
#renzhengType > h1 > .renzheng_count > ul > li {
    display: inline-block;
    font-size: 12px;
    color: #999999;
    padding-right: 5%;
    margin-top: 20px;
}
</style>


