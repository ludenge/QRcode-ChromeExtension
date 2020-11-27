<template>
  <div class="main">
    <div class="qrcode-area">
      <img :src="imgSrc">
    </div>
    <div class="img-width" v-if="showChangWidth">
      <el-slider v-model="imgWidth" :min=100 :max=300 @change="createDataURL"></el-slider>
    </div>
    <div class="img-color-change" v-if="showChangColor">
      <div class="item">
        <span class="text">前景色：</span>
        <el-color-picker v-model="imgColor.dark" @change="createDataURL"></el-color-picker>
      </div>
      <div class="item">
        <span class="text">背景色：</span>
        <el-color-picker v-model="imgColor.light" @change="createDataURL"></el-color-picker>
      </div>
    </div>
    <textarea v-model="url" rows="3" class="text-area"></textarea>
  </div>
</template>

<script>
  import QRCode from 'qrcode'

  export default {
    name: 'app',
    data() {
      return {
        url: '',
        imgSrc: '',
        imgColor: {
          dark: '#000000',
          light: '#ffffff'
        },
        imgWidth: 260,
        imgType: "image/png",
        showChangWidth: false,
        showChangColor: false
      }
    },
    methods: {
      getURL() {
        return new Promise(resolve => {
          chrome.tabs.getSelected(null, function(tab) {
            resolve(tab.url)
          });
        })
      },
      createDataURL() {
        QRCode.toDataURL(this.url, {
          scale: 6,
          margin: 4,
          type: this.imgType,
          width: this.imgWidth,
          color: this.imgColor
        }).then(src => {
          this.imgSrc = src
        }).catch(err => {
          console.error(err)
        })
      },
      getStorage() {
        return new Promise(resolve => {
          chrome.storage.local.get("QRcodeOpts", res => { //取不到值res为空对象
            Object.keys(res).length === 0 ? resolve({}) : resolve(res['QRcodeOpts']) 
          });
        })
      }
    },
    mounted() {
      this.getStorage().then(opts => {
        if (opts.width) this.showChangWidth = true
        if (opts.color) this.showChangColor = true
        if (opts.type)  this.imgType = "image/jpeg"
      })
      this.getURL().then(url => {
        this.url = url  //修改url, watch可以监听到，会调用createDataURL
      })
    },
    watch: {
      url(val) {
        this.createDataURL()
      }
    }
  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .main {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    width: 300px;
    min-height: 300px;
    padding: 10px;
  }

  .qrcode-area {
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .qrcode-area img {
    border: 1px solid #ccc;
  }

  .text-area {
    outline: none;
    width: 100%;
    margin-top: 15px;
    resize: vertical;
    word-break: break-all;
  }

  .img-color-change {
    display: flex;
    justify-content: space-around;
  }

  .img-color-change .item .text {
    display: inline-block;
    margin-right: 10px;
    height: 40px;
    line-height: 40px;
    vertical-align: top;
  }
</style>
