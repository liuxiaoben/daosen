<template>
  <div class="xt">
    <p class="title">系统设置</p>
    <div class="xt-body">

      <!-- 无数据展现提示页面 -->
      <div class="bgimg">
        <p>不好意思，暂时没有数据</p>
      </div>


    </div>
  </div>

</template>

<script>
</script>

<style>
.xt .xt-body {
    padding: 20px 40px;
    min-height: 800px;
}

/* 无数据加背景色 */

.xt-body {
    position: relative;
}
.bgimg {
    width: 100%;
    min-height: 800px;
    z-index: 1000;
    background: url(../../assets/images/warning.png) no-repeat center center;
    position: absolute;
    top: 0;
    left: 0;
}
.bgimg p {
    font-size: 18px;
    color: #40b6ff;
    font-weight: bold;
    text-align: center;
    margin-top: 250px;
}
</style>
