<template>
  <div id="app">
    <!-- 配置路由缓存,在切换频道的时候不必重新发请求加载数据 -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style scoped>

</style>
