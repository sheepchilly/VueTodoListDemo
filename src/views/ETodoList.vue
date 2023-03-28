<template>
<el-container>
    <!-- Header -->
  <MyHeader />
  <!-- List -->
  <MyList />
  <!-- Footer -->
  <MyFooter />
</el-container>
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