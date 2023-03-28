<template>
  <div style="margin:100px;">
    <button @click="add">
        <slot>
            submit
        </slot>
    </button>
    <p>{{ num }}</p>
    
    <div>
        <slot name="oneSon" :message="username" age="20"></slot>
    </div>
    <div>
        <slot name="two"></slot>
    </div>
  </div>
</template>

<script>
export default {
    name:'Son',
    data(){
        return{
            num:1,
            username:'dy',
            age:18
        }
    },
    methods:{
        add(){
            this.num++;
        }
    }
}
</script>

<style>

</style>