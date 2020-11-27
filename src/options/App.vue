<template>
  <div class="main">
    <div class="item">
      颜色：<el-switch v-model="options.color" active-color="#13ce66" @change="setStorage"></el-switch>
    </div>
    <div class="item">
      大小：<el-switch v-model="options.width" active-color="#13ce66" @change="setStorage"></el-switch>
    </div>
    <div class="item">
      <el-switch
        v-model="options.type"
        active-text="jpeg"
        inactive-text="png"
        @change="setStorage">
      </el-switch>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      options: {
        color: false,
        width: false,
        type: false
      }
    }
  },
  mounted() {
    this.getStorage()
  },
  methods: {
    setStorage() {
      chrome.storage.local.set({ "QRcodeOpts": this.options }, () => {
        console.log('save options ' + JSON.stringify(this.options))
      })
    },
    getStorage() {
      chrome.storage.local.get("QRcodeOpts", res => {
        if (Object.keys(res).length === 0) return
        this.options = res['QRcodeOpts']
      });
    }
  },
}
</script>

<style>
.main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
}
.main .item {
  height: 40px;
  line-height: 40px;
}
</style>
