<template>
  <div class="mv-container" style="padding:10px 100px">
    <!--顶部区域-->
    <div class="title" style="display:flex">
      <div class="video-wrap" style="flex:2;margin-right:20px">
        <h3 style="margin-bottom:20px">mv详情</h3>
        <!-- mv -->
        <div>
          <video controls :src="url" width="100%"></video>
        </div>
        <!-- mv信息 -->
        <div class="info-wrap">
          <div class="singer-info" style="display:flex">
            <img :src="picUrl" width="80px" height="80px" alt="" />
            <span class="name">{{list.artistName}}</span>
          </div>
          <div class="mv-info">
            <h2 class="title">{{list.name}}</h2>
            <span class="date">发布：{{list.publishTime}}</span>
            <span class="number">播放：{{list.playCount}}次</span>
            <p class="desc">
              {{list.desc}}
            </p>
          </div>
        </div>
      </div>
      <div class="mv-recommend" style="flex:1">
        <h3 style="margin-bottom:20px">相关推荐</h3>
        <div class="items" v-for="(item,index) in Mvlis" :key="index">
          <div class="img-wrap" style="width:50%">
            <img :src="item.cover" width="100%" alt="" />
            <i class="el-icon-video-play" @click="playMv(item.id)"></i>
            <div class="num-wrap">
              <span class="el-icon-video-play"></span>
              <div class="num">{{item.playCount}}</div>
            </div>
            <span class="time">{{item.duration}}</span>
          </div>
          <div class="info-wrap">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.artistName}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 评论专区 -->
    <div class="mvcomment">
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <h3 class="title">精彩评论<span class="number">({{ hotMvcomm.length}})</span></h3>
        <div class="comments-wrap" v-for="(item,index) in hotMvcomm" :key="index" style="display:flex ; margin-top:20px ">
          <div class="icon-wrap" style="margin-right:20px">
            <img :src="item.user.avatarUrl" width="60px" alt="" />
          </div>
          <div class="content-wrap">
            <div class="content">
              <span class="name">{{item.user.nickname}}：</span>
              <span class="comment">{{item.content}}</span>
            </div>
            <div class="re-content" v-if="item.beReplied.length != 0">
              <span class="name">{{item.beReplied[0].user.remarkName}}：</span>
              <span class="comment">{{item.beReplied[0].content}}</span>
            </div>
            <div class="date">2020-02-12 17:26:11</div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap" style="margin-top:20px">
        <h3 class="title">最新评论<span class="number">({{MVComm.length}})</span></h3>
        <div class="comments-wrap" v-for="(item,index) in MVComm" :key="index" style="display:flex ; margin-top:20px ">
          <div class="icon-wrap" style="margin-right:20px">
            <img :src="item.user.avatarUrl" width="60px" alt="" />
          </div>
          <div class="content-wrap">
            <div class="content">
              <span class="name">{{item.user.nickname}}：</span>
              <span class="comment">{{item.content}}</span>
            </div>
            <div class="re-content" v-if="item.beReplied.length != 0">
              <span class="name">{{item.beReplied[0].user.nickname}}：</span>
              <span class="comment">{{item.beReplied[0].content}}</span>
            </div>
            <div class="date">2020-02-12 17:26:11</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <el-pagination @current-change="handleChange" background layout="prev, pager, next" :total="total" :current-page="page" :page-size="20" :limit="limit">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'mv',
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      //mv url 地址
      url: '',
      //mv相关信息
      list: {},
      //相关推荐
      Mvlis: [],
      //歌手头像
      picUrl: '',
      //存储评论
      //精彩评论
      hotMvcomm: [],
      //最新评论
      MVComm: []
    }
  },
  computed: {},
  created() {
    this.getUrl()
    this.getlist()
    this.getMvlist()
    this.getMVComm()
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    //请求Url数据
    getUrl() {
      let id = this.$route.params.aid
      axios({
        url: 'https://autumnfish.cn/mv/url',
        method: 'get',
        params: {
          id: id
        }
      }).then(res => {
        this.url = res.data.data.url
        // console.log(res)
      })
    },
    //获取mv信息
    getlist() {
      let id = this.$route.params.aid
      axios({
        url: 'https://autumnfish.cn/mv/detail',
        method: 'get',
        params: {
          mvid: id
        }
      }).then(res => {
        this.list = res.data.data
        // let time = this.list.duration / 1000
        // let min = parseInt(time / 60)
        // let sec = parseInt(time % 60)
        // min = min < 10 ? '0' + min : min
        // sec = sec < 10 ? '0' + sec : sec
        // this.list.duration = `${min}:${sec}`
        // console.log(this.list)
        //获取歌手信息
        axios({
          url: 'https://autumnfish.cn/artists',
          method: 'get',
          params: {
            id: this.list.artists[0].id
          }
        }).then(res => {
          this.picUrl = res.data.artist.picUrl
          //console.log(res)
        })
      })
    },
    //获取mv详情
    playMv(id) {
      this.$router.push('/mv/' + id)
      this.getUrl()
      this.getlist()
      this.getMvlist()
    },
    //获取相关推荐
    getMvlist() {
      let id = this.$route.params.aid
      axios({
        url: ' https://autumnfish.cn/simi/mv',
        method: 'get',
        params: {
          mvid: id
        }
      }).then(res => {
        this.Mvlis = res.data.mvs
        for (let i = 0; i < this.Mvlis.length; i++) {
          let time = this.Mvlis[i].duration / 1000
          let min = parseInt(time / 60)
          let sec = parseInt(time % 60)
          min = min < 10 ? '0' + min : min
          sec = sec < 10 ? '0' + sec : sec
          this.Mvlis[i].duration = `${min}:${sec}`
        }
        //console.log(this.Mvlis)
      })
    },
    //获取评论
    getMVComm() {
      let id = this.$route.params.aid
      axios({
        url: ' https://autumnfish.cn/comment/mv',
        method: 'get',
        params: {
          id: id,
          limit: '',
          offset: (this.page - 1) * 20
        }
      }).then(res => {
        this.total = res.data.total
        this.MVComm = res.data.comments
        this.hotMvcomm = res.data.hotComments
        console.log(this.MVComm, this.hotMvcomm)
      })
    },
    //换页
    handleChange(val) {
      this.page = val
      this.getMVComm()
    }
  }
}
</script>

