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
        prop="title">
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
export default {
    name:'MyList'
}
</script>

<style>

</style>