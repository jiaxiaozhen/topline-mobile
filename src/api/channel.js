import request from '@/utils/request'

export const getChannelsAuto = () => request({
  url: '/app/v1_0/user/channels',
  method: 'GET'
})
export const getArticles = ({ channelId, timestamp, withTop }) => request({
  url: '/app/v1_1/articles',
  method: 'GET',
  params: {
    channel_id: channelId,
    timestamp,
    with_top: withTop
  }
})

export const getAllChannels = () => request({
  url: '/app/v1_0/channels',
  method: 'GET'
})

export const deleteChannel = (id) => request({
  url: `/app/v1_0/user/channels/${id}`,
  method: 'DELETE'
})

export const addChannelReq = (channelId, order) => request({
  url: '/app/v1_0/user/channels',
  method: 'PATCH',
  data: {
    channels: [
      { id: channelId,
        seq: order
      }
    ]
  }
})

export const suggestArticles = val => request({
  url: '/app/v1_0/suggestion',
  method: 'GET',
  params: {
    q: val
  }
})
