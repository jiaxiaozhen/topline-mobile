<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    position="bottom"
    :style="{ height: '95%' }"
  >
    <div>
      <p>
        我的频道
        <span>点击进行编辑</span>
      </p>
      <span class="edit" @click="isEdit=!isEdit">{{ isEdit?'完成':'编辑'}}</span>
      <van-grid>
        <van-grid-item
          v-for="(item,index) in myChannels"
          :key="item.id"
          @click="handleEditChannel(item,index)"
          class="content"
          :class="activeChannel===index&&!isEdit?'active':''"
        >{{ item.name }}
        <van-icon v-show="isEdit" class="close" name="close" />
        </van-grid-item>
      </van-grid>
    </div>
    <div>
      <p>
        推荐频道
        <span>点击进添加</span>
      </p>
      <van-grid>
        <van-grid-item
          v-for="item in recommedChannels"
          :key="item.id"
          class="content"
          @click="addChannel(item)"
        >
        {{ item.name }}
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
import { getAllChannels, deleteChannel } from '@/api/channel'
export default {
  name: 'Homechannel',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    myChannels: {
      type: Array,
      default: () => []
    },
    activeChannel: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  computed: {
    recommedChannels () {
      const repeat = this.myChannels.map(item => item.id)

      const data = this.allChannels.filter(item => !repeat.includes(item.id))
      // 将获取到的频道数据统一处理成我们需要的数据格式
      data.forEach((item) => {
        item.articles = []
        item.timestamp = Date.now()
        item.upLoading = false
        item.finished = false
        item.pullLoading = false
      })
      return data
    }
  },
  created () {
    this.loadingAllChannel()
  },
  methods: {
    async loadingAllChannel () {
      const data = await getAllChannels()
      this.allChannels = data.channels
    },
    addChannel (item) {
      const channels = this.myChannels.slice(0)
      channels.push(item)
      this.$emit('update:my-channels', channels)
      const { user } = this.$store.state
      // 如果用户已登录，则发请求，添加频道
      if (user) {

      } else {
        // 如果没有登录则存入本地存储
        window.localStorage.setItem('channels', JSON.stringify(channels))
      }
    },
    async handleEditChannel (item, index) {
      console.log(item)
      // 如果是非编辑状态，点击切换
      if (!this.isEdit) {
        // 父子组件通信
        this.$emit('update:activeChannel', index)
        this.$emit('input', false)
        return
      }
      // 如果是非编辑状态，点击则是删除
      const channels = this.myChannels.slice(0)
      channels.splice(index, 1)
      this.$emit('update:my-channels', channels)
      const { user } = this.$store.state
      // 如果用户已登录，则请求接口删除数据
      if (user) {
        try {
          await deleteChannel(item)
        } catch (err) {
          console.log(err)
        }
      } else {
        // 如果未登录，保存到本地存储
        window.localStorage.setItem('channels', JSON.stringify(channels))
      }
    }
  }
}
</script>

<style lang="less" scoped>
  p {
    font-size: 30px;
    padding: 0 10px;
    span {
      font-size: 20px;
    }
  }
  div {
    margin: 10px 0;
  }
  .edit {
    position: absolute;
    right:10px;
    top:30px;
    font-size: 20px;
    height: 40px;
    width: 60px;
    text-align: center;
    line-height: 40px;
    border: 1px solid red;
  }
  .content {
    font-size: 25px;
  }
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .active {
    color: red;
  }
</style>
