# QRcode

## 初始化项目
```
npm install
```

### 编译和热重载
```
npm run build-watch
```

### 编译
```
npm run build
```

### 自定义配置
See [Configuration Reference](https://cli.vuejs.org/config/).


### 插件运行快捷键
```
ctrl + shift + Q
```

### 扩展程序选项

增加调色板，二维码大小控件，和切换图片格式的功能


=========================

# chorme插件 环境搭建
- 创建一个vue-cli3项目： vue create vue-extension，对话流程选择默认就行。
- 进入项目cd vue-extension
- 安装vue-cli-plugin-chrome-ext插件：vue add chrome-ext, 根据安装对话填写插件相关信息。
- 修改 vue.config.js: "template: `src/${name}/index.html\`",
- 删除vue-cli3无用文件跟文件夹：src/main.js、App.vue、components, public/index.html、favicon.ico
- 

## 注意事项：

popup options 都有自己的DOM，检查调试应该右键检查


- vue.config.js：
```js
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve("src/manifest.json"),
        to: `${path.resolve("dist")}/manifest.json`
      }
    ]
  }) ×
  
  new CopyWebpackPlugin([
    {
      from: path.resolve("src/manifest.json"),
      to: `${path.resolve("dist")}/manifest.json`
    }
  ]) √
```

上面错误解决，但具体原因不可查

- manifest.json：
```json
  "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'"
```

`npm run build-watch`要有上面配置，否则插件不能正常显示

- popup

chrome.storage.local.get方法是**异步**的，想要保证运行顺序，需要放在Promise中。回调函数，如果未读取到值会返回一个**空对象**

- options