<style lang="less" scoped>
//顶部区域
.mv-recommend {
  .items {
    display: flex;
    margin-bottom: 20px;
    //相关推荐
    .img-wrap {
      position: relative;
      //播放按钮
      i {
        position: absolute;
        font-size: 30px;
        left: 42%;
        top: 35%;
        color: #fff;
        cursor: pointer;
      }
      //播放次数
      .num-wrap {
        background-color: #000;
        opacity: 0.6;
        position: absolute;
        display: flex;
        align-items: center;
        top: 0;
        right: 5px;
        color: #fff;
        span {
          font-size: 16px;
        }
      }
      //播放时长
      .time {
        position: absolute;
        bottom: 5px;
        right: 5px;
        color: #fff;
      }
    }
  }
}
//MV详情
.info-wrap {
  margin-top: 20px;
  .singer-info {
    align-items: center;
    font-size: 20px;
    img {
      border-radius: 50%;
      margin-right: 20px;
    }
  }
  .mv-info {
    margin-top: 20px;
    h2 {
      margin-bottom: 20px;
    }
    span {
      margin: 0 20px 20px 0;
      color: #ccc;
    }
    p {
      margin: 20px 0;
    }
  }
}
//评论
.comment-wrap {
  .comments-wrap {
    align-items: center;
    .icon-wrap {
      img {
        border-radius: 50%;
      }
    }
    .content-wrap {
      div {
        margin: 20px 0;
      }
      .content {
        .name {
          color: rgb(27, 95, 255);
        }
      }
      .re-content {
        background-color: #ccc;
        padding: 10px;
        .name {
          color: rgb(27, 95, 255);
        }
      }
    }
  }
}
</style>
