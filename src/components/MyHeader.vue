<template>
  <el-header>
    <el-input v-model="title" placeholder="请输入内容" @keydown.native.enter="changeList"></el-input>
    <el-button type="primary" round @click="searchInput">搜索</el-button>
  </el-header>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
    name:'MyHeader',
    props:['tableData','addTableData'],
    data(){
        return{
            title:''
        }
    },
    methods:{
      //子给父传数据，往数组里添加数据
      changeList(){
        const tableObj = {id:nanoid(),title:this.title,done:false}
        this.$emit('addTableData',tableObj)
      },
      //搜索按钮
      searchInput(){
        let newData = this.tableData.filter(item=>{
          return item.title==this.title
        })
        console.log(newData)
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