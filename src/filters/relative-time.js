import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // load on demand
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

export default (val) => {
  return dayjs().from(dayjs(val))
}
