<template>
<el-container>
    <!-- Header -->
  <el-header>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="primary" round>搜索</el-button>
  </el-header>
  <!-- List -->
  <el-main>
    <el-table
      :data="tableData"
      style="width: 100%"
      :show-header="false">
      <el-table-column
        prop="done"
        width="50">
        <el-checkbox v-model="tableData.done"></el-checkbox>
      </el-table-column>
      <el-table-column
        prop="title">
      </el-table-column>
    </el-table>
  </el-main>
  <!-- Footer -->
  <el-footer>
    <div class="foo">
        <el-checkbox v-model="checkAll"></el-checkbox>
        <span>已完成0/全部0</span>
    </div>
    <el-button type="danger">清除所有已完成</el-button>
  </el-footer>
</el-container>
</template>

<script>
export default {
    name:'ETodoList.vue',
    data(){
        return{
            input:'',
            tableData:[
                {id:'001',title:'吃饭',done:true},
                {id:'002',title:'睡觉',done:true},
                {id:'003',title:'打豆豆',done:false},
            ],
            checkAll:false
        }
    }
}
</script>

<style lang="less">
.el-container {
    margin-top: 10px;
    border: 1px solid #e3dede;
    width: 70%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-header{
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
  .el-main {
    width: 100%;
    color: #333;
    text-align: center;
    padding: 3px;
  }
.el-footer{
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