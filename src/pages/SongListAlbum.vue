<template>
  <div class="song-list-album">
    <div class="album-slide">
      <div class="album-img">
        <img :src="attachImageUrl(tempList.picture)" alt="">
      </div>
      <div class="album-info">
        <h2>简介:</h2>
        <span>
          {{ tempList.introduction }}
        </span>
      </div>
    </div>
    <div class="album-content">
      <div class="album-title">
        <p>{{ tempList.title }}</p>
      </div>
      <div class="album-score">
        <div>
          <h3>歌单评分:</h3>
          <div>
            <el-rate v-model="average" disabled/>
          </div>
        </div>
        <span>{{ average * 2 }}</span>
        <div>
          <h3>评价:</h3>
          <div @click="setRank">
            <el-rate v-model="rank" allow-half show-text/>
          </div>
        </div>
      </div>
      <div class="songs-body">
        <album-content :song-list="listOfSongs">
          <template slot="title">歌单</template>
        </album-content>
        <comment :play-id="songListId" :type="1"/>
      </div>
    </div>
  </div>
</template>

<script>
import {mixin} from '../mixins'
import {mapGetters} from 'vuex'
import {getSongAverage, listContainSongOfSongId, setRank, songOfSongId} from '../api/interface'
import AlbumContent from '../components/AlbumContent'
import Comment from '../components/Comment'
export default {
  name: 'song-list-album',
  mixins: [mixin],
  components: {
    AlbumContent,
    Comment
  },
  data() {
    return {
      songLists: [], // 当前需要展示的歌曲列表
      songListId: '', // 前面传来的歌单id
      average: 0, // 平均分
      rank: 0 // 提交评价的分数
    }
  },
  computed: {
    ...mapGetters([
      'listOfSongs', // 当前播放列表
      'tempList', // 当前歌单对象
      'loginIn', // 是否登录
      'userId', // 当前登录用户id
    ])
  },
  created() {
    this.songListId = this.$route.params.id
    this.getSongId()
    this.getRank(this.songListId)
  },
  methods: {
    // 获取当前歌曲的歌单列表
    getSongId() {
      listContainSongOfSongId(this.songListId)
        .then(res => {
          for (let item of res) {
            this.getSongList(item.songId)
          }
          this.$store.commit('setListOfSongs', this.songLists)
        })
        .catch(err => {
          console.log(err)
        })

    },
    // 根据歌曲id获取歌曲信息
    getSongList(id) {
      songOfSongId(id)
        .then(res => {
          this.songLists.push(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取歌单评分
    getRank(id) {
      getSongAverage(id)
        .then(res => {
          this.average = res / 2
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 提交评分
    setRank() {
      if (this.loginIn) {
        let params = new URLSearchParams()
        params.append('songListId', this.songListId)
        params.append('userId', this.userId)
        params.append('score', this.rank * 2)
        setRank(params)
          .then(res => {
            if (res.code === 1) {
              this.notify('评分成功', 'success')
              this.getRank(this.songListId)
            } else {
              this.notify('评分失败', 'error')
            }
          })
          .catch(err => {
            this.notify('评分失败', 'error')
            console.log(err)
          })
      } else {
        this.rank = null
        this.notify('请先登录', 'warning')
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/song-list-album.scss';
</style>
