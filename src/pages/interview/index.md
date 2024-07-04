---
type: page
title: Interview
date: 2024-06-06
description: "面经，面试题，interview"
---

<details><summary><b>面试基础学习</b></summary>

1. 请说明 Ajax Fetch Axios 三者的区别

- 三者都是用于网络请求，但是不同维度
  - Ajax(Asynchronous Javascript and XML) 一种技术的通称
  - Fetch 是一个具体的 API，和 XMLHttpRequest 是一个级别，语法更加简洁、易用，支持 Promise
  - Axios 是一个第三方库，底层是通过 XMLHttpRequest 和 Fetch 实现的

2. 节流和防抖

- 两者有什么区别
  - 节流：限制执行频率，有节奏的执行
  - 防抖：限制执行次数，多次密集的触发只执行一次
  - 节流关注过程，防抖关注结果
- 分别用于什么场景
  - 防抖：搜索框输入，按钮短时间内频繁点击
  - 节流：drag 和 scroll 期间触发某个回调，要设置一个时间间隔

```javascript
// 防抖
function debounce(fn, delay = 200) {
  let timer = 0;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = 0;
    }, delay);
  };
}
```

```javascript
// 节流
function throttle(fn, delay = 100) {
  let timer = 0;
  return function () {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = 0;
    }, delay);
  };
}
```

3. px % em rem vw/vh 有什么区别

- px 是基本单位，绝对单位（其他单位是相对单位）
- % 相对于父元素的宽度和高度的比例
- em 相对于当前元素的 font-size
- rem 相对于根节点的 font-size
- vw/vh
  - 1vw 屏幕宽度的 1%
  - 1vh 屏幕高度的 1%
  - vmin 宽高两者的最小值，vmax 宽高两者的最大值

4. 箭头函数

- 箭头函数有什么缺点
  - 没有 arguments 对象
  - 无法使用 call apply bind 来改变 this
  - 某些箭头函数代码难以阅读
- 什么时候不能使用箭头函数
  - 对象方法使用 this
  - 原型方法使用 this
  - 构造函数使用 this
  - 动态上下文中的回调函数使用 this
  - Vue 生命周期和 method 方法使用 this

5. 请描述 TCP 三次握手和四次挥手

- 三次握手（建立连接）
  - client -SYN-\> server
  - client \<-SYN+ACK- server
  - client -ACK-\> server
- 四次挥手（断开连接）
  - client -FIN-\> server
  - client \<-ACK- server
  - client \<-FIN- server
  - client -ACK-\> server

6. for...in 和 for...of 有什么区别

- for...in 用于可枚举数据，如对象、数组、字符串遍历得到 key
- for...of 用于可迭代数据，如数组、字符串、Map、Set、generator 遍历得到 value

7. for await ...of 有什么作用

- for await ...of 用于遍历多个 Promise（等价于 Promise.all）

8. offsetHeight scrollHeight clientHeight 的区别

- 盒子模型：width height padding border margin box-sizing
- offsetHeight = boder+padding+content
- clientHeight = padding+content
- scrollHeight = padding+实际内容尺寸

9. HTMLCollection 和 NodeList 的区别

- HTMLCollection 是 Element 的集合
- NodeList 是 Node 的集合

10. js 严格模式有什么特点

- 开启严格模式：
  - 全局: 文件顶部增加'use strict'
  - 某个函数内: 第一行增加'use strict'
- 全局变量必须先声明
- 禁止使用 with
- 创建 eval 作用域
- 禁止 this 指向 window
- 函数参数不能重名

## HTTP

1. HTTP 跨域请求时为何发送 options 请求
   - options 请求，是跨域请求之前的预请求
   - 浏览器自行发起的，无需我们干预
   - 不会影响实际的功能
2. 什么是跨域？如何解决跨域

- 跨域:
  - 浏览器同源策略:协议、域名、端口任意不同都会导致跨域
  - 同源策略一般限制 Ajax 网络请求，不能跨域请求 server
  - 不会限制\<link\> \<img\> \<script\>\<iframe\>加载第三方资源
- 解决方法:
  - JSONP: 通过 script 的 src 获取跨域内容
  - CORS:
    ```javascript
    response.setHeader("Access-Control-Allow-Origin", "*"); // 预先跨域域名
    response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
    response.setHeader(
      "Access-Control-Allow-Methods",
      "PUT,POST,GET,DELETE,OPTIONS,PATCH"
    ); // 允许跨域方法
    response.setHeader("Access-Control-Allow-Credential", "true"); // 允许跨域接收cookie
    ```

## Vue

1. Vue computed 和 watch 区别

- computed 用于计算产生新的数据，有缓存
- watch 用于监听现有数据

2. Vue 组件通信方式

- props 和 \$emit: 父组件通过 props 传递数据给子组件，子组件通过 \$emit 触发事件更改父组件内容
- 自定义事件: Vue 使用 new Vue, Vue3 使用 event-emitter, 用于不相关的组件
- \$attr: 获取父组件传入子组件未定义在 props 和 emits 中的属性和方法，用于父子组件通信，结合 v-bind="\$attr"可以实现跨级祖孙通信
- \$parent: 父子组件通信，子组件获取父组件
- \$refs: 父子组件通信，父组件获取子组件
- provide/inject: 祖孙组件通信
- Vuex: 状态管理

3. Vuex mutation action 区别

- mutation: 原子操作，必须是同步代码
- action: 可以包含多个 mutation，可包含异步代码

4. Vue 组件的生命周期

- Vue2
  - beforeCreate: 创建一个空白的 Vue 实例，data method 尚未被初始化，不可使用
  - created: Vue 实例初始化完成，完成响应式绑定，data method 都已经初始化，可调用，尚未开始渲染模板
  - beforeMount: 编译模板，调用 render 生成 vdom，还没有开始渲染 DOM
  - mounted: 完成 DOM 渲染，组件创建完成，开始由“创建阶段”进入“运行阶段”
  - beforeUpdate: data 发生变化之后，准备更新 DOM（尚未更新 DOM，同 beforeMount）
  - updated: data 发生变化，且 DOM 更新完成（不要在 updated 中修改 data，可能会造成死循环）
  - beforeDestroy: 组件进入销毁阶段，可移除、解绑一些全局事件、自定义事件
  - destroyed: 组件被销毁了，所有子组件都被销毁了
- Vue3
  - beforeCreate 组件实例创建之前执行，未实例化
  - created 组件实例创建后执行
  - beforeMount 组件挂载前执行
  - mounted 组件挂载之后执行
  - beforeUpdate 组件更新前执行
  - updated 组件更新后执行
  - beforeUnmount 组件卸载之前执行
  - unmounted 组件卸载之后执行
  - activated keep-alive 内部组件激活时执行
  - deactivated keep-alive 内部组件停用时执行
  - errorCaptrued 捕获子组件错误时执行
  - renderTracked 渲染函数被跟踪时执行
  - renderTriggered 渲染函数触发时执行

