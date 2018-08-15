<template>
  <div style="background:#fff;margin-top: 30px;margin-bottom: 50px;">
    <p class="list-title">简单发布方案 高效收获成果</p>
    <div>
      <!--<img src="../../assets/images/dingdan-banner.png" alt="banner" width="100%">-->
      <div class="index-trust-cont">
        <div class="container">
            <div class="index-trust-contBg current" id="carBox">
                <div class="cont ani-1 ani-2 ani-3 ani-4 ani-5 ani-6 ani-7 ani-8">
                    <div class="xiaoren fixpng" id="xiaoren"></div>
                    <div class="mask fixpng"></div>
                    <div class="text t-2009 fixpng"></div>
                    <div class="text t-2010 fixpng"></div>
                    <div class="text t-2011 fixpng"></div>
                    <div class="text t-2012 fixpng"></div>
                    <div class="text t-2013 fixpng"></div>
                </div>
            </div>
        </div>
    	</div>
    	
    </div>
    <div class="list-fa">
	    <p class="list-title" style="padding-top: 70px;padding-bottom: 90px;">为广告主提供一站式营销解决方案</p>
	    <el-row :span=24 style="padding: 0px 140px;">
	      <el-col :span=4 style="text-align: center;">
	        <img src="../../assets/images/dingdan-icon1.png" alt="">
	        <p style="font-size:16px;color:#333333;">优质全媒体资源</p>
	      </el-col>
	      <el-col :span=4 style="text-align: center;">
	        <img src="../../assets/images/dingdan-icon2.png" alt="">
	        <p style="font-size:16px;color:#333333;">优质全媒体资源</p>
	      </el-col>
	      <el-col :span=4 style="text-align: center;">
	        <img src="../../assets/images/dingdan-icon3.png" alt="">
	        <p style="font-size:16px;color:#333333;">优质全媒体资源</p>
	      </el-col>
	      <el-col :span=4 style="text-align: center;">
	        <img src="../../assets/images/dingdan-icon4.png" alt="">
	        <p style="font-size:16px;color:#333333;">优质全媒体资源</p>
	      </el-col>
	      <el-col :span=4 style="text-align: center;">
	        <img src="../../assets/images/dingdan-icon5.png" alt="">
	        <p style="font-size:16px;color:#333333;">优质全媒体资源</p>
	      </el-col>
	      <el-col :span=4 style="text-align: center;">
	        <img src="../../assets/images/dingdan-icon6.png" alt="">
	        <p style="font-size:16px;color:#333333;">优质全媒体资源</p>
	      </el-col>
	
	    </el-row>
		</div>
    <!-- 大数据 -->
    <el-row :span=24 class="num">
      <el-col :span=7 :offset="3"><img src="../../assets/images/dingdan-numImg.png" alt="" width="100%;"></el-col>


      <el-col :span=9 :offset="2">
        <el-row :span=24 style="font-size:24px;color:#333333;text-align:left;">大数据精准营销</el-row>
        <el-row :span=24 style="font-size:14px;color:#999999;text-align:left;padding-top:50px;">
          受十二届全国人大常委会委托，张德江向大会作全国人大常委会工作报告。他说，过去的五年，是我们党和国家发展进程中极不平凡的五年。在以习近平同志为核心的党中央坚强领导下，十二届全国人大常委会全面贯彻落实党的十八大和十九大精神，深入学习贯彻习近平新时代中国特色社会主义思想，坚定坚持党的领导、人民当家作主、依法治国有机统一，坚决维护习近平总书记权威和核心地位，坚决维护以习近平同志为核心的党中央权威和集中统一领导，认真履行宪法法律赋予的职责，全面开创人大工作新局面，人民代表大会制度理论和实践创新取得重大成就，社会主义民主法治建设迈出重大步伐。
        </el-row>
      </el-col>
    </el-row>
		<div class="list-jb">
	    <p class="list-title">经典案例</p>
	
	    <!-- lun -->
	    <el-row style="padding:0 60px 0 60px;">
	      <img src="../../assets/images/dingdan-lunImg.png" alt="" width="100%">
	    </el-row>
	
	    <el-row :span=24 style="padding:0 60px 0 60px;margin-top:30px;padding-bottom:70px;" :gutter="30">
	      <el-col :span=4> <img src="../../assets/images/dingdan-lun1.png" alt="" width="100%;"></el-col>
	      <el-col :span=4> <img src="../../assets/images/dingdan-lun1.png" alt="" width="100%;"></el-col>
	      <el-col :span=4> <img src="../../assets/images/dingdan-lun1.png" alt="" width="100%;"></el-col>
	      <el-col :span=4> <img src="../../assets/images/dingdan-lun1.png" alt="" width="100%;"></el-col>
	      <el-col :span=4> <img src="../../assets/images/dingdan-lun1.png" alt="" width="100%;"></el-col>
	      <el-col :span=4> <img src="../../assets/images/dingdan-lun1.png" alt="" width="100%;"></el-col>
	    </el-row>
  	</div>
  </div>
