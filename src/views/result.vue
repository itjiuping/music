<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{word}}</h2>
      <span class="sub-title" :v-model="total">找到{{total}}个结果</span>
    </div>
    <el-tabs v-model="activeIndex" @tab-click="songsLite">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table" cellspacing="0" cellpadding="">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item,index) in List" :key="item.id">
              <td>{{index+1}}</td>
              <td>
                <div class="song-wrap">
                  <span @dblclick="song(item.id)">{{item.name}}</span>
                  <i class="el-icon-video-camera" v-if="item.mvid !== 0" style="margin-left:10px;color:red"></i>
                </div>
              </td>
              <td>{{item.artists[0].name}}</td>
              <td>{{item.album.name}}</td>
              <td>{{item.duration}}</td>
            </tr>
          </tbody>
        </table>
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="40" :current-page="page" @current-change="changePage">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="lists">
          <el-card v-for="item in playlist" :key="item.name" :body-style="{padding:0}">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item.playCount}}</span>
              </div>
              <img :src="item.coverImgUrl" width="100%" alt="" />
              <i class="el-icon-video-play"></i>
            </div>
            <p class="name">{{item.name}}</p>
          </el-card>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="40" :current-page="page" @current-change="changePageList">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="mv">
          <el-card v-for="item in MVS" :key="item.name" :body-style="{padding:0}">
            <div class="img-wrap">
              <span>{{item.duration}}</span>
              <img :src="item.cover" width="100%" alt="" />
              <i class="el-icon-video-play"></i>
              <div class="num-wrap">
                <div>{{item.artistName}}</div>
                <div>{{item.name}}</div>
              </div>
            </div>

          </el-card>
        </div>
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="40" :current-page="page" @current-change="changePagemv">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'result',
  data() {
    return {
      page: 1,
      word: '',
      //请求数据的类型
      types: 1,
      //存储请求回来的数据
      //存储歌曲
      List: [],
      //存储歌单
      playlist: [],
      //存储Mv数据
      MVS: [],
      //请求回来数据的条数
      total: 0,
      activeIndex: 'songs'
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    //请求音乐数据
    getlist() {
      this.word = this.$route.params.aid
      axios({
        url: 'https://autumnfish.cn/search',
        method: 'get',
        params: {
          keywords: this.word,
          limit: 40,
          offset: (this.page - 1) * 40,
          type: this.types
        }
      }).then(res => {
        //console.log(res)

        this.List = res.data.result.songs
        this.total = res.data.result.songCount
        //console.log(this.List)
        this.setTime()
      })
    },
    //请求歌单数据
    getsongs() {
      axios({
        url: 'https://autumnfish.cn/search',
        method: 'get',
        params: {
          keywords: this.word,
          limit: 20,
          offset: (this.page - 1) * 20,
          type: this.types
        }
      }).then(res => {
        //console.log(res)

        this.playlist = res.data.result.playlists
        this.total = res.data.result.playlistCount
        console.log(this.playlist)
      })
    },
    //请求MV数据
    getMV() {
      axios({
        url: 'https://autumnfish.cn/search',
        method: 'get',
        params: {
          keywords: this.word,
          limit: 20,
          offset: (this.page - 1) * 20,
          type: this.types
        }
      }).then(res => {
        //console.log(res)
        this.MVS = res.data.result.mvs
        this.total = res.data.result.mvCount
        console.log(this.MVS)
        console.log(this.total)
        this.setTime()
      })
    },
    //处理时间
    setTime() {
      if (this.types === 1) {
        for (let i = 0; i < this.List.length; i++) {
          let result = this.List[i].duration / 1000
          let sec = parseInt(result % 60)
          let min = parseInt(result / 60)
          if (min < 10) {
            min = '0' + min
          }
          if (sec < 10) {
            sec = '0' + sec
          }
          this.List[i].duration = `${min}:${sec}`
        }
      } else if (this.types === 1004) {
        for (let i = 0; i < this.MVS.length; i++) {
          let result = this.MVS[i].duration / 1000
          let sec = parseInt(result % 60)
          let min = parseInt(result / 60)
          if (min < 10) {
            min = '0' + min
          }
          if (sec < 10) {
            sec = '0' + sec
          }
          this.MVS[i].duration = `${min}:${sec}`
        }
      } else {
        return
      }
    },
    //换页
    changePage(val) {
      this.page = val
      this.getlist()
    },
    changePageList(val) {
      this.page = val
      this.getsongs()
    },
    changePagemv(val) {
      this.page = val
      this.getMV()
    },
    //切换菜单 歌单
    songsLite(val) {
      if (val.name === 'songs') {
        this.types = 1
        this.getlist()
      }
      if (val.name === 'lists') {
        this.types = 1000
        this.getsongs()
      } else if (val.name === 'mv') {
        this.types = 1004
        this.getMV()
      }
    },
    //双击放歌
    song(id) {
      axios.get('https://autumnfish.cn/song/url?id=' + id).then(res => {
        let url = res.data.data[0].url
        //console.log(res)
        // console.log(url)
        this.$store.commit('setUrl', url)
      })
    }
  }
}
</script>

<style lang="less" scoped >
.result-container {
  padding: 20px 100px;
}
//顶部
.title-wrap {
  display: flex;
  margin-bottom: 20px;
  align-items: flex-end;
  .title {
    font-size: 26px;
    margin-right: 20px;
  }
  .sub-title {
    color: #666;
  }
}
//主体内容区域
.el-tabs {
  //歌曲
  table {
    thead {
      th {
        padding: 10px 0;
      }
    }
    tbody {
      tr {
        text-align: center;
        cursor: pointer;
        td {
          padding: 10px 0;
        }
      }
      tr:nth-child(2n-1) {
        background-color: #f7f7f7;
      }
    }
  }
  //歌曲分页
  .el-pagination {
    margin-top: 20px;
    float: right;
  }
  //歌单
  .lists {
    display: flex;
    flex-wrap: wrap;
    .el-card {
      margin-right: 10px;
      margin-bottom: 20px;
      flex: 20%;
      .img-wrap {
        position: relative;
        cursor: pointer;
        transition: all 1s;
        .num-wrap {
          position: absolute;
          top: 0;
          color: #fff;
          opacity: 0.8;
          right: 0;
          background-color: #000;
        }
        i {
          position: absolute;
          font-size: 40px;
          color: #fff;
          z-index: 30;
          left: 50%;
          top: 45%;
          transform: translateX(-50%);
          display: none;
        }
      }
      .img-wrap:hover i {
        display: block;
      }
      p {
        text-align: center;
        margin-top: 10px;
      }
    }
  }
  //MV
  .mv {
    display: flex;
    flex-wrap: wrap;
    .el-card {
      margin-right: 10px;
      margin-bottom: 20px;
      flex: 20%;
      .img-wrap {
        position: relative;
        span {
          position: absolute;
          font-size: 20px;
          right: 0;
          background-color: #333;
          color: #fff;
          opacity: 0.6;
        }
        i {
          position: absolute;
          font-size: 40px;
          color: #fff;
          z-index: 30;
          left: 50%;
          top: 35%;
          transform: translateX(-50%);
          display: none;
        }
        .num-wrap {
          text-align: center;
          padding: 10px;
          div {
            margin-bottom: 10px;
          }
        }
      }
      .img-wrap:hover i {
        display: block;
      }
    }
  }
}
</style>
