const head = require('./config/head')
const themeConfig = require('./config/themeConfig')
module.exports = {
  title: "最帅的坏兔子",
  description:
    "web前端技术博客,简洁至上,专注web前端学习与总结。JavaScript,ES6,TypeScript,Vue,React,CSS3,HTML5,Node,Git,Github等技术文章。",
  base: "/blog/",
  lang: "zh-CN", // en-US
  markdown: {
    lineNumber: true,
  },
  head,
  themeConfig
};
