const path = require('path');

module.exports = {
    title: '卷心菜', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: 'jyehn的笔记备份', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link',
            { rel: 'icon', href: '/caigouicon.png' }
            //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
        ],

        ['link', { rel: "stylesheet", href: 'https://img.jyehn.xyz/libs/KaTex/katex.min.css' }],
        ['link', { rel: "stylesheet", href: 'https://img.jyehn.xyz/libs/github-markdown-css/github-markdown.css' }]


    ],
    theme: 'vdoing',
    themeConfig: {
        logo: '/caigouicon.png',  //网页顶端导航栏左上角的图标
        smoothScroll: true, //平滑滚动
        //顶部导航栏
        nav: [
            { text: '首页', link: '/' },
            { text: '竞赛性编程', link: '/pages/31c782/' },
            { text: '前端', link: '/pages/228c04/', },
            { text: 'Java相关', link: '/pages/b6a3b6/' },
            { text: 'Python相关', link: '/pages/e9c654/' },
            { text: '算法', link: '/pages/6f7932/' },
            { text: '实用网址', link: '/pages/5b79ae/' },
            { text: '编程tips', link: '/pages/738df6/' },
            { text: '更新日记', link: '/pages/cb7fdc/' }
        ],
        repo: 'jyehn/vuepress-blog',
        docsBranch: 'main',
        lastUpdated: '上次更新', // 开启更新时间，并配置前缀文字   string | boolean (取值为git提交时间)
        docsDir: 'docs', // 编辑的文件夹
        editLinks: true, // 启用编辑
        editLinkText: '编辑',
        category: true,
        tag: true,
        archive: true,
        sidebar: 'structuring', //  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | 自定义
        updateBar: {
            showToArticle: true, moreArticle: '/archives/'
        },
        rightMenuBar: true,
        pageButton: true,
        //页脚版权栏
        footer: {
            createYear: 2022,
            copyrightInfo: process.env.pubLocation === 'cn' ? '<a href="https://beian.miit.gov.cn/" target="_blank">赣ICP备2022001960号-1</a>|「Powered by <a href="https://webify.cloudbase.net/" target="_blank">CloudBase Webify</a>」' : 'Powered by Vercel'
        },
        algolia: {
            apiKey: 'a2c1f5a65cd7cb461c832c4655ded76d',
            indexName: 'jyehn',
            // 如果 Algolia 没有为你提供 `appId` ，使用 `BH4D9OD16A` 或者移除该配置项
            appId: 'QZS1KRZYX3',
            algoliaOptions: {
                hitsPerPage:20,
                facetFilters: ""
            },
        }
    },
    markdown: {
        extendMarkdown: md => {
            md.use(require('markdown-it-katex')) // 启动 markdown-it-katex 插件
            md.use(require('markdown-it-task-lists'))
        },
        extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6']
    },
    plugins: [
        [
            'vuepress-plugin-comment',
            {
                choosen: "valine",
                //  
                options: {
                    el: "#valine-vuepress-comment",
                    appId: process.env.LeanCloudAppID,
                    appKey: process.env.LeanCloudAppKey,
                    path: '<%- frontmatter.to.path %>'
                }
            }
        ],
        [
            'site-map',
            {
                'hostname': 'https://blog.jyehn.com'
            }
        ]

    ]
}



