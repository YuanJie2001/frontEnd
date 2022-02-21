<template>
  <div style="margin-top:70px;position: relative;">
    <video src="../assets/video/宁红夜.mp4" controls style="width: 100%;height: 100%;object-fit: cover;top: 0;left: 0;"
           autoplay="autoplay" loop="loop"></video>
    <span class="font">宁红夜</span>
  </div>
</template>

<script>

export default {
  name: 'login-logo'
}
</script>

<style lang="scss" scoped>
@import '../assets/css/login-logo.scss';

.font {
  position: absolute;
  top: 20px;
  left: 20px;
  color: red;
  font-family: 楷体,宋体;
  font-size: 50px;
}
</style>
