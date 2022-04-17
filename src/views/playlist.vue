<template>
  <div class="playlist-container" style="padding:10px 100px">
    <!--歌单详情-->
    <div class="top-wrap" style="display:flex">
      <div class="img-wrap" style="margin-right:30px">
        <img :src="lest.coverImgUrl" width="220" alt="" />
      </div>
      <div class="info-wrap">
        <h3 class="title"> {{lest.name}}</h3>
        <div class="author-wrap" v-if="(lest.creator).length != 0">
          <img class="avatar" :src="lest.creator.avatarUrl" width="30px" alt="" />
          <span class="name" style="margin-right:10px">{{lest.creator.nickname}}</span>
          <span class="time">{{lest.createTime}} 创建</span>
        </div>
        <div class="play-wrap" @click="playsongs(lest.tracks)">
          <i class="el-icon-video-play"></i>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap" style="display:flex">
          <span class="title" style="margin-right:20px">标签:</span>
          <ul style="display:flex">
            <li v-for="item in lest.tags" :key="item">{{item}}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{lest.description}}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlit-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item,index) in lest.tracks" :key="index">
              <td>{{index +1}}</td>
              <td>
                <div class="img-wrap">
                  <img :src="item.al.picUrl" height="60px" alt="" />
                  <i class="el-icon-video-play" @click="playsong(item.id)"></i>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{item.name}}</span>
                    <i class="el-icon-video-camera" v-if="item.mvid !== 0" style="margin-left:10px;color:red"></i>
                  </div>

                </div>
              </td>
              <td>{{item.ar[0].name}}</td>
              <td>{{item.al.name}}</td>
              <td>{{item.dt}}</td>
            </tr>

          </tbody>
        </table>
      </el-tab-pane>
      <!--评论区域-->
      <el-tab-pane label="热门评论" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap">
          <h3>精彩评论<span>({{tal}})</span></h3>
          <div class="comments-wrap" v-for="(item,index) in hot" :key="index">
            <div class="items">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" width="50px" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}}:</span>
                  <span class="comment">{{item.content}}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length != 0">
                  <span class="name">{{item.beReplied[0].user.nickname}}：</span>
                  <span class="comment">{{item.beReplied[0].content}}</span>
                </div>
                <div class="date">{{ item.time}}</div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="最新评论" name="3">
        <!-- 最新评论 -->
        <div class="newcomment">
          <h3>最新评论<span>({{newtal}})</span></h3>
          <div class="comments-wrap" v-for="(item,index) in newlist" :key="index">
            <div class="item">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" width="50px" alt="" />
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
                <div class="date">{{ item.time}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total" :current-page="page" :page-size="5">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'playlist',
  data() {
    return {
      activeIndex: '1',
      // 总条数
      total: 0,
      // 页码
      page: 1,
      //歌单详情
      lest: {},
      //热门评论
      hot: [],
      //热门数据条数
      tal: 0,
      //最新评论
      newlist: [],
      newtal: 0
    }
  },
  created() {
    this.getlist()
    this.gethot()
    this.getnew()
  },
  methods: {
    //获取头部信息
    getlist() {
      let id = this.$route.params.aid
      //console.log(id)
      axios.get('https://autumnfish.cn/playlist/detail?id=' + id).then(res => {
        this.lest = res.data.playlist
        this.settime()
        this.sethour()
        //console.log(this.lest)
      })
    },
    //转换日期
    settime() {
      let date = new Date(this.lest.createTime)
      date = date.toLocaleDateString()
      //console.log(date)
      this.lest.createTime = date
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    //转换时间
    sethour() {
      for (let i = 0; i < this.lest.tracks.length; i++) {
        let time = this.lest.tracks[i].dt / 1000
        let sec = parseInt(time % 60)
        let min = parseInt(time / 60)
        sec = sec < 10 ? '0' + sec : sec
        min = min < 10 ? '0' + min : min
        this.lest.tracks[i].dt = `${min}:${sec}`
      }
    },
    //转换评论时间
    sethours() {
      for (let i = 0; i < this.hot.length; i++) {
        let time = new Date(this.hot[i].time)
        time = time.toLocaleDateString()
        this.hot[i].time = time
      }

      // for (let i = 0; i < this.hot.length; i++) {
      //   let time = this.hot[i].time / 1000
      //   let hour = parseInt((time / 60 / 60) % 24)
      //   let sec = parseInt(time % 60)
      //   let min = parseInt((time / 60) % 60)
      //   let year = parseInt(time / 60 / 60 / 24)
      //   sec = sec < 10 ? '0' + sec : sec
      //   min = min < 10 ? '0' + min : min
      //   hour = hour < 10 ? '0' + hour : hour
      //   this.hot[i].time = `${year}:${hour}:${min}:${sec}`
    },

    //点击放歌
    playsong(id) {
      axios.get('https://autumnfish.cn/song/url?id=' + id).then(res => {
        let url = res.data.data[0].url
        this.$store.commit('setUrl', url)
        console.log(url)
      })
    },
    //播放全部
    playsongs(tracks) {},
    //评论
    //获取热门评论
    gethot() {
      let id = this.$route.params.aid
      axios({
        url: 'https://autumnfish.cn/comment/hot',
        method: 'get',
        params: {
          id: id,
          type: 2,
          limit: '',
          offset: 0
        }
      }).then(res => {
        //console.log(res)
        this.hot = res.data.hotComments
        this.tal = res.data.total
        //console.log(this.hot)
        //console.log(this.tal)
        this.sethours()
      })
    },

    //获取最新评论
    getnew() {
      let id = this.$route.params.aid
      axios({
        url: ' https://autumnfish.cn/comment/playlist',
        method: 'get',
        params: {
          id: id,
          limit: 20,
          offset: 0
        }
      }).then(res => {
        this.newlist = res.data.comments
        this.newtal = res.data.total
        console.log(this.newlist)
      })
    }
  }
}
</script>

<style lang="less" scoped>
li {
  list-style: no;
}
.info-wrap {
  .author-wrap {
    display: flex;
    align-items: center;
    img {
      border-radius: 50%;
      margin-right: 15px;
    }
    .time {
      font-size: 12px;
      color: rgb(107, 106, 106);
    }
  }
  .play-wrap {
    cursor: pointer;
    width: 110px;
    padding: 5px 10px;
    background-color: rgb(223, 6, 6);
    color: #fff;
    border-radius: 3px;
    i {
      margin-right: 5px;
    }
  }
  .desc-wrap {
    .desc {
      font-size: 12px;
      margin-left: 10px;
    }
  }
  .tag-wrap {
    ul {
      margin-left: 15px;
      li {
        margin-right: 30px;
      }
    }
  }
  h3 {
    margin-bottom: 15px;
  }
  div {
    margin-bottom: 15px;
  }
}
//歌曲列表
.el-tabs {
  table {
    thead {
      th {
        padding: 10px 0;
      }
    }
    tbody {
      tr {
        td {
          text-align: center;
          padding: 10px 0;
          .img-wrap {
            position: relative;
            i {
              position: absolute;
              font-size: 20px;
              color: #fff;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              cursor: pointer;
            }
          }
        }
      }
      tr:nth-child(2n-1) {
        background-color: #f7f7f7;
      }
    }
  }
}
//评论

.el-pagination {
  float: right;
  margin-top: 20px;
}
.comment-wrap {
  h3 {
    margin-bottom: 15px;
    cursor: pointer;
  }
  .comments-wrap {
    margin-bottom: 20px;
    .items {
      display: flex;
      .icon-wrap {
        img {
          border-radius: 50%;
          margin-right: 20px;
        }
      }
      .content-wrap {
        margin-bottom: 20px;
        div {
          margin-bottom: 20px;
        }
        .content {
          .name {
            color: rgb(111, 175, 201);
            margin-right: 10px;
          }
        }
        .re-content {
          width: 100%;
          padding: 10px 10px;
          margin: 10px 0;
          background-color: rgb(226, 217, 217);
          border-radius: 6px;
          .name {
            color: rgb(111, 175, 201);
            margin-right: 10px;
          }
        }
        .date {
          color: #ccc;
        }
      }
    }
  }
}

.newcomment {
  h3 {
    margin-bottom: 15px;
    cursor: pointer;
  }
  .comments-wrap {
    margin-bottom: 20px;
    .items {
      display: flex;
      .icon-wrap {
        img {
          border-radius: 50%;
          margin-right: 20px;
        }
      }
      .content-wrap {
        margin-bottom: 20px;
        div {
          margin-bottom: 20px;
        }
        .content {
          .name {
            color: rgb(111, 175, 201);
            margin-right: 10px;
          }
        }
        .re-content {
          width: 100%;
          padding: 10px 10px;
          margin: 10px 0;
          background-color: rgb(226, 217, 217);
          border-radius: 6px;
          .name {
            color: rgb(111, 175, 201);
            margin-right: 10px;
          }
        }
        .date {
          color: #ccc;
        }
      }
    }
  }
}
</style>
