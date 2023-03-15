<template>
  <div>
    <my-header></my-header>
    <router-view></router-view>
    <my-footer v-show="$route.meta.show"></my-footer>
  </div>
</template>

<script>
import myHeader from './components/myHeader'
import myFooter from './components/myFooter'
export default {
  name: 'App',
  components: {
    myHeader,
    myFooter
  },
  mounted() {
    // 派发action，
    // 放在App.vue中实现只发一次请求，提高性能
    this.$store.dispatch("getCategoryList");
  }
}
</script>

<style>

</style>
