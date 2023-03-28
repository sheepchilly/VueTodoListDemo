<template>
  <el-footer>
    <div class="foo">
        <el-checkbox v-model="checkAll"></el-checkbox>
        <span>已完成0/全部0</span>
    </div>
    <el-button type="danger">清除所有已完成</el-button>
  </el-footer>
</template>

<script>
export default {
    name:'MyFooter',
    data(){
      return{
        checkAll:false
      }
    }
}
</script>

<style lang="less">
.el-footer{
    color: #333;
    text-align: center;
    line-height: 60px;
    width: 100%;
    text-align: center;
    padding: 0 3px;
    .foo{
        float: left;
        margin-left: 10px;
        span{
            padding-right: 10px;
        }
    }
    .el-button{
        float: right;
        margin-top: 10px;
        margin-right: 10px;
    }
}
</style>