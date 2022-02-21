<template>
  <div class="bk">
    <div class="my-music">
      <div class="album-slide">
        <div class="album-img">
          <img :src="attachImageUrl(avator)" alt="">
        </div>
        <ul class="album-info">
          <li>昵称: {{ username }}</li>
          <li>性别: {{ userGender }}</li>
          <li>生日: {{ birth }}</li>
          <li>故乡: {{ location }}</li>
        </ul>
      </div>
      <div class="album-content">
        <div class="album-title">
          个性签名: {{ introduction }}
        </div>
        <div class="songs-body">
          <album-content :song-list="collectList" style="background-color: rgba(0,0,0,.1);">
            <template slot="title">我的收藏</template>
          </album-content>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {mixin} from '../mixins'
import {mapGetters} from 'vuex'
import AlbumContent from '../components/AlbumContent'
import {getCollectUserId, getUserOfId, songOfSongId} from '../api/interface'

export default {
  name: 'my-music',
  mixins: [mixin],
  components: {
    AlbumContent,
    Comment
  },
  data() {
    return {
      avator: '',
      username: '',
      userGender: '',
      birth: '',
      location: '',
      introduction: '',
      collection: [],
      collectList: []
    }
  },
  computed: {
    ...mapGetters([
      'listOfSongs', // 当前播放列表
      'userId', // 当前登录用户id
    ])
  },
  mounted() {
    this.getMsg(this.userId)
    this.getCollection(this.userId)
  },
  methods: {
    getMsg(userId) {
      getUserOfId(userId)
        .then(res => {
          this.avator = res.avator
          this.username = res.username
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
    // 获取我的收藏列表
    getCollection(userId) {
      getCollectUserId(userId)
        .then(res => {
          this.collection = res
          // 通过歌曲id获取歌曲信息
          for (let item of this.collection) {
            this.getSongsOfIds(item.songId)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 通过歌曲id获取歌曲信息
    getSongsOfIds(id) {
      songOfSongId(id)
        .then(res => {
          this.collectList.push(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/my-music.scss';

.bk {
  background-image: url("../assets/img/rabbit.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
</style>
