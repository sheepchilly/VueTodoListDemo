<template>
  <el-footer v-show="isFooter">
    <div class="foo">
        <el-checkbox v-model="checkAll"  @change="ckAll"></el-checkbox>
        <span>已完成{{ finishNum }}/全部{{ total }}</span>
    </div>
    <el-button type="danger" @click="deleteAllFinish">清除所有已完成</el-button>
  </el-footer>
</template>

<script>
export default {
    name:'MyFooter',
    props:['tableData'],
    data(){
      return{
        checked:false,
      }
    },
    methods:{
      ckAll(){
        // this.checked=!this.checked
        this.$bus.$emit('checkedAll',this.checked)
        // this.$bus.$emit('selectionAllChange',this.checked)
      },
      //清除所有已完成
      deleteAllFinish(){
        //只是触发事件没有传值
        this.$bus.$emit('deleteFinish')
      }
    },
    computed:{
      finishNum(){
        return this.tableData.reduce((pre,todo)=>{
          return pre+(todo.done==true?1:0)
        },0)
      },
      total(){
        return this.tableData.length
      },
      checkAll:{
        get(){
          return this.total === this.finishNum && this.total!=0
        },
        set(val){
          this.checked = val
        }
      },
      isFooter:{
        get(){
          return this.total != 0
        },
        set(val){
          this.isFooter = val
        }
      }
    },
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