5. Vue 什么时候操作 DOM 比较合适

- mounted 和 updated 都不能保证子组件全部挂载完成
- 使用\$nextTick 渲染 DOM

6. Ajax 应该在哪个生命周期

- 有两个选择: created 和 mounted（推荐）
- created 会快约 10ms，实际区别不大，数据初始化、事件监听等操作可以在此进行
- 操作依赖 DOM 元素，可以在此进行

7. Vue3 Composition API 生命周期有何区别

- 用 setup 代替了 beforeCreate 和 created
- 使用 Hooks 函数的形式，如 mounted 改为 onMounted()

8. Vue router MemoryHistory(abstract)是什么

- Vue router 有三种路由模式
  - Hash
  - WebHistory
  - MemoryHistory
- 没有前进后退，页面路由只有一个

# JS 高级

1. JS 内存泄漏如何检测？场景有哪些？

- 检测方法
  - 通过浏览器 chrome devtools -\> performance -\> 勾选 memory -\> 清除 GC -\> record
  - heap 指标持续上升，内存泄漏
- 内存泄漏场景
  - 被全局变量、函数引用，组件销毁时未清除
  - 被全局事件、定时器引用，组件销毁时未清除
  - 被自定义事件引用，组件销毁时未清除

2. 什么是垃圾回收？垃圾回收的方式有哪些？

- 函数执行完，不会再使用的变量会被系统回收内存资源
- 老版浏览器通过引用计数来回收资源
- 现代浏览器通过标记清除来回收资源

3. weakMap weakSet 弱引用

- weakMap 的 key 只能是引用类型
- 不影响变量引用变量销毁

4. 浏览器和 nodejs 的事件循环的区别

- js 是单线程的
- 浏览器 EventLoop

  - 浏览器中 js 执行和 DOM 渲染是共用一个线程的
  - 异步（微任务-\> DOM -\> 宏任务）
  - 宏任务
    - setTimeout、setInterval、网络请求
  - 微任务
    - promise.then、async/await、MutationObserver
  - 微任务在下一轮 DOM 渲染之前执行，宏任务在之后执行

- nodejs EventLoop
  - 宏任务类型与优先级
    - Timers: setTimeout、setInterval
    - I/O callbacks: 处理网络、流、TCP 的错误回调
    - Idle,prepare: 闲置状态（nodejs 内部使用）
    - Poll 轮询: 执行 poll 中的 I/O 队列
    - Check 检查: 存储 setImmediate 回调
    - Close callbacks: 关闭回调，如 socket.on('close')
  - 微任务类型与优先级
    - Promise.then、async/await, process.nextTick(优先级最高)
- 顺序
  - 执行同步代码
  - 执行微任务（process.nextTick 优先级最高）
  - 按顺序执行 6 个类型的宏任务（每个开始时都执行当前的微任务）

5. vdom 真的很快吗

- vdom 并不快，js 直接操作 DOM 才是最快的
- 但“数据驱动视图”要有合适的技术方案，不能全部 DOM 重建
- vdom 就是目前最合适的技术方案

6. 遍历数组，for 和 forEach 哪个快？（循环和递归同理）

- for 更快
- forEach 每次都要创建一个函数来调用，而 for 不会创建函数
- 函数需要独立的作用域，会有额外的开销

7. nodejs 如何开启多进程，进程如何通讯？

   - 开启子进程 child_process.fork 和 cluster.fork
   - 使用 send 和 on 进行通信

8. 什么是 JS Bridge？

- JS 无法直接调用 native API
- 需要通过一些特定的“格式”来调用
- 这些“格式”就统称 JS-Bridge，例如微信 JSSDK

9. JS Bridge 的常见实现方式

- 注册全局 API
- URL Scheme

10. 是否了解过 requestIdleCallback 和 requestAnimationFrame 有什么区别？

- requestAnimationFrame 每次渲染完成都会执行，高优
- requestIdleCallback 空闲时才执行，低优
- 两者都是宏任务
- 要等待 DOM 渲染完才执行

11. Vue2、Vue3 和 React 三者的 diff 算法有什么区别

- React diff: 仅右移
- Vue2: 双端比较
- Vue3: 最长递增子序列

12. Vue React 为何循环时必须使用 key

- vdom diff 算法会根据 key 判断元素是否要删除
- 匹配了 key，则只移动元素-性能较好
- 未匹配 key，则删除重建-性能较差

13. 移动端 H5 click 有 300ms 延迟，如何解决

- 背景: double tap to zoom
- fastClick
  - 监听 touchend 事件（touchstart touchend 会先于 click 触发）
  - 使用自定义 DOM 事件模拟一个 click 事件
  - 通过禁止冒泡把默认的 click 事件禁止掉
- 现代浏览器通过\<meta name="viewport" content="width=device-width,initial-scale=1.0"\>

14. 网络请求中，token 和 cookie 有什么区别

- cookie: HTTP 标准，跨域限制，配合服务 session 使用
- token: 无标准，无跨域限制，用于 JWT

15. Session 和 JWT 哪个更好

- Session
  - 原理简单，易于学习
  - 用户信息存储在服务端，可快速封禁某个用户
  - 占用服务端内存，硬件成本高
  - 多进程，多服务器时，不好同步 -- 需使用第三方缓存，如 redis
  - 默认有跨域限制
- JWT
  - 不占用服务端内存
  - 多进程、多服务器不受影响
  - 没有跨域限制
  - 用户信息存储在客户端，无法快速封禁某用户
  - 万一服务端密钥被泄露，则用户信息全部丢失
  - token 体积一般大于 cookie，会增加请求的数据量
- 如有严格管理用户信息的需求（保密、快速封禁）推荐 Session
- 如没有特殊要求，则使用 JWT（如创业初期的网站）

16. 如何实现 SSO 单点登录

- 基于 cookie
  - 主域名相同
  - 设置 cookie domain 为主域名，即可共享 cookie
- SSO
  - client -\> serverA -凭证失效-\> SSO Login -无 SSO-\> SSO server -\> acount+password -\> SSO server -ticket(token)-\> client
  - client -ticket(token)-\> serverB -ticket-\> SSO server -校验通过-\> serverB -业务返回-\> client
- OAuth 2.0
  - 第三方登录

17. HTTP 协议和 UDP 协议有什么区别

