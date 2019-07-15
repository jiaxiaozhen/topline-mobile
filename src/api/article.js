import request from '@/utils/request'

export const getArticles = ({ channelId, timestamp, withTop }) => request({
  url: '/app/v1_1/articles',
  method: 'GET',
  params: {
    channel_id: channelId,
    timestamp,
    with_top: withTop
  }
})

export const dislikeArticle = articleId => request({
  url: '/app/v1_0/article/dislikes',
  method: 'POST',
  data: {
    target: articleId
  }
})

export const reportArticle = (articleId, type, remark) => request({
  url: '/app/v1_0/article/reports',
  method: 'POST',
  data: {
    target: articleId,
    type,
    remark: ''
  }
})
