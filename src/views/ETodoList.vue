<template>
<div class="container">
    <!-- Header -->
  <MyHeader />
  <!-- List -->
  <MyList :tableData="tableData"/>
  <!-- Footer -->
  <MyFooter />
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
                {id:'001',title:'吃饭',done:true},
                {id:'002',title:'睡觉',done:true},
                {id:'003',title:'打豆豆',done:false},
            ],
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