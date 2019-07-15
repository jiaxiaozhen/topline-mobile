<template>
  <van-dialog
    :value="value"
    @input="$emit('input',$event)"
    :showConfirmButton="false"
    closeOnClickOverlay
  >
    <van-cell-group v-if="!isReport">
      <van-cell title="不感兴趣" @click="dislike"/>
      <van-cell title="反馈垃圾内容" is-link @click="isReport = true"/>
      <van-cell title="拉黑作者"/>
    </van-cell-group>
    <van-cell-group v-else>
      <van-icon name="arrow-left" @click="isReport = false"/>
      <van-cell
      v-for="item in reportTypes"
      :title="item.label"
      :key="item.value"
      @click="report(item.value)"
      />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikeArticle, reportArticle } from '@/api/article'
export default {
  name: 'more-option',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    articleItem: {
      type: Object,
      default: () => {}
    },
    articleList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      reportTypes: [
        { label: '标题夸张', value: 1 },
        { label: '低俗色情', value: 2 },
        { label: '错别字多', value: 3 },
        { label: '旧闻重复', value: 4 },
        { label: '广告软文', value: 5 },
        { label: '内容不实', value: 6 },
        { label: '涉嫌违法犯罪', value: 7 },
        { label: '侵权', value: 8 },
        { label: '其他问题', value: 0 }
      ],
      isReport: false
    }
  },
  methods: {
    async dislike () {
      try {
        await dislikeArticle(this.articleItem.art_id.toString())
        const articleIndex = this.articleList.findIndex(item => item.art_id.toString() === this.articleItem.art_id.toString())
        this.articleList.splice(articleIndex, 1)
        this.$emit('update:articleList', this.articleList)
        this.$emit('input', false)
        this.$toast('操作成功')
      } catch (err) {
        console.log(err)
      }
    },
    async report (type) {
      try {
        await reportArticle(this.articleItem.art_id.toString(), type)
        this.$toast('举报成功')
      } catch (err) {
        if (err.response.status === 409) {
          this.$toast.fail('该文章已经被举报')
        }
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
