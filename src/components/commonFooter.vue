<template>
  <div class="music">
    <audio :src="url" controls autoplay ref="audioDom" id="audio"></audio>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  watch: {
    // plays: {
    //   stop(newName, oldName) {
    //     if (newName === false) {
    //       play()
    //     } else {
    //       stop()
    //     }
    //   }
    // }
  },
  methods: {
    play() {
      var audio = document.querySelector('#audio')
      audio.play()
    },
    stop() {
      var audio = document.querySelector('#audio')
      audio.pause()
    }
  },
  computed: {
    ...mapState({
      url: state => state.tab.songUrl,
      plays: state => state.tab.stop
    })
  }
}
</script>

<style lang="less" scoped>
audio {
  width: 100%;
}
</style>