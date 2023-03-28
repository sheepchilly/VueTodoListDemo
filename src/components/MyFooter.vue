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
    name:'MyFooter'
}
</script>

<style>

</style>