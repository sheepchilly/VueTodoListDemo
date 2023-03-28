<template>
  <el-header>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="primary" round>搜索</el-button>
  </el-header>
</template>

<script>
export default {
    name:'MyHeader',
    data(){
        return{
            input:''
        }
    }
}
</script>

<style lang="less">
  .el-header{
    color: #333;
    text-align: center;
    line-height: 60px;
    background: white;
    width: 100%;
    border-bottom: 1px solid #e3dede;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .el-button{
        margin-left: 10px;
    }
  }
</style>