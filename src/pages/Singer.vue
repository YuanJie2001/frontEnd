<template>
  <div>
    <div style="margin-top:-100px;position: relative;">
      <video src="../assets/video/鲸落.mp4" style="width: 100%;height: 100%;object-fit: cover;top: 0;left: 0;"
             autoplay="autoplay" loop="loop" muted="muted"/>
    </div>
    <div class="singer-style">
      <ul class="singer-header">
        <li v-for="(item,index) in singerStyle" :key="index" @click="handleChangeView(item)"
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
import {getAllSinger, getSingerOfGender} from '../api/interface'
import {mixin} from '../mixins'
import {singerStyle} from '../assets/data/singer'

export default {
  name: 'singer',
  mixins: [mixin],
  components: {
    ContentList
  },
  data() {
    return {
      albumDatas: [],
      pageSize: 10, // 页面大小,一页15条数据
      currentPage: 1, // 默认首页
      singerStyle: [], // 歌手类型
      activeName: '全部歌手' // 当前风格
    }
  },
  computed: {
    // 计算当前表格中的数据
    data() {
      return this.albumDatas.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  mounted() {
    this.singerStyle = singerStyle
    this.getSingerList()
  },
  methods: {
    getSingerList() {
      getAllSinger()
        .then(res => {
          this.currentPage = 1
          this.albumDatas = res
        })
    },
    // 获取当前页
    handleCurrentChange(val) {
      this.currentPage = val
    },
    // 根据type显示对应歌手
    handleChangeView(item) {
      this.activeName = item.name
      this.albumDatas = []
      if (item.name === '全部歌手') {
        this.getSingerList()
      } else {
        this.getSingerOfLikeGender(item.type)
      }

    },
    // 根据gender查询对应歌手
    getSingerOfLikeGender(gender) {
      getSingerOfGender(gender)
        .then(res => {
          this.currentPage = 1
          this.albumDatas = res
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/singer.scss';

.singer-style {
  top: 70px;
  position: absolute;
  font-weight: bolder;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .1);
  li {
    display: inline-block;
    line-height: 40px;
    margin: 40px 20px 15px 20px;
    font-size: 20px;
    font-weight: 400;
    border-bottom: none;
    cursor: pointer;
  }

  li.active {
    color: $color-black;
    font-weight: 600;
    border-bottom: 4px solid $color-black;
  }
}

.a {
  position: fixed;
  width: 50px;
  height: 120px;
  top: 100px;
  right: 0;
}
</style>
