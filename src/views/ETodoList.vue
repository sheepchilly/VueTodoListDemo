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
            tableData:[
                {id:'001',title:'吃饭',done:false},
                {id:'002',title:'睡觉',done:true},
                {id:'003',title:'打豆豆',done:false},
            ],
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
        checkedAll(checked){
            console.log(checked)
            this.tableData.forEach(item=>{
                if(checked==true){
                    item.done = true
                }else{
                    item.done = false
                    // this.$set(this.tableData,'item.done',false)
                }
            })
        }
    },
    mounted(){
    //   localStorage.setItem('tableData',JSON.stringify(this.tableData))
    this.$bus.$on('checkChange',this.checkChange)
    this.$bus.$on('checkedAll',this.checkedAll)
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