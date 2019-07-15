<template>
    <div>
      <van-search
          v-model="searchText"
          placeholder="请输入搜索关键词"
          shape="round"
          background="#6db4fb"
          show-action
        >
          <div slot="action">搜索</div>
        </van-search>
        <van-cell-group>
            <van-cell
              icon="search"
              v-for="item in suggests"
              :key="item"
              :title="item"
            />
        </van-cell-group>
    </div>
</template>

<script>
import { suggestArticles } from '@/api/channel'
export default {
  name: 'search',
  data () {
    return {
      searchText: '',
      suggests: []
    }
  },
  watch: {
    async searchText (newVal) {
      newVal = newVal.trim()
      if (!newVal) {
        return
      }
      console.log(newVal)
      const data = await suggestArticles(newVal)
      this.suggests = data.options
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
