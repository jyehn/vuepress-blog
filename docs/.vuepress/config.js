module.exports = {
    title: '卷心菜', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: 'jyehn的笔记备份', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link',
            { rel: 'icon', href: '/caigouicon.jpg' }
            //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
        ],

        ['link', { rel: "stylesheet", href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }],
        ['link', { rel: "stylesheet", href: 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css' }]


    ],
    themeConfig: {
        logo: '/caigouicon.jpg',  //网页顶端导航栏左上角的图标

        //顶部导航栏
        nav: [
            //格式一：直接跳转，'/'为不添加路由，跳转至首页
            { text: '首页', link: '/' },

            //格式二：添加下拉菜单，link指向的文件路径
            {
                text: '分类',  //默认显示        
                ariaLabel: '分类',   //用于识别的label
                items: [
                    //点击标签会跳转至link的markdown文件生成的页面
                    { text: '竞赛性编程', link: '/pages/竞赛性编程/acwing算法基础' },
                    { text: '前端', link: '/pages/前端/字节青训营笔记.md' },
                    { text: '算法', link: '/pages/算法/机器学习笔记.md' },
                    { text: 'Java', link: '/pages/Java/core java.md' },
                    { text: 'Python', link: '/pages/Python/numpy100.md' },
                    { text: '杂项', link: '/pages/分类/杂项.md' },
                ]
            },
            { text: '网站收集', link: '/pages/链接备忘/链接.md' },

            //格式三：跳转至外部网页，需http/https前缀
            { text: 'Github', link: 'https://github.com/jyehn' },
        ],

        //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
        sidebar: {
            '/pages/竞赛性编程/': [
                'acwing算法基础',
                '二分查找和三分查找常见问题和写法比较',
                '力扣中有关括号序列的题.md',
                '算法常用代码模版',
                'acwing算法提高',
                'lc题解',
                'lc题目分类'
            ],
            '/pages/前端/': [
                '字节青训营笔记',
                'CSS之flex布局 ',
                'javascript高级程序设计笔记-DOM',
                'html梳理',
                'javascript高级程序设计-对象类与面向对象编程',
                'Vue官方文档阅读笔记-过渡和动画',
                'Vue官方文档阅读笔记-基础篇',
                'Vue官方文档阅读笔记-基础篇'

            ],
            '/pages/算法/': [
                '机器学习笔记',
                '启发式算法',
                '群体智能',
                '应用数学笔记',
                'MATLAB最优化-笔记'
            ],
            '/pages/Java/': [
                'core-java'
            ],
            '/pages/Python/': [
                'numpy100',
                'requests-xpath-selenium-Scrapy框架笔记'
            ],
            '/pages/杂项/': [
                'Google三大件'
            ]
        }

    }
}



