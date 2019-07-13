<template>
    <div>
        <!-- 头部 -->
        <van-nav-bar class="nav-top" title="登录"/>

        <!-- 登录框 -->
        <form>
            <van-field
              left-icon="phone-o"
              v-model="user.mobile"
              v-validate="'required|digits:11'"
              name="mobile"
              clearable
              placeholder="请输入手机号"
              :error-message="errors.first('mobile')"
            />
            <van-field
            left-icon="certificate"
              v-model="user.code"
              type="password"
              name="code"
              placeholder="请输入密码"
              v-validate="'required|digits:6'"
              :error-message="errors.first('code')"
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
        code: '246810'
      },
      // err: {
      //   mobile: '',
      //   code: ''
      // },
      loginLoading: false
    }
  },
  created () {
    this.loadingCheck()
  },
  methods: {
    async handleLogin () {
      try {
        const valid = await this.$validator.validate()
        if (!valid) {
          return
        }
        this.loginLoading = true
        const data = await login(this.user)
        setUser(data)
        this.$store.commit('setToken', data)
        this.$router.push({ name: 'home' })
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败,手机号或者验证码错误')
      }
      this.loginLoading = false
    },
    loadingCheck () {
      const dict = {
        custom: {
          mobile: {
            required: '手机号不能为空',
            digits: '请输入11位有效的手机号'
          },
          code: {
            required: () => '密码不能为空',
            digits: '请输入6位有效密码'
          }
        }
      }
      this.$validator.localize('zh_CN', dict)
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
