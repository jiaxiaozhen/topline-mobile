<template>
    <div>
        <!-- 头部 -->
        <van-nav-bar class="nav-top" title="登录"/>

        <!-- 登录框 -->
        <form>
            <van-field
              left-icon="phone-o"
              v-model="user.mobile"
              required
              clearable
              placeholder="请输入手机号"
              :error-message="err.mobile"
            />
            <van-field
            left-icon="certificate"
              v-model="user.code"
              type="password"
              placeholder="请输入密码"
              required
              :error-message="err.code"
            />
        </form>
        <div class="btn-box">
            <van-button type="info"
            class="login-btn"
            @click.prevent="handleLogin"
            :loading="loginLoading"
            loading-text="登录中..."
            loading-type="spinner">登录</van-button>
        </div>
        <p>隐私条款</p>
    </div>
</template>

<script>
import { login } from '@/api/user'
import { setUser } from '@/utils/auth'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '18612139592',
        code: '123456'
      },
      err: {
        mobile: '',
        code: ''
      },
      loginLoading: false
    }
  },
  methods: {
    async handleLogin () {
      try {
        // 表单验证
        if (!this.user.mobile) {
          this.err.mobile = '手机号不能为空'
          return
        } else {
          if (this.user.mobile.length !== 11) {
            this.err.mobile = '手机格式不正确'
            return
          } else {
            this.err.mobile = ''
          }
        }
        if (!this.user.code) {
          this.err.code = '密码不能为空'
          return
        } else {
          this.err.code = ''
        }
        this.loginLoading = true
        const data = await login(this.user)
        console.log(data)
        setUser(data)
        this.$store.commit('setToken', data)
        this.$router.push({ name: 'home' })
      } catch (err) {
        console.log(err)
        console.log('登陆失败')
      }
      this.loginLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
 .nav-top {
     background: #3296fa;
 }
 .btn-box {
    padding: 30px;
    .login-btn {
     width: 100%;
     background: #6db4fb;
     border: 0;
    }
 }
 p {
     font-size: 20px;
     text-align: center;
     margin-top: 800px;
     color: #aaa;
 }

</style>