- HTTP 是应用层协议，TCP UDP 是传输层协议
- TCP 协议: 有连接，有断开，稳定传输
- UDP 协议: 无连接，无断开，不稳定传输，但效率高，如视频会议、语音通话

18. HTTP 协议 1.0 1.1 2.0 有什么区别

- HTTP1.0: 最基础的 HTTP 协议，支持基本的 GET POST 方法
- HTTP1.1: 缓存策略 cache-control E-tag 等；支持长连接 Connection: keep-alive，一次 TCP 连接多次请求；断点续传，状态码 206；支持 PUT DELETE 等，可用于 Restful API
- HTTP2.0: 可压缩 header，减少体积；多路复用，一次 TCP 连接中可以多个 HTTP 并行请求；服务端推送

19. 什么是 HTTPS 中间人攻击？如何预防？

- 中间人攻击-黑客伪造证书
  - client -https 请求-\> server -CA 证书+公钥 A-\> client 验证证书 -公钥 A 加密随机码 key-\> server -私钥 B 解密随机码-\>加密数据 -\> client -随机码解密-\> 数据
- 使用正规厂商的证书，慎用免费的

20. \<script\> async 和 defer 有什么区别

- parser: +
- fetch: -
- execution: \*

```
script | scripting:       ----****
       | HTML Parser:  ++++      +++++
script | scripting:       ----   ****
defer  | HTML Parser:  +++++++++++
script | scripting:       ----****
async  | HTML Parser:  ++++++++  ++++
```

21. prefetch 和 dns-prefetch 有什么区别

- preload: 资源在当前页面使用，会优先加载
- prefetch: 资源在未来页面使用，空闲时加载
- dns-prefetch: DNS 预查询
- preconnet: DNS 预连接

22. 你知道哪些前端攻击？该如何预防？

- XSS
  - Cross Site Script 跨站脚本攻击
  - 手段: 黑客将 JS 代码插入到网页内容中，渲染时执行 JS 代码
  - 预防: 特殊字符替换，慎用 v-html 和 dangerouslySetInnerHTML
- CSRF
  - Cross Site Request Forgery 跨站请求伪造
  - 手段: 黑客诱导用户去访问另一个网站的接口，伪造请求
  - 预防: 严格的跨域限制(referrer)，为 cookie 设置 SameSite，关键接口增加短信验证码机制
- 点击劫持
  - Click Jacking
  - 手段: 诱导界面上蒙一个透明 iframe，诱导用户点击
  - 预防: 让 iframe 不能跨域加载
- DDos
  - Distribute denial-of-service 分布式拒绝服务
  - 手段: 分布式的、大规模的流量访问，是服务器瘫痪
  - 预防: 软件层不好做，需要硬件预防（如阿里云 WAF）
- SQL 注入
  - 手段: 黑客提交内容时写入 SQL 语句，破坏数据库
  - 预防: 处理输入的内容，替换特殊字符

23. WebSocket 和 HTTP 协议有什么区别

- WebSocket
  - 支持端对端通讯
  - 可以由 client 发起，也可以由 server 发起
    - 用于: 消息通知，直播间讨论区，聊天室，协同编辑
- WebSocket 协议名师 ws://,可双端发起请求
- WebSocket 没有跨域限制
- 通过 send 和 onmessage 通讯（HTTP 通过 req 和 res）

24. WebSocket 和 HTTP 长轮询的区别

- HTTP 长轮询: 客户端发起请求，服务端阻塞，不会立即返回
- Websocket: 客户端发起请求，服务端也可发起请求

25. 描述从输入 url 到页面展示的完整过程

- 网络请求
  - DNS 查询（得到 IP）
  - 建立 TCP 连接（三次握手）
  - 浏览器发起 HTTP 请求
  - 收到请求响应，得到 HTML 源代码
  - 解析 HTML，遇到静态资源继续发起网络请求获取 js css 图片 视频等
  - 静态资源如果命中强缓存，此时不必请求
- 解析: 字符串 -\> 结构化数据
  - HTML 构建 DOM 树
  - CSS 构建 CSSOM 树（style tree）
  - 两者结合，形成 render tree
- 渲染: Render Tree 绘制到页面

  - 计算各个 DOM 的尺寸、定位，最后绘制到页面
  - 遇到 js 可能会执行
  - 异步 CSS、图片加载，可能会触发重新渲染

- 优化解析
  - CSS 放在\<head\>中，不要异步加载 css
  - js 放在\<body\>最下面（或合理使用 defer async）
  - \<img\> 提前定义 width height

26. 重绘 repaint 重排 reflow 有什么区别

- 重绘 repaint
  - 元素外观改变，如颜色，背景色
  - 元素的尺寸、定位不变，不会影响其他元素的位置
- 重排 reflow
  - 重新计算尺寸和布局，可能会影响其他元素的位置
  - 如元素高度增加，可能会使相邻元素位置下移
- 区别
  - 重排比重绘影响更大，消耗页更大
  - 尽量避免无意义的重排
- 减少重排的方法

  - 集中修改样式，或直接切换 css class
  - 修改之前先设置 display:none，脱离文档流
  - 使用 BFC 特性, 不影响其他元素位置(尽可能只影响盒子内的内容)
    - 根节点\<html\>
    - float:left/right;
    - overflow: auto/scroll/hidden;
    - display: inline-block/table/table-row/table-cell;
    - display: flex/grid;的直接子元素
    - position: absolute/fixed;
  - 频繁触发(resize scroll)使用节流和防抖
  - 使用 createDocumentFragment 批量操作 DOM
  - 优化动画,使用 CSS3 和 requestAnimationFrame

27. 如何实现网页多标签 tab 通讯

- websocket
  - 无跨域限制
  - 需要服务端支持,成本高
- localStorage
  - 简单易用
  - 同域的 A 和 B 两个页面,A 设置 localStorage,B 页面可监听 localStorage 值的修改
- SharedWorker
  - SharedWorker 是 WebWorker 的一种
  - WebWorker 可开启子进程执行 JS,但不能操作 DOM
  - SharedWorker 可单独开启一个进程,用于同域页面通讯
  - 调试不方便 chrome://inspect,不兼容 IE11
- BroadcastChannel
  - 域名限制
  - 不兼容 IE11
  - 支持多通道通信
  - 实时更新,双向通信
- window.postMessage()
  - 无跨域限制
- Extension
  - 浏览器扩展程序

28. 网页和 iframe 如何通讯

- postMessage()
  - 注意跨域的限制和判断

29. 请描述 Koa2 的洋葱圈模型

- 洋葱模型是一种基于中间件机制的 web 应用程序的开发方法，它通过将请求和响应对象依次传递给各个中间件函数，实现了业务逻辑的分层和复用，并且具有灵活、可扩展和高效的特点。
- 请求阶段
  - 从外到内依次执行请求相关的中间件
