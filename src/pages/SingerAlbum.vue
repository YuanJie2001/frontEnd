<template>
  <div class="singer-album">
    <div class="album-slide">
      <div class="singer-img">
        <img :src="attachImageUrl(singer.avator)" alt="">
      </div>
      <ul class="info">
        <li v-if="singer.gender === 0 || singer.gender === 1">{{ attachGender(singer.gender) }}</li>
        <li>生日: {{ attachBirth(singer.birth) }}</li>
        <li>故乡: {{ singer.location }}</li>
      </ul>
    </div>
    <div class="album-content">
      <div class="intro">
        <h2>{{ singer.name }}</h2>
        <span>{{ singer.introduction }}</span>
      </div>
      <div class="content">
        <album-content :song-list="listOfSongs">
          <template slot="title">歌单</template>
        </album-content>
      </div>
    </div>
  </div>
</template>

<script>
import {mixin} from '../mixins'
import {mapGetters} from 'vuex'
import {songOfSingerId} from '../api/interface'
import AlbumContent from '../components/AlbumContent'

export default {
  name: 'singer-album',
  mixins: [mixin],
  components: {
    AlbumContent,
    Comment
  },
  data() {
    return {
      singerId: '', // 当前传来的歌手id
      singer: {}, // 当前歌手信息
    }
  },
  computed: {
    ...mapGetters([
      'listOfSongs', // 当前播放列表
      'tempList', // 当前歌手对象
      'loginIn', // 是否登录
      'userId', // 当前登录用户id
    ])
  },
  created() {
    this.singerId = this.$route.params.id
    this.singer = this.tempList
    this.getSongOfSingerId()
  },
  methods: {
    // 获取当前歌曲的歌单列表
    getSongOfSingerId() {
      songOfSingerId(this.singerId)
        .then(res => {
          this.$store.commit('setListOfSongs', res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取性别
    attachGender(value) {
      if (value === 0) return '女'
      else if (value === 1) return '男'
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/singer-album.scss';
</style>
