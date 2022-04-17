<template>
  <div class="playlists">
    <!-- 同步 -->
    <el-card v-for="item in list" :key="item.id">
      <div class="container">
        <div class="icon-wrap">
          <img :src="item.coverImgUrl" alt="" height="100%" />
        </div>
        <div class="content-wrap">
          <span class="tag">精品歌单</span>
          <div class="title">
            {{item.name}}
          </div>
          <div class="info">
            {{item.description}}
          </div>
        </div>
        <img src="" alt="" class="bg" />
        <div class="bg-mask"></div>
      </div>
    </el-card>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <el-menu class="el-menu-demo" mode="horizontal" active-text-color="#ff0000">
          <el-menu-item v-for="(item,index) in tab" :key="item" :index="index + ''" @click="clicksong(item)">{{item}}</el-menu-item>
        </el-menu>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content" v-loading="loading">
        <el-card v-for="item in lists" :key="item.id">
          <div class="item">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item.playCount}}</span>
              </div>
              <img :src="item.coverImgUrl" width="100%" alt="" />
              <i class="el-icon-video-play" @click="playsongs(item.id)"></i>
            </div>
            <p class="name">{{item.name}}</p>
          </div>
        </el-card>
      </div>
    </div>
    <!-- 分页器 -->
    <!-- total 总条数  current-page 当前页 page-size 每页多少数据 current-change  页码改变事件  -->
    <el-pagination @current-change="handleChange" background layout="prev, pager, next" :current-page="page" :page-size="20" :total="total">
    </el-pagination>
  </div>

</template>
<script>
import axios from 'axios'
export default {
  name: 'recommend',
  data() {
    return {
      loading: false,
      list: [],
      tab: ['全部', '欧美', '华语', '流行', '说唱', '摇滚', '民谣', '电子', '轻音乐', '影视原声', 'ACG', '怀旧', '治愈', '旅行'],
      lists: [],
      // 总条数
      total: 0,
      // 页码
      page: 1,
      cat: '全部'
    }
  },
  created() {
    this.getHigh()
    this.getPlay()
  },
  methods: {
    //精品歌单
    getHigh() {
      axios({
        url: 'https://autumnfish.cn/top/playlist/highquality',
        method: 'get',
        params: {
          limit: 1,
          cat: this.cat
        }
      }).then(res => {
        this.list = res.data.playlists
        //console.log(this.list)
      })
    },
    //推荐歌单
    getPlay() {
      this.loading = true
      axios({
        url: 'https://autumnfish.cn/top/playlist/',
        method: 'get',
        params: {
          limit: 20,
          //起始的值（页码-1）*每页的数据条数
          offset: (this.page - 1) * 20,
          cat: this.cat
        }
      }).then(res => {
        //存储数据
        this.lists = res.data.playlists
        //存储数据条数
        this.total = res.data.total
        this.loading = false
        //console.log(res)
        // console.log(this.lists)
      })
    },
    //点击跟换页面
    clicksong(item) {
      this.page = 1
      this.cat = item
      this.getHigh()
      this.getPlay()
    },
    //换页
    handleChange(val) {
      console.log(val)

      this.page = val
      this.getPlay()
    },
    //获取歌单详情
    playsongs(id) {
      // console.log(id)
      this.$router.push('/playlist/' + id)
    }
  }
}
</script>
<style lang="less" scoped>
.playlists {
  padding: 10px 120px;
  min-width: 1000px;
  //精品歌单
  .el-card {
    background: #fff;
    .container {
      display: flex;
      height: 200px;
      width: 100%;
      background-color: #ccc;
      .icon-wrap {
        height: 180px;
        margin: 10px;
      }

      .content-wrap {
        padding: 13px 10px;
        .tag {
          padding: 1px 10px;
          color: rgb(185, 164, 0);
          font-size: 14px;
          border: 1px solid rgb(185, 164, 0);
          border-radius: 3px;
        }
        .title {
          margin-top: 10px;
          font-size: 15px;
          color: #fff;
          opacity: 0.6;
        }
        .info {
          margin-top: 5px;
          font-size: 13px;
          color: #fff;
          opacity: 0.4;
        }
      }
    }
  }
}
/deep/ .el-card__body {
  padding: 0;

  width: 100%;
}
/deep/ .el-menu--horizontal > .el-menu-item {
  border: none;
  padding: 0 10px;
}
/deep/ .el-menu.el-menu--horizontal {
  border: none;
}
.tab-bar {
  width: 100%;
  height: 100%;
}
//推荐歌单
.tab-content {
  display: flex;
  flex-wrap: wrap;

  .el-card {
    margin-right: 10px;
    margin-bottom: 15px;
    flex: 18%;

    .item {
      position: relative;
      cursor: pointer;
      .img-wrap {
        i {
          position: absolute;
          font-size: 40px;
          color: #fff;
          z-index: 30;
          left: 50%;
          top: 30%;
          transform: translateX(-50%);
          display: none;
          transition: all 0.6s;
        }
        .num-wrap {
          position: absolute;
          width: 100%;
          height: 40px;
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          text-align: center;
          line-height: 40px;
          top: -40px;
          transition: all 0.6s;
        }
        p {
          margin-top: 10px;
          line-height: 1;
        }
      }
      .img-wrap:hover i {
        display: block;
      }
      .img-wrap:hover .num-wrap {
        top: 0;
      }
    }
  }
}
.el-pagination {
}
</style>