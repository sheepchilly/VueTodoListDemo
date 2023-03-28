<template>
  <div id="app">
    <ETodoList />
  </div>
</template>

<script>
import ETodoList from './views/ETodoList.vue';
export default {
  name: 'App',
  components: {
    ETodoList
  }
}
</script>

<style>
*{
    padding: 0;
    margin: 0 auto;
}
</style>