- 业务阶段
- 执行业务逻辑相关的中间件
- 响应阶段
  - 从内到外依次执行响应相关的中间件
- 错误处理阶段
  - 如果出现错误,则跳过后续中间件,并交给错误处理中间件处理异常

# 实际工作经验

1. H5 页面如何进行**首屏**优化?

- 路由懒加载
  - 适用于 SPA(不适用 MPA)
  - 路由拆分,优先保证首页加载
- 服务端渲染 SSR
  - 传统的前后端分离(SPA)渲染页面的过程复杂
  - SSR 渲染页面过程简单,所有性能好
  - 如果是纯 H5 页面, SSR 是性能优化的终极方案
- APP 预取
  - 如果 H5 在 APP Webview 中展示,可使用 APP 预取
  - 用户访问列表页时,APP 预加载文章首屏内容
  - 用户进入 H5 页,直接从 APP 中获取内容,瞬间展示首屏
- 分页
  - 针对列表页(如新闻首页列表)
  - 默认只展示第一页内容
  - 上划加载更多
- 图片懒加载 lazyLoad
  - 针对详情页
  - 默认只展示文本内容,然后触发图片懒加载
  - 注意:提前设置图片尺寸,尽量只重绘不重排
- Hybrid
  - 提前将 HTML JS CSS 下载到 APP 内部
  - 在 APP webview 中使用 file:// 协议加载页面文件
  - 再用 Ajax 获取内容并展示(也结合 APP 预取)

2. 后端一次性返回 10W 条数据,你该如何渲染？

- 设计不合理，应当采用分页
- 自定义中间层
  - 自定义 nodejs 中间层，获取并拆分这 10W 条数据
  - 前端对接 nodejs 中间层，而不是服务端
  - 成本比较高
- 虚拟列表（不建议，容易出 bug，成本高，实现复杂，性能差）
  - 只渲染可视区域 DOM
  - 其他隐藏区域不显示，只用 div 撑起高度
  - 随着浏览器滚动，创建和销毁 DOM

3. 前端常用的设计模式有哪些？并说明使用场景

- 工厂模式: 用一个工厂函数，来创建实例，隐藏 new；如 JQuery \$函数、React.createElement 函数
- 单例模式: 全局唯一的实例（无法生成第二个）；如 Vuex Redux；全局唯一的 dialog modal
- 代理模式: 使用者不能直接访问对象，而是访问一个代理层；在代理层可以监听 get set 做很多事情；如 ES6 Proxy 实现 Vue3 响应式
- 观察者模式: 观察者模式，对象之间存在依赖关系，一个对象的状态发生改变，其他对象会得到通知并自动更新；如 Vue 响应式；React 状态管理 Redux
- 发布订阅模式: 发布订阅模式，对象之间存在依赖关系，一个对象的状态发生改变，其他对象会得到通知并自动更新；如 Vue 响应式；React 状态管理 Redux
- 装饰器模式: 原功能不变，增加一些新功能（AOP 面向切面编程）；ES 和 TypeScript 的 Decorator 语法；类装饰器，方法装饰器

4. 观察者模式和发布订阅模式的区别？

- 观察者模式
  - Subject 和 Observer 直接绑定，没有中间媒介
  - 如 addEventListener 绑定事件
- 发布订阅模式

  - Publisher 和 Subscriber 互不相识，需要中间媒介 Event channel
  - 如 EventBus 自定义事件

  5. 你在实际工作中，做过哪些 Vue 优化？

  - v-if 和 v-show
  - v-for 使用 key
  - 使用 computed 缓存
  - keep-alive 缓存组件
  - 异步组件，拆包按需加载
  - 路由懒加载
  - 服务端渲染 SSR

  6. 你使用 Vue 遇到过哪些坑？

  - 内存泄漏
    - 全局变量、全局事件、全局定时器未销毁
    - 自定义事件未销毁
  - Vue2 响应式的缺陷
    - data 新增属性用 Vue.set
    - data 删除属性用 Vue.delete
    - 无法直接修改数组 arr\[index\] = value
  - 路由切换时 scroll 到顶部
    - SPA 的通病，不仅仅时 Vue
    - 如，列表页，滚动到第二屏，点击进入详情页
    - 在返回到列表页（此时组件重新渲染）就 scroll 到顶部
    - 解决方案：
      - 在列表页缓存数据和 scrollTop 值
      - 当再次返回列表页时，渲染组件，执行 scrollTo(scrollTop)
      - MPA + APP webview

7. 在实际工作中，你对 React 做过哪些优化

- 修改 CSS 模拟 v-show
- 循环使用 key
- 使用 Fragment 减少层级
- JSX 不要定义函数
- 要在构造函数中 bind this 或使用箭头函数
- 使用 shouldComponentUpdate （使用不可变数据）
  - 使用 shouldComponentUpdate 判断组件是否要更新
  - 或者使用 React.PureComponent
  - 函数组件使用 React.memo
- Hooks 缓存数据和函数
  - useMemo
  - useCallback
- 异步组件(React.lazy+ Suspense)
- 路由懒加载
- 服务端渲染 SSR-Next.js

8. 你使用 React 遇到过哪些坑？

- 自定义组件的名称首字母要大写
- js 关键字冲突
- JSX 的数据类型
- setState 是异步更新的

9. 如何统一监听 Vue 组件报错？

- window.onerror
  - 全局监听所有 JS 错误
  - 但它是 JS 级别的，识别不了 Vue 组件信息
  - 捕捉一些 Vue 监听不到的错误
- errorCaptured 生命周期
  - 监听所有下级组件的错误
  - 返回 false 会阻止向上传播
- errorHandler 配置
  - Vue 全局错误监听，所有组件错误都会汇总到这里
  - 但 errorCaptured 返回 false，不会传播到这里
- 异步错误

  - 异步回调里的错误，errorHandler 无法监听
  - 需要使用 window.onerror
  - Promise 未处理的 catch 需要用到 onhandleRejection

10. 如何统一监听 React 报错？

- ErrorBoundary 组件
  - 监听所有下级组件报错，可降级展示 UI
  - 只监听组件渲染时报错，不监听 DOM 事件、异步错误
  - 降级 UI 只在 production 环境生效，dev 直接报错
- 事件报错
  - ErrorBoundary 无法监听 DOM 事件报错
  - 可用 try-catch
  - 可用 window.onerror
- 异步错误
  - 异步回调里的错误，ErrorBoundary 无法监听
  - 需要使用 window.onerror
  - Promise 未处理的 catch 需要用到 onhandleRejection

