export default {
  state: {
    songUrl: '',
    stop: true
  },
  getters: {},
  mutations: {
    setUrl(state, url) {
      state.songUrl = url
    },
    setStop(state, change) {
      state.stop = change
    }
  },
  actions: {}
}
