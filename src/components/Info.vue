<template>
  <div>
    <div class="info">
      <div class="title">
        <span>编辑个人资料</span>
      </div>
      <hr/>
      <div class="personal">
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
            <el-date-picker type="date" :editable="false" v-model="registerForm.birth" placehoder="生日" style="width: 300px"/>
          </el-form-item>
          <el-form-item prop="introduction" label="签名">
            <el-input v-model="registerForm.introduction" placehoder="签名"/>
          </el-form-item>
          <el-form-item prop="location" label="地区">
            <el-select v-model="registerForm.location" placehoder="地区" style="width: 100%">
              <el-option v-for="item in citis" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="btn">
          <div type="primary" @click="saveMsg">保存</div>
          <div @click="goback(-1)">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {rules, cities} from '../assets/data/form'
import {mixin} from '../mixins/index'
import {getUserOfId, updateUserMsg} from '../api/interface'
import {mapGetters} from 'vuex'

export default {
  name: 'Info',
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
  computed: {
    ...mapGetters([])
  },
  created() {
    this.citis = cities
    this.rules = rules
  },
  mounted() {
    this.getMsg(this.userId)
  },
  methods: {
    goback(index) {
      this.$router.go(index)
    },
    getMsg(userId) {
      getUserOfId(userId)
        .then(res => {
          this.registerForm.username = res.username
          this.registerForm.password = res.password
          this.registerForm.gender = res.gender
          this.registerForm.email = res.email
          this.registerForm.phoneNum = res.phoneNum
          this.registerForm.birth = res.birth
          this.registerForm.location = res.location
          this.registerForm.introduction = res.introduction
          if (res.gender === 0) {
            this.userGender = '女'
          } else if (res.gender === 1) {
            this.userGender = '男'
          }
          this.birth = this.attachBirth(res.birth)
          this.location = res.location
          this.introduction = res.introduction
        })
    },
    saveMsg() {
      let _this = this
      let d = new Date(this.registerForm.birth)
      let datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      let params = new URLSearchParams()
      params.append('id', this.userId)
      params.append('username', this.registerForm.username)
      params.append('password', this.registerForm.password)
      params.append('gender', this.registerForm.gender)
      params.append('phoneNum', this.registerForm.phoneNum)
      params.append('email', this.registerForm.email)
      params.append('birth', datetime)
      params.append('introduction', this.registerForm.introduction)
      params.append('location', this.registerForm.location)
      updateUserMsg(params)
        .then(res => {
          if (res.code === 1) {
            _this.$store.commit('setUserName', this.registerForm.username)
            _this.notify('修改成功', 'success')
            setTimeout(function () {
              _this.$router.push({path: '/'})
            }, 2000)
          } else {
            _this.notify('修改失败', 'error')
          }
        })
        .catch(err => {
          _this.notify('修改失败', 'error')
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/info.scss';
</style>
