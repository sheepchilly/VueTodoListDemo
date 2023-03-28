<template>
    <div>
      <!-- 1.匿名插槽 -->
      <Son>
        <template #oneSon="{message,age}">
            <div>
                {{ message }} - {{ age }}
            </div>
        </template>
      </Son>
      <!-- 2.具名插槽 -->
      <!-- 3.作用域插槽 -->
    </div>
  </template>
  
  <script>
  import Son from '@/pages/Son'
  export default {
      name:'Father',
      data(){
        return{

        }
      },
      components:{Son}
  }
  </script>
  
  <style>
  
  </style>