11. 如果一个 H5 很慢，你该如何排查性能问题？
    a. 分析性能指标，找到慢的原因
    b. 对症下药，解决问题
    c. 持续跟进，持续优化

- 前端性能指标
  - First Paint(FP)
  - First Contentful Paint(FCP)
  - First Meaningful Paint(FMP) 已弃用，改用 LCP
  - DomContentLoaded (DCL)
  - Large Contentful Paint(LCP)
  - Load (L)
- Chrome DevTools
  - Performance 可查看上述性能指标，并有网页快照
  - Network 可以查看各个资源的加载时间
- Lighthouse
  - 非常流行的第三方性能评测工具
  - 支持移动端和 PC 端
- 识别问题: 哪里慢
  - 加载慢
    - 优化服务端硬件配置，使用 CDN
    - 路由懒加载，大组件异步加载 -- 减少主包体积
    - 优化 HTTP 缓存策略
  - 渲染慢
    - 优化服务端接口
    - 继续分析，优化前端组件内部的逻辑
    - 服务端渲染 SSR
- 持续跟进
  - 性能优化是一个循序渐进的过程，不像 bug 一次性解决
  - 持续跟进统计结果，再逐步分析性能瓶颈，持续优化
  - 可使用第三方统计服务，如阿里云 ARMS、百度统计

12. 你在工作经历中，遇到过哪些项目难点，如何解决的？

- 遇到问题要注意积累
  - 回顾问题，写文章记录
- 答题思路
  - 描述问题: 背景+现象+造成的影响
  - 问题如何被解决: 分析+解决
  - 自己的成长: 学到了什么+以后如何避免

# 手写题

1. 手写一个 JS 函数，实现数组扁平化 Array Flatten

```js
import { flatten1, flatten2, flatten3 } from "../array-flatten";
```

2. 手写一个 getType 函数，传入任意变量，可准确获取类型

```js
import { getType } from "../get-type";
```

3. new 一个对象发生了什么？请手写代码表示

- 创建一个空对象 obj, 继承构造函数的原型
- 执行构造函数，将 this 指向 obj
- 返回 obj

```js
function newInstance(constructor, ...args) {
  const obj = Object.create(constructor.prototype);
  constructor.apply(obj, args);
  return obj;
}
```

4. 深度优先遍历一个 DOM 树
5. 广度优先遍历一个 DOM 树
6. 手写 LazyMan
7. 手写一个 curry 函数，把其他函数柯里化
8. instanceof 原理是什么，请用代码表示
9. 手写 bind
10. 手写 EventBus 自定义事件
11. 用 js 实现一个 LRU 缓存

- LRU - Least Recently Used 最近使用
- 如果内存优先，只缓存最近使用的，删除“沉水”数据
- 核心 API 两个：get(key) set(key, value)

# 分析题

1. ['1', '2', '3'].map(parseInt)

- [1. NaN, NaN]

2. 以下代码输入什么？

```js
function changeArg(x) {
  x = 200;
}
let num = 100;
changeArg(num);
console.log(num);
let obj = { name: "xiaoming" };
changeArg(obj);
console.log(obj);
```

3. 手写 convert 函数，将数组转为树
4. 手写 convert 函数，将树转为数组（广度优先遍历）
5. 以下代码输出什么？

```js
function Foo() {
  Foo.a = function () {
    console.log(1);
  };
  this.a = function () {
    console.log(2);
  };
}
Foo.prototype.a = function () {
  console.log(3);
};
Foo.a = function () {
  console.log(4);
};
Foo.a(); // 4
let obj = new Foo(); // {a: Function}
obj.a(); // 2
Foo.a(); // 1
```

6. 一道让人失眠的 promise 执行顺序问题

- then 交替执行
- then 中返回 promise 实例会“慢两拍”
  - 第一拍: 将 pending 状态改为 fulfilled
  - 第二拍: then 函数挂载到 MicroTaskQueue 中

```js
Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });
Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });
```

7. React 中，以下代码输出什么

- 合并更新
- 异步更新
- 同步更新（不在 React 上下文中触发）
  - setTimeout setInterval promise.then
  - 自定义 DOM 事件
  - Ajax 回调

```jsx
componentDidMount() {
  // this.state.val = 0;
  this.setState({ val: this.state.val + 1 });
  console.log(this.state.val);
  this.setState({ val: this.state.val + 1 });
  console.log(this.state.val);
  setTimeout(() => {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val);
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val);
  }, 0);
}
```

8. setState 是微任务还是宏任务？

- setState 本质是同步，只不过让 React 做成了异步的样子
- 因为要考虑性能，多次 state 修改，只进行一次 DOM 渲染
- 日常说的“异步”是不严谨的，但沟通成本低

同步，不是微任务或宏任务

9. 以下代码输出什么？

```js
let a = { n: 1 };
let b = a;
a.x = a = { n: 2 };
console.log(a.x); // undefined
console.log(b.x); // {n: 2}
```

10. 以下代码输出什么？

```js
let a = {},
  b = "123",
  c = 123;
a[b] = "b";
a[c] = "c";
console.log(a[b]); // c
```

```js
let a = {},
  b = Symbol("123"),
  c = Symbol("123");
a[b] = "b";
a[c] = "c";
console.log(a[b]); // b
```

```js
let a = {},
  b = { key: "123" },
  c = { key: "456" };
a[b] = "b";
a[c] = "c";
console.log(a[b]); // c
```

# 项目设计

1. 开发一个前端统计 SDK，你如何设计？

- 统计范围
  - 统计页面访问量 PV
  - 统计自定义事件
  - 统计错误
  - 统计性能指标
- 发送数据使用 img
  - 简单易用
  - 支持跨域
- 报错统计要结合 Vue/React 报错

2. sourcemap 有什么作用？如何配置

- sourcemap 是一个映射文件，用于将打包后的代码映射到源代码，方便调试。
- 在 webpack 中，可以通过配置 `devtool` 选项来生成 sourcemap 文件。

3. 何时用 SPA，何时用 MPA？

- SPA
  - 大型后台管理系统
  - 知识库
  - 比较复杂的 webAPP
- MPA
  - 分享页
  - 新闻详情页

4. 设计一个 H5 编辑器的数据模型和核心功能

```js
const store = {
  page: {
    title: "标题",
    setting: {},
    props: {},
    components: [
      {
        id: "1",
        name: "text",
        tag: "text",
        style: { color: "red" },
        attrs: {},
        text: "",
      },
    ],
  },
  activeComponentId: "1",
};
const getters = {
  layers() {
    store.page.components.map((item) => ({ id: item.id, name: item.name }));
  },
};
```

