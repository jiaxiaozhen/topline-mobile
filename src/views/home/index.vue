<template>
    <div>
        <!-- 头部 -->
        <van-nav-bar class="nav-top" title="首页" fixed/>
        <!-- <van-search placeholder="请输入搜索关键词" v-model="value" /> -->

        <!-- 导航栏 -->
          <van-tabs v-model="activeChannelIndex" class="nav-list">
            <div slot="nav-right" class="wap-nav" @click="isChannelShow = true">
              <van-icon name="wap-nav" />
            </div>
            <van-tab
             v-for="channelItem in channels"
             :key="channelItem.id"
             :title="channelItem.name">
              <!-- 内容列表 -->
              <van-pull-refresh v-model="channelItem.pullLoading" @refresh="onRefresh">
              <van-list
              v-model="channelItem.upLoading"
              :finished="channelItem.finished"
              finished-text="没有更多了"
              @load="onLoad"
              >
                <van-cell
                  v-for="item in channelItem.articles"
                  :key="item.art_id.toString()"
                  :title="item.title"
                >
                <div slot="label">
                  <template v-if="item.cover.type">
                    <van-grid :border="false" :column-num="3">
                      <van-grid-item v-for="(img,index) in item.cover.images" :key="index">
                        <van-image :src="img" v-lazy="img" />
                      </van-grid-item>
                    </van-grid>
                  </template>
                  <p>
                    <span>{{ item.aut_name }}</span>
                    &nbsp;
                    <span>{{ item.comm_count }}评论</span>
                    &nbsp;
                    <span>{{ item.pubdate|relativeTime }}</span>
                    <van-icon
                    class="close"
                    name="close"
                    @click="more(item)"
                     />
                    <template v-if="isMoreShow">
                      <more-option
                       v-model="isMoreShow"
                       :articleItem="activeArticle"
                       :articleList.sync="activeChannel.articles"></more-option>
                    </template>
                  </p>
                </div>
                </van-cell>
             </van-list>
              </van-pull-refresh>
            </van-tab>
          </van-tabs>

        <home-channel
        v-model="isChannelShow"
        :my-channels.sync="channels"
        :activeChannel.sync="activeChannelIndex"
        ></home-channel>
    </div>
</template>

<script>
import { getChannelsAuto } from '@/api/channel'
import { getArticles } from '@/api/article'
import HomeChannel from './components/channel'
import MoreOption from './components/more-option'
export default {
  name: 'home',
  components: {
    HomeChannel,
    MoreOption
  },
  data () {
    return {
      activeChannelIndex: 0,
      active1: 0,
      value: '',
      channels: [],
      isChannelShow: false,
      isMoreShow: false,
      activeArticle: {}
    }
  },
  async created () {
    await this.loadChannels()
  },
  computed: {
    activeChannel () {
      return this.channels[this.activeChannelIndex]
    }
  },
  watch: {
    // 监视容器中的 user 的状态，只要 user 发生改变，那么就重新获取频道列表
    //  * 注意：凡是能 this. 点儿出来的东西都可以被监视
    '$store.state.user' () {
      this.loadChannels()
      this.activeChannel.upLoading = true
    }
  },
  methods: {
    async onLoad () {
      await this.$sleep(1000)
      let data = []
      data = await this.loadArticles()
      // 如果没有 pre_timestamp 并且数组是空的，则意味着没有数据了
      if (!data.pre_timestamp && !data.results.length) {
        // 设置该频道数据已记载完毕，组件会自动给出提示，并且不再 onLoad
        this.activeChannel.Finished = true
        // 取消 loading
        this.activeChannel.upLoading = false
        // 代码不要往后继续执行了
        return
      }
      // 解决初始化的时候没有最新推荐数据的问题（没有最新数据，那就加载上一次推荐数据）
      if (data.pre_timestamp && !data.results.length) {
        this.activeChannel.timestamp = data.pre_timestamp
        // 加载下一页数据
        data = await this.loadArticles()
      }
      // 数据加载好以后，将 pre_timestamp 更新到当前频道的中用于加载下下页数据
      this.activeChannel.timestamp = data.pre_timestamp
      // 将文章数据更新到频道中（注意：是 push 追加，不是覆盖）
      this.activeChannel.articles.push(...data.results)
      // 数据加载完毕，取消上拉 loading
      this.activeChannel.upLoading = false
    },
    async onRefresh () {
      // 备份之前的时间戳
      const timestamp = this.activeChannel.timestamp
      // 请求最新的时间
      this.activeChannel.timestamp = Date.now()
      const data = await this.loadArticles()
      // 如果有数据
      if (data.results.length) {
        // 重置当前频道的文章列表
        this.activeChannel.articles = data.results
        // 保存上一次的时间戳
        this.activeChannel.timestamp = data.pre_timestamp
        // 此时，如果数据不够一屏，加载满屏
        this.onload()
      }

      this.activeChannel.pullLoading = false
      // 没有最新数据，将原来的用于请求下一页的时间戳恢复过来
      this.activeChannel.timestamp = timestamp
    },
    async loadChannels () {
      try {
        let channels = []
        const localChannels = JSON.parse(window.localStorage.getItem('channels'))
        if (localChannels) {
          // 如果右本地存储使用本地存储
          channels = localChannels
        } else {
          // 如果没有，请求数据
          channels = (await getChannelsAuto()).channels
        }
        // 给每项频道列表，添加自己的数据
        channels.forEach((item) => {
          item.articles = []
          item.timestamp = Date.now()
          item.upLoading = false
          item.finished = false
          item.pullLoading = false
        })

        this.channels = channels
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取频道列表失败')
      }
    },
    async loadArticles () {
      try {
        const { id: channelId, timestamp } = this.activeChannel
        const data = await getArticles({ channelId, timestamp, withTop: 1 })
        return data
      } catch (err) {
        console.log(err)
      }
    },
    more (item) {
      this.isMoreShow = true
      this.activeArticle = item
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
.wap-nav {
  position: sticky;
  right: 0;
  display: flex;
  align-items: center;
  opacity: 0.8;
  background: #fff;
}
.close {
  float: right;
}
</style>
