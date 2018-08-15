<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: "App",
};
</script>

<style>
* {
    padding: 0;
    margin: 0;
}
#app {
    font-family: "MicrosoftYaHei";
    width: 100%;
    height: 100%;
    /* min-width: 1400px; */
    font-size: 14px;
    /* margin-top:-60px; */
}
ul {
    list-style: none;
}
a {
    text-decoration: none;
}
.el-main{
    overflow: visible;
}
/* 按钮 */
.el-button--danger {
    color: #fff;
    background-color: #e60012;
    border-color: #e60012;
}

.el-button--danger:hover {
    background: #e60012;
    border-color: #e60012;
}
.el-button--info {
    color: #fff;
    background-color: #909399;
    border-color: #909399;
}
.el-button--info:hover {
    background: #a6a9ad;
    border-color: #a6a9ad;
}
/* 弹窗公共样式 */
.el-dialog {
    width: 750px;
    border-radius: 5px;
}
.el-dialog .el-dialog__header {
    background-color: #f9f9f9;
    padding: 20px 30px;
    font-weight: 800;
    border-bottom: 1px solid #e3e8e9;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
.el-dialog .el-dialog__body {
    padding: 10px 30px;
}
.el-dialog__footer {
    border-top: 1px solid #ecf1f2;
    margin-left: 0;
    text-align: left;
    padding: 11px 30px;
}
.dialog-footer .el-button--info {
    background: #c1cad7;
    border-color: #c1cad7;
    color: #fff;
}
</style>
