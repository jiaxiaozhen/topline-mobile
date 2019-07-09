import request from '@/utils/request'

export const login = ({ mobile, code }) => request({
  url: '/app/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})
