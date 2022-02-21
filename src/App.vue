<template>
  <div id="app">
    <mouse-move/>
    <the-header/>
    <router-view class="music-content"/>
    <song-audio/>
    <the-aside/>
    <play-bar/>
    <scroll-top/>
    <the-footer/>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader'
import ScrollTop from './components/ScrollTop'
import TheFooter from './components/TheFooter'
import SongAudio from './components/SongAudio'
import playBar from './components/PlayBar'
import TheAside from './components/TheAside'
import MouseMove from './components/MouseMove'
export default {
  name: 'App',
  components: {
    TheAside,
    TheHeader,
    ScrollTop,
    TheFooter,
    SongAudio,
    playBar,
    MouseMove
  },

}
</script>

<style lang="scss" scoped>
@import './assets/css/app.scss';
</style>
