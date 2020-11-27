module.exports = {
  globals: {
    chrome: true  //解决使用chrome.xx.xx报错
  },
  "extends": ["plugin:vue/base"], //解决错误： 'Parsing error: Unexpected token <'
}
