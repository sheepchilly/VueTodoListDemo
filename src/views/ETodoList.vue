<template>
<div class="container">
    <!-- Header -->
  <MyHeader :tableData="tableData" @addTableData="addTableData"/>
  <!-- List -->
  <MyList :tableData="tableData"/>
  <!-- Footer -->
  <MyFooter :tableData="tableData"/>
</div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
import MyList from '@/components/MyList'
import MyFooter from '@/components/MyFooter'
export default {
    name:'ETodoList.vue',
    components:{MyHeader,MyList,MyFooter},
    data(){
        return{
            tableData:JSON.parse(localStorage.getItem('tableData')) || []
        }
    },
    methods:{
        addTableData(val){
            this.tableData.unshift(val)
        },
        //勾选框勾选
        checkChange(row){
            this.tableData.forEach(item=>{
                if(item.id==row.id)
                    item.done =!item.done;
            })
        },
        //全选按钮
        checkedAll(checked){
            this.tableData.forEach(item=>{
                if(checked==true){
                    item.done = true
                }else{
                    item.done = false
                }
            })
        },
        //删除按钮
        deleteList(id){
            this.tableData.splice(this.tableData.findIndex(list=>list.id==id),1)
        },
        //删除所有已完成
        deleteFinish(){
            //filter过滤
            this.tableData = this.tableData.filter(item=>item.done===false)
        }
    },
    mounted(){
        this.$bus.$on('checkChange',this.checkChange)
        this.$bus.$on('checkedAll',this.checkedAll)
        this.$bus.$on('deleteList',this.deleteList)
        this.$bus.$on('deleteFinish',this.deleteFinish)
    },
    watch:{
        tableData:{
            deep:true,
            immediate:true,
            handler(value){
                localStorage.setItem('tableData',JSON.stringify(value))
            }
        }
    }
}
</script>

<style lang="less">
.container {
    margin-top: 10px;
    border: 1px solid #e3dede;
    width: 70%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
</style>