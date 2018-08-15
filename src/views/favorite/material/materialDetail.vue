<template>
    <div id="details">
        <!-- title -->
        <p class="title"><span>素材详情</span></p>
        <!-- count -->
        <div class="sucai-count">
            <div class="sucai-left-images"><img v-bind:src="material.url" alt="" width="100%"></div>
            <div class="sucai-right-count">
                <p>{{material.name}}</p>
                <p><img src="../../../assets/images/sucai_icon.png"><span style="margin-left:10px;">创建时间：{{material.createTime}}</span></p>
                <p><img src="../../../assets/images/sucai_icon.png"><span style="margin-left:10px;">使用次数：{{material.useTimes}}</span></p>
                <p><img src="../../../assets/images/sucai_icon.png"><span style="margin-left:10px;">素材地址：{{material.url}}</span></p>
                <!-- 明细 -->
                <div class="sucai-Detailed">
                    <p>素材使用明细</p>
                    <ul class="sucai-Detailed-u1" v-for="order in orderList">
                        <li>{{order.createTime}}  {{order.name}} </li>
                        <li><a href="#">查看明细</a></li>
                    </ul>
                </div>
                <!-- button -->
                <div class="grid-box" gap list>
                    <button class="primary" @click="edit(materialID)">编辑</button>
				    <button @click="del">删除</button>
				</div>
            </div>
            <div class="clear"></div>
        </div>

    </div>
</template>
<script>
import { mlibDetail } from '../../../api/material'
import { mlibDel } from '../../../api/material'
export default {
      data(){
          return{
            material:{},
            orderList:[],
            materialID:'',
          }


      },
      methods:{
           del:function(){
              var materialID=this.$route.params.materialID;
              mlibDel(this.$store.getters.token,materialID).then(response=>{
                       if(response.msgCode == '1000'){
                         this.$router.push('/favorite/material')
                       }else{
                          alert('删除失败');
                       }
                })
           },
           edit(materialId){
            this.$router.push('/favorite/editMaterial/'+materialId)
          },
      },
      created(){
         var materialID=this.$route.params.materialID;
         this.materialID=materialID;
         mlibDetail(this.$store.getters.token,materialID).then(response => {
                  if(response.msgCode =="1000" && response.data){
                      this.material=response.data.material;
                      this.orderList=response.data.order;
                  }
        })

    }
}
</script>
<style>
    .clear{
        clear: both;
    }
    /* #details .sucai-title{
		height: 53px;
		line-height: 54px;
		padding: 0px 33px;
		font-size: 14px;
		color: #666666;
		border-bottom: 1px solid #eeeeee;
		text-align: left;
	} */
    #details .sucai-count{
        margin-left: 40px;
        /* height: 200px;
        background-color: red; */
    }
     #details .sucai-left-images,#details .sucai-right-count{
         float: left;
     }
     #details .sucai-left-images{
         width: 25%;
     }
     #details .sucai-right-count{
         margin-left: 30px;
         width: 63%;
     }
     #details .sucai-right-count>p:nth-child(1){
         font-size: 16px;
         font-weight: bold;

     }
     #details .sucai-right-count>p:nth-child(2),#details .sucai-right-count>p:nth-child(3),#details .sucai-right-count>p:nth-child(4){
         font-size: 12px;
         margin-top: 25px;
     }
     #details .sucai-Detailed>p:nth-child(1){
         font-size: 14px;
         font-weight: bold;
     }
     #details .sucai-Detailed-u1{
         height: 57px;
         line-height: 57px;
         border-bottom: 1px solid #e4e7ea;
     }
     #details .sucai-Detailed-u1>li{
         display: inline-block;
     }
     #details .sucai-Detailed-u1>li:nth-child(2){
         margin-left: 300px;
     }
     #details .sucai-Detailed-u1>li:nth-child(2)>a{
         color: #41b3f9;
     }
     #details .sucai-Detailed{
         margin-top: 80px;
     }
     #details .grid-box>button{
         cursor:pointer;
     }
     #details .grid-box[gap]{
         --innergap: 1.5rem 0rem;
     }
</style>
