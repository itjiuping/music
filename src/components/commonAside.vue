<template>
  <div class="commonaside">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#ccc" text-color="#333" active-text-color="#ff0000">
      <el-menu-item v-for="item in list" :key="item.path" :index="item.path" @click="menu(item)">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{item.label}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          path: '/discover',
          name: 'discover',
          label: '发现音乐',
          icon: 'view'
        },
        {
          path: '/songlist',
          name: 'songlist',
          label: '推荐歌单',
          icon: 's-unfold'
        },
        {
          path: '/songs',
          name: 'songs',
          label: '最新音乐',
          icon: 'headset'
        },
        {
          path: '/mvs',
          name: 'mvs',
          label: '最新MV',
          icon: 'video-camera'
        }
      ]
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    menu(item) {
      this.$router.push({ name: item.name })
    }
  }
}
</script>

<style lang="less" scoped>
.commonaside {
  height: 90%;
  .el-menu {
    .el-menu-item {
      font-size: 18px;
      i {
        color: #000;
        margin-right: 10px;
      }
    }
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>