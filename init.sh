#!/bin/bash
LANG=zh_CN.UTF-8
# 初始化仓库
yarn init && yarn add --dev vitepress && mkdir docs && echo '# Hello VitePress' > docs/index.md

