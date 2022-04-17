<template>
  <div class="mvs" v-loading="loading">
    <!--选择区域-->
    <el-menu mode="horizontal" style="display:flex" active-text-color="#ff0000">
      <h3>地区</h3>
      <el-menu-item v-for="(item,index) in area" :key="index" :index="index + ''" @click="changeArea(item)">
        <span slot="title">{{item}}</span>
      </el-menu-item>
    </el-menu>
    <el-menu mode="horizontal" style="display:flex" active-text-color="#ff0000">
      <h3>类型</h3>
      <el-menu-item v-for="(item,index) in type" :key="index" :index="index  + ''" @click="changeType(item)">
        <span slot="title">{{item}}</span>
      </el-menu-item>
    </el-menu>
    <el-menu mode="horizontal" style="display:flex" active-text-color="#ff0000">
      <h3>排序</h3>
      <el-menu-item v-for="(item,index) in order" :key="index" :index="index  + ''" @click="changeOrder(item)">
        <span slot="title">{{item}}</span>
      </el-menu-item>
    </el-menu>
    <!--内容区域-->
    <div class="mvs-main" style="display:flex">
      <el-card v-for="item in mv" :key="item.id" :body-style="{padding:'0px'}">
        <div class="icons"><i class="el-icon-video-play"><span> {{item.playCount}}</span></i></div>
        <img :src="item.cover" width="100%" alt="" @click="playMv(item.id)">
        <p>{{item.name}}</p>
      </el-card>

    </div>
    <div class="pagination">
      <!-- <el-pagination @current-change="changePage" background layout="prev, pager, next" :current-page="page" :total="total" :page-size="20">
        </el-pagination> -->
      <span class="el-icon-arrow-left" @click="pags(0)"></span>
      <span>第{{page}}页</span>
      <span class="el-icon-arrow-right" @click="pags(1)"></span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      loading: false,
      area: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
      areas: '',
      type: ['全部', '官方版', '原生', '现场版', '网易出品'],
      types: '',
      order: ['上升最快', '最热', '最新'],
      orders: '',
      mv: [],
      //当前页
      page: 1,

      //数据条数
      total: 0
    }
  },
  created() {
    this.getMvs()
  },
  methods: {
    //换页
    pags(val) {
      if (val === 0) {
        this.page--
        if (this.page === 0) {
          this.page = 1
        }
      } else if (val === 1) {
        this.page++
      }
      console.log(this.page)
      this.getMvs()
    },
    getMvs() {
      this.loading = true
      axios({
        url: ' https://autumnfish.cn/mv/all',
        method: 'get',
        params: {
          area: this.areas,
          type: this.types,
          order: this.orders,
          limit: 20,
          offset: this.page * 20
        }
      }).then(res => {
        this.mv = res.data.data
        this.total = res.data.count
        this.loading = false
        console.log(res)
      })
    },
    //切换国家
    changeArea(item) {
      // console.log(item)
      this.page = 1
      this.areas = item
      this.getMvs()
    },
    //切换类型
    changeType(item) {
      this.page = 1
      this.types = item
      this.getMvs()
    },
    //切换当前顺序
    changeOrder(item) {
      this.page = 1
      this.orders = item
      this.getMvs()
    },
    //换页
    changePage(val) {
      console.log(val)
      this.page = val
      this.getMvs()
    },
    //跳转MV详情页
    playMv(id) {
      this.$router.push('/mv/' + id)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-menu--horizontal > .el-menu-item {
  border: none;
  padding: 0 10px;
}
/deep/ .el-menu.el-menu--horizontal {
  border: none;
}
//顶部选择区域
.mvs {
  padding: 10px 120px;
  .el-menu {
    align-items: center;
    h3 {
      font-size: 16px;
    }
    .el-menu-item {
      margin-left: 30px;
      padding: 0 10px;
    }
  }
}
//主体内容区域
.mvs-main {
  flex-wrap: wrap;
  .el-card {
    margin-right: 20px;
    margin-bottom: 20px;
    flex: 18%;
    cursor: pointer;
    position: relative;
    .icons {
      position: absolute;
      right: 0;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.4);
    }
    p {
      text-align: center;
      margin-top: 10px;
    }
  }
}
//分页按钮
.pagination {
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
  span {
    padding: 5px;
  }
}
</style>