5. 请设计一个“用户-角色-权限”模型，例如：博客管理后台

- 普通成员：查看博客、发表博客、评论博客
- 管理员：普通成员权限 + 修改博客 删除博客
- 超级管理员：管理员权限 + 添加成员 删除成员 修改成员权限

- RBAC：Role-Based Access Control 基于角色的访问控制
  - 角色：增删改查，绑定权限
  - 权限：增删改查
  - 用户：增删改查，绑定角色

6. Hybrid 模板是如何更新的？

- template CMS -上传-\> template server -下载-\> APP
- App 中 html js css -file\://协议-\> webview -ajax-\> API server

- APP 何时下载新版本
  - APP 启动时检查、下载
  - 实时（每隔 5min）检查、下载
- 延迟使用
  - 立刻下载、使用会影响性能（下载需要时间，网络环境不同）
  - 检查到新版本，先再后台下载。此时先用着老版本
  - 待新版本下载完成，再替换为新版本，开始使用

7. 开发一个 H5 抽奖页，你需要后端提供哪些 API？

- 登录, 获取用户信息接口,是否已抽奖
- 抽奖接口
- 分享接口
- 统计接口

8. 如果你是前端负责人，如何做技术选型？（站在团队角度）

- 前端框架（vue react Nuxt.js Next.js 或 Nodejs 框架）
- 语言（Javascript 或 Typescript）
- 构建工具（webpack vite）

- 技术选型的依据
  - 社区是否足够成熟
  - 公司是否已有经验积累
  - 团队成员的学习成本
- 成本
  - 学习成本
  - 管理成本
  - 运维成本

9. 设计实现一个 H5 图片懒加载 SDK

# 软技能

1. 你是否看过“红宝书”
2. 如何做 Code review, review 哪些项目

- 代码规范（命名、语义）
- 重复代码要抽离、复用
- 单个函数内容过长，需要拆分
- 算法复杂度是否可用？是否可继续优化
- 是否有安全漏洞
- 扩展性如何（不封闭）
- 是否和现有的功能重复了
- 是否有完善的单元测试
- 组件设计是否合理

- 提交 PR（或 MR）时，通过代码 diff 进行 Code review
- 每周例行一次集体 Code review

- 每次 Code review 的问题要记录下
- 归纳整理，形成自己的代码规范体系
- 新加入的成员要提前学习，提前规避

3. 如何学习一门新语言，需要考虑哪些方面

- 它的优势和应用场景
- 语法（常量 变量 数据类型 运算符 函数等）
- 内置模块和 API
- 常用的第三方框架和库
- 开发环境和调试工具
- 线上环境和发布过程

4. 你觉得自己还有哪些不足之处

- 范围限定在技术方面
- 非核心技术栈
- 容易弥补的，后面才能“翻身”

</details>

## 面经

<!-- <details><summary><b></b></summary></details> -->

### 自我介绍

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;面试官您好！我叫XXX，20XX 年毕业于(xxxx学校)(xx学历)(XX专业)。
   之前任职于携程商旅信息服务（上海）有限公司，担任商旅事业部高级前端开发工程师。
   在职期间主要负责商旅机票退改相关项目研发，为团队提升研发效率 50%以上,降低生产故障率 30%。
   对业务研发、生产事件、性能调优、埋点监控与告警都十分熟悉。
   因此来面试贵司前端开发岗位，希望能获得此次机会，谢谢！</p>

<details>
    <summary><b>阿里影业面经</b></summary>

1. 自我介绍

2. useEffect 和 useLayoutEffect 的区别
   useEffect 与 useLayoutEffect 两者都是用于处理副作用，这些副作用包括改变 DOM、设置订阅、操作定时器等。在函数组件内部操作副作用是不被允许的，所以需要使用这两个函数去处理。
   useEffect 与 useLayoutEffect 两者底层的函数签名是完全一致的，都是调用的 mountEffectImpl 方法，在使用上也没什么差异，基本可以直接替换。

   useEffect 是按照顺序执行代码的，改变屏幕像素之后执行（先渲染，后改变 DOM），当改变屏幕内容时可能会产生闪烁；useLayoutEffect 是改变屏幕像素之前就执行了（会推迟页面显示的事件，先改变 DOM 后渲染），不会产生闪烁。useLayoutEffect 总是比 useEffect 先执行。

   - useLayoutEffect 阻塞浏览器重新绘制, useEffect 不阻塞浏览器绘制
   - useEffect 在 React 的渲染过程中是被异步调用的，用于绝大多数场景；而 useLayoutEffect 会在所有的 DOM 变更之后同步调用，主要用于处理 DOM 操作、调整样式、避免页面闪烁等问题。也正因为是同步处理，所以需要避免在 useLayoutEffect 做计算量较大的耗时任务从而造成阻塞。

3. 自己用过的状态管理工具和 Context 相比有什么优势

   - 统一的状态管理模式：Rematch 使用了 Redux 的状态管理模式，通过集中式的状态存储和单向数据流，可以更好地组织和管理应用程序的状态。
   - 中心化的状态逻辑：Rematch 使用模型（Model）的概念，将状态和相关的逻辑封装在一个模型中。这种中心化的状态逻辑管理方式使得代码更具可维护性和可测试性
   - 强大的异步操作支持：Rematch 内置了常用的 Redux 中间件，如 Redux Thunk 和 Redux Saga，可以轻松处理异步操作和副作用。
   - 插件系统和工具生态：Rematch 提供了插件系统，可以根据需求选择和集成各种插件，如状态持久化、数据缓存等。
   - 更好的性能优化：Rematch 使用了 Redux 的 diffing 算法来比较状态的变化，并只更新发生变化的部分。
   - Context API 更适合简单的状态共享，而 Rematch 更适合复杂的状态管理和逻辑处理。

4. hooks 使用有什么要注意的事项

   - Hooks 是根据组件的渲染顺序来确定的，每个 Hook 都与组件中的特定位置相关联。Hooks 的调用应该在组件的顶层。
   - 不能在循环、条件语句或嵌套函数中直接调用 Hooks，是为了保证 Hooks 的调用顺序和正确性，以及更好地组织和管理组件的状态和逻辑。

5. 为什么要有合成事件
   在传统的事件里，不同的浏览器需要兼容不同的写法，在合成事件中 React 提供统一的事件对象，抹平了浏览器的兼容性差异
   React 通过顶层监听的形式，通过事件委托的方式来统一管理所有的事件，可以在事件上区分事件优先级，优化用户体验

   - 事件委托
     事件委托的意思就是可以通过给父元素绑定事件委托，通过事件对象的 target 属性可以获取到当前触发目标阶段的 dom 元素，来进行统一管理
   - 事件监听
     事件监听和事件绑定的最大区别就是事件监听可以给一个事件监听多个函数操作，而事件绑定只有一次
   - 事件执行顺序
     16+: 原生捕获 -> 原生冒泡 -> 合成捕获 -> 合成冒泡(stopImmediatePropagation 阻止所有事件)
     17+: 合成捕获 -> 原生捕获 -> 原生冒泡 -> 合成冒泡(stopPropagation)

