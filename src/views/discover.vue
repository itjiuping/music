<template>
  <div class="discover">
    <!--轮播图区域-->
    <div class="top" v-loading="loading">
      <el-carousel :interval="4000" type="card" height="240px">
        <el-carousel-item v-for="(item,index) in banner" :key="index">
          <img class="medium" :src="item.imageUrl" width="100%" height="100%">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--推荐歌单-->
    <div class="body" v-loading="loading">
      <h3>推荐歌单</h3>
      <div class="body-main" style="display:flex">
        <el-card v-for="(item,index) in person" :key="index" shadow="always">
          <img :src="item.picUrl" width="100%" alt="">
          <p style="margin-top:10px">{{item.name}}</p>
          <i class="el-icon-video-play" @click="playsongs(item.id)"></i>
        </el-card>
      </div>
    </div>
    <!--最新音乐-->
    <div class="newsong" v-loading="loading">
      <h3>最新音乐</h3>
      <div class="body-main" style="display:flex">
        <el-card v-for="(item,index) in newsong" :key="index" shadow="always">
          <div class="song-new">
            <i class="el-icon-video-play" @click="playsong(item.id)"></i>
            <img :src="item.picUrl" height="100px" alt="">
            <div class="song-wrap">
              <p>{{item.name}}</p>
              <p>{{item.song.artists[0].name}}</p>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <!--推荐MV-->
    <div class="mvs" v-loading="loading">
      <h3>推荐MV</h3>
      <div class="mvs-main" style="display:flex">
        <el-card v-for="(item,index) in mvs" :key="index" shadow="always">
          <img :src="item.picUrl" width="100%" alt="">
          <p style="margin-top:10px">{{item.name}}</p>
          <p style="margin-top:10px">{{item.artistName}}</p>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'discover',
  data() {
    return {
      loading: false,
      banner: [],
      person: [],
      newsong: [],
      mvs: []
    }
  },
  methods: {
    //获取轮播图
    getBanner() {
      this.loading = true
      axios({
        url: 'https://autumnfish.cn/banner',
        method: 'get',
        params: {}
      }).then(res => {
        this.banner = res.data.banners
        this.loading = false
        // console.log(this.banner)
      })
    },
    //获取推荐歌单
    personalized() {
      this.loading = true
      axios({
        url: ' https://autumnfish.cn/personalized',
        method: 'get',
        params: {
          limit: 10
        }
      }).then(res => {
        this.person = res.data.result
        this.loading = false
        //console.log(this.person)
      })
    },
    //最新音乐
    getnewSong() {
      this.loading = true
      axios({
        url: '  https://autumnfish.cn/personalized/newsong',
        method: 'get',
        params: {}
      }).then(res => {
        this.newsong = res.data.result
        this.loading = false
        // console.log(this.newsong)
      })
    },
    //点击按钮 播放音乐
    playsong(id) {
      axios.get('https://autumnfish.cn/song/url?id=' + id).then(res => {
        let url = res.data.data[0].url
        this.$store.commit('setUrl', url)
        console.log(url)
      })
    },
    //推荐MV
    getMV() {
      this.loading = true
      axios.get('https://autumnfish.cn/personalized/mv').then(res => {
        this.mvs = res.data.result
        this.loading = false
        //console.log(this.mvs)
      })
    },
    //跳转歌单详情
    playsongs(id) {
      this.$router.push('/playlist/' + id)
    }
  },
  created() {
    //console.log('created')
    this.getBanner()
    this.personalized()
    this.getnewSong()
    this.getMV()
  }
}
</script>

<style lang="less" scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.discover {
  padding: 10px 120px;
}
.body-main {
  width: 100%;
  flex-wrap: wrap;
}
//推荐歌单
.body {
  .el-card {
    position: relative;
    margin-right: 15px;
    margin-top: 15px;
    flex: 18%;
    cursor: pointer;
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

    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .el-card:hover i {
    display: block;
  }
}
/deep/ .el-card__body {
  padding: 0;
}
//最新音乐
.newsong {
  margin: 40px 0;
  .el-card {
    margin-right: 15px;
    margin-top: 15px;
    flex: 46%;
    cursor: pointer;
    .song-new {
      display: flex;
      position: relative;
      i {
        position: absolute;
        font-size: 30px;
        color: #fff;
        z-index: 30;
        top: 50%;
        left: 50px;
        transform: translate(-50%, -50%);
        display: none;
      }
      .song-wrap {
        margin-left: 20px;
        font-size: 18px;
        p:nth-child(2) {
          margin-top: 30px;
        }
      }
    }
    .song-new:hover i {
      display: block;
    }
  }
}
//推荐MV
.mvs {
  .el-card {
    margin-right: 15px;
    margin-top: 15px;
    flex: 18%;
    cursor: pointer;
    p {
      //强制文字一行显示
      white-space: nowrap;
      //超出部分隐藏
      overflow: hidden;
      //显示省略号
      text-overflow: ellipsis;
    }
  }
}
</style>