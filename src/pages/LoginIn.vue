<template>
  <div>
    <login-logo/>
    <div class="signUp">
      <div class="signUp-head">
        <span>用户登录</span>
      </div>
      <el-form :model="loginForm" ref="loginForm" label-width="70px" class="demo-ruleForm" :rules="rules">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="loginForm.username" placehoder="用户名"/>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="loginForm.password" placehoder="密码" type="password"/>
        </el-form-item>
        <div class="login-btn">
          <el-button @click="goRegister(-1)">注册</el-button>
          <el-button type="primary" @click="handleLoginIn(-1)">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import loginLogo from '../components/LoginLogo'
import {mixin} from '../mixins/index'
import {loginIn} from '../api/interface'

export default {
  name: 'login-in',
  components: {
    loginLogo
  },
  mixins: [mixin],
  data() {
    return {
      loginForm: {
        username: '', // 用户名
        password: '' // 密码
      },
      rules: {
        username: [
          {required: true, trigger: 'blur', message: '请输入用户名'}
        ],
        password: [
          {required: true, trigger: 'blur', message: '请输入密码'}
        ]
      }
    }
  },
  mounted() {
    this.changeIndex('登录')
  },
  methods: {
    goRegister(index) {
      this.changeIndex('注册')
      this.$router.push({path: '/Register'})
    },
    handleLoginIn() {
      let _this = this
      let params = new URLSearchParams()
      params.append('username', this.loginForm.username)
      params.append('password', this.loginForm.password)
      loginIn(params)
        .then(res => {
          if (res.code === 1) {
            _this.notify('登录成功', 'success')
            _this.$store.commit('setLoginIn', true)
            _this.$store.commit('setUserId', res.userMsg.id)
            _this.$store.commit('setUserName', res.userMsg.username)
            _this.$store.commit('setAvator', res.userMsg.avator)
            setTimeout(function () {
              _this.changeIndex('首页')
              _this.$router.push({path: '/'})
            }, 1200)
          } else {
            _this.notify('用户或密码错误', 'error')
          }
        })
        .catch(err => {
          _this.notify('用户或密码错误', 'error')
          console.log(err)
        })
    },
    changeIndex(value) {
      this.$store.commit('setActiveName', value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/sign-up.scss';
</style>