6. CSS 怎么实现样式隔离
   作用域样式（Scoped Styles）
   CSS Modules
   CSS-in-JS 方案
   命名约定

7. new 操作符具体干了什么
创建一个新的对象
将对象与构建函数通过原型链连接起来
将构建函数中的 this 绑定到新建的对象上
根据构建函数返回类型作判断，如果是原始值则被忽略，如果是返回对象，需要正常处理
</details>

<details>
    <summary>
        <b>猫眼娱乐面经</b>
    </summary>

1. 自我介绍
2. 谈谈你对 webpack 的理解？

- webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。
- 编译代码能力，提高效率，解决浏览器兼容问题
- 模块整合能力，提高性能，可维护性，解决浏览器频繁请求文件的问题
- 万物皆可模块能力，项目维护性增强，支持不同种类的前端模块类型，统一的模块化方案，所有资源文件的加载都可以通过代码控制

3. 你有没有写过 loader 和 plugin？
   没写过

4. 你是如何使用 webpack 来优化前端性能的？

- JS 代码压缩 terserPlugin
  CSS 代码压缩 css-minimizer-webpack-plugin
  Html 文件代码压缩 HtmlWebpackPlugin
  文件大小压缩 compression-webpack-plugin
  图片压缩 image-webpack-loader
  Tree Shaking sideEffects/PurgeCss
  代码分离 splitChunksPlugin
  内联 chunk InlineChunkHtmlPlugin

5. http1.1 与 http2.0 的区别

- 二进制分帧：http1.1 是报文头必须是文本（ASCII 编码），数据体可以是文本或二进制。http2.0 使用二进制对数据进行分帧和传输，减少了数据大小，提高了解析效率。
- 多路复用：HTTP/1.1 使用序列化和阻塞的方式传输请求和响应，每个请求都需要创建一个新的连接。而 HTTP/2.0 引入了多路复用的机制，允许多个请求同时在同一个连接上进行，提高了并发性能和效率
- 头部压缩：HTTP/2.0 使用了 HPACK 压缩算法对请求和响应的头部进行压缩，减少了头部的大小，节省了带宽，提高了性能。
- 服务器推送：HTTP/2.0 引入了服务器推送的机制，服务器可以主动将客户端可能需要的资源推送给客户端，减少了客户端请求的次数，加快了页面加载速度。
- 请求优先级和流量控制：HTTP/2.0 允许客户端设置请求的优先级，以确保重要资源的优先加载。同时，它还引入了流量控制机制，防止过载和拥塞情况的发生。

6. http 与 https 的区别

- 安全性：HTTP 是明文传输协议，数据在传输过程中不加密，容易被窃听和篡改。而 HTTPS 通过使用 SSL/TLS 加密协议对数据进行加密，确保传输的数据在网络上是安全的，提供了保密性和完整性的保护。
- 默认端口：HTTP 使用的是 80 端口进行通信，而 HTTPS 使用的是 443 端口。这使得网络服务器可以通过端口号来区分处理 HTTP 请求和 HTTPS 请求。
- 证书：为了建立 HTTPS 连接，服务器需要使用数字证书来验证自身的身份。数字证书由受信任的证书颁发机构（CA）签发，用于证明服务器的真实性。客户端在与服务器建立连接时会验证证书的有效性，确保与合法的服务器进行通信。
- 加密算法：HTTP 不提供加密，而 HTTPS 使用 SSL/TLS 协议进行数据加密和解密。SSL/TLS 使用对称加密和非对称加密的组合，以确保传输的数据在网络上是加密的，并提供身份验证和数据完整性保护。
- 性能：由于 HTTPS 需要额外的加密和解密步骤，相对于 HTTP 而言，在数据传输时会增加一定的计算和处理时间。因此，HTTPS 在性能上可能会略微降低，但随着硬件和网络的发展，这种差距逐渐减小。

7. 说说你对“三次握手”、“四次挥手”的理解

- 三次握手就是用来建立连接的，四次握手就是用来断开连接的。

8. 说说 react 的事件
9. Node.js 如何调试

- console
- 通过命令行参数 --inspect 或者 --inspect-brk 来启动, 在 Chrome 浏览器中打开 chrome://inspect 页面
- vscode 自带 debug 功能

10. 请求头都有哪些字段

- Cache-Control: 告诉所有的缓存机制是否可以缓存及哪种类型
- Connection: 表明是否需要持久连接
- Transfer-Encoding: 文件传输编码
- Accept: 指定客户端能够接收的内容类型，内容类型中的先后次序表示客户端接收的先后次序
- Range: 实体的字节范围请求
- Authorization: web 的认证信息
- Host: 请求资源所在服务器
- User-Agent: 客户端程序信息
- Location: 令客户端重定向的 URI
- ETag: 能够表示资源唯一资源的字符串
- Server: 服务器的信息
- Last-Modified: 请求资源的最后修改时间
- Expires: 响应过期的日期和时间
- Allow: 资源可支持 http 请求的方法，不允许则返回 405
- Content-Type: 返回内容的媒体类型

11. 前端性能优化指标有哪些？

- FCP: 首次内容绘制，浏览器首次绘制来自 DOM 的内容的时间，内容必须包括文本，图片，非白色的 canvas 或 svg，也包括带有正在加载中的 web 字体文本。这是用户第一次看到的内容。
- LCP: 最大内容绘制，可视区域中最大的内容元素呈现到屏幕上的时间，用以估算页面的主要内容对用户的可见时间。img 图片，video 元素的封面，通过 url 加载到的北京，文本节点等，为了提供更好的用户体验，网站应该在 2.5s 以内或者更短的时间最大内容绘制。
- FID: 首次输入延迟，从用户第一次与页面进行交互到浏览器实际能够响应该交互的时间，输入延迟是因为浏览器的主线程正忙于做其他事情，所以不能响应用户，发生这种情况的一个常见原因是浏览器正忙于解析和执行应用程序加载的大量计算的 JavaScript。
- TTI: 网页第一次完全达到可交互状态的时间点，浏览器已经可以持续的响应用户的输入，完全达到可交互的状态的时间是在最后一个长任务完成的时间，并且在随后的 5s 内网络和主线程是空闲的。从定义上来看，中文名称叫持续可交互时间或可流畅交互时间更合适。
- TBT:总阻塞时间，度量了 FCP 和 TTI 之间的总时间，在该时间范围内，主线程被阻塞足够长的时间以防止输入响应。只要存在长任务，该主线程就会被视为阻塞，该任务在主线程上运行超过 50 毫秒。
- CLS: 累计布局位移，CLS 会测量在页面整个生命周期中发生的每个意外的布局移位的所有单独布局移位分数的总和，他是一种保证页面的视觉稳定性从而提升用户体验的指标方案。

