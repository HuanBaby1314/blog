module.exports = {
  repo: "docschina/vitepress-docs-cn",
  docsDir: "docs",

  editLinks: true,
  editLinkText: "在 GitHub 上编辑此页面",
  lastUpdated: "上次更新",

  algolia: {
    apiKey: "c57105e511faa5558547599f120ceeba",
    indexName: "vitepress",
  },

  carbonAds: {
    carbon: "CEBDT27Y",
    custom: "CKYD62QM",
    placement: "vuejsorg",
  },
  nav: [
    { text: "指南", link: "/", activeMatch: "^/$|^/guide/" },
    {
      text: "配置参考",
      link: "/config/basics",
      activeMatch: "^/config/",
    },
    {
      text: "发行说明",
      link: "https://github.com/vuejs/vitepress/releases",
    },
  ],
  sidebar: {
    // "/guide/": getGuideSidebar(),
    // "/config/": getConfigSidebar(),
    // "/": getGuideSidebar(),
  },
};
