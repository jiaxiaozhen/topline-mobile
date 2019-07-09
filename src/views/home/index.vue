<template>
    <div>
        <!-- 头部 -->
        <van-nav-bar class="nav-top" title="首页" fixed/>
        <!-- <van-search placeholder="请输入搜索关键词" v-model="value" /> -->

        <!-- 导航栏 -->
          <van-tabs v-model="active" class="nav-list">
          <van-tab title="标签 1">
            <!-- 内容列表 -->
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              >
                <van-cell
                  v-for="item in list"
                  :key="item"
                  :title="item"
                />
             </van-list>
            </van-pull-refresh>
          </van-tab>
          <van-tab title="标签 2">内容 2</van-tab>
          <van-tab title="标签 3">内容 3</van-tab>
          <van-tab title="标签 4">内容 4</van-tab>
        </van-tabs>

        <!-- 底部 -->
        <van-tabbar v-model="active1" class="nav-bottom" route>
          <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
          <van-tabbar-item icon="chat-o" to="/qa">问答</van-tabbar-item>
          <van-tabbar-item icon="play-circle-o" to="/vedio">视频</van-tabbar-item>
          <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      active1: 0,
      value: ''
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.nav-top {
     background: #3296fa;
 }
 .nav-list {
   margin-bottom: 80px;
 }
 .nav-list  /deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
 }
 .nav-list  /deep/ .van-tabs__content {
  margin-top: 92px;
}
</style>
