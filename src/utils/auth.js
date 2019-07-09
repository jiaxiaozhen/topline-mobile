// 封装本地存储中的用户信息
const USER_KEY = 'user_info'

export const getUser = () => {
  return JSON.parse(window.localStorage.getItem(USER_KEY))
}
export const setUser = (data) => {
  window.localStorage.setItem(USER_KEY, JSON.stringify(data))
}
export const removeUser = () => {
  window.localStorage.removeItem(USER_KEY)
}
