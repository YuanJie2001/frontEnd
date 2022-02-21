<template>
  <div>
    <div class="setting">
      <div style="margin: 0 auto;width: 650px;height: 100px;">
        <video src="../assets/video/云上夕阳.mp4" style="width: 100%;object-fit: cover;"
               autoplay="autoplay" loop="loop" muted/>
      </div>
      <div class="leftCol">
        <div class="settingsMainHeader">设置</div>
        <ul class="setting-aside">
          <li v-for="(item,index) in settingList" :key="index" :class="{activeColor: activeName === item.name}"
              @click="handleClick(item)">
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="contentCol">
        <component :is="componentSrc"></component>
      </div>
    </div>
  </div>
</template>

<script>
import Info from '../components/Info'
import Upload from '../components/Upload'

export default {
  name: 'setting',
  components: {
    Info,
    Upload
  },
  data() {
    return {
      settingList: [
        {name: '个人信息', path: 'Info'},
        {name: '修改头像', path: 'Upload'},
      ],
      activeName: '个人信息',
      componentSrc: 'Info'
    }
  },
  methods: {
    handleClick(item) {
      this.activeName = item.name
      this.componentSrc = item.path
    }
  }

}
</script>

<style lang="scss" scoped>
@import '../assets/css/setting.scss';

</style>
