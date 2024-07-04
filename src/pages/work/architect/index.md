---
type: page
title: Architecture
---

# Web 前端架构师
## 需求分析和架构设计

1. 如何成为一名前端架构师？
    - 真实的架构设计过程
    - 真实的商业级项目
    - 大型复杂业务
    - 完善的工程体系
    - 完善的运维体系
    - 研发流程与项目管理
    - 前沿与全面的前端技术栈

## 脚手架架构设计和框架搭建
### 脚手架
#### 开发难点分析
1. 分包
2. 命令注册
3. 参数解析
4. options全称/简写
5. 带params的options
6. 帮助文档
    - global help
    - command help
7. 命令行交互
8. 日志打印
9. 命令行文字变色
10. 网络通信
11. 文件处理
#### lerna
1. 为什么使用多包管理工具？
    - 痛点一：重复操作
        - 多Package本地link
        - 多Package依赖安装
        - 多Package单元测试
        - 多Package代码提交
        - 多Package代码发布
    - 痛点二：版本一致性
        - 发布时版本一致性
        - 发布后相互依赖版本升级
#### pnpm
1. 脚手架项目初始化
    - 安装pnpm
    ```
    npm install -g pnpm
    ```
    - 初始化pnpm项目
    ```
    pnpm init -y
    ```
2. 创建package
    - 创建packages目录
    ```
    mkdir packages
    ```
    - 创建项目
    ```
    pnpm create vite@latest packages/vite-app --template react
    ```
    - 安装依赖
    ```
    pnpm i
    ```
    - 链接依赖
    ```
    pnpm link packages/vite-app
    ```
3. 脚手架开发和测试
    - 执行shell脚本
    ```
    pnpm -r exec mkdir test
    ```
    - 执行npm命令
    ```
    pnpm dev
    ```
    - 清空依赖
    ```
    pnpm -r exec rm -rf node_modules
    ```
    - 重装依赖
    ```
    pnpm i --force
    ```
4. 脚手架发布上线
    - changesets
    ```
    pnpm add -D @changesets/cli
    pnpm changeset init
    ```
    - 发布变更
    ```
    pnpm changeset version
    pnpm install
    pnpm publish -r
    ```