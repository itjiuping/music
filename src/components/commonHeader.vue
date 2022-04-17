<template>
  <div class="v-header" style="display:flex">
    <div class="l">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="cent">
      <i class="el-icon-arrow-left" @click="left"></i>
      <i class="el-icon-arrow-right" @click="right"></i>
    </div>

    <div class="input">
      <input type="text" placeholder="搜索" @keyup.enter="search" v-model="value">
      <i class="el-icon-search"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: ''
    }
  },
  methods: {
    left() {
      this.$router.go(-1)
    },
    right() {
      this.$router.go(1)
    },
    search() {
      let inputValue = this.value.trim()
      this.value = ''
      if (inputValue === '') {
        return
      } else {
        console.log(inputValue)
        this.$router.push({
          name: 'result',
          params: {
            aid: inputValue
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
.v-header {
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .l {
    margin-top: -30px;
    width: 200px;
    display: flex;
    span {
      margin-right: 10px;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      background-color: red;
    }
    span:nth-child(2) {
      background-color: yellow;
    }
    span:nth-child(3) {
      background-color: green;
    }
  }
  .cent {
    flex: 1;
    font-size: 20px;
    cursor: pointer;
    i:first-child {
      margin-left: -20px;
    }
    i {
      margin-right: 20px;
      padding: 10px;
    }
    i:hover {
      color: red;
    }
  }
  .input {
    position: relative;
    input {
      width: 200px;
      height: 30px;
      border: none;
      outline: none;
      padding-left: 30px;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.2);
    }
    i {
      position: absolute;
      left: 5px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>