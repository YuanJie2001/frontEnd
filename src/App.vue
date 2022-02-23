<template>
  <div id="app">
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#00FFFF"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.3"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push" class="m">
    </vue-particles>
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
.m{
  position:fixed;
  top:0;
  width: 100%;
  z-index: 999;
  pointer-events: none;

}
</style>