</template>
<script>
export default {
  
}

</script>
<style >
   .list-title{
     padding-top: 75px;
     padding-bottom: 45px;
     font-size: 24px;
     color: #333333;
     /*margin-top: 30px;*/
    text-align: center;
   }
   .list-two{
     padding-top: 135px;
     padding-bottom: 90px;
     font-size: 24px;
     color: #333333;
     
   }
   .num{
     padding-bottom: 130px;
     margin-top: 70px;
   }
   .list-three{
     padding-bottom: 50px;
     font-size: 24px;
     color: #333333;
   }
   .list-fa{
   	background: #f7fafc;
   	height: 431px;
   }
   .list-jb{
    background:-webkit-gradient(linear, 0 0, 0 bottom, from(#f7fafc), to(#ffffff));  
		filter:alpha(opacity=100 finishopacity=50 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr=red,endcolorstr=blue,gradientType=0);
    -ms-filter:alpha(opacity=100 finishopacity=50 style=1 startx=0,starty=0,finishx=0,finishy=150) progid:DXImageTransform.Microsoft.gradient(startcolorstr=red,endcolorstr=blue,gradientType=0);/*IE8*/	
    background:-moz-linear-gradient(top, #f7fafc, #ffffff);   
    background:-o-linear-gradient(top, #f7fafc, #ffffff); 
}
	.index-trust-cont {
    width: 100%;
    height: auto;
    position: relative;
    background: url(../../assets/images/list-gd.png) no-repeat top center;
	}

	.index-trust-cont .container {
    position: relative;
    width: 1200px;
    margin: 0 auto;
	}
	
	.index-trust-contBg .cont {
    width: 1200px;
    height: 590px;
    position: relative;
	}
	
	
.index-trust-contBg .xiaoren {
    background: url(../../assets/images/list-car.png) no-repeat;
    height: 68px;
    left: 150px;
    position: absolute;
    top: 60px;
    animation:myfirst 15s; 
    -moz-animation: myfirst 15s;	/* Firefox */
		-webkit-animation: myfirst 15s;	/* Safari 和 Chrome */
		-o-animation: myfirst 15s;	/* Opera */
    width: 28px;
    opacity: 0;
    animation-fill-mode : forwards;
}

@keyframes myfirst /* Safari and Chrome */
{
0% {top: 60px;left: 150px;transform:rotate(0deg);}
3% {top: 150px;left: 150px;transform:rotate(0deg);opacity: 1;}
4% {top: 150px;left: 150px;transform:rotate(0deg);opacity: 1;}
15% {top: 495px;left: 150px;transform:rotate(0deg);opacity: 1;}
16% {top: 495px;left: 150px;transform:rotate(-90deg);opacity: 1;}
26% {top: 495px;left: 615px;transform:rotate(-90deg);opacity: 1;}
27% {top: 495px;left: 615px;transform:rotate(-180deg);opacity: 1;}
38% {top: 210px;left: 615px;transform:rotate(-180deg);opacity: 1;}
39% {top: 210px;left: 615px;transform:rotate(-270deg);opacity: 1;}
50% {top: 210px;left: 445px;transform:rotate(-270deg);opacity: 1;}
51% {top: 210px;left: 445px;transform:rotate(-180deg);opacity: 1;}
65% {top: 40px;left: 445px;transform:rotate(-180deg);opacity: 1;}
66% {top: 40px;left: 445px;transform:rotate(-90deg);opacity: 1;}
77% {top: 40px;left: 910px;transform:rotate(-90deg);opacity: 1;}
78% {top: 40px;left: 910px;transform:rotate(0deg);opacity: 1;}
89% {top: 470px;left: 910px;transform:rotate(0deg);opacity: 1;}
90% {top: 470px;left: 910px;transform:rotate(-90deg);opacity: 1;}
100% {top: 470px;left: 1200px;transform:rotate(-90deg);opacity: 1;}
}

@-moz-keyframes myfirst /* Safari and Chrome */
{
0% {top: 60px;left: 150px;-moz-transform:rotate(0deg);}
3% {top: 150px;left: 150px;-moz-transform:rotate(0deg);opacity: 1;}
4% {top: 150px;left: 150px;-moz-transform:rotate(0deg);opacity: 1;}
15% {top: 495px;left: 150px;-moz-transform:rotate(0deg);opacity: 1;}
16% {top: 495px;left: 150px;-moz-transform:rotate(-90deg);opacity: 1;}
26% {top: 495px;left: 615px;-moz-transform:rotate(-90deg);opacity: 1;}
27% {top: 495px;left: 615px;-moz-transform:rotate(-180deg);opacity: 1;}
38% {top: 210px;left: 615px;-moz-transform:rotate(-180deg);opacity: 1;}
39% {top: 210px;left: 615px;-moz-transform:rotate(-270deg);opacity: 1;}
50% {top: 210px;left: 445px;-moz-transform:rotate(-270deg);opacity: 1;}
51% {top: 210px;left: 445px;-moz-transform:rotate(-180deg);opacity: 1;}
65% {top: 40px;left: 445px;-moz-transform:rotate(-180deg);opacity: 1;}
66% {top: 40px;left: 445px;-moz-transform:rotate(-90deg);opacity: 1;}
77% {top: 40px;left: 910px;-moz-transform:rotate(-90deg);opacity: 1;}
78% {top: 40px;left: 910px;-moz-transform:rotate(0deg);opacity: 1;}
89% {top: 470px;left: 910px;-moz-transform:rotate(0deg);opacity: 1;}
90% {top: 470px;left: 910px;-moz-transform:rotate(-90deg);opacity: 1;}
100% {top: 470px;left: 1200px;-moz-transform:rotate(-90deg);opacity: 1;}
}

@-webkit-keyframes myfirst /* Safari and Chrome */
{
0% {top: 60px;left: 150px;-webkit-transform:rotate(0deg);}
3% {top: 150px;left: 150px;-webkit-transform:rotate(0deg);opacity: 1;}
4% {top: 150px;left: 150px;-webkit-transform:rotate(0deg);opacity: 1;}
15% {top: 495px;left: 150px;-webkit-transform:rotate(0deg);opacity: 1;}
16% {top: 495px;left: 150px;-webkit-transform:rotate(-90deg);opacity: 1;}
26% {top: 495px;left: 615px;-webkit-transform:rotate(-90deg);opacity: 1;}
27% {top: 495px;left: 615px;-webkit-transform:rotate(-180deg);opacity: 1;}
38% {top: 210px;left: 615px;-webkit-transform:rotate(-180deg);opacity: 1;}
39% {top: 210px;left: 615px;-webkit-transform:rotate(-270deg);opacity: 1;}
50% {top: 210px;left: 445px;-webkit-transform:rotate(-270deg);opacity: 1;}
51% {top: 210px;left: 445px;-webkit-transform:rotate(-180deg);opacity: 1;}
65% {top: 40px;left: 445px;-webkit-transform:rotate(-180deg);opacity: 1;}
66% {top: 40px;left: 445px;-webkit-transform:rotate(-90deg);opacity: 1;}
77% {top: 40px;left: 910px;-webkit-transform:rotate(-90deg);opacity: 1;}
78% {top: 40px;left: 910px;-webkit-transform:rotate(0deg);opacity: 1;}
89% {top: 470px;left: 910px;-webkit-transform:rotate(0deg);opacity: 1;}
90% {top: 470px;left: 910px;-webkit-transform:rotate(-90deg);opacity: 1;}
100% {top: 470px;left: 1200px;-webkit-transform:rotate(-90deg);opacity: 1;}
}

@-o-keyframes myfirst /* Safari and Chrome */
{
0% {top: 60px;left: 150px;-o-transform:rotate(0deg);}
3% {top: 150px;left: 150px;-o-transform:rotate(0deg);opacity: 1;}
4% {top: 150px;left: 150px;-o-transform:rotate(0deg);opacity: 1;}
15% {top: 495px;left: 150px;-o-transform:rotate(0deg);opacity: 1;}
16% {top: 495px;left: 150px;-o-transform:rotate(-90deg);opacity: 1;}
26% {top: 495px;left: 615px;-o-transform:rotate(-90deg);opacity: 1;}
27% {top: 495px;left: 615px;-o-transform:rotate(-180deg);opacity: 1;}
38% {top: 210px;left: 615px;-o-transform:rotate(-180deg);opacity: 1;}
39% {top: 210px;left: 615px;-o-transform:rotate(-270deg);opacity: 1;}
50% {top: 210px;left: 445px;-o-transform:rotate(-270deg);opacity: 1;}
51% {top: 210px;left: 445px;-o-transform:rotate(-180deg);opacity: 1;}
65% {top: 40px;left: 445px;-o-transform:rotate(-180deg);opacity: 1;}
66% {top: 40px;left: 445px;-o-transform:rotate(-90deg);opacity: 1;}
77% {top: 40px;left: 910px;-o-transform:rotate(-90deg);opacity: 1;}
78% {top: 40px;left: 910px;-o-transform:rotate(0deg);opacity: 1;}
89% {top: 470px;left: 910px;-o-transform:rotate(0deg);opacity: 1;}
90% {top: 470px;left: 910px;-o-transform:rotate(-90deg);opacity: 1;}
100% {top: 470px;left: 1200px;-o-transform:rotate(-90deg);opacity: 1;}
}

</style>


