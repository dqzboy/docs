module.exports = {
  title: 'Docker Proxy',
  description: '自建Docker镜像加速服务',
  base: '/docs/',  //这里是仓库的名称
  head: [
    [
      "link",
      { rel: "icon", href: "/img/favicon.ico" } //浏览器的标签栏的网页图标,基地址/docs/.vuepress/public
    ]
  ],


  //markdown扩展
  markdown: {
    lineNumbers: true //是否在每个代码块的左侧显示行号
  },

  //默认主题配置
  themeConfig: {
    //导航栏
    nav: [
      //链接页面链接的根地址为/docs
      { text: "主页", link: "/" },
      { text: "博客", link: "https://dqzboy.com/" },
      { text: "教程", link: "/pages/install.md" },
      { text: "赞助", link: "https://dqzboy.github.io/proxyui/zanzhu" },
      { text: "CMD UI", link: "https://dqzboy.github.io/proxyui/" },
      { text: "Github", link: "https://github.com/dqzboy/Docker-Proxy" }
    ],
    sidebarDepth: 2, //侧边栏深度
    //侧边栏
    sidebar: [
      ["/pages/install.md", "安装部署"],
      ["/pages/isseus.md", "问题总结"]
    ],

    // 以下为可选的编辑链接选项
    // 假如文档不是放在仓库的根目录下：
    docsDir: "docs",
    // 假如文档放在一个特定的分支下：
    docsBranch: "main",
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: "在 Github 上编辑此页",

    smoothScroll: true, //页面滚动效果
    lastUpdated: "最后更新" // string | boolean
  },

  //插件
  plugins: [
    "@vuepress/medium-zoom", //zooming images like Medium（页面弹框居中显示）
    "@vuepress/nprogress", //网页加载进度条
    "@vuepress/back-to-top", //返回页面顶部按钮
    "@vuepress/nprogress", //提示加载进度
    "reading-progress" //提示阅读进度
  ]
};
