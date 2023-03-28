<template>
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
        prop="tableData.title">
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
export default {
    name:'MyList',
    props:['tableData']
}
</script>

<style lang="less">
.el-main {
    width: 100%;
    color: #333;
    text-align: center;
    padding: 3px;
  }
</style>