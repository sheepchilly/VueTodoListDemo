<template>
  <el-main>
    <el-table 
    :data="tableData" 
    :key="tableData.id"
    style="width: 100%" 
    :show-header="false" 
    ref="tableSelect" 
    @select="select"
    @selection-change="selectionAllChange"
    >
      <el-table-column prop="done" width="50">
        <el-table-column type="selection" v-model="tableData.done"> </el-table-column>
      </el-table-column>
      <el-table-column prop="title"> </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
export default {
  name: "MyList",
  props: ["tableData"],
  data() {
    return {
      listData: this.tableData || [],
      check: true,
    };
  },
  created(){
    this.$nextTick(()=>{
      for(let i =0;i<this.tableData.length;i++){
        if(this.tableData[i].done == true){
          this.$refs.tableSelect.toggleRowSelection(this.tableData[i])
        }
      }
    })
  },
  methods:{
    select(_,row){
      this.$bus.$emit('checkChange',row)
    },
    selectionAllChange(checked){
      // console.log(checked)
      if(checked==true){
        // this.$nextTick(()=>{
        this.$refs.tableSelect.toggleAllSelection()
      // })
      }else{
        // this.$refs.tableSelect.toggleAllSelection()
          // this.$refs.tableSelect.clearSelection()
      }
    }
  },
  watch: {
    tableData: {
      deep: true,
      immediate: true,
      handler(newValue) {
        // console.log(newValue);
        this.listData = this.tableData;
      },
    },
  },
  mounted(){
    this.$bus.$on('selectionAllChange',this.selectionAllChange)
  }
};
</script>

<style lang="less">
.el-main {
  width: 100%;
  color: #333;
  text-align: center;
  padding: 3px;
}
</style>