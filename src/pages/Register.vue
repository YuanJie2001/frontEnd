<template>
  <div>
    <login-logo/>
    <div class="signUp">
      <div class="signUp-head">
        <span>用户注册</span>
      </div>
      <el-form :model="registerForm" ref="registerForm" label-width="70px" class="demo-ruleForm" :rules="rules">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="registerForm.username" placehoder="用户名"/>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="registerForm.password" placehoder="密码" type="password"/>
        </el-form-item>
        <el-form-item prop="gender" label="性别">
          <el-radio-group v-model="registerForm.gender">
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="phoneNum" label="手机号">
          <el-input v-model="registerForm.phoneNum" placehoder="手机号"/>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="registerForm.email" placehoder="邮箱"/>
        </el-form-item>
        <el-form-item prop="birth" label="生日">
          <el-date-picker v-model="registerForm.birth" placehoder="生日" style="width: 300px"/>
        </el-form-item>
        <el-form-item prop="introduction" label="签名">
          <el-input v-model="registerForm.introduction" placehoder="签名"/>
        </el-form-item>
        <el-form-item prop="location" label="地区">
          <el-select v-model="registerForm.location" placehoder="地区" style="width: 100%">
            <el-option v-for="item in citis" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </el-form-item>
        <div class="login-btn">
          <el-button @click="goback(-1)">取消</el-button>
          <el-button type="primary" @click="SignUp(-1)">确定</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import loginLogo from '../components/LoginLogo'
import {rules, cities} from '../assets/data/form'
import {mixin} from '../mixins/index'
import {register} from '../api/interface'

export default {
  name: 'Register',
  components: {
    loginLogo
  },
  mixins: [mixin],
  data() {
    return {
      registerForm: {
        username: '', // 用户名
        password: '', // 密码
        gender: '', // 性别
        phoneNum: '', // 手机号
        email: '', // 电子邮箱
        birth: '', // 生日
        introduction: '', // 签名
        location: '' // 地区
      },
      citis: [], // 所有的地区-省
      rules: {} // 表单提交的规则
    }
  },
  created() {
    this.citis = cities
    this.rules = rules
  },
  methods: {
    goback(index) {
      this.$router.go(index)
    },
    SignUp() {
      let _this = this
      let d = this.registerForm.birth
      let datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      let params = new URLSearchParams()
      params.append('username', this.registerForm.username)
      params.append('password', this.registerForm.password)
      params.append('gender', this.registerForm.gender)
      params.append('phoneNum', this.registerForm.phoneNum)
      params.append('email', this.registerForm.email)
      params.append('birth', datetime)
      params.append('introduction', this.registerForm.introduction)
      params.append('location', this.registerForm.location)
      params.append('avator', 'userImages/卡哇伊.png')
      register(params)
        .then(res => {
          if (res.code === 1) {
            _this.notify('注册成功', 'success')
            setTimeout(function () {
              _this.$router.push({path: '/'})
            }, 2000)
          } else {
            _this.notify('注册失败', 'error')
          }
        })
        .catch(err => {
          _this.notify('注册失败', 'error')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/sign-up.scss';
</style>
