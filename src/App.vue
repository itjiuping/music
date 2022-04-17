<template>
  <div class="app">
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <el-container>
        <el-aside width="auto">
          <common-aside></common-aside>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
      <el-footer>
        <common-footer></common-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import commonAside from './components/commonAside.vue'
import commonHeader from './components/commonHeader.vue'
import commonFooter from './components/commonFooter.vue'
export default {
  components: {
    commonAside,
    commonHeader,
    commonFooter
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  height: 100vh;
  min-width: 1200px;
}
.el-container {
  height: 90%;
  .el-header {
    background-color: rgb(240, 237, 237);
  }
  .el-container {
    .el-aside {
      background-color: #ccc;
    }
  }
}
</style>