12. react 什么时候会触发重新渲染？

- 类组件调用 setState 修改状态
- 函数组件通过 useState hook 修改状态

13. 说说你对计算机网络模型的理解

- 物理层
- 数据链路层
- 网络层
- 传输层
- 会话层
- 表示层
- 应用层

14. web 常见的攻击方式有哪些，以及如何进行防御？

- XSS
- CRSF
- SQL 注入

15. 数据类型检测的方式有哪些？

- typeof: 其中数组、对象、null 都会被判断为 object，其他判断都正确。
- instanceof: instanceof 可以正确判断对象的类型，其内部运行机制是判断在其原型链中能否找到该类型的原型。
- constructor: constructor 有两个作用，一是判断数据的类型，二是对象实例通过 constrcutor 对象访问它的构造函数。
- Object.prototype.toString.call({})

16. 谈谈对 this 对象的理解

- this 关键字是函数运行时自动生成的一个内部对象，只能在函数内部使用，总指向调用它的对象
- this 在函数执行过程中，this 一旦被确定了，就不可以再更改

17. Javascript 如何实现继承？

- 原型链继承

- 构造函数继承（借助 call）

- 组合继承

- 原型式继承

- 寄生式继承

- 寄生组合式继承

- ES6 extends

18. React 中为什么要给组件设置 key？

- 在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性。
- 在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新创建的还是被移动而来的元素，从而减少不必要的元素重新渲染。

19. script 标签中， async 和 defer 两个属性有什么用途和区别？

- 用途

  - async：用于异步加载和执行 JavaScript 文件，不会阻塞页面的渲染和其他资源的加载。
  - defer：用于延迟加载和执行 JavaScript 文件，会在页面加载完成后再执行，不会阻塞页面的渲染，但会等待其他资源（如 CSS 文件）加载完成后再执行。

- 加载和执行
  - async：加载时不会阻塞页面，执行时也不会阻塞页面，可能在页面渲染完成后再执行，也可能在页面渲染的过程中执行。
  - defer：加载时不会阻塞页面，但会在页面加载完成后再执行，并且会在所有的 DOM 和 CSS 资源加载完成后执行。
- 执行顺序
  - async：加载和执行是并发进行的，执行顺序不确定，可能先执行自己的 JavaScript 文件，也可能先执行其他的 JavaScript 文件。
  - defer：加载和执行是串行进行的，执行时间比 async 早，并且执行顺序是按照在页面中出现的顺序执行。
- 兼容性
  - async：支持现代浏览器，不支持老版本的 Internet Explorer（IE）。
  - defer：支持现代浏览器，支持 IE9 和更高版本。

20. null 和 undefined 有什么区别？

- 两个都是基本数据类型，两者都是假值，双=判断为 true
- null 是含义为空，undefined 含义为未定义

21. 说说 JavaScript 中内存泄漏有哪几种情况？

- 意外的全局变量（不带声明关键字的，或 this 挂载的），上述使用严格模式，可以避免意外的全局变量
- 定时器
- 闭包
- 没有清理对 DOM 元素的引用
- 未取消监听的事件

22. React Fiber 是什么？

- 是一种链表树形结构，通过 return 指向父级节点，child 指向子节点，sibling 指向第一个兄弟节点。
- 将一个耗时长的任务分成多个小任务，通过调度算法，实现增量渲染。每个任务都能中断恢复以及终止

23. 前端有哪些优化 http 请求的策略?

- 减少请求数量：合并多个请求为一个请求，通过使用资源打包工具（如 Webpack）将多个文件合并成一个文件，减少了请求的数量，从而降低了页面加载时间。此外，可以通过使用 CSS Sprites 将多个小图标合并成一个大图，减少图片请求的数量。

- 压缩资源：使用压缩算法对静态资源进行压缩，如使用 Gzip 压缩文本文件（如 HTML、CSS、JavaScript）和图像压缩算法（如 JPEG、PNG 压缩），以减小文件大小，提高传输速度。

- 使用缓存：通过设置合适的缓存策略，让浏览器缓存静态资源，减少重复请求。可以通过设置 HTTP 头中的 Cache-Control 和 Expires 字段来控制缓存策略。对于不经常变化的资源，可以设置较长时间的缓存，减少服务器的负载和网络传输。

- 使用 CDN（内容分发网络）：将静态资源部署到全球分布的 CDN 服务器上，使用户可以从离自己地理位置较近的服务器获取资源，减少网络延迟和提高加载速度。

- 懒加载和预加载：对于页面上的图片、脚本和其他资源，可以采用懒加载和预加载的技术。懒加载意味着在页面滚动到可见区域时才加载资源，而预加载则是在页面加载完成后提前加载可能需要的资源，以提高用户体验。

- 使用 HTTP/2：HTTP/2 是一种新的协议，相较于旧的 HTTP/1.1，具有多路复用、头部压缩、服务器推送等特性，可以显著提高并行请求的效率。

- 使用异步请求：使用异步请求（如 AJAX）来进行数据的获取，避免页面的刷新和阻塞，提高用户体验。

- 优化图片：对于图片资源，可以采用合适的图片格式、适当的压缩和调整图片尺寸来减小文件大小。

- DNS 预解析：使用 DNS 预解析，可以在请求发生之前解析域名，减少 DNS 查询的时间。

- 延迟加载第三方资源：对于页面上的第三方资源（如广告、社交媒体插件等），可以使用异步加载或延迟加载的方式，以免阻塞主要内容的加载。

24. 列举几个常见的 hooks

- useState、useEffect、useContext、useRef、useCallback、useMemo、useImpreativeHanlder

25. 编程题：只出现一次的数字
    给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
    输入: [4,1,2,1,2] 输出: 4

```javascript
const singleNumber = (nums) => {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
};
```

26. 编程题：两数之和
    给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target 的那 两个 整数，并返回它们的数组下标。
    输入：nums = [2,7,11,15], target = 9 输出：[0,1]

```javascript
const twoSum = (nums, target) => {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) {
      return [map.get(target - nums[i]), i];
    } else {
      map.set(nums[i], i);
    }
  }
  return [];
};
```

</details>
