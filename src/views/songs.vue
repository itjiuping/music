<template>
  <div class="songs" v-loading="loading">
    <!-- <el-table :data="song" style="width: 100%" highlight-current-row>
      <el-table-column type="index" min-width="50">
      </el-table-column>
      <el-table-column prop="name" label="音乐标题" min-width="180">
        <template :slot-scope="song">
          <img :src="song.url" alt="" style="height: 100%">
          <span>{{song.name}}</span>
        </template>
        <img src="song.name" alt="">
      </el-table-column>
      <el-table-column prop="artists[name]" label="歌手" min-width="180">
      </el-table-column>
      <el-table-column prop="address" label="专辑" min-width="180">
      </el-table-column>
      <el-table-column prop="duration" label="时长" min-width="50">
      </el-table-column>
    </el-table>
    -->
    <div class="tab-bar">
      <el-menu class="el-menu-demo" mode="horizontal" active-text-color="#ff0000">
        <el-menu-item v-for="(item,index) in tabs" :key="item.name" :index="index + ''" @click="clicksong(item.type)">{{item.name}}</el-menu-item>
      </el-menu>

    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table" cellspacing="0" cellpadding="">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr v-for="(item,index) in song" :key="index">
          <td>{{index +1}}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.picUrl" height="80px" alt="" />
              <i class="el-icon-video-play" @click="playsong(item.id)" v-if="show"></i>
              <i class="el-icon-video-pause" @click="stopsong(item.id)" v-else></i>
            </div>
          </td>
          <td>
            <div class="name-wrap">
              <span>{{item.name}}</span>
            </div>
          </td>
          <td>{{item.artists[0].name}}</td>
          <td>{{item.album.name}}</td>
          <td>{{item.duration}}</td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      show: true,
      stop: true,
      loading: false,
      tabs: [
        {
          name: '全部',
          type: 0
        },
        {
          name: '华语',
          type: 7
        },
        {
          name: '欧美',
          type: 96
        },
        {
          name: '日本',
          type: 8
        },
        {
          name: '韩国',
          type: 16
        }
      ],
      song: [],
      type: 0
    }
  },
  created() {
    this.getSong()
  },
  methods: {
    getSong() {
      this.loading = true
      axios({
        url: 'https://autumnfish.cn/top/song',
        method: 'get',
        params: {
          type: this.type
        }
      }).then(res => {
        this.song = res.data.data
        //console.log(this.song)
        //处理时间
        for (let i = 0; i < this.song.length; i++) {
          let duration = this.song[i].duration / 1000
          let sec = parseInt(duration % 60)
          let min = parseInt(duration / 60)
          if (min < 10) {
            min = '0' + min
          }
          if (sec < 10) {
            sec = '0' + sec
          }
          //console.log(min + '|' + sec)
          this.song[i].duration = `${min}:${sec}`
          this.loading = false
        }
      })
    },

    clicksong(type) {
      this.type = type
      this.getSong()
    },
    //播放音乐
    playsong(id) {
      this.show = !this.show
      let change = !this.stop
      axios.get('https://autumnfish.cn/song/url?id=' + id).then(res => {
        let url = res.data.data[0].url
        //console.log(res)
        // console.log(url)
        this.$store.commit('setUrl', url)
        this.$store.commit('setStop', change)
      })
    },
    //暂停音乐
    stopsong(id) {
      this.show = !this.show
      let change = !this.stop
      this.$store.commit('setStop', change)
    }
  }
}
</script>

<style lang="less" scoped>
.songs {
  padding: 10px 120px;
}
/deep/ .el-menu--horizontal > .el-menu-item {
  border: none;
  padding: 0 10px;
}
/deep/ .el-menu.el-menu--horizontal {
  border: none;
}
.img-wrap {
  position: relative;

  i {
    position: absolute;
    font-size: 30px;
    color: #fff;
    z-index: 30;
    top: 50%;
    width: 100%;
    height: 100%;
    transform: translateY(-20%);
    display: none;
    transition: all 1s;
  }
}
.img-wrap:hover i {
  display: block;
  cursor: pointer;
}
.el-table {
  tbody {
    tr {
      transition: all 1s;
      td {
        text-align: center;
        div {
          border: none;
        }
      }
    }
    tr:nth-child(2n-1) {
      background-color: #f7f7f7;
    }
  }
}
</style>