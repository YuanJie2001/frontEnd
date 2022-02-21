<template>
  <div>
    <div style="margin-top:-100px;position: relative;">
      <video src="../assets/video/沐浴阳光.mp4" style="width: 100%;object-fit: cover;top: 0;left: 0;"
             autoplay="autoplay" loop="loop" muted="muted"/>
    </div>
    <div class="songListStyle">
      <ul class="song-list-header">
        <li v-for="(item,index) in songStyle" :key="index" @click="handleChangeView(item.name)"
            :class="{active:item.name===activeName}">
          {{ item.name }}
        </li>
      </ul>
      <content-list :contentList="data"/>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" background layout="total,prev,pager,next"
                       :current-page="currentPage" :page-size="pageSize" :total="albumDatas.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ContentList from '../components/ContentList'
import {getAllSongList, getSongListOfLikeStyle} from '../api/interface'
import {mixin} from '../mixins'
import {songStyle} from '../assets/data/songList'

export default {
  name: 'song-list',
  mixins: [mixin],
  components: {
    ContentList
  },
  data() {
    return {
      albumDatas: [],
      pageSize: 10, // 页面大小,一页15条数据
      currentPage: 1, // 默认首页
      songStyle: [], // 风格
      activeName: '全部歌单' // 当前风格
    }
  },
  computed: {
    // 计算当前表格中的数据
    data() {
      return this.albumDatas.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  mounted() {
    this.getSongList()
    this.songStyle = songStyle
  },
  methods: {
    getSongList() {
      getAllSongList()
        .then(res => {
          this.currentPage = 1
          this.albumDatas = res
        })
    },
    // 获取当前页
    handleCurrentChange(val) {
      this.currentPage = val
    },
    // 根据style显示对应歌单
    handleChangeView(name) {
      this.activeName = name
      this.albumDatas = []
      if (name === '全部歌单') {
        this.getSongList()
      } else {
        this.goSongListOfStyle(name)
      }

    },
    // 根据style查询对应歌单
    goSongListOfStyle(style) {
      getSongListOfLikeStyle(style)
        .then(res => {
          this.currentPage = 1
          this.albumDatas = res
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/song-list.scss';

.songListStyle {
  top: 70px;
  position: absolute;
  font-weight: bolder;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  color: #ebeef0;
}

.a {
  position: fixed;
  width: 50px;
  height: 120px;
  top: 100px;
  right: 0;
}
</style>
