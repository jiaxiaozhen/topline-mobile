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
