<template>
  <div class="search-songs content">
    <h1 class="title">
      <slot name="title"/>
      <hr/>
    </h1>
    <div class="s">
      <div class="song-item">
        <div class="item-name">歌手 <span style="color: red;font-weight: bolder">注意歌手栏的歌手是固定的,搜索无效.</span></div>
      </div>
      <hr/>
      <div class="item-name a" v-for="(item,index) in miguSinger" :key="index">
        <div @click="goMiGu(item.path)">
          <span class="item-index">{{ index + 1 }}</span>
          <span style="cursor: pointer">{{ item.name }}</span> <hr/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {mixin} from '../../mixins'
import AlbumContent from '../AlbumContent'
import {miguSinger} from '../../assets/data/miguSinger'

export default {
  name: 'search-singer',
  components: {
    AlbumContent
  },
  mixins: [mixin],
  computed: {
    ...mapGetters([
      'listOfSongs'
    ])
  },

  data() {
    return {
      miguSinger
    }
  },
  mounted() {
    this.getSong()
  },
  methods: {
    goMiGu(url) {
      window.location.href = url
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/search-songs.scss';

.s {
  font-family: 宋体;
  font-size: 16px;
}
.a{
  height: 40px;
  line-height: 40px;
}
</